//import da biblioteca prisma/client
const { PrismaClient } = require('@prisma/client')
//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()


// INSERIR NACIONALIDADE
const insertNacionalidade = async function(nacionalidade) {
    try {
        let sql = `INSERT INTO tbl_nacionalidade (nacionalidade) VALUES ('${nacionalidade.nacionalidade}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// ATUALIZAR NACIONALIDADE
const updateNacionalidade = async function(nacionalidade) {
    try {
        let sql = `UPDATE tbl_nacionalidade SET nacionalidade = '${nacionalidade.nacionalidade}' WHERE id = ${nacionalidade.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// DELETAR NACIONALIDADE
const deleteNacionalidade = async function(id) {
    try {
        let sql = `DELETE FROM tbl_nacionalidade WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// SELECIONAR TODAS AS NACIONALIDADES
const selectAllNacionalidade = async function() {
    try {
        let sql = `SELECT * FROM tbl_nacionalidade ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// BUSCAR NACIONALIDADE PELO ID
const selectByIdNacionalidade = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_nacionalidade WHERE id = ${id}`

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
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
}