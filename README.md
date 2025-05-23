# Cliente API

## Índice

* [Introdução](#introdução)
* [Instalação](#instalação)
* [Endpoints](#endpoints)
* [Como Utilizar](#como-utilizar)
* [Exemplos de Uso](#exemplos-de-uso)
* [Parâmetros](#parâmetros)
* [Observações](#observações)

## Introdução

A Cliente API é um serviço RESTful que fornece acesso a dados de clientes e uma lista de produtos favoritos. Esta API é um desafio que me foi proposto que está sendo entregue da seguinte maneira.

## Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/favorite-products-api.git
cd favorite-products-api
```

2. **Instale as dependências:**

```bash
npm install
```

### Executando o projeto

Para rodar o servidor em ambiente de desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```
http://localhost:3000
```

```http
POST /auth
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

**Usuários disponíveis:**

| Usuário  | Senha   | Role  |
|----------|---------|-------|
| admin    | 123456  | ADMIN |
| user     | 123456  | USER  |

---

### Exemplo de requisição autenticada

```http
GET /produtos
Authorization: Bearer <seu_token_jwt>
```

Substitua `<seu_token_jwt>` pelo token retornado no login.

---

### Postman

Dentro do projeto, há uma pasta chamada collection que contém todas as requisições organizadas e prontas para uso no Postman.

Para utilizar essas requisições, basta importar a coleção no Postman e substituir o valor do token nas requisições protegidas por autenticação.

Observação: Gere um novo token acessando o endpoint de login e copie o token JWT retornado. Em seguida, adicione-o no campo Authorization (tipo: Bearer Token) nas requisições que exigem autenticação.


## Endpoints

### Clientes

* **GET /clientes**: Retorna uma lista de todos os clientes.
* **GET /clientes/:id**: Retorna um cliente específico pelo seu ID.
* **POST /clientes**: Cria um novo cliente.
* **PUT /clientes/:id**: Atualiza um cliente existente.
* **DELETE /clientes/:id**: Deleta um cliente.

### Produtos Favoritos

* **GET /produtos-favoritos**: Retorna uma lista de todos os produtos favoritos.
* **GET /produtos-favoritos/:id**: Retorna a lista de produtos favoritos a partir do ID do CLIENTE.
* **POST /produtos-favoritos**: Cria um novo produto favorito.
* **DELETE /produtos-favoritos/:id**: Deleta um produto favorito.

### Produtos

* **GET /produtos**: Retorna uma lista de todos os produtos da API implementada.
* **GET /produtos/:id**: Retorna um produto especifico a partir de seu ID.

## Como Utilizar

1. Faça uma requisição GET para o endpoint desejado, substituindo `:id` pelo ID do cliente, produto ou produto favorito desejado.
2. A API retornará os dados do cliente ou produto favorito em formato JSON.
