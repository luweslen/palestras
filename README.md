# Palestras

Slides & código das minhas palestras, usando [Slidev](https://sli.dev/).

## 2025

- `pt-BR` [Otimização de CI/CD para Aplicações NestJS](./2025-10-23)

## 🎨 Tema Compartilhado

Este repositório utiliza um tema Slidev customizado (`zrp-slidev-theme`) compartilhado entre todas as palestras.

## 🚀 Como Rodar

```bash
# Instalar dependências
yarn install

# Selecionar e rodar uma palestra (picker interativo)
yarn dev

# Ou entrar na pasta específica
cd 2025-10-23
yarn dev
```

## 📜 Scripts

| Script | Descrição |
|--------|-----------|
| `yarn dev` | Abre picker interativo para selecionar e rodar uma palestra |
| `yarn build` | Builda todas as palestras |
| `yarn export` | Abre picker interativo para exportar uma palestra em PDF |
| `yarn lint` | Executa ESLint |
| `yarn update` | Atualiza o netlify.toml com redirects |

## 📦 Como Adicionar Uma Nova Palestra

1. Crie uma nova pasta na raiz com o formato `YYYY-MM-DD`
2. Crie os arquivos necessários:
   - `slides.md` - Conteúdo da apresentação (apontando o tema para `../zrp-slidev-theme`)
   - `package.json` - Dependências (pode copiar de uma palestra existente)
   - `src/` - Pasta com assets (imagens, snippets, etc.)
3. Execute `yarn update` para atualizar os redirects

## 📋 Requisitos

- Node.js 20+
- Yarn 1.22.22+

## 🔗 Links Úteis

- [Slidev Documentation](https://sli.dev)
- [ZRP Slidev Theme](./zrp-slidev-theme)

## 💡 Inspiração

Estrutura e scripts inspirados no repositório [antfu/talks](https://github.com/antfu/talks).

