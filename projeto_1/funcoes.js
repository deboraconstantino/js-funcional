const fs = require('fs')
const path = require('path')

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            let arquivos = fs.readdirSync(caminho)
            arquivos = arquivos.map(arquivo => path.join(caminho, arquivo))
            resolve(arquivos)
        } catch (e) {
            reject(e)
        }
    })
}

function lerArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(arquivo, {encoding: 'utf-8'})
            resolve(conteudo.toString())
        } catch (e) {
            reject(e)
        }
    })
}

function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

function elementosTerminadosCom(array, padrao) {
    return array.filter(el => el.endsWith(padrao))
}

function removerSeVazio(array) {
    return array.filter(el => el.trim())
}

function removerSeIncluir(padrao) {
    return function(array) {
        return array.filter(el => !el.includes(padrao))
    }
}

function removerSeApenasNumero(array) {
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num // dá certo quando o num não é convertido, obtendo o valor NaN
    })
}

function removerSimbolos(simbolos) {
    return function (array) {
        return array.map(el => {
            return simbolos.reduce((acc, simbolo) => {
                return acc.split(simbolo).join('')
            }, el)
        })
    }
}

function agruparElementos(palavras) {
    return Object.values(palavras.reduce((acc, palavra) => {
        const el = palavra.toLowerCase()
        const qtde = acc[el] ? acc[el].qtde + 1 : 1
        acc[el] = { elemento: el, qtde }
        return acc
    }, {}))
}

function ordenarPorAtributoNumerico(atributo, ordem = 'asc') {
    return function(array) {
        const asc = (o1, o2) => o1[atributo] - o2[atributo]
        const desc = (o1, o2) => o2[atributo] - o1[atributo]
        return array.sort(ordem === 'asc' ? asc : desc)
    }
}

module.exports = {
    lerDiretorio,
    elementosTerminadosCom,
    lerArquivos,
    removerSeVazio,
    removerSeIncluir,
    removerSeApenasNumero,
    removerSimbolos,
    agruparElementos,
    ordenarPorAtributoNumerico
}