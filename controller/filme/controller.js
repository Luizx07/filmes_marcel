/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: Luiz
 * Versão: 1.0
************************************************************************************/

//Funcão para tratar a inserção de um novo filme no DAO
const message = require('../../modulo/config.js')

const filmeDAO = require('../../model/DAO/filme.js')

const inserirFilme = async function (filme, contentType){
try {
    if( String(contentType).toLowerCase() == 'application/json')
    {
    if (filme.nome                 == '' || filme.nome             == undefined || filme.nome             == null || filme.nome.length             > 80 || 
        filme.duracao              == '' || filme.duracao          == undefined || filme.duracao          == null || filme.duracao.length          > 5  ||
        filme.sinopse              == '' || filme.sinopse          == undefined || filme.sinopse          == null ||
        filme.data_lancamento      == '' || filme.data_lancamento  == undefined || filme.data_lancamento  == null || filme.data_lancamento.length  > 10 || 
        filme.foto_capa.length     > 200 || filme.foto_capa        == undefined ||
        filme.link_trailer.length  > 200 || filme.link_trailer     == undefined
    ){
        return message.ERROR_REQUIRED_FIELDS //400
    }else{
        let resultFilme = await filmeDAO.insertFilme(filme)

        if(resultFilme)
            return message.SUCCESS_CREATED_ITEM //201
        else
        return message.ERROR_INTERNAL_SERVER //500
    }
}else{
    return message.ERROR_CONTENT_TYPE //415
}
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Funcão para tratar a atualização de um novo filme no DAO
const atualizarFilme = async function (id, filme, contentType){
    try {
        if( String(contentType).toLowerCase() == 'application/json')
            {
            if (id                         == '' || id                     == undefined || id                     == null || isNaN(id)  || id              <= 0 ||
                filme.nome                 == '' || filme.nome             == undefined || filme.nome             == null || filme.nome.length             > 80 || 
                filme.duracao              == '' || filme.duracao          == undefined || filme.duracao          == null || filme.duracao.length          > 5  ||
                filme.sinopse              == '' || filme.sinopse          == undefined || filme.sinopse          == null ||
                filme.data_lancamento      == '' || filme.data_lancamento  == undefined || filme.data_lancamento  == null || filme.data_lancamento.length  > 10 || 
                filme.foto_capa.length     > 200 || filme.foto_capa        == undefined ||
                filme.link_trailer.length  > 200 || filme.link_trailer     == undefined
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

                if(resultFilme != false || typeof(resultFilme) == 'object'){
                    if(resultFilme.length > 0){
                        //update
                        filme.id = parseInt(id)

                        let result = await filmeDAO.updateFilme(filme)
                        if(result){
                            return message.SUCCESS_UPDATE_ITEM
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Funcão para tratar a excluir de um novo filme no DAO
const excluirFilme = async function (id){
    try {

        if (id == undefined || id == '' || isNaN(id)) {
          return MESSAGE.ERROR_REQUIRED_FILES // 400 
        }
        if(id){
          let verificar = await filmeDAO.selectByIdFilme(parseInt(id))
          let result = await filmeDAO.deleteFilme(parseInt(id))
          if(verificar != false || typeof(verificar) == 'object'){
              if(verificar.length > 0){
                  if(result){
                      return message.SUCCESS_DELETED_ITEM
                  }else {
                      return message.ERROR_NOT_DELETE
                  }
              }else {
                  return message.ERROR_NOT_DELETE
              }
            }else {
              return message.ERROR_INTERNAL_SERVER_MODEL
            }
          } 
      }catch (error){
          return message.ERROR_INTERNAL_SERVER_CONTROLLER
      }
}

//Funcão para tratar o retorno de filmes do DAO
const listarFilme = async function (){
    try {
        let dadosFilme = {}
        let resultFilme = await filmeDAO.selectAllFilme()

        if(resultFilme != false){
            if(resultFilme.length > 0){

                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.items = resultFilme.length
                dadosFilme.films = resultFilme

                return dadosFilme
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

//Funcão para tratar o retorno de um filme filtrando pelo id do DAO
const buscarFilme = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)|| id <= 0){
            return message.ERROR_REQUIRED_FIELDS // 400
        }else{

            dadosFilme = {}
            
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

            if (resultFilme != false || typeof(resultFilme) == 'object'){
                if(resultFilme.length > 0){
                        dadosFilme.status = true
                        dadosFilme.status_code = 200
                        dadosFilme.filme = resultFilme
    
                        return dadosFilme

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
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}