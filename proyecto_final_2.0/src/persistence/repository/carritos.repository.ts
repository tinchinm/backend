import { asDto } from "../dto/carritos.dto";
import { getDao } from "../daos/factory";

const dao = getDao();

export const getChart = async (id:String) => {
    const chart = await dao.getChart(id);
    const chartDTO = asDto(chart);
    return chartDTO;
}

export const createChart = async (userID:String,timestamp:String,products:[]) => {
    const chart = await dao.createChart(userID, timestamp, products);
    return chart;
}

export const deleteChart = async (id:String) => {
    const chart = await dao.deleteChart(id);
    return chart;
}

export const addToChart = async (id:String, id_prod:String) => {
    const chart = await dao.addToChart(id, id_prod);
    return chart;
}

export const deleteFromChart = async (id:String, id_prod:String) => {
    const chart = await dao.deleteFromChart(id, id_prod);
    return chart;
}

export const finCompra = async (id_chart:String) => {
    const chart = await dao.finCompra(id_chart);
    return chart;
}
