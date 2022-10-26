const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require('../routes/index');

const ruta = path.resolve(__dirname, '../../productos.json');
const fs = require('fs/promises');

const viewsPath = path.resolve(__dirname, '../views');

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', mainRouter );

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/index', (req, res) => {
	res.render('index');
});

app.get('/productos', async (req, res) => {
    
    const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)

	res.render('productos', {data});
});

module.exports = app;