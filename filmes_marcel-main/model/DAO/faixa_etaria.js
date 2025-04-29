//import da biblioteca prisma/client
const { PrismaClient } = require('@prisma/client')
//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()


// INSERIR FAIXA ETÁRIA
const insertFaixaEtaria = async function(faixa) {
    try {
        let sql = `INSERT INTO tbl_faixa_etaria (faixa_etaria) VALUES ('${faixa.faixa_etaria}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// ATUALIZAR FAIXA ETÁRIA
const updateFaixaEtaria = async function(faixa) {
    try {
        let sql = `UPDATE tbl_faixa_etaria SET faixa_etaria = '${faixa.faixa_etaria}' WHERE id = ${faixa.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// DELETAR FAIXA ETÁRIA
const deleteFaixaEtaria = async function(id) {
    try {
        let sql = `DELETE FROM tbl_faixa_etaria WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// SELECIONAR TODAS AS FAIXAS ETÁRIAS
const selectAllFaixaEtaria = async function() {
    try {
        let sql = `SELECT * FROM tbl_faixa_etaria ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// BUSCAR FAIXA ETÁRIA PELO ID
const selectByIdFaixaEtaria = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_faixa_etaria WHERE id = ${id}`

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
    insertFaixaEtaria,
    updateFaixaEtaria,
    deleteFaixaEtaria,
    selectAllFaixaEtaria,
    selectByIdFaixaEtaria
}