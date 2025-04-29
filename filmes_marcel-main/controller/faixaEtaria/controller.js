const message = require('../../modulo/config.js')
const generoDAO = require('../../model/DAO/faixa_etaria.js')


const inserirFaixa = async function (genero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (!faixa.faixa_etaria || faixa.faixa_etaria == '' || faixa.faixa_etaria.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultFaixa = await generoDAO.insertGenero(faixa)

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

const atualizarGenero = async function (id, genero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || isNaN(id) || genero.genero == '' || genero.genero.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))
                if (resultGenero && resultGenero.length > 0) {
                    genero.id = parseInt(id)
                    let result = await generoDAO.updateGenero(genero)
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

const excluirGenero = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let verificar = await generoDAO.selectByIdGenero(parseInt(id))
            let result = await generoDAO.deleteGenero(parseInt(id))
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

const listarGeneros = async function () {
    try {
        let generos = {}
        let resultGenero = await generoDAO.selectAllGenero()

        if (resultGenero != false) {
            if (resultGenero.length > 0) {

                generos.status = true
                generos.status_code = 200
                generos.items = resultGenero.length
                generos.genero = resultGenero

                return generos
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

const buscarGenero = async function (id) {
    try {
        if (id == undefined || id == '' || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        }

        let resultado = await generoDAO.selectByIdGenero(parseInt(id))

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
    atualizarGenero,
    excluirGenero,
    listarGeneros,
    buscarGenero
}