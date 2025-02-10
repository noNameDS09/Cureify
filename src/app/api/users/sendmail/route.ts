import nodemailer from 'nodemailer';

export async function POST(req, res) {
  try {
    const { to, subject, text } = await req.json(); // Parse incoming JSON data

    // Create the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can replace this with any other provider (e.g., SendGrid, SMTP)
      auth: {
        user: process.env.EMAIL_USER, // Add your email here (e.g., 'your-email@gmail.com')
        pass: process.env.EMAIL_PASS, // Add your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to: to, // Receiver's email
      subject: subject,
      text: text, // Plain text message
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return a success response
    return res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    // Handle errors and return a response
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
