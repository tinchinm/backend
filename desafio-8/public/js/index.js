const socket = io.connect();

//-------------------------------GESTION DE MENSAJERIA------------------------------------------

// RESCATO LOS DATOS DEL FORMULARIO
const form = document.getElementById("formCargaMje");
const mail = document.getElementById("mail");
const mje = document.getElementById("mensaje");

form.addEventListener("submit", (e) => {
  //PREVENGO EL COMPORTAMIENTO POR DEFECTO
  e.preventDefault();

  //VALIDACION DE DATOS
  if (!mail.value || !mje.value) {
    //DISPARA ERROR
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Complete todos los campos",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    //ARMADO DEL OBJETO PARA ENVIAR
    const mjeCompleto = {
      _id: uuid.v4(),
      author: {
        email: mail.value,
        date: moment().format("DD/MM/YYYY, HH:mm"),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: faker.random.number(55),
        alias: faker.name.firstName(),
        avatar: faker.image.avatar(),
      },
      text: mje.value,
    };

    //ENVIO DE DATA AL SERVER
    socket.emit("mensajeCompleto", mjeCompleto);

    //RESETEO LAS VARIABLES A VACIO
    mail.value = "";
    mje.value = "";

    //CONFIRMA ENVíO DE DATOS
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Mensaje Enviado",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

// RECIBO LA DATA DEL SERVIDOR Y LA PROCESO

sessionStorage.length === 0
  ? (mensajes = [])
  : (mensajes = JSON.parse(sessionStorage.getItem("listaMensajes")));

socket.on("mensaje", (data) => {
  mensajes.push(data);
  sessionStorage.setItem("listaMensajes", JSON.stringify(mensajes));
  setTimeout(() => {
    location.reload();
  }, 1600);
});

let tablaMsg = document.getElementById("msg");

for (const mensaje of mensajes) {
  let filas = document.createElement("tr");

  filas.innerHTML = `
                        <td class="mail" >${mensaje.author.email}</td>
                        <td class="date">[${mensaje.author.date}] :</td>
                        <td class="msg">${mensaje.text}</td>
                        <td> <img src="${mensaje.author.avatar}"></td>
                        `;

  tablaMsg.appendChild(filas);
}

//--------------------------------GESTION DE PRODUCTOS---------------------------------------------------

//TABLA DE PRODUCTOS

socket.on("productos", (data) => {
  const productos = data;

  if (productos.length === 0) {
  } else {
    let tablaProds = document.getElementById("prods");

    for (const producto of productos) {
      let filas = document.createElement("tr");

      filas.innerHTML = `
                            <td>${producto.id}</td>
                            <td>${producto.title}</td>
                            <td>${producto.price}</td>
                            <td><img src="${producto.thumbnail}" alt="imagen ${producto.title}"></td>
                            `;

      tablaProds.appendChild(filas);
    }
  }
});

//FORMULARIO DE CARGA DE PRODUCTOS

// RESCATO LOS DATOS DEL FORMULARIO
const formProd = document.getElementById("formCargaProd");
const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const thumbnail = document.getElementById("thumbnail");
const price = document.getElementById("price");
const stock = document.getElementById("stock");

formProd.addEventListener("submit", (e) => {
  //PREVENGO EL COMPORTAMIENTO POR DEFECTO
  e.preventDefault();

  //VALIDACION DE DATOS
  if (
    !title.value ||
    !description.value ||
    !code.value ||
    !thumbnail.value ||
    !price.value ||
    !stock.value
  ) {
    //DISPARA ERROR
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Complete todos los campos",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    //ARMADO DEL OBJETO PARA ENVIAR
    const dataProducto = {
      title: title.value,
      description: description.value,
      code: code.value,
      thumbnail: thumbnail.value,
      price: price.value,
      stock: stock.value,
    };
    //ENVIO DE DATA AL SERVER
    socket.emit("productoCompleto", dataProducto);

    //RESETEO LAS VARIABLES A VACIO
    title.value = "";
    price.value = "";
    thumbnail.value = "";

    //CONFIRMA ENVíO DE DATOS
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Mensaje Enviado",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.reload();
    }, 1600);
  }
});
