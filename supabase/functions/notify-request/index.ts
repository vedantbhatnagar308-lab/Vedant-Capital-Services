const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, details, trackingId } = await req.json();

    const ADMIN_EMAIL = 'vedantbhatnagar308@gmail.com';

    // Use Supabase's built-in email via the REST API
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Send email using Resend or a simple SMTP approach
    // For now, we'll log the notification and use Supabase's built-in hooks
    // We'll use a simple fetch to a free email API

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

    console.log(`📧 Email notification for ${ADMIN_EMAIL}:`);
    console.log(emailBody);

    // Try sending via Resend if API key is available
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (RESEND_API_KEY) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Vedant Capital Service <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: `New Request: ${service} - ${trackingId}`,
          text: emailBody,
        }),
      });

      const emailData = await emailRes.json();
      console.log('Email sent:', emailData);
    } else {
      console.log('RESEND_API_KEY not set - email logged but not sent. Add the key to enable email delivery.');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notification processed' }),
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
