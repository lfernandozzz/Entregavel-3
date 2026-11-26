import { ContadorGuiado } from './components/ContadorGuiado';
import { CarrinhoCompras } from './components/CarrinhoCompras';

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              React State &amp; Imutabilidade
            </h1>
            <p className="text-sm text-slate-500">
              Atividade Prática: Contador Guiado, Carrinho de Compras e Checkout Validado
            </p>
          </div>
          <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 self-start sm:self-center">
            React + Tailwind CSS
          </span>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Parte 1 */}
        <ContadorGuiado />

        {/* Partes 2 e 3 */}
        <CarrinhoCompras />
      </main>

      {/* Rodapé */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        Desenvolvido para a entrega da atividade de gerenciamento de estado no React.
      </footer>
    </div>
  );
}

export default App;
