## Consigna 1:
- Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster.

Para esta consigna, se debe iniciar de la siguiente manera:

   ```
   node ./src/services/server.js --m=CLUSTER
   ```
    De esta manera se iniciará en modo Cluster.

   ```
   node ./src/services/server.js --m=FORK
   ```
    De esta manera se iniciará en modo Fork, aunque si no se indica un modo, siempre se inicia de esta manera.

De la misma forma se puede utilizar --p=8080 para indicarle un puerto. En caso de que no se le indique ninguno, tomará por defecto el puerto 8080.

---
## Consigna 2:

- Configurar Nginx para balancear cargas de nuestro servidor.

    ### Modo 1:
        Para este modo se deberá usar el archivo "nginx consigna 1.conf", luego se deberán ejecutar 2 servidores con el siguiente comando:
        
        ```
        Server 1:
        node ./src/services/server.js --m=CLUSTER --p=8081

        Server 2:
        node ./src/services/server.js --m=FORK
        ```
        De esta manera, se iniciaran los 2 servidores individuales de forma nativa en node para las redirecciones que luego hará NGINX a partir de la configuracion que le pasemos.

    ### Modo 2:
        Para este modo se deberá usar el archivo "nginx consigna 2.conf", de esta manera quedará habilitado nuestro balanceador de carga. Seguidamente se deberá ejecutar el ecosistema generado con PM2 para levantar los servidores de la siguiente manera:

        ```
        pm2 start ecosystem.config.js
        ```
        De esta manera se iniciaran los 4 servidores en modo FORK, atendiendo cada vez que llamemos a la ruta /randoms en uno diferente para poder asi distribuir la carga.