const fs = require("fs")
const express = require('express');
const app = express();
const PORT = 8080 
class Contenedor {
    constructor(fileName) {

        this.fileName = fileName;


    }
    async getAll() {
        let allFiles
        try {
            allFiles = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            return JSON.stringify(allFiles);
        } catch (err) {
            throw new Error('error read file')
        }
    }
    async random(){
        try{
            const getRandomFiles = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            const random = Math.floor(Math.random() * getRandomFiles.length);
            return getRandomFiles[random]
        } catch (err) {
            throw new Error('error read file')
        }
    }
}
let productos = new Contenedor('archivos.txt');



app.get('/', (req, res) => {
    res.send("Hola Server")
});

app.get('/productos', (req, res) => {
    
    productos.getAll().then(allFiles => {
        res.send(`${JSON.stringify(allFiles)}`)
    }).catch(err => {
        res.send(err);
    })
    

});

app.get('/productoRandom', (req, res) => {
    
    productos.random().then(getRandomFiles => {
        res.send(`${JSON.stringify(getRandomFiles)}`)
    }).catch(err => {
        res.send(err);
    })
    

});



const server = app.listen(PORT, () =>{
    console.log(`servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', (err) => console.log(`error en el servidor ${err}`));