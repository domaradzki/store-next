import { createTransport, getTestMessageUrl } from 'nodemailer';
import { MailResponse } from './mail';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeNiceEmail(text: string): string {
  return `
    <div style"
    border:1px solid black;
    padding:20px;
    font-familly: sans-serif;
    line-heught:2;
    font-sieze: 20px;
    ">
    <h2>Hello there </h2>
    <p>${text}</p>
    <p>buziaki</p>
    </div>
    `;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}
export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email user a token
  const info = (await transport.sendMail({
    to,
    from: 'muwa@you.pl',
    subject: 'Your password reset token',
    html: makeNiceEmail(`Your Password token is here!
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  })) as unknown as MailResponse;

  if (process.env.MAIL_USER.includes('etheral.email')) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
