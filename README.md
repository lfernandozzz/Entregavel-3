# Aplicação Interativa com Estado: Contador, Carrinho de Compras e Checkout

Projeto desenvolvido em **React** com **Tailwind CSS** para praticar o gerenciamento de estado (`useState`), imutabilidade de dados, manipulação de eventos e validação visual de formulários.

---

## 📋 Funcionalidades Implementadas

- **Parte 1 – Manipulação e Validação de Dados (Exercício Guiado):**
  - Componente `ContadorGuiado` utilizando `useState` para demonstrar o ciclo de atualização de estado e re-renderização do React com ações de incrementar, decrementar e zerar.
- **Parte 2 – Mini Projeto (Carrinho de Compras):**
  - Catálogo de produtos com adição de itens usando o *spread operator* (`[...carrinho, novoItem]`).
  - Remoção de itens sem mutar o estado original.
  - Cálculo dinâmico do valor total com `reduce`.
  - Feedback visual imediato no botão (`Adicionado!`) ao incluir um item no carrinho.
- **Parte 3 – Tarefa de Casa (Desafio de Checkout):**
  - Formulário de finalização de compra com validação no evento `onSubmit`.
  - Caso o campo de **Nome Completo** esteja vazio, aplica borda vermelha (`border-red-500`) e exibe uma mensagem de erro clara usando classes do Tailwind CSS.

---

## 🤔 Parte 4 – Reflexão (Para Pensar)

> **Pergunta:** *Por que não devemos mutar o estado diretamente (ex: `carrinho.push(item)`) e qual a importância do spread operator (`[...carrinho, item]`) no React?*

**Resposta:**

1. **Detecção de mudanças por referência (Shallow Comparison):**
   O React determina se um componente precisa ser re-renderizado comparando a **referência de memória** do estado anterior com a do novo estado (`Object.is`). Quando usamos métodos que mutam o array diretamente, como `carrinho.push(item)`, o conteúdo interno da lista muda, mas a referência de memória do array permanece exatamente a mesma. Como resultado, o React acredita que nada mudou e **não dispara uma nova renderização** da interface, deixando a tela dessincronizada dos dados.

2. **Previsibilidade e histórico de estados:**
   A imutabilidade garante que estados anteriores não sejam alterados acidentalmente por efeitos colaterais, facilitando a depuração, o uso do *React Strict Mode*, recursos concorrentes do React e funcionalidades como desfazer/refazer ações.

3. **A importância do Spread Operator (`[...carrinho, item]`):**
   O *spread operator* cria uma **nova cópia rasa (novo array na memória)** contendo todos os elementos do array anterior seguidos pelo novo item. Ao passar esse novo array para a função atualizadora (`setCarrinho([...carrinho, item])`), o React identifica imediatamente que a referência mudou, agenda a re-renderização do componente de forma segura e atualiza a interface (como a lista de itens e o valor total do carrinho).

---

## 🚀 Como Executar o Projeto Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse no navegador:**
   Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## 📦 Como Subir para o GitHub (Entrega)

```bash
git init
git add .
git commit -m "feat: implementa contador, carrinho de compras e checkout validado"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```
