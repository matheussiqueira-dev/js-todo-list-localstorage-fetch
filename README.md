# Todo List Modular (LocalStorage + Fetch)

Aplicacao web de lista de tarefas desenvolvida com JavaScript modular, foco em organizacao de codigo, experiencia de uso simples e persistencia local de dados.

## Visao Geral

Este projeto implementa uma Todo List com:

- gerenciamento completo de tarefas (criar, editar, concluir e remover);
- persistencia em `localStorage`;
- validacao e saneamento de dados armazenados;
- camada de API com `fetch` pronta para integracao com backend.

## Funcionalidades

- Adicao de novas tarefas com validacao de entrada.
- Edicao inline do titulo da tarefa.
- Alteracao de status entre pendente e concluida.
- Remocao de tarefas.
- Exibicao de mensagens de erro e estados vazios.
- Interface responsiva para desktop e mobile.

## Tecnologias

- `HTML5`
- `CSS3`
- `JavaScript (ES Modules)`
- Web APIs: `localStorage`, `crypto.randomUUID`, `fetch`

## Estrutura do Projeto

```text
src/
  index.html
  css/
    styles.css
  js/
    main.js      # inicializacao e fluxo principal da UI
    tasks.js     # estado central e regras de negocio
    storage.js   # persistencia local e validacao de dados
    dom.js       # renderizacao e manipulacao de elementos
    events.js    # bindings de eventos da interface
    api.js       # cliente HTTP para /api/tasks
```

## Como Executar

Como o projeto usa modulos ES, execute em um servidor local (nao abra via `file://`).

### Opcao 1: VS Code + Live Server

1. Abra a pasta do projeto no VS Code.
2. Execute o `index.html` com a extensao Live Server.

### Opcao 2: Node.js

```bash
npx serve src
```

Acesse: `http://localhost:3000`

### Opcao 3: Python

```bash
cd src
python -m http.server 5500
```

Acesse: `http://localhost:5500`

## API (Preparada para Integracao)

O arquivo `src/js/api.js` disponibiliza operacoes REST para:

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Isso facilita evoluir de persistencia local para persistencia remota quando houver backend.

## Autor

**Matheus Siqueira**
