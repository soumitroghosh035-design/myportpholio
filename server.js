const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {

    const { name, email, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "YOUR_EMAIL@gmail.com",
                pass: "YOUR_APP_PASSWORD"
            }
        });

        await transporter.sendMail({
            from: email,
            to: "YOUR_EMAIL@gmail.com",
            subject: `Message from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `
        });

        res.json({
            success: true,
            message: "Message Sent Successfully"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error Sending Message"
        });
    }
});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});