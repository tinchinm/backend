import dotenv from 'dotenv';
dotenv.config();

//EXPORTA VALORES Y CONDICIONES FIJAS
export default {
    administrador: true,
    puerto: process.env.PORT || 8080
}