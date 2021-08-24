const path = require('path')
const fn = require('./funcoes')

const simbolos = [
    '.', '?', '-', ',', '"', '♪',
    '_', '<i>', '</i>', '\r', '[', ']',
    '(', ')'
]

const caminho = path.join(__dirname, '..', 'dados', 'legendas')

fn.lerDiretorio(caminho)
    .then(arquivos => fn.elementosTerminadosCom(arquivos, '.srt'))
    .then(arquivosSRT => fn.lerArquivos(arquivosSRT))
    .then(conteudos => conteudos.join(' '))
    .then(todoConteudo => todoConteudo.split('\n'))
    .then(fn.removerSeVazio)
    .then(linhas => fn.removerSeIncluir('-->')(linhas))
    .then(fn.removerSeApenasNumero)
    .then(fn.removerSimbolos(simbolos))
    .then(conteudos => conteudos.join(' '))
    .then(linhas => linhas.split(' '))
    .then(fn.removerSeVazio)
    .then(fn.removerSeApenasNumero)
    .then(fn.agruparElementos)
    .then(fn.ordenarPorAtributoNumerico('qtde', 'desc'))
    .then(console.log);