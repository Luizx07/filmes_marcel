const { PrismaClient } = require('@prisma/client')
//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

// INSERIR PRODUTORA
const insertProdutora = async function (produtora) {
    try {
        let sql = `INSERT INTO tbl_produtora (produtora) VALUES ('${produtora.produtora}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// ATUALIZAR PRODUTORA
const updateProdutora = async function (produtora) {
    try {
        let sql = `UPDATE tbl_produtora SET produtora = '${produtora.produtora}' WHERE id = ${produtora.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// DELETAR PRODUTORA
const deleteProdutora = async function (id) {
    try {
        let sql = `DELETE FROM tbl_produtora WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// SELECIONAR TODAS AS PRODUTORAS
const selectAllProdutora = async function () {
    try {
        let sql = `SELECT * FROM tbl_produtora ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// BUSCAR PRODUTORA PELO ID
const selectByIdProdutora = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_produtora WHERE id = ${id}`

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
    insertProdutora,
    updateProdutora,
    deleteProdutora,
    selectAllProdutora,
    selectByIdProdutora
}