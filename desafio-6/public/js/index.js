const socket= io.connect();

//-------------------------------GESTION DE MENSAJERIA------------------------------------------

// RESCATO LOS DATOS DEL FORMULARIO
const form = document.getElementById('formCargaMje');
const mail = document.getElementById('mail');
const mje =  document.getElementById('mensaje');

form.addEventListener('submit', (e) => {
    //PREVENGO EL COMPORTAMIENTO POR DEFECTO
    e.preventDefault();

    //VALIDACION DE DATOS
    if(! mail.value || !mje.value ){

        //DISPARA ERROR
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Complete todos los campos',
            showConfirmButton: false,
            timer: 1500
          })

    }else{

        //ARMADO DEL OBJETO PARA ENVIAR
        const mjeCompleto = {
            date: moment().format("DD/MM/YYYY, HH:mm:ss"),
            emisor: mail.value,
            mje: mje.value
        }

        //ENVIO DE DATA AL SERVER
        socket.emit('mensajeCompleto', mjeCompleto)

        //RESETEO LAS VARIABLES A VACIO
        mail.value = '';
        mje.value  = '';

        //CONFIRMA ENVíO DE DATOS
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Mensaje Enviado',
            showConfirmButton: false,
            timer: 1500
          })
    }
})

// RECIBO LA DATA DEL SERVIDOR Y LA PROCESO

sessionStorage.length === 0 ?
 
mensajes = []

:

mensajes = JSON.parse(sessionStorage.getItem('listaMensajes'));

socket.on('mensaje', (data) => {
    mensajes.push(data);
    sessionStorage.setItem('listaMensajes', JSON.stringify(mensajes));
    setTimeout(() => {
        location.reload()
    }, 1600);
})

let tablaMsg = document.getElementById('msg');

    for (const mensaje of mensajes) {

    let filas = document.createElement("tr")
    
    filas.innerHTML = `
                        <td class="mail" >${mensaje.emisor}</td>
                        <td class="date">[${mensaje.date}] :</td>
                        <td class="msg">${mensaje.mje}</td>
                        `;
    
    tablaMsg.appendChild(filas);
    
    };
 
//--------------------------------GESTION DE PRODUCTOS---------------------------------------------------

//TABLA DE PRODUCTOS

socket.on('productos', (data) => {
   const productos = JSON.parse(data)

   if (productos.length === 0){

   }else{
        let tablaProds = document.getElementById('prods');

        for (const producto of productos) {

        let filas = document.createElement("tr")
        
        filas.innerHTML = `
                            <td>${producto.id}</td>
                            <td>${producto.title}</td>
                            <td>${producto.price}</td>
                            <td><img src="${producto.thumbnail}" alt="imagen ${producto.title}"></td>
                            `;
        
        tablaProds.appendChild(filas);
        
        };
    }
})

//FORMULARIO DE CARGA DE PRODUCTOS

// RESCATO LOS DATOS DEL FORMULARIO
const formProd = document.getElementById('formCargaProd');
const title = document.getElementById('title');
const price =  document.getElementById('price');
const thumbnail =  document.getElementById('thumbnail');

formProd.addEventListener('submit', (e) => {
    //PREVENGO EL COMPORTAMIENTO POR DEFECTO
    e.preventDefault();

    //VALIDACION DE DATOS
    if(!title.value || !price.value || !thumbnail.value){

        //DISPARA ERROR
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Complete todos los campos',
            showConfirmButton: false,
            timer: 1500
          })

    }else{
        //ARMADO DEL OBJETO PARA ENVIAR
        const dataProducto = {
            id: uuid.v4(),
            title: title.value,
            price: price.value,
            thumbnail: thumbnail.value
        }
        //ENVIO DE DATA AL SERVER
        socket.emit('productoCompleto', dataProducto)

        //RESETEO LAS VARIABLES A VACIO
        title.value = '';
        price.value  = '';
        thumbnail.value = '';

        //CONFIRMA ENVíO DE DATOS
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Mensaje Enviado',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            location.reload()
        }, 1600);
    }
})