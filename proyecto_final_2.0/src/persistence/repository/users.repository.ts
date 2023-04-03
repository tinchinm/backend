import { asDto } from "../dto/users.dto";
import { getDao } from "../daos/factory";

const dao = getDao();

export const getAllUsers = async () => {
    const user = await dao.getAllUsers();
    const usersDTO = asDto(user);
    return usersDTO;
}

export const register = async (data:any) => {
    const chart = await dao.register(data);
    return chart;
}