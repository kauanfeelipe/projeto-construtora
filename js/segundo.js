const byId = (id) => document.getElementById(id); // Seleciona um elemento pelo ID
const alertaSucesso = (msg) => alert(msg); // Exibe um alerta com uma mensagem de sucesso

// Função para mostrar/ocultar seções conforme o método de pagamento
document.querySelectorAll('input[name="metodo-pagamento"]').forEach(el => 
  el.addEventListener('change', () => {
    const secao = el.value === 'pix' ? 'secao-pix' : 'secao-boleto';
    byId('secao-pix').style.display = secao === 'secao-pix' ? 'block' : 'none';
    byId('secao-boleto').style.display = secao === 'secao-boleto' ? 'block' : 'none';
  })
);

// Ações para os botões
byId('confirmar-pix').onclick = () => alertaSucesso('Simulação de pagamento via PIX realizado com sucesso!');
byId('gerar-boleto').onclick = () => alertaSucesso('Simulação de pagamento via boleto realizado com sucesso.');
byId('copiar-boleto').onclick = () => {
  navigator.clipboard.writeText(byId('codigo-boleto').textContent)
    .then(() => alertaSucesso('Código do boleto copiado com sucesso!'))
    .catch((erro) => alert('Falha ao copiar o código: ' + erro));
};