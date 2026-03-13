// // pages/api/send-email.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import nodemailer from 'nodemailer';

// type Data = { ok?: boolean; error?: string };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

//   const { name, email, subject, message } = req.body ?? {};

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ error: 'Missing fields' });
//   }

//   // Configure transporter with environment variables
//   // For production, consider SendGrid/Mailgun/SES instead of raw SMTP if possible.
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: +(process.env.SMTP_PORT || 587),
//     secure: process.env.SMTP_SECURE === 'true', // true for 465
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Website Contact" <${process.env.SMTP_USER}>`,
//     to: 'kannadakoota.ecc@pes.edu',
//     subject: `[Website Contact] ${subject}`,
//     text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
//     html: `<p><strong>Name:</strong> ${name}</p>
//            <p><strong>Email:</strong> ${email}</p>
//            <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ ok: true });
//   } catch (error: any) {
//     console.error('Email send error:', error);
//     return res.status(500).json({ error: 'Failed to send email' });
//   }
// }
