//import da biblioteca prisma/client
const { PrismaClient } = require('@prisma/client')
//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertGenero = async function (generos) {

    try {

        let sql = `insert into tbl_genero (generos) values('${generos.genero}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }
}
// ATUALIZAR GÊNERO
const updateGenero = async function (genero) {
    try {
        let sql = `update tbl_genero set  generos = '${genero.genero}' 
                                            where id = ${genero.id}`

        let resultGenero = await prisma.$executeRawUnsafe(sql)

        if (resultGenero)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


// DELETAR GÊNERO
const deleteGenero = async function (id) {

    try {
        let sql = `DELETE FROM tbl_genero WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// SELECIONAR TODOS OS GÊNEROS
const selectAllGenero = async function () {

    try {

        let sql = 'select * from tbl_genero order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// BUSCAR GÊNERO PELO ID
const selectByIdGenero = async function (id) {

    try {

        let sql = `SELECT * FROM tbl_genero WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}