const message = require('../../modulo/config.js')
const faixaEtariaDAO = require('../../model/DAO/faixa_etaria.js')


const inserirFaixa = async function (faixa, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (!faixa.faixa_etaria || faixa.faixa_etaria == '' || faixa.faixa_etaria.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultFaixa = await faixaEtariaDAO.insertFaixaEtaria(faixa)

                if (resultFaixa)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarFaixa = async function (id, faixa, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || isNaN(id) || faixa.faixa_etaria == '' || faixa.faixa_etaria.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultfaixa = await faixaEtariaDAO.selectByIdFaixaEtaria(parseInt(id))
                if (resultfaixa && resultfaixa.length > 0) {
                    faixa.id = parseInt(id)
                    let result = await faixaEtariaDAO.updateFaixaEtaria(faixa)
                    if (result) {
                        return message.SUCCESS_UPDATE_ITEM
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return message.ERROR_NOT_FOUND
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const excluirFaixa = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let verificar = await faixaEtariaDAO.selectByIdFaixaEtaria(parseInt(id))
            let result = await faixaEtariaDAO.deleteFaixaEtaria(parseInt(id))
            if (verificar != false || typeof (verificar) == 'object') {
                if (verificar.length > 0)
                    if (result) {
                        return message.SUCCESS_DELETED_ITEM
                    } else {
                        return message.ERROR_NOT_DELETE
                    }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarFaixas = async function () {
    try {
        let faixa = {}
        let resultFaixa = await faixaEtariaDAO.selectAllFaixaEtaria()

        if (resultFaixa != false) {
            if (resultFaixa.length > 0) {

                faixa.status = true
                faixa.status_code = 200
                faixa.items = resultFaixa.length
                faixa.genero = resultFaixa

                return faixa
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarFaixas = async function (id) {
    try {
        if (id == undefined || id == '' || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        }

        let resultado = await faixaEtariaDAO.selectByIdFaixaEtaria(parseInt(id))

        if (resultado && resultado.length > 0) {
            return {
                status: true,
                status_code: 200,
                genero: resultado
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
module.exports = {
    inserirFaixa,
    atualizarFaixa,
    excluirFaixa,
    listarFaixas,
    buscarFaixas
}