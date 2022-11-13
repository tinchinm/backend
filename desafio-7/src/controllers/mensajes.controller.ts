//CONEXION A BASE DE DATOS
import db from '../../DB/sqliteConnection'

class ApiMjs {
    async addMsg(data:any){
	    await db('ecommerce').insert(data)
    }
}

export const mensajesController = new ApiMjs();