const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

async function sendEmailViaSMTP(to: string, subject: string, body: string) {
  const smtpUser = Deno.env.get('SMTP_USER')!;
  const smtpPass = Deno.env.get('SMTP_PASSWORD')!;

  const conn = await Deno.connect({ hostname: 'smtp-mail.outlook.com', port: 587 });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  async function send(data: string) {
    await conn.write(encoder.encode(data + '\r\n'));
  }

  async function read(): Promise<string> {
    const buf = new Uint8Array(4096);
    const n = await conn.read(buf);
    return decoder.decode(buf.subarray(0, n!));
  }

  // Read greeting
  await read();
  await send('EHLO localhost');
  await read();

  // STARTTLS
  await send('STARTTLS');
  const starttlsRes = await read();
  if (!starttlsRes.startsWith('220')) {
    conn.close();
    throw new Error(`STARTTLS failed: ${starttlsRes}`);
  }

  const tlsConn = await Deno.startTls(conn, { hostname: 'smtp-mail.outlook.com' });

  async function tlsSend(data: string) {
    await tlsConn.write(encoder.encode(data + '\r\n'));
  }

  async function tlsRead(): Promise<string> {
    const buf = new Uint8Array(4096);
    const n = await tlsConn.read(buf);
    return decoder.decode(buf.subarray(0, n!));
  }

  // Re-EHLO after TLS
  await tlsSend('EHLO localhost');
  await tlsRead();

  // AUTH LOGIN
  await tlsSend('AUTH LOGIN');
  await tlsRead();
  await tlsSend(btoa(smtpUser));
  await tlsRead();
  await tlsSend(btoa(smtpPass));
  const authRes = await tlsRead();
  if (!authRes.startsWith('235')) {
    tlsConn.close();
    throw new Error(`SMTP Auth failed: ${authRes}`);
  }

  await tlsSend(`MAIL FROM:<${smtpUser}>`);
  await tlsRead();
  await tlsSend(`RCPT TO:<${to}>`);
  await tlsRead();
  await tlsSend('DATA');
  await tlsRead();

  const message = [
    `From: Vedant Capital Service <${smtpUser}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    '',
    body,
    '.',
  ].join('\r\n');

  await tlsSend(message);
  await tlsRead();
  await tlsSend('QUIT');
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
    console.log('📧 Email sent via Hotmail SMTP');

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
