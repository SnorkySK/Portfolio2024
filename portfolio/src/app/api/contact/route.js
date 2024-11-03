import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const generateEmailTemplate = (name, email, message) => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .message-box {
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.875rem;
            color: #6b7280;
          }
          .info-row {
            margin-bottom: 10px;
          }
          .label {
            font-weight: bold;
            color: #4b5563;
          }
          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>✉️ Nouveau Message du Portfolio</h2>
        </div>
        <div class="content">
          <div class="info-row">
            <span class="label">Date :</span> ${currentDate}
          </div>
          <div class="divider"></div>
          <div class="info-row">
            <span class="label">Nom :</span> ${name}
          </div>
          <div class="info-row">
            <span class="label">Email :</span> 
            <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">
              ${email}
            </a>
          </div>
          <div class="divider"></div>
          <div>
            <span class="label">Message :</span>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="footer">
            <p>Ce message a été envoyé depuis votre formulaire de contact.</p>
            <p>Pour répondre, cliquez simplement sur l'adresse email ci-dessus.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: {
        name: "Formulaire de Contact Portfolio",
        address: process.env.EMAIL_USER
      },
      to: process.env.EMAIL_RECIPIENT,
      subject: `✨ Nouveau message de ${name}`,
      text: `
        Message de : ${name}
        Email : ${email}
        Message : ${message}
      `,
      html: generateEmailTemplate(name, email, message)
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}