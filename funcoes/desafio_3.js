// Implementar a leitura de um arquivo dentro de uma promise.
// A promise deve receber o path para a leitura do arquivo.

// MINHA RESPOSTA
const fs = require('fs')
const path = require('path')

const caminho = path.join(__dirname, 'dados.txt')

function lerArquivo(caminho) {
    fs.readFile(caminho, exibirConteudo)
}

function exibirConteudo(_, conteudo) {
    console.log(conteudo.toString())
}

function myPromise(caminho) {
    return new Promise(resolve => {
        const arquivo = lerArquivo(caminho)
        resolve(arquivo)
    })
}

myPromise(caminho).then(res => res);

// RESPOSTA DO CURSO
const fs = require('fs')
const path = require('path')

function lerArquivo(caminho) {
    return new Promise(resolve => {
        fs.readFile(caminho, function(_, conteudo) {
            resolve(conteudo.toString())
        })
    })
}

const caminho = path.join(__dirname, 'dados.txt')

lerArquivo(caminho)
    .then(conteudo => conteudo.split('\n'))
    .then(linhas => linhas.join(','))
    .then(conteudo => `O valor final é: ${conteudo}`)
    .then(console.log)