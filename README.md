# Rocketseat Bootcamp > GoNode > Desafio 1

Configure uma aplicação utilizando **ExpressJS**, **Nunjucks**, **EditorConfig** e **ESLint**.

## Rotas

- `/`: Rota inicial que renderiza uma página com um formulário com um único campo `age` que representa a idade do usuário;
- `/check`: Rota chamada pelo formulário da página inicial via método POST que checa se a idade do usuário é maior que 18 e o redireciona para a rota `/major`, caso contrário o redireciona para a rota `/minor` (Lembre de enviar a idade como Query Param no redirecionamento);
- `/major`: Rota que renderiza uma página com o texto: 'Você é maior de idade e possui x anos', onde 'x' deve ser o valor informado no input do formulário;
- `/minor`: Rota que renderiza uma página com o texto: 'Você é menor de idade e possui x anos', onde 'x' deve ser o valor informado no input do formulário;

## Middlewares

Deve haver um middleware que é chamado nas rotas `/major` e `/minor` e checa se a informação de idade não está presente nos Query Params. Se essa informação não existir deve redirecionar o usuário para a página inicial com o formulário, caso contrário o middleware deve apenas continuar com o fluxo normal;

---

## Anotações realizadas durante o curso

### Ambiente e conceitos

- O Node.js é uma plataforma que utiliza o motor V8 do Google Chrome para entender JavaScript no lado do backend;
- A arquitetura *Non-blocking I/O* do Node permite trabalharmos com múltiplos *cores* do processador da máquina para trabalhar com ações em paralelo;
- Utilizamos o **npm** ou **yarn** para instalar as dependências da nossa aplicação que ficam armazenadas na pasta `node_modules` e registradas no arquivo `package.json`.

### Instalação do Node.js e Yarn

#### Ambiente Windows via Chocolatey (gerenciador de pacotes)

Com o [Chocolatey](https://chocolatey.org/) instalado, basta rodar o seguinte comando no prompt:

`cinst nodejs.install`

Este comando instalará o [Node.js](https://nodejs.org/) junto com o **npm**, que é o gerenciador de pacotes do Node (similar as gems do Ruby). Porém, o [Yarn](https://yarnpkg.com/pt-BR/) é um gerenciador de pacotes mais rápido criado pelo pessoal do **Facebook**. Para instalá-lo via Chocolatey:

`choco install yarn`

Agora basta checar as versões para ver se instalou tudo corretamente, no Prompt:

`node -v`
`npm -v`
`yarn -v`

### Criando o projeto Node.js

Via prompt, entre na pasta do projeto e execute:

`yarn init -y`

Onde o `-y` serve para pular umas perguntas que o yarn faz e segue com as sugestões do sistema.

Abra o projeto via VSCode: `code .`

Todas as dependências do projeto estarão configuradas no arquivo `package.json` (arquivo presente em praticamente todos os projetos JS).

### Criando o servidor HTTP simples

Crie um arquivo chamado `index.js` dentro da raíz do projeto com o seguinte conteúdo:

```
const http = require('http');

http.createServer((req, res) => {
  console.log(req);
  return res.end('Hello world');
}).listen(3000);
```

Via terminal, rode: `node index.js`

E no navegador, acesse http://localhost:3000

### Instalando o ExpressJS

**ExpressJS** é um micro framework que gerencia rotas e views. Para instalá-lo:

`yarn add express`

No arquivo `index.js`, inicializaremos o servidor da seguinte forma:

```
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello world');
});

app.listen(3000);
```

### Utilizando o Nodemon

[Nodemon](https://nodemon.io) é uma biblioteca para facilitar o desenvolvimento, pois com ela não há a necessidade de ficar reiniciando o *node*, ela fará automaticamente assim que tiver uma alteração no código. Para instalá-la:

`yarn add nodemon -D`

Onde o `-D` é para dizer ao *node* que é uma biblioteca de desenvolvimento, ou seja, não será utilizada em produção. Para executar a aplicação via **Nodemon**, devemos criar um *script* no `package.json`desta forma:

```
"scripts": {
  "start": "nodemon index.js"
}
```

Aí no **terminal** basta executar o comando: `yarn start` (onde `start` é o nome do script criado).

### Fluxo de requisições / Middleware

O *middleware* é um interceptador que pode, ou não, bloquear o fluxo da requisição. Cada requisição pode ser interceptada por "n" middlewares. 

Um exemplo:

```
const logMiddleware = (req, res, next) => {
  console.log(`HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method} `);
  req.appName = "GoNode";
  return next(); // linha necessária para continuar a requisição
}

app.use(logMiddleware); // declarando desta forma, todas as rotas passarão por este middleware.

// mas pode usar o middleware apenas nas rotas desejadas desta forma
app.get('/', logMiddleware, (req, res) => {
  return res.send('Hello world');
});
```

### Configurando o Nunjucks

O **Nunjucks** é uma *template engine*, depedência para retornar uma *view HTML*. Para adicionar no projeto:

`yarn add nunjucks`

E no arquivo `index.js` adicione as seguintes configurações:

```
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

app.set('view engine', 'njk');

app.get('/', (req, res) => {
  return res.render('list', { name: 'Felipe' });
});

app.listen(3000);
```

Onde em `nunjucks.configure(...)`, o primeiro parâmetro é o nome da pasta onde ficarão as *views* e em seguida, o parâmetro `express` é a configuração para apontar o *framework* express. Em `app.set(...)` está sendo setado numa variável global do express a extensão dos arquivos da view.

Na pasta `views`, adicione um arquivo de exemplo chamado `list.njk` com o seguinte conteúdo:

```
<h1>Bem-vindo, {{ name }}</h1>
```

### Configurando o ESLint

`yarn add eslint -D`

`npx eslint --init`

```
- How would you like to configure ESLint? // Use a popular style guide
- Which style guide do you want to follow? // Standard (https//github.com/standard/standard)
- What format do you want your config file to be in? // JSON
```

**IMPORTANTE:** Como o ESLint só instala via NPM, rode o comando `yarn` após os passos acima, para configurar as depedências do ESLint para o yarn!






