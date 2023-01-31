import { transporter } from "../services/mail.service";
import { log } from "../config/logs.config";

export const sendMailRegister = async(reciever:string, user:string) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: reciever,
        subject: 'Nuevo Registro',
        html: `Se acaba de registrar el usuario ${user}, con el correo ${reciever}`
    };
    try{
        await transporter.sendMail(mailOptions);
        log.info('Email enviado!');
    }catch(error){
        log.error(error);
    }
};

export const sendMailList = async(reciever:string, user:string, chart:any) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Nuevo pedido de ${user} (${reciever})`,
        html: `Se acaba de recibir el siguiente pedido del usuario ${user}, con el correo ${reciever} /n /n ${chart}`
    };
    try{
        await transporter.sendMail(mailOptions);
        log.info('Email enviado!');
    }catch(error){
        log.error(error);
    }
};