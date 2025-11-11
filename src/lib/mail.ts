import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const CONTACT_TO = process.env.CONTACT_TO;

export async function sendContactEmail({
  name,
  email,
  project,
  message,
}: {
  name: string;
  email: string;
  project: string;
  message?: string;
}) {
  if (!resend || !CONTACT_TO) {
    return { mocked: true };
  }

  return resend.emails.send({
    from: "AUTOBUILDER <ops@autobuilder.dev>",
    to: CONTACT_TO,
    subject: `[Lead] ${project} inquiry`,
    text: `Name: ${name}\nEmail: ${email}\nProject: ${project}\nMessage: ${message ?? "-"}`,
  });
}
