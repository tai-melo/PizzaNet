document.getElementById("myFrame").onload = function () { carregar() };

const calculationTaxa = Math.floor(Math.random() * 40).toFixed(0)

function carregar() {
  const taxa = document.getElementById('taxaLoader')
  taxa.innerText = `R$ ${calculationTaxa},00`
}

const divCardapio = document.getElementById('divCardapio')
const divCarrinho = document.getElementById('divCarrinho')
const iconCardapio = document.getElementById('iconCardapio')
const iconCarrinho = document.getElementById('iconCarrinho')

const divPedidos = document.getElementById('pedidos')

const carrinho = document.getElementById('carrinho').addEventListener('click', () => {
  divCardapio.style.display = 'none'
  divCarrinho.style.display = 'flex'
  iconCardapio.style.color = '#000'
  iconCarrinho.style.color = '#FF0B0B'

})

const cardapio = document.getElementById('cardapio').addEventListener('click', () => {
  divCarrinho.style.display = 'none'
  divCardapio.style.display = 'flex'
  iconCarrinho.style.color = '#000'
  iconCardapio.style.color = '#FF0B0B'
})

let valorTotal = []

const total = document.getElementById('total')

const add = document.querySelectorAll('.addPedido').forEach((element) => {
  element.addEventListener('click', () => {

    element.innerText = '✓'

    setTimeout(() => {
      element.innerText = 'Fazer pedido'
    }, 2000);

    valorTotal.push(element.dataset)

    let money = valorTotal.reduce((accum, element) => { return accum = Number(accum) + Number(element.value) }, calculationTaxa)
    total.innerText = `R$ ${(money).toFixed(2)}`

    const pai = document.createElement('div')

    pai.id = 'divPaiPedidos'

    const pedido = document.createElement('p')
    const preco = document.createElement('p')

    pedido.innerText = `${element.name}`
    preco.innerText = `R$ ${element.value}`

    pai.append(pedido, preco)

    divPedidos.appendChild(pai)

    document.getElementById('esvaziar').addEventListener('click', () => {
      total.innerText = ''

      pedido.innerText = ``
      preco.innerText = ``

      money = ''
      valorTotal = []

      pai.remove(pedido, preco)

    })

  })
})


