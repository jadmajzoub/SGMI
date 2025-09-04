# SGMI - Sistema de Gestão de Produção Industrial

Sistema web para gerenciamento de produção industrial com interface em React + TypeScript + Vite e Material-UI.

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ (recomendado: versão LTS mais recente)
- npm (incluído com Node.js)
- Backend SGMI rodando na porta 4000 (ver `../sgmi-backend/`)

### Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Editar .env se necessário (API_URL padrão: http://localhost:4000/api)
   ```

3. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   
   Acesse: http://localhost:3000

### Scripts Disponíveis

- `npm run dev` - Iniciar servidor de desenvolvimento com HMR
- `npm run build` - Construir para produção (TypeScript + Vite)
- `npm run preview` - Visualizar build de produção localmente
- `npm run typecheck` - Verificação de tipos TypeScript

### Estrutura do Sistema

Este é um sistema de produção industrial com:
- **Autenticação baseada em roles** (Diretor, Gerente, Operador)
- **Interface do Diretor**: Planejamento de produção, relatórios e analytics
- **Interface de Produção**: Entrada de dados de produção e gerenciamento de lotes
- **Atualizações em tempo real** via WebSocket

### Tecnologias Utilizadas

- React 18 + TypeScript
- Material-UI v6 (interface)
- Vite (build tool)
- React Router v6 (roteamento)
- Axios (requisições HTTP)
- Date-fns/Dayjs (manipulação de datas)
- React Hook Form + Zod (formulários e validação)

