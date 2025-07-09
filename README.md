# Desenvolvimento Front-End II

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Rotas e Navegação](#rotas-e-navegação)
- [Contexto de Autenticação](#contexto-de-autenticação)
- [Componentes Principais](#componentes-principais)
- [Páginas](#páginas)
- [Serviços (API)](#serviços-api)
- [Estilização](#estilização)
- [Mock de API (MSW)](#mock-de-api-msw)
- [Factories e Testes](#factories-e-testes)

---

## Visão Geral

Este projeto é a aplicação Front-End desenvolvida na disciplina **Desenvolvimento Front-End II** (4º semestre do CSTSI), ministrada pela Prof.ª Gill Velleda Gonzales. Trata-se de uma SPA em **React** (via **Vite**), que consome uma API REST para demonstrar funcionalidades de autenticação, navegação protegida, exibição de dashboards com gráficos e operações de CRUD.

---

## Funcionalidades

- Autenticação de usuários (login e cadastro) com fluxo protegido de rotas.
- Dashboard de visualização de dados usando **Chart.js** (via **react-chartjs-2**).
- Consumo de API REST com **axios**.
- Mock de API em desenvolvimento com **MSW**.
- Componentização com React Hooks e Context API.
- Testes unitários e de integração com **Vitest** e **jsdom**.
- Linter configurado com **ESLint**.

---

## Tecnologias

- **JavaScript** (ES6+)
- **React 19**
- **Vite**
- **React Router DOM** v7
- **Axios**
- **React Bootstrap** & **Bootstrap Icons**
- **React Icons**
- **Chart.js** & **react-chartjs-2**
- **MSW** & **@mswjs/data**
- **Vitest**
- **ESLint**

---

## Requisitos

- Node.js >= 18
- npm >= 8

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Vicenzo-Az/cstsi_2025-01_dfe2.git
   cd cstsi_2025-01_dfe2
   ```

2. Instale dependências:

   ```bash
   npm install
   ```

3. Configure variáveis de ambiente (veja próxima seção).
4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra `http://localhost:3000` no navegador.

---

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz com (exemplo):

```env
VITE_API_URL=http://localhost:8000/api/v1/
```

- `VITE_API_URL`: URL base da API que será consumida.

---

## Scripts Disponíveis

| **Comando**        | **Descrição**                             |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Inicia o servidor Vite (desenvolvimento). |
| `npm run build`    | Gera bundle otimizado para produção.      |
| `npm run preview`  | Serve o build de produção localmente.     |
| `npm test`         | Executa testes com Vitest.                |
| `npm run coverage` | Gera relatório de cobertura.              |

---

## Estrutura do Projeto

```text
├── public/                # Arquivos estáticos (index.html, favicon, assets)
├── src/                   # Código-fonte
│   ├── api/               # Configuração de axios e endpoints
│   ├── components/        # Componentes genéricos (e.g. ProtectedRoute)
│   ├── context/           # Context API (AuthContext)
│   ├── pages/             # Páginas da aplicação
│   │   ├── HomePage/
│   │   ├── LoginPage/
│   │   ├── SignupPage/
│   │   └── DashboardPage/
│   ├── setupTests.js      # Configuração Vitest/jsdom
│   ├── App.jsx            # Componente raiz com rotas
│   ├── main.jsx           # Ponto de entrada React
│   └── App.css            # Estilos globais
├── .eslintrc.js           # Configuração ESLint
├── vite.config.js         # Configuração Vite
├── package.json
└── README.md              # (Este arquivo)
```

---

## Rotas e Navegação

A aplicação utiliza **React Router DOM** para definir rotas:

- `/` — **HomePage** (pública)
- `/login` — **LoginPage** (pública)
- `/signup` — **SignupPage** (pública)
- `/dashboard` — **DashboardPage** (protegida)

A **ProtectedRoute** envolve componentes que exigem autenticação.

---

## Contexto de Autenticação

O `AuthContext` gerencia estado de autenticação:

- **login:** armazena token e dados do usuário no `localStorage`.
- **logout:** limpa contexto e `localStorage`.
- **checkAuth:** verifica token válido ao carregar a aplicação.

Use o hook `useAuth()` para acessar `user`, `login`, `logout`, `token`.

---

## Componentes Principais

- **ProtectedRoute:** redireciona para `/login` se não autenticado.
- **Navbar:** barra superior com links de navegação.
- **Chart:** wrapper para gráficos em **DashboardPage**.

---

## Páginas

- **HomePage:** landing page com informações gerais.
- **LoginPage:** formulário de login.
- **SignupPage:** formulário de registro.
- **DashboardPage:** mostra gráficos e estatísticas consumindo API.

---

## Serviços (API)

Em `src/api/axios.js`, instância do **axios** configurada com `baseURL` e interceptors para anexar token JWT.

Endpoints principais:

- `POST /auth/login/` — autenticação (retorna token).
- `POST /auth/signup/` — cadastro de usuário.
- `GET /dashboard/data/` — dados para gráficos.

---

## Estilização

- **CSS Modules** em cada componente/página (e.g. `HomePage.module.css`).
- Estilos globais em `App.css`.
- **React Bootstrap** para componentes prontos.

---

## Mock de API (MSW)

Durante o desenvolvimento, **MSW** intercepta chamadas e retorna dados fictícios:

- Handlers definidos em `src/mocks/handlers.js`.
- Data layer com `@mswjs/data` para gerar dados dinâmicos.
- Inicia **MSW** em `src/setupTests.js` (apenas em desenvolvimento).

---

## Factories e Testes

As factories usam **@mswjs/data** para criar instâncias de dados no mock:

- Localizadas em `src/mocks/server.js` e `src/mocks/data.js`.

Para rodar testes:

```bash
npm test
```

O ambiente de testes usa **jsdom** e o setup em `setupTests.js`.
