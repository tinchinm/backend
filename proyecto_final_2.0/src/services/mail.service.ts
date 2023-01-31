import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});