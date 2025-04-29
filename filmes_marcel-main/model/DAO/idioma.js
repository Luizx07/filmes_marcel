const { PrismaClient } = require('@prisma/client')
//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

// INSERIR IDIOMA
const insertIdioma = async function (idioma) {
    try {
        let sql = `INSERT INTO tbl_idioma (idioma) VALUES ('${idioma.idioma}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// ATUALIZAR IDIOMA
const updateIdioma = async function (idioma) {
    try {
        let sql = `UPDATE tbl_idioma SET idioma = '${idioma.idioma}' WHERE id = ${idioma.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// DELETAR IDIOMA
const deleteIdioma = async function (id) {
    try {
        let sql = `DELETE FROM tbl_idioma WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// SELECIONAR TODOS OS IDIOMAS
const selectAllIdioma = async function () {
    try {
        let sql = `SELECT * FROM tbl_idioma ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// BUSCAR IDIOMA PELO ID
const selectByIdIdioma = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_idioma WHERE id = ${id}`

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
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}