// Inicializa o carrinho como um array vazio
let carrinho = [];
let total = 0;
// Função para calcular o total do carrinho
const atualizarTotal = () => {
  total = carrinho.reduce((acc, { preco, quantidade }) => acc + preco * quantidade, 0);
};
// Função para exibir os itens do carrinho na página
const renderizarCarrinho = () => {
  const itensCarrinho = document.getElementById('itens-carrinho');
  itensCarrinho.innerHTML = carrinho.map(({ nome, preco, quantidade, imagem }) => `
    <li>
      <img src="${imagem}" alt="${nome}" style="width:50px;">
      ${nome} - R$ ${preco.toFixed(2)} x ${quantidade} 
      <button onclick="ajustarQuantidade('${nome}', 1)">+</button> 
      <button onclick="ajustarQuantidade('${nome}', -1)">-</button> 
      <button onclick="removerDoCarrinho('${nome}')">Remover</button>
    </li>
  `).join('');
  document.getElementById('preco-total').textContent = total.toFixed(2);
};
// Função para adicionar um produto ao carrinho
const adicionarAoCarrinho = (nomeProduto, preco, urlImagem) => {
  const produto = carrinho.find(item => item.nome === nomeProduto);
  if (produto) {
    produto.quantidade++;
  } else {
    carrinho.push({ nome: nomeProduto, preco, quantidade: 1, imagem: urlImagem });
  }
  atualizarTotal();
  renderizarCarrinho();
  
  // Rola a página suavemente até o carrinho
  document.getElementById('carrinho')?.scrollIntoView({ behavior: 'smooth' });
};
// Função para remover um produto do carrinho
const removerDoCarrinho = (nomeProduto) => {
  carrinho = carrinho.filter(item => item.nome !== nomeProduto);
  atualizarTotal();
  renderizarCarrinho();
};
// Função para ajustar a quantidade de um produto no carrinho
const ajustarQuantidade = (nomeProduto, mudanca) => {
  const produto = carrinho.find(item => item.nome === nomeProduto);
  if (produto) {
    produto.quantidade += mudanca;
    if (produto.quantidade <= 0) removerDoCarrinho(nomeProduto);
    else {
      atualizarTotal();
      renderizarCarrinho();
    }
  }
};
// Função para finalizar a compra
const finalizarCompra = () => {
  if (!carrinho.length) {
    alert('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
    return;
  }
  carrinho = [];
  atualizarTotal();
  renderizarCarrinho();
  window.location.href = 'pagamento.html';
};