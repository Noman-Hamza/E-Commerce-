const nodemailer = require('nodemailer');

// Function to send an email
const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    try {
        // Create a transporter with SMTP configuration
        const transport = nodemailer.createTransport({
            host: "smtp.titan.email",
            port: 465,
            secure: false, // Use secure connection for port 465
            auth: {
                user: "support@laravelpoint.com",
                pass: "Rup77_4827"
            },
            tls: {
                rejectUnauthorized: false // Allow unauthorized certificates (use with caution)
            }
        });

        // Define the email options
        const mailOption = {
            from: 'MERN Ecommerce Solution <support@laravelpoint.com>',
            to: EmailTo,
            subject: EmailSubject,
            text: EmailText
        };

        // Send the email and return the result
        const info = await transport.sendMail(mailOption);
        console.log('Email sent successfully:', info.response);
        return info;
    } catch (error) {
        console.error('Error while sending email:', error);
        // throw error;
    }
};

// Export the function
module.exports = EmailSend;
