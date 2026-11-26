import { useState } from 'react';

export function ContadorGuiado() {
  // O useState sempre retorna um array com dois itens: [valorAtual, funcaoAtualizadora]
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador((prev) => prev + 1);
  };

  const decrementar = () => {
    setContador((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const zerar = () => {
    setContador(0);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full mb-2">
            Parte 1 – Exercício Guiado
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Contador de Re-renderização
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Cada clique dispara a função atualizadora do <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">useState</code>, provocando uma nova renderização do componente.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 self-start sm:self-center">
          <button
            type="button"
            onClick={decrementar}
            className="w-10 h-10 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 active:scale-95 transition"
            aria-label="Diminuir"
          >
            -
          </button>

          <span className="w-12 text-center text-2xl font-extrabold text-indigo-600 tabular-nums">
            {contador}
          </span>

          <button
            type="button"
            onClick={incrementar}
            className="w-10 h-10 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 active:scale-95 transition"
            aria-label="Aumentar"
          >
            +
          </button>

          <button
            type="button"
            onClick={zerar}
            className="ml-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition"
          >
            Zerar
          </button>
        </div>
      </div>
    </section>
  );
}
