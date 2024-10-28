# Operand

Uma mini aplicação frontend e backend com autenticação e a criação de tasks utilizando Vue + Nuxt 3, Pinia, Typescript e tailwind + css para estilização.
Com funcionalidades de Pesquisa simples, CRUD de tasks e registro/login de usuário.

## Requisição

O projeto foi desenvolvido com essas tecnologias por atualiadade de ferramentas utlizando a facilidade Nuxt para roteamento, Typescript para maior consistência de código e tailwind por questões performáticas e gosto pessoal também. Utilizei o Pinia para fazer o gerenciamento de estado global/local das funcionalidades `tasks` e `autenticação` e também composition API do proprio vue por questões de estudo/preferência na utilidade tanto em reutilização de código e atualidade de ferramenta indicada pelo próprio vue.
Já no desenvolvimento do backend com node.js foi utilizado uma arquitetura de modulos com repository pattern, express e typescript com a premissa de ser simples e robusta e consistente também.

## Setup do Projeto

`Back-end`

```sh
npm install
<!-- para gerar documentação da API -->
npm run swagger
```

`Front-end`

```sh
npm install
```

### Compilar e executar projeto em localhost

`Front-end e Back-end`

```sh
npm run dev
```

### Build para produção

`Front-end e Back-end`

```sh
npm run build
```

### Link para documentação da API

```
baseUrl/api/v1/docs
```
