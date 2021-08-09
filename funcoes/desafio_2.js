const carrinho = [
    { nome: 'Caneta', qtde: 10, preco: 7.99, fragil: true },
    { nome: 'Impressora', qtde: 1, preco: 649.50, fragil: true },
    { nome: 'Caderno', qtde: 4, preco: 27.10, fragil: false },
    { nome: 'Lapis', qtde: 3, preco: 5.82, fragil: false },
    { nome: 'Tesoura', qtde: 1, preco: 19.20, fragil: true },
]

// Utilizar filter, map e/ou reduce para retornar a média do total de todos os produtos frágeis.
// Fragil = fragil: true
// Total = qtde * preco
// Media = qtde * preco / qtde produtos

const mediaInicial = { count: 0, total: 0, media: 0 }
const isFragil = item => item.fragil;
const getTotal = item => item.qtde * item.preco;
const getMedia = (acc, el) => {
    const count = acc.count + 1;
    const total = acc.total + el;
    const media = total / count;
    return {
        count: count,
        total: total,
        media: media
    }
}

const result = carrinho.filter(isFragil)
.map(getTotal)
.reduce(getMedia, mediaInicial);

console.log("Média: " + result.media);