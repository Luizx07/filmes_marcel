/*
 * Objetivo: Criar um API para realizar o CRUD do sistema de controle de filmes
 * Autor: Luiz
 * OBSERVAÇÃO:
 *      Para criar a API precisamos instalar:
 *          * express           npm install express --save
 *          * cors              npm install cors --save
 *          * body-parser       npm install body-parser --save
 *
 *      Para criar a integração com o Banco de Dados precisamos instalar:
 *          * prisma            npm install prisma --save           (para fazer conexão com o BD)
 *          * prisma/client     npm install @prisma/client --save   (para rodar os scripts SQL)
 * 
 *          Após a instalação do prisma e do prisma client, devemos:
 *              npx prisma init
 *          voce devera confidurar o arquivo .env e o schema.prisma com as credenciais do BD
 *          apos esa configuração devera rodar o seguinte comando:
 *              npx prisma migrate dev
 *          
*/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()


const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

const controllerFilme = require('./controller/filme/controller.js')

app.post('/v1/controle-filme/filme', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)

    response.json(resultFilme)
})

app.get('/v1/controle-filme/filme', cors(), bodyParserJSON, async function (request, response) {

    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filme/filme/:id', cors(), bodyParserJSON, async function (request, response) {

    let idFilme = request.params.id

    let resultFilme = await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.delete('/v1/controle-filme/filme/delete/:id', cors(), async function (request, response) {
    let id = request.params.id

    let resultFilme = await controllerFilme.excluirFilme(id)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.put('/v1/controle-filme/filme/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    let idFilme = request.params.id

    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})


/****************************************GENERO***************************************************/


const controllerGenero = require('./controller/genero/controller.js')

app.post('/v1/controle-genero/genero', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)

    response.json(resultGenero)
})

app.get('/v1/controle-genero/genero', cors(), bodyParserJSON, async function (request, response) {

    let resultGenero = await controllerGenero.listarGeneros()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-genero/genero/:id', cors(), bodyParserJSON, async function (request, response) {

    let idGenero = request.params.id

    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.delete('/v1/controle-genero/genero/delete/:id', cors(), async function (request, response) {

    let id = request.params.id
    let resultGenero = await controllerGenero.excluirGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-genero/genero/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    let idGenero = request.params.id

    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})


/****************************************LEGENDA***************************************************/


const controllerLegenda = require('./controller/legenda/controller.js');


app.post('/v1/controle-legenda/legenda', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultLegenda = await controllerLegenda.inserirLegenda(dadosBody, contentType)
    response.status(resultLegenda.status_code)
    response.json(resultLegenda)
});

app.get('/v1/controle-legenda/legenda', cors(), bodyParserJSON, async function (request, response) {
    let resultLegenda = await controllerLegenda.listarLegenda()
    response.status(resultLegenda.status_code)
    response.json(resultLegenda)
});

app.get('/v1/controle-legenda/legenda/:id', cors(), bodyParserJSON, async function (request, response) {
    let idLegenda = request.params.id;
    let resultLegenda = await controllerLegenda.buscarLegenda(idLegenda);
    response.status(resultLegenda.status_code);
    response.json(resultLegenda);
});

app.delete('/v1/controle-legenda/legenda/delete/:id', cors(), async function (request, response) {
    let id = request.params.id;
    let resultLegenda = await controllerLegenda.excluirLegenda(id);
    response.status(resultLegenda.status_code);
    response.json(resultLegenda);
});

app.put('/v1/controle-legenda/legenda/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type'];
    let idLegenda = request.params.id;
    let dadosBody = request.body;
    let resultLegenda = await controllerLegenda.atualizarLegenda(idLegenda, dadosBody, contentType);
    response.status(resultLegenda.status_code);
    response.json(resultLegenda);
});



app.listen('8080', function () {
    console.log('API funcionando...')
})