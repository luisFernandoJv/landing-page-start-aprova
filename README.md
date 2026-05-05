# Start Aprovacao - Landing Page IGECAP

[![LinkedIn](https://img.shields.io/badge/LinkedIn-luisfernando--eng-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/luisfernando-eng/)
[![Instagram](https://img.shields.io/badge/Instagram-@luis__fernando__jv__eng-E4405F?style=flat&logo=instagram)](https://www.instagram.com/luis_fernando_jv_eng)
[![Gmail](https://img.shields.io/badge/Gmail-luizfer.12321@gmail.com-D14836?style=flat&logo=gmail)](mailto:luizfer.12321@gmail.com)

> Landing page de alta conversao para cursinho preparatorio presencial focado no concurso IGECAP, desenvolvida com React, TypeScript e animacoes profissionais.

---

## Indice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura do Frontend](#-arquitetura-do-frontend)
- [Stack Tecnologica](#-stack-tecnologica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pre-requisitos](#-pre-requisitos)
- [Instalacao e Configuracao](#-instalacao-e-configuracao)
- [Como Executar](#-como-executar)
- [Detalhamento dos Componentes](#-detalhamento-dos-componentes)
- [Performance e Otimizacoes](#-performance-e-otimizacoes)
- [Troubleshooting](#-troubleshooting)
- [Contato](#-contato)

---

## Sobre o Projeto

Este projeto demonstra a construcao de uma **landing page de alta conversao** aplicando as melhores praticas de desenvolvimento frontend moderno.

A landing page foi desenvolvida para o **Start Aprovacao**, cursinho preparatorio presencial focado no concurso IGECAP na Paraiba. O objetivo e maximizar conversoes atraves de:

- **UI/UX profissional** com design system consistente
- **Animacoes fluidas** que guiam o usuario pela jornada
- **Responsividade total** para mobile e desktop
- **CTAs estrategicos** posicionados para conversao

O projeto utiliza **React 18** com **TypeScript**, **Vite** para build otimizado, **Tailwind CSS** para estilizacao e **Framer Motion** para animacoes de nivel senior.

---

## Arquitetura do Frontend

### Diagrama Visual

```
                    ┌─────────────────────────────────────┐
                    │           LANDING PAGE              │
                    │         Start Aprovacao             │
                    └─────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
         ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    NAVIGATION   │       │   BACKGROUND    │       │   FLOATING CTA  │
│  Menu Responsivo│       │    EFFECTS      │       │  Botao Fixo     │
│  Active States  │       │  Orbs Animados  │       │  WhatsApp       │
└─────────────────┘       └─────────────────┘       └─────────────────┘
                                     │
    ┌────────────────────────────────┼────────────────────────────────┐
    │                                │                                │
    ▼                                ▼                                ▼
┌────────────┐                ┌────────────┐                ┌────────────┐
│   HEADER   │                │    HERO    │                │   PRICE    │
│   Logo +   │                │  Headline  │                │   CARD     │
│   Badge    │                │    CTA     │                │  Destaque  │
└────────────┘                └────────────┘                └────────────┘
    │                                │                                │
    ▼                                ▼                                ▼
┌────────────┐                ┌────────────┐                ┌────────────┐
│  BENEFITS  │                │   ABOUT    │                │ CURRICULUM │
│  6 Cards   │                │ Diferenciais│               │  Materias  │
│  Animados  │                │  do Curso  │                │  Accordion │
└────────────┘                └────────────┘                └────────────┘
    │                                │                                │
    ▼                                ▼                                ▼
┌────────────┐                ┌────────────┐                ┌────────────┐
│TESTIMONIALS│                │  CONTACT   │                │ CTA FINAL  │
│ Depoimentos│                │  WhatsApp  │                │  Conversao │
│  Alunos    │                │  + Mapa    │                │  Principal │
└────────────┘                └────────────┘                └────────────┘

    Build: Vite + SWC          Styling: Tailwind CSS         Animacoes: Framer Motion
```

### Fluxo de Conversao

```
Usuario Acessa
      │
      ▼
┌─────────────┐
│    HERO     │  → Headline impactante + CTA primario
└─────────────┘
      │
      ▼
┌─────────────┐
│   PRECO     │  → Ancoragem de valor + Urgencia
└─────────────┘
      │
      ▼
┌─────────────┐
│ BENEFICIOS  │  → Prova de valor + Diferenciais
└─────────────┘
      │
      ▼
┌─────────────┐
│DEPOIMENTOS  │  → Prova social + Confianca
└─────────────┘
      │
      ▼
┌─────────────┐
│  CTA FINAL  │  → Ultima chamada + Multiplas opcoes
└─────────────┘
      │
      ▼
   CONVERSAO (Formulario ou WhatsApp)
```

---

## Stack Tecnologica

### Core

- **React 18.3** — Biblioteca UI com Concurrent Features
- **TypeScript 5.6** — Tipagem estatica e IntelliSense
- **Vite 6.0** — Build tool com HMR instantaneo
- **Tailwind CSS 3.4** — Utility-first CSS framework

### Animacoes e UI

- **Framer Motion 11** — Animacoes declarativas e gestos
- **Lucide React** — Icones SVG otimizados
- **CSS Custom Properties** — Design tokens dinamicos

### Qualidade de Codigo

- **ESLint** — Linting e padroes de codigo
- **PostCSS** — Processamento CSS avancado
- **SWC** — Compilacao ultra-rapida

---

## Estrutura do Projeto

```
start-aprovacao/
├── public/
│   └── logo.png                  # Logo do curso
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx      # Secao sobre o curso
│   │   ├── BackgroundEffects.tsx # Efeitos visuais de fundo
│   │   ├── Benefits.tsx          # Grid de beneficios
│   │   ├── ContactSection.tsx    # Contato e localizacao
│   │   ├── CtaFinal.tsx          # CTA de conversao final
│   │   ├── CurriculumSection.tsx # Conteudo programatico
│   │   ├── FloatingCta.tsx       # Botao flutuante WhatsApp
│   │   ├── Footer.tsx            # Rodape
│   │   ├── Header.tsx            # Cabecalho com logo
│   │   ├── HeroSection.tsx       # Secao principal hero
│   │   ├── ImageCarousel.tsx     # Carrossel de imagens
│   │   ├── Navigation.tsx        # Menu de navegacao
│   │   ├── PriceCard.tsx         # Card de preco destacado
│   │   ├── Testimonials.tsx      # Depoimentos de alunos
│   │   └── WhatsAppGroups.tsx    # Links grupos WhatsApp
│   ├── App.tsx                   # Componente raiz
│   ├── index.css                 # Estilos globais + Design System
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts             # Tipos do Vite
├── index.html                    # HTML template
├── package.json                  # Dependencias e scripts
├── tailwind.config.js            # Configuracao Tailwind
├── tsconfig.json                 # Configuracao TypeScript
├── vite.config.ts                # Configuracao Vite
└── README.md
```

---

## Pre-requisitos

- [Node.js 18+](https://nodejs.org/) (recomendado: v20 LTS)
- [pnpm](https://pnpm.io/) (ou npm/yarn)
- Git

---

## Instalacao e Configuracao

### 1. Clone o Repositorio

```bash
git clone https://github.com/seu-usuario/start-aprovacao.git
cd start-aprovacao
```

### 2. Instale as Dependencias

```bash
pnpm install
```

### 3. Inicie o Servidor de Desenvolvimento

```bash
pnpm dev
```

### 4. Acesse no Navegador

Abra: **http://localhost:5173**

---

## Como Executar

### Desenvolvimento

```bash
pnpm dev
```

Inicia o servidor com Hot Module Replacement (HMR) para desenvolvimento rapido.

### Build de Producao

```bash
pnpm build
```

Gera os arquivos otimizados na pasta `dist/`.

### Preview da Build

```bash
pnpm preview
```

Serve a build de producao localmente para testes.

### Linting

```bash
pnpm lint
```

Verifica padroes de codigo e possiveis erros.

---

## Detalhamento dos Componentes

### NAVIGATION

**Arquivo:** `src/components/Navigation.tsx`

- Menu responsivo com blur backdrop
- Estados ativos com animacao `layoutId`
- Menu mobile com transicoes suaves
- Scroll-aware: muda estilo ao rolar

**Destaques tecnicos:**

- `AnimatePresence` para entrada/saida do menu mobile
- `useEffect` com `IntersectionObserver` para secao ativa
- Transicoes com `spring` physics

---

### HERO SECTION

**Arquivo:** `src/components/HeroSection.tsx`

- Headline de alto impacto com gradiente
- Badge animado de status da turma
- CTA primario com efeitos hover
- Tipografia responsiva (mobile-first)

**Destaques tecnicos:**

- `stagger` animation para elementos filhos
- Gradientes CSS com variaveis customizadas
- Escala responsiva com breakpoints

---

### PRICE CARD

**Arquivo:** `src/components/PriceCard.tsx`

- Card destacado com gradiente primario
- Animacao de "shine" no hover
- Ancora de preco com risco no valor antigo
- Badge de desconto animado

**Destaques tecnicos:**

- Pseudo-elementos para efeito shine
- `whileHover` e `whileTap` para feedback
- Sombras com glow colorido

---

### BENEFITS

**Arquivo:** `src/components/Benefits.tsx`

- Grid responsivo 2x3 (mobile) / 3x2 (desktop)
- Cards com icones e hover states
- Animacao staggered na entrada
- Transicoes de escala e sombra

**Destaques tecnicos:**

- `variants` com `staggerChildren`
- Grid CSS com `gap` responsivo
- Icones Lucide com tamanhos dinamicos

---

### TESTIMONIALS

**Arquivo:** `src/components/Testimonials.tsx`

- Cards de depoimentos com avatares
- Estrelas de avaliacao animadas
- Layout responsivo em coluna/grid

**Destaques tecnicos:**

- Geracao dinamica de avatares com iniciais
- Animacoes de entrada por card
- Hover states com elevacao

---

### FLOATING CTA

**Arquivo:** `src/components/FloatingCta.tsx`

- Botao fixo no canto inferior direito
- Aparece apos scroll inicial
- Pulso animado para chamar atencao
- Link direto para WhatsApp

**Destaques tecnicos:**

- `position: fixed` com z-index elevado
- `useScroll` hook do Framer Motion
- Animacao de pulso com keyframes

---

## Performance e Otimizacoes

### Metricas Core Web Vitals

| Metrica                        | Alvo    | Status    |
| ------------------------------ | ------- | --------- |
| LCP (Largest Contentful Paint) | < 2.5s  | Otimizado |
| FID (First Input Delay)        | < 100ms | Otimizado |
| CLS (Cumulative Layout Shift)  | < 0.1   | Otimizado |

### Otimizacoes Implementadas

- **Code Splitting** — Componentes carregados sob demanda
- **Tree Shaking** — Apenas codigo utilizado no bundle
- **CSS Purging** — Tailwind remove classes nao usadas
- **Asset Hashing** — Cache busting automatico
- **GPU Acceleration** — Animacoes via transform/opacity
- **Lazy Animations** — Ativadas via Intersection Observer

### Tamanho do Bundle

```
dist/
├── index.html                    0.5 KB
├── assets/
│   ├── index-[hash].js          ~85 KB (gzipped: ~28 KB)
│   └── index-[hash].css         ~12 KB (gzipped: ~3 KB)
```

---

## Troubleshooting

### Erro de dependencias

```bash
# Limpe o cache e reinstale
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Porta 5173 em uso

```bash
# Use outra porta
pnpm dev --port 3000
```

### Build falha com erro de tipos

```bash
# Verifique erros de TypeScript
pnpm tsc --noEmit
```

### Estilos nao aplicados

```bash
# Reinicie o servidor de desenvolvimento
# O Tailwind precisa processar as classes
pnpm dev
```

### Animacoes travando

Verifique se `prefers-reduced-motion` esta ativo no sistema operacional. O projeto respeita essa configuracao de acessibilidade.

---

## Deploy

### Vercel (Recomendado)

```bash
# Instale a CLI
pnpm add -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
pnpm build

# Arraste a pasta dist/ para o Netlify Drop
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## Contato

**Luis Fernando**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-luisfernando--eng-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/luisfernando-eng/)
[![Instagram](https://img.shields.io/badge/Instagram-@luis__fernando__jv__eng-E4405F?style=flat&logo=instagram)](https://www.instagram.com/luis_fernando_jv_eng)
[![Gmail](https://img.shields.io/badge/Gmail-luizfer.12321@gmail.com-D14836?style=flat&logo=gmail)](mailto:luizfer.12321@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-luisfernando--eng-181717?style=flat&logo=github)](https://github.com/luisfernando-eng)

---

**Desenvolvido com React + TypeScript + Framer Motion**
