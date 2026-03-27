const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple SMTP email sender for Gmail
async function sendEmailViaSMTP(to: string, subject: string, body: string) {
  const smtpUser = Deno.env.get('SMTP_USER')!;
  const smtpPass = Deno.env.get('SMTP_PASSWORD')!;

  const conn = await Deno.connect({ hostname: 'smtp.gmail.com', port: 465 });
  // Use startTls for port 587, or direct TLS for 465
  const tlsConn = await Deno.startTls(conn, { hostname: 'smtp.gmail.com' });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  async function send(data: string) {
    await tlsConn.write(encoder.encode(data + '\r\n'));
  }

  async function read(): Promise<string> {
    const buf = new Uint8Array(1024);
    const n = await tlsConn.read(buf);
    return decoder.decode(buf.subarray(0, n!));
  }

  // Read greeting
  await read();
  await send(`EHLO localhost`);
  await read();

  // AUTH LOGIN
  await send(`AUTH LOGIN`);
  await read();
  await send(btoa(smtpUser));
  await read();
  await send(btoa(smtpPass));
  const authRes = await read();
  if (!authRes.startsWith('235')) {
    tlsConn.close();
    throw new Error(`SMTP Auth failed: ${authRes}`);
  }

  await send(`MAIL FROM:<${smtpUser}>`);
  await read();
  await send(`RCPT TO:<${to}>`);
  await read();
  await send(`DATA`);
  await read();

  const message = [
    `From: Vedant Capital Service <${smtpUser}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    ``,
    body,
    `.`,
  ].join('\r\n');

  await send(message);
  await read();
  await send(`QUIT`);
  tlsConn.close();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, details, trackingId } = await req.json();
    const ADMIN_EMAIL = 'vedantbhatnagar308@gmail.com';

    const emailBody = `
New Request Received!

Tracking ID: ${trackingId}
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Details: ${details || 'N/A'}

Please login to the admin panel to manage this request.
    `.trim();

    const subject = `New Request: ${service} - ${trackingId}`;

    await sendEmailViaSMTP(ADMIN_EMAIL, subject, emailBody);
    console.log('📧 Email sent via Gmail SMTP');

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent via SMTP' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
