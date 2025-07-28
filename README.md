# CoffeeBase Analytics - Plataforma de Análise de Dados

Uma plataforma moderna para PMEs analisarem dados de vendas e gerarem insights poderosos.

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool rápido e otimizado
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento do lado cliente
- **Axios** - Cliente HTTP para APIs
- **Lucide React** - Ícones modernos
- **Chart.js** - Gráficos e visualizações

## 📦 Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd plataforma-analise-dados
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```text
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface
│   ├── layout/         # Componentes de layout
│   └── route-guards.jsx # Proteção de rotas
├── pages/              # Páginas da aplicação
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── DataSourcePage.jsx
│   └── ProfilePage.jsx
├── context/            # Contextos React
│   └── AuthContext.jsx
├── services/           # Serviços e APIs
│   └── api.js
├── App.jsx            # Componente principal
├── main.jsx          # Ponto de entrada
└── main.css         # Estilos globais
```

## 🔐 Autenticação

O sistema de autenticação inclui:

- Login/Logout com JWT
- Refresh token automático
- Proteção de rotas
- Gerenciamento de estado global

### Fluxo de Autenticação

1. **Login**: POST `/auth/token/` com credenciais
2. **Token**: Armazenado no localStorage
3. **Refresh**: Renovação automática quando expira
4. **Logout**: Limpeza de tokens e redirecionamento

## 📱 Páginas Principais

### HomePage (`/home`)

- Landing page pública
- Apresentação da plataforma
- Links para login/cadastro

### LoginPage (`/login`)

- Formulário de autenticação
- Validação de credenciais
- Redirecionamento após login
- **Demo**: admin / 123456

### SignupPage (`/signup`)

- Cadastro de novos usuários
- Validação de formulário
- Confirmação de senha

### DashboardPage (`/dashboard`)

- Painel principal do usuário
- Estatísticas e métricas
- Atividade recente
- Ações rápidas

### DataSourcePage (`/datasources`)

- Gerenciamento de fontes de dados
- Upload de arquivos CSV/Excel
- Conexão com APIs externas
- Listagem e exclusão

### ProfilePage (`/profile`)

- Edição de perfil do usuário
- Alteração de senha
- Configurações da conta
- Upload de avatar

## 🎨 Sistema de Design

### Componentes UI

O projeto inclui um sistema completo de componentes:

- **Button**: Botões com variantes e estados
- **Card**: Containers de conteúdo
- **Input**: Campos de formulário
- **Alert**: Mensagens de feedback
- **Badge**: Indicadores de status
- **LoadingSpinner**: Indicadores de carregamento

### Cores e Temas

```css
/* Cores principais */
primary: #3b82f6 (azul)
secondary: #64748b (cinza)
success: #10b981 (verde)
warning: #f59e0b (amarelo)
error: #ef4444 (vermelho)
```

## 🛡️ Proteção de Rotas

### Rotas Públicas

- Acessíveis sem autenticação
- Redirecionam para dashboard se já logado
- Incluem: `/home`, `/login`, `/signup`

### Rotas Protegidas

- Exigem autenticação
- Redirecionam para login se não autenticado
- Incluem: `/dashboard`, `/datasources`, `/profile`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview

# Testes
npm run test

# Cobertura de testes
npm run coverage
```

## 🌐 Configuração da API

Configure a URL base da API no arquivo `.env`:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Endpoints Esperados

```python
POST /auth/token/          # Login
POST /auth/token/refresh/  # Refresh token
GET  /auth/me/            # Dados do usuário
POST /auth/register/      # Registro
GET  /datasources/        # Listar fontes
POST /datasources/        # Criar fonte
DELETE /datasources/{id}/ # Excluir fonte
```

## 🚨 Tratamento de Erros

- **ErrorBoundary**: Captura erros React
- **API Interceptors**: Tratamento automático de 401
- **Form Validation**: Validação client-side
- **User Feedback**: Alerts e mensagens

## 📱 Responsividade

- Design mobile-first
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Layout adaptativo
- Menu lateral colapsável

## 🔄 Estado da Aplicação

### Context API

- **AuthContext**: Estado de autenticação global
- **User Management**: Dados do usuário logado
- **Loading States**: Estados de carregamento

## 🎯 Próximos Passos

### Funcionalidades Planejadas

- [ ] Dashboard Builder visual
- [ ] Gráficos interativos
- [ ] Relatórios automáticos
- [ ] Integração com mais APIs
- [ ] Sistema de notificações
- [ ] Compartilhamento de dashboards

### Melhorias Técnicas

- [ ] Testes unitários completos
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)
- [ ] Tema escuro
- [ ] Otimizações de performance

- provider para cada serviço

- CRUD para:
  - dashboard
  - datasorces
  - manter usuario foto perfil

- sass less tailwind
