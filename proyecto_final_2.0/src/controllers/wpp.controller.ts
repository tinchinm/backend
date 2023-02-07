import { twilioClient } from "../services/messaging.service";
import { log } from "../config/logs.config";
import dotenv from "dotenv";
dotenv.config();

export const sendWpp =async (destino:any) => {
    try {
        const message = {
            body: "Su pedido ha sido recibido y se encuentra en proceso. Muchas Gracias!",
            from: '+14155238886',
            to: destino
        };
        const sendWpp = await twilioClient.messages.create(message)
        log.info(sendWpp)
    } catch (error) {
        log.error(error)
    }
}