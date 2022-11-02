## Descripción del Proyecto:

Proyecto realizado para el curso *BACKEND* dictado por *CoderHouse*.

Consiste en un formulario de carga de productos que queadran guardados en un archivo JSON. Por lo pronto la unica funcionalidad que posee es la de agregar productos nuevos que despues se pueden listar en una tabla, donde se veran acompañados de una imagen miniatura en la descripción del producto. La comunicación esta vez es a través de websocket, tanto para la lectura como escritura.
Tambien tiene un centro de mensajería, en la cual se puede intercambiar mensajes y ademas deja un registro guardado dentro de un archivo JSON con el registro de todos los mensajes y los remitentes de los mismos, agregandole la fecha y hora en la que fueron enviados.

---
## Instalación

1. Cloná el repositorio

2. Parado en la raíz del proyecto corré el comando 

   ```
   npm install
   ```

    para instalar todas las dependecias del proyecto

3. Usá 

   ```
   npm start
   ```

    para correr el proyecto, que estará disponible en http://localhost:8080


---
## Dependencias

- Uso de Express como Framework principal.
- Uso de EJS como motor de plantillas.
- Uso de UUID como plugin de creacion de IDs.
- Uso de Boostrap para la estética del proyecto.
- Uso de Moment como librería para manejar fechas y horas.
- Uso de Socket.io como motor websocket.

---
### Autor

Martin Marzialetti

2022 - Curso de BACKEND en CoderHouse