# 🏋️‍♂️ Fitness API

Uma API REST de alta performance desenvolvida em **Node.js** com **TypeScript**, utilizando **Express**, **TSOA** para geração automatizada de rotas/Swagger, e **TypeORM** com **SQLite** local.

O sistema gerencia atletas, rotinas de treinos (com criação manual ou gerados por Inteligência Artificial) e um sistema de controle de multas/penalidades.

---

## 🚀 Tecnologias e Dependências

*   **Runtime:** Node.js (v18+) com TypeScript 6
*   **Framework Web:** Express
*   **Documentação & Rotas:** TSOA (TypeScript OpenAPI)
*   **ORM / Banco de Dados:** TypeORM rodando com banco de dados local **SQLite** (`better-sqlite3`)
*   **Provedores de IA Integrados:** Google Gemini (1.5-flash), OpenAI (gpt-4o-mini), Groq (llama-3.1) e Qwen.

---

## 🛠️ Como Executar o Projeto Localmente

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** instalado na sua máquina.

### 2. Instalar as Dependências
Abra o terminal na raiz do projeto e instale os pacotes definidos no `package.json`:
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Como o banco de dados SQLite é local e não exige credenciais de rede, seu arquivo `.env` precisa apenas das chaves de API das Inteligências Artificiais. 

Crie um arquivo chamado `.env` na raiz do seu projeto e insira suas credenciais:
```env
GEMINI_API_KEY=sua_chave_aqui
OPENAI_API_KEY=sua_chave_aqui
GROQ_API_KEY=sua_chave_aqui
QWEN_API_KEY=sua_chave_aqui
```

### 4. Rodar em Modo de Desenvolvimento
Para compilar as especificações do Swagger, gerar as rotas do TSOA e iniciar o servidor com *live reload* (`ts-node-dev`), execute o comando unificado que você possui nos scripts:
```bash
npm run dev
```
*Assim que o comando rodar, o arquivo físico do banco **`database.sqlite`** será criado na raiz do seu projeto e o TypeORM estruturará as tabelas automaticamente (`synchronize: true`).*

### 5. Compilar e Rodar em Produção
Se precisar gerar o build otimizado em JavaScript puro dentro da pasta `dist/`:
```bash
npm run build
npm start
```

---

## 📑 Como Acessar a Documentação (Swagger UI)

O TSOA lê os decorators do projeto e cria toda a documentação da API de forma automatizada. Com o servidor rodando, basta abrir o seu navegador no link abaixo:

🔗 **Link de Acesso:** [http://localhost:3000/docs](http://localhost:3000/docs)

*(Caso tenha alterado a porta padrão no seu arquivo `src/index.ts`, mude o `3000` para a porta correspondente).*

---

## 🧠 Recursos Disponíveis na API

A API expõe três grandes grupos de endpoints funcionais:

### 1. Athletes (Atletas)
*   `GET /athletes`: Retorna todos os atletas cadastrados com suporte a paginação simples via parâmetros de Query (`skip` e `limit`).
*   `POST /athletes`: Registra um novo atleta no sistema (nome, idade, peso, altura e objetivo).
*   `GET /athletes/{athleteId}/workouts`: Busca todos os treinos que pertencem a um atleta específico.

### 2. Workouts (Treinos & IA)
*   `GET /workouts`: Lista todas as rotinas de exercício salvas no banco.
*   `POST /workouts`: Cria de forma manual um treino vinculado a um atleta.
*   `POST /workouts/generate-with-ai`: **Geração via Inteligência Artificial**. Cria um treino adaptado e customizado para o biotipo do aluno utilizando LLMs.
    *   *Nota:* Este endpoint exige o cabeçalho HTTP **`x-ai-provider`** indicando o provedor que deseja utilizar (`gemini`, `openai`, `groq` ou `qwen`).

### 3. Penalties (Multas / Penalidades)
*   `GET /penalties` e `GET /penalties/{id}`: Listagem geral ou busca de multas específicas por identificador UUID.
*   `POST /penalties`: Cadastra uma nova infração gerando data e UUID automáticos.
*   `PUT /penalties/{id}` e `DELETE /penalties/{id}`: Edição e remoção de registros do banco local.


---

##  TODOs

- [ ] Remover template de api de multas
