import { useState } from 'react';
import { ShoppingCart, Plus, Trash2, Check, AlertCircle, CheckCircle2 } from 'lucide-react';

const PRODUTOS_DISPONIVEIS = [
  {
    id: 1,
    nome: 'Teclado Mecânico RGB',
    descricao: 'Switches táteis silenciosos, layout ABNT2',
    preco: 289.90,
  },
  {
    id: 2,
    nome: 'Mouse Gamer Sem Fio',
    descricao: 'Sensor óptico 16.000 DPI, bateria de 70h',
    preco: 179.50,
  },
  {
    id: 3,
    nome: 'Headset Surround 7.1',
    descricao: 'Microfone com cancelamento de ruído',
    preco: 249.00,
  },
  {
    id: 4,
    nome: 'Mousepad Extra Grande',
    descricao: '90x40cm, base emborrachada antiderrapante',
    preco: 69.90,
  },
];

export function CarrinhoCompras() {
  // Estado do carrinho (lista de itens)
  const [carrinho, setCarrinho] = useState([]);

  // Estado para controlar feedback visual do botão ("Adicionado!") por ID do produto
  const [feedbackBotaoId, setFeedbackBotaoId] = useState(null);

  // Estados da Parte 3: Formulário de Checkout e Validação
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [erroNome, setErroNome] = useState('');
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  // Parte 2: Adicionar item ao carrinho usando o spread operator (...)
  const adicionarAoCarrinho = (produto) => {
    const novoItem = {
      ...produto,
      uid: `${produto.id}-${Date.now()}-${Math.random()}`, // Identificador único para permitir remover individualmente
    };

    // Nunca mutamos diretamente (ex: carrinho.push). Criamos um novo array com [...carrinho, novoItem]
    setCarrinho([...carrinho, novoItem]);
    setPedidoFinalizado(false);

    // Feedback visual temporário no botão
    setFeedbackBotaoId(produto.id);
    setTimeout(() => {
      setFeedbackBotaoId((atual) => (atual === produto.id ? null : atual));
    }, 900);
  };

  // Parte 2: Remover item do carrinho mantendo imutabilidade
  const removerDoCarrinho = (uidParaRemover) => {
    const carrinhoAtualizado = [...carrinho].filter((item) => item.uid !== uidParaRemover);
    setCarrinho(carrinhoAtualizado);
  };

  // Cálculo do valor total
  const valorTotal = carrinho.reduce((acumulador, item) => acumulador + item.preco, 0);

  // Formatação monetária em Real (BRL)
  const formatarMoeda = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Parte 3: Submissão e validação simples do formulário de checkout
  const handleFinalizarCompra = (e) => {
    e.preventDefault();

    if (!nomeCliente.trim()) {
      setErroNome('O campo de nome é obrigatório para finalizar o pedido.');
      return;
    }

    setErroNome('');
    setPedidoFinalizado(true);
    setCarrinho([]);
    setNomeCliente('');
    setEmailCliente('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Coluna da Esquerda: Catálogo de Produtos (Parte 2) */}
      <section className="lg:col-span-7 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full mb-2">
            Parte 2 – Mini Projeto
          </span>
          <h2 className="text-xl font-bold text-slate-800">Catálogo de Produtos</h2>
          <p className="text-sm text-slate-500 mt-1">
            Adicione itens ao carrinho para observar a atualização imutável do estado e o feedback visual.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {PRODUTOS_DISPONIVEIS.map((produto) => {
              const foiAdicionado = feedbackBotaoId === produto.id;

              return (
                <div
                  key={produto.id}
                  className="flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">{produto.nome}</h3>
                    <p className="text-xs text-slate-500 mt-1">{produto.descricao}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-slate-900">
                      {formatarMoeda(produto.preco)}
                    </span>

                    <button
                      type="button"
                      onClick={() => adicionarAoCarrinho(produto)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 active:scale-95 ${
                        foiAdicionado
                          ? 'bg-emerald-600 shadow-sm shadow-emerald-200'
                          : 'bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      {foiAdicionado ? (
                        <>
                          <Check className="w-4 h-4" />
                          Adicionado!
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Adicionar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coluna da Direita: Resumo do Carrinho (Parte 2) + Checkout (Parte 3) */}
      <aside className="lg:col-span-5 space-y-6">
        {/* Resumo do Carrinho */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800">Seu Carrinho</h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'}
            </span>
          </div>

          {carrinho.length === 0 ? (
            <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-sm text-slate-500">Seu carrinho está vazio.</p>
              <p className="text-xs text-slate-400 mt-1">
                Clique em &quot;Adicionar&quot; nos produtos ao lado.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
              {carrinho.map((item) => (
                <li key={item.uid} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.nome}</p>
                    <p className="text-xs font-semibold text-slate-500">
                      {formatarMoeda(item.preco)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerDoCarrinho(item.uid)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Remover item"
                    aria-label={`Remover ${item.nome}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Valor Total</span>
            <span className="text-xl font-extrabold text-slate-900">
              {formatarMoeda(valorTotal)}
            </span>
          </div>
        </section>

        {/* Parte 3: Formulário de Checkout com Validação */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 rounded-full mb-2">
            Parte 3 – Desafio (Checkout)
          </span>
          <h2 className="text-lg font-bold text-slate-800">Finalizar Pedido</h2>
          <p className="text-xs text-slate-500 mt-1">
            Tente enviar com o campo de nome vazio para testar a validação visual com Tailwind.
          </p>

          {pedidoFinalizado && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-800 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Pedido realizado com sucesso!</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Obrigado pela sua compra. O carrinho foi limpo.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleFinalizarCompra} className="mt-4 space-y-4" noValidate>
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-1">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                id="nome"
                type="text"
                value={nomeCliente}
                onChange={(e) => {
                  setNomeCliente(e.target.value);
                  if (erroNome) setErroNome('');
                }}
                placeholder="Digite seu nome completo"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                  erroNome
                    ? 'border-red-500 bg-red-50/40 text-red-900 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {erroNome && (
                <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {erroNome}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                E-mail (opcional)
              </label>
              <input
                id="email"
                type="email"
                value={emailCliente}
                onChange={(e) => setEmailCliente(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <button
              type="submit"
              disabled={carrinho.length === 0}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition active:scale-[0.99]"
            >
              {carrinho.length === 0 ? 'Adicione itens para finalizar' : 'Confirmar Checkout'}
            </button>
          </form>
        </section>
      </aside>
    </div>
  );
}
