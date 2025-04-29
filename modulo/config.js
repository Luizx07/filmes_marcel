/***********************************************************************************
 * Objetivo: Arquivo de configuração para padronizar mensagens e status code da API
 * Data: 18/02/2025
 * Autor: Luiz 
 * Versão 1.0
************************************************************************************/

/*Status code de mensagens de erro*/
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Não foi possivel realizar a requisisção, pois existem '}

const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'devido a erros internos no servidor da MODEL nao foi possivel processar a requisição'}

const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'devido a erros internos no servidor da CONTROLLER nao foi possivel processar a requisição'}

const ERROR_CONTENT_TYPE  = {status: false, status_code: 415, message: 'nao foi possivel processar a requisição , pois, o tipo de dado encaminhado nao é prcessado pelo servidor.Favor encaminhar no formato JSON'}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados itens para retorno'}

const ERROR_NOT_DELETE = {status: false, status_code: 400, message: "Não foi possível deletar!"}

/**************STATUS CODE DE MNSGS DE SUCESSO******************/
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'item criado com sucesso!'}

const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: 'Item excluido com sucesso!'}

const SUCCESS_UPDATE_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso!'}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    SUCCESS_CREATED_ITEM,
    ERROR_NOT_FOUND,
    ERROR_CONTENT_TYPE,
    SUCCESS_DELETED_ITEM,
    ERROR_NOT_DELETE,
    SUCCESS_UPDATE_ITEM
}