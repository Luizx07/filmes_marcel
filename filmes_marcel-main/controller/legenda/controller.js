const message = require('../../modulo/config.js')
const legendaDAO = require('../../model/DAO/legenda.js')

// INSERIR LEGENDA
const inserirLegenda = async function (legenda, contentType) {
    try {
       
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                legenda.legendas_idioma == '' || legenda.legendas_idioma == undefined || legenda.legendas_idioma == null ||
                legenda.legendas_idioma.length > 80
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await legendaDAO.insertLegenda(legenda)

                if (result)
                    return message.SUCCESS_CREATED_ITEM // 201
                else
                    return message.ERROR_INTERNAL_SERVER // 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// ATUALIZAR LEGENDA
const atualizarLegenda = async function (id, legenda, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || isNaN(id) || id <= 0 ||
                legenda.legendas_idioma == '' || legenda.legendas_idioma == undefined || legenda.legendas_idioma == null ||
                legenda.legendas_idioma.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let registro = await legendaDAO.selectByIdLegenda(parseInt(id))

                if (registro && registro.length > 0) {
                    legenda.id = parseInt(id)
                    let result = await legendaDAO.updateLegenda(legenda)

                    if (result)
                        return message.SUCCESS_UPDATE_ITEM
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return message.ERROR_NOT_FOUND
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// DELETAR LEGENDA
const excluirLegenda = async function (id) {
    try {
        if (id == undefined || id == '' || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        }

        let registro = await legendaDAO.selectByIdLegenda(parseInt(id))

        if (registro && registro.length > 0) {
            let result = await legendaDAO.deleteLegenda(parseInt(id))

            if (result)
                return message.SUCCESS_DELETED_ITEM
            else
                return message.ERROR_NOT_DELETE
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// LISTAR TODAS AS LEGENDAS
const listarLegenda = async function (){
    try {
        let dadosLegenda = {}
        let resultLegenda = await legendaDAO.selectAllLegenda()

        if(resultLegenda != false){
            if(resultLegenda.length > 0){

                dadosLegenda.status = true
                dadosLegenda.status_code = 200
                dadosLegenda.items = resultLegenda.length
                dadosLegenda.films = resultLegenda

                return dadosLegenda
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// BUSCAR LEGENDA POR ID
const buscarLegenda = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)|| id <= 0){
            return message.ERROR_REQUIRED_FIELDS // 400
        }else{

            dadosLegenda = {}
            
            let resultLegenda = await legendaDAO.selectByIdLegenda(parseInt(id))

            if (resultLegenda != false || typeof(resultLegenda) == 'object'){
                if(resultLegenda.length > 0){
                    dadosLegenda.status = true
                    dadosLegenda.status_code = 200
                    dadosLegenda.filme = resultLegenda
    
                        return dadosLegenda

                }else{
                    return message.ERROR_NOT_FOUND
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }    
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirLegenda,
    atualizarLegenda,
    excluirLegenda,
    listarLegenda,
    buscarLegenda
}
