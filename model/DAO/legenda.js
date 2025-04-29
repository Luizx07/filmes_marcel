const { PrismaClient } = require('@prisma/client')
//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()


// INSERIR LEGENDA
const insertLegenda = async function (legenda) {
    try {
        let sql = `INSERT INTO tbl_legenda (legendas_idioma) VALUES ('${legenda.legendas_idioma}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// ATUALIZAR LEGENDA
const updateLegenda = async function (legenda) {
    try {
        let sql = `UPDATE tbl_legenda SET legendas_idioma = '${legenda.legendas_idioma}' WHERE id = ${legenda.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// DELETAR LEGENDA
const deleteLegenda = async function (id) {
    try {
        let sql = `DELETE FROM tbl_legenda WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// SELECIONAR TODAS AS LEGENDAS
const selectAllLegenda = async function () {

    try {

        let sql = 'select * from tbl_legenda order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// BUSCAR LEGENDA PELO ID
const selectByIdLegenda = async function (id) {

    try {

        let sql = `SELECT * FROM tbl_legenda WHERE id = ${id}`

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
    insertLegenda,
    updateLegenda,
    deleteLegenda,
    selectAllLegenda,
    selectByIdLegenda
}