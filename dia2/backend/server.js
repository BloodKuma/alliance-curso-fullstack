const express = require('express')
const { Pool } = require('pg')
const app = express()
app.use(express.json());
const port = 3000

const pool = new Pool({
    connectionString:   "postgres://postgres:Kuma0502@localhost:5432/loja"
});

pool.on('connect', () => {
    console.log("Base de dados conectada com sucesso")
})

app.get('/', (req, res) => {
  res.send('Hello World! ')
})

app.get('/produtos/', async (req, res) => {
    const result = await pool.query("SELECT codigo,descricao,quantidade FROM produtos")
    res.status(200).send(result.rows);
})

app.get('/produtos/:codigo', async (req, res) => {
    var result = await pool.query("SELECT codigo,descricao,quantidade FROM Produtos WHERE codigo = $1 ", [req.params.codigo])
    if (result.rowCount == 0) {
        res.statusCode = 404
        res.send("NOK")
    }
    else 
        result.rows[0]
        res.status(200).send(result.rows);
})


app.delete('/produtos/:codigo', async (req, res) => {
    var result = await pool.query("DELETE FROM Produtos WHERE codigo = $1 ", [req.params.codigo])

    if (result.rowCount == 0) {
        res.statusCode = 404
        res.send("NOK"); 
    }
    else { 
        res.status(200).send("OK");
    }
})


app.put('/produtos/:codigo', async (req, res) => {
    var resource = await pool.query("SELECT codigo,descricao,quantidade FROM Produtos WHERE codigo = $1 ", [req.params.codigo])
    var newObj = req.body;
    if (resource.rowCount == 0) {
        res.statusCode = 404
        res.send("NOK"); 
    }
    else {
        var elementoAtual = resource.rows[0]; 
        
        if (elementoAtual.codigo != newObj.codigo) {
            var result = await pool.query("SELECT codigo,descricao,quantidade FROM Produtos WHERE codigo = $1 ", [newObj.codigo]);
            if (result.rowCount > 0){
                res.statusCod = 409
                res.send("NOK")
                return;
            }
        }
        var update = await pool.query("UPDATE produtos SET codigo =$1,descricao=$2,quantidade=$3 WHERE codigo = $4", [newObj.codigo, newObj.descricao, newObj.quantidade, req.params.codigo]);
        res.send("OK");        
    }
})

app.post('/produtos', async (req,res) => {
    var newObj = req.body;
    var filter = await pool.query("SELECT FROM produtos WHERE codigo = $1", [newObj.codigo])
    const text=  "INSERT INTO produtos(codigo,descricao,quantidade) VALUES($1, $2, $3) RETURNING *";
    const values = [newObj.codigo, newObj.descricao, newObj.quantidade]
    
    if (filter.rowCount > 0 ) {
        res.statusCode = 409;
        res.send("NOK");
    } 
    else {
        const result = await pool.query(text, values)
        res.status(200).send(result.rows[0]);;
    }
})
 
app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})
