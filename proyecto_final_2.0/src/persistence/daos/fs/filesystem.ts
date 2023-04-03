import fs from 'fs';
import path from 'path';
import { sendMailList } from '../../../controllers/mail.controller';
import { sendWpp } from '../../../controllers//wpp.controller';

const prodPath = path.resolve(__dirname, './prodsDB.json');
const chartsPath = path.resolve(__dirname, './chartsDB.json');
const usersPath = path.resolve(__dirname, './usersDB.json');


export const getAll = async() => {
    try {
        if (fs.existsSync(prodPath)){
            const data:any = fs.promises.readFile(prodPath, 'utf8');
            return JSON.parse(data);
        }else{
            return[];
        }
    } catch (error) {
        console.log(error);
    }
}

export const save = async(data:any) => {
    try {
        const prods = await getAll();
        prods.push(data);
        await fs.promises.writeFile(prodPath,JSON.stringify(prods, null, '\t'))
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id:String) => {
    try {
        const prods = await getAll();
        const busqueda = prods.find((product:any) => product.id == id);
        if (!busqueda) throw new Error ('Producto Inexistente');
        return busqueda;

    } catch (error) {
        console.log(error);
    }
};

export const updateById = async (id:String, data:any) => {
    try {

    const { title, description, code, thumbnail, price, stock } = data

    const prods = await getAll();
    
    const indice = prods.findIndex((product: any) => product.id == id);
    
    if(indice < 0) throw new Error ('Producto Inexistente');
    
    if(!title || !description || !code || !thumbnail || !price || !stock ) throw new Error ("Los campos estan incompletos")
    
    const updatedProd = {
        id: id,
        title: data.title,
        description: data.description,
        code: data.code,
        thumbnail: data.thumbnail,
        price: data.price,
        stock: data.stock
    }

    prods.splice(indice, 1, updatedProd);

    await save(prods);

    return updatedProd
  
      } catch (error) {
          console.log(error);
      }
}

export const deleteById = async (id:String) => {
    try {
        const prods = await getAll();
        const indice = prods.findIndex((product:any) => product.id == id);
        if(indice < 0) throw new Error ('Producto Inexistente');
        prods.splice(indice, 1);
        await save(prods);
      
    } catch (error) {
        console.log(error);
    }
};

/////////////////////////////////CARRITOS///////////////////////////////////////////////////////////

export const getAllCharts = async() => {
    try {
        if (fs.existsSync(chartsPath)){
            const data:any = fs.promises.readFile(chartsPath, 'utf8');
            return JSON.parse(data);
        }else{
            return[];
        }
    } catch (error) {
        console.log(error);
    }
}

export const saveChart = async(data:any) => {
    try {
        const charts = await getAllCharts();
        charts.push(data);
        await fs.promises.writeFile(chartsPath,JSON.stringify(charts, null, '\t'))
    } catch (error) {
        console.log(error);
    }
};


export const getChart = async (id:String) => {
    try {
      const chart = await getAllCharts();
      const busqueda = chart.find((carrito:any) => carrito.id == id);
      if (!busqueda) throw new Error("No existe el carrito seleccionado");
      return busqueda.productos

    } catch (error) {
        console.log(error);
    }
  };

export const createChart = async (userID:String,timestamp:String,products:[]) => {
    try {
      const newProduct = {
        timestamp,
        products,
        userID
      }
      await saveChart(newProduct);

     return newProduct

    } catch (error) {
        console.log(error);
    }
};

// ELIMINA UN CARRITO POR ID
export const deleteChart = async (id:String) => {
    try {
        const charts = await getAllCharts();
        const indice = charts.findIndex((chart:any) => chart.id == id);
        if(indice < 0) throw new Error ('El carrito seleccionado no existe');
        charts.splice(indice,1);
        await saveChart(charts)
    } catch (error) {
        console.log(error);
    }
};

//AGREGADO DE PRODUCTOS A UN CARRITO
export const addToChart = async (id:String, id_prod:String) => {
    try {
        //TRAIGO TODOS LOS CARRITOS
        const charts = await getAll();

        //BUSCO UN CARRTO DENTRO DEL ARRAY Y SU INDICE
        const chartID = charts.find((chart:any) => chart.id == id);
        const indice = charts.findIndex((chart: any) => chart.id == id);
        
        //VALIDO QUE SE HAYA TRAIDO UN CARRITO
        if (!chartID) throw new Error('El carrito seleccionado no existe');
        
        //LLAMO UN PRODUCTO POR ID
        const product = await getById(id_prod);

        //VALIDO QUE SE HAYA TRAIDO UN PRODUCTO
        if (!product) throw new Error('El producto seleccionado no existe');

        //PUSHEO PRODUCTO NUEVO EN EL ARRAY PRODUCTOS
	    chartID.products.push(product)

        //REALIZO EL UPDATE
        
        charts.splice(indice, 1, chartID);

        await save(charts);

        return chartID;

    } catch (error) {
        console.log(error);
    }
};

//BORRADO DE PRODUCTOS DE UN CARRITO
export const deleteFromChart = async (id:String, id_prod:String) => {
    try {

        //TRAIGO TODOS LOS CARRITOS
        const charts = await getAll();

        //BUSCO UN CARRTO DENTRO DEL ARRAY Y SU INDICE
        const chartID = charts.find((chart:any) => chart.id == id);
        const index = charts.findIndex((chart: any) => chart.id == id);
        
        //VALIDO QUE SE HAYA TRAIDO UN CARRITO
        if (!chartID) throw new Error('El carrito seleccionado no existe');
        
        //CREO UN ARRAY CON EL ARRAY TRAIDO DEL CARRITO
        const products = chartID.products

        //BUSCO EL PRODUCTO DENTRO DEL CARRITO Y SU INDICE
        const prod = products.find((producto:any) => producto._id == id_prod);
        const indice = products.findIndex((producto: any) => producto.id == id_prod);

        //VALIDO QUE SE HAYA ENCONTRADO UN PRODUCTO
        if (!prod) throw new Error('El producto seleccionado no existe');

        //BORRO EL PRODUCTO
        products.splice(indice, 1);

        //REALIZO EL UPDATE
        charts.splice(index, 1, chartID);

        await save(charts);

        return chartID;

    } catch (error) {
        console.log(error);
    }
};

//COMPLETACION DE COMPRA
export const finCompra = async (id_chart:String) => {
  try {

    //LLAMO AL CARRITO POR ID
    const chart = await getChart(id_chart);

    //LLAMO AL USUARIO POR ID
    const user = await getUserById(chart?.userID);

    //CAMBIO EL STATUS DEL CARRITO
    const status = 'finished';
    
    await chart.push(status)

     //ENVIO MAIL Y WPP DE CONFIRMACION
     await sendMailList(user?.mail, user?.name, chart?.products);
     await sendWpp(user?.phone);

} catch (error) {
    console.log(error);
}
}

/////////////////////////////////////USUARIOS////////////////////////////////////////////////////

export const getAllUsers = async() => {
    try {
        if (fs.existsSync(usersPath)){
            const data:any = fs.promises.readFile(usersPath, 'utf8');
            return JSON.parse(data);
        }else{
            return[];
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (id:String) => {
    try {
        const users = await getAllUsers();
        const busqueda = users.find((user:any) => user.id == id);
        if (!busqueda) throw new Error ('Ususario Inexistente');
        return busqueda;

    } catch (error) {
        console.log(error);
    }
};

export const register = async (data:any) => {

    try {
        const users = await getAllUsers();
        users.push(data);
        await fs.promises.writeFile(usersPath,JSON.stringify(users, null, '\t'));

        return data
  
    } catch (error) {
        console.log(error);
    }
  }