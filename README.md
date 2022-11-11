
# serverless-challenge

Esse projeto é um desafio realizado em NodeJS, onde foi desenvolvida uma 
API utilizando TDD, Clean Architecture e Serverless.

A API utiliza o framework Serverless para subir as Lambdas e as API's Gateways para acessar as Lambdas.

O projeto tem mais ou menos 65% de coverage dos testes. Não consegui atingir 100% pois não deu tempo de fazer os testes de integração nas lambdas.


## Documentação da API

#### Retorna todos os funcionários

```http
  GET /employees/{id?}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Opcional**. ID Do funcionário |
| `cpf` | `string` | **Opcional**. CPF Do funcionário |
| `name` | `string` | **Opcional**. Nome Do funcionário |

#### Cria um funcionário

```http
  POST /employees
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome Do funcionário |
| `role` | `string` | **Obrigatório**. Cargo Do funcionário |
| `cpf` | `string` | **Obrigatório**. CPF Do funcionário |
| `salary` | `string` | **Obrigatório**. Salário Do funcionário |
| `age` | `string` | **Obrigatório**. Idade Do funcionário |

#### Cria um funcionário

```http
  PATCH /employees/{id}
```
**Ao menos um dos parâmetros devem ser passados no body.**
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Opcional**. Nome Do funcionário |
| `role` | `string` | **Opcional**. Cargo Do funcionário |
| `cpf` | `string` | **Opcional**. CPF Do funcionário |
| `salary` | `string` | **Opcional**. Salário Do funcionário |
| `age` | `string` | **Opcional**. Idade Do funcionário |

#### Deleta um funcionário

```http
  DELETE /employees/{id}
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID Do funcionário |


## Documentação da API

#### Retorna todos os funcionários

```http
  GET /employees/{id?}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Opcional**. ID Do funcionário |
| `cpf` | `string` | **Opcional**. CPF Do funcionário |
| `name` | `string` | **Opcional**. Nome Do funcionário |

#### Cria um funcionário

```http
  POST /employees
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome Do funcionário |
| `role` | `string` | **Obrigatório**. Cargo Do funcionário |
| `cpf` | `string` | **Obrigatório**. CPF Do funcionário |
| `salary` | `string` | **Obrigatório**. Salário Do funcionário |
| `age` | `string` | **Obrigatório**. Idade Do funcionário |

#### Cria um funcionário

```http
  PATCH /employees/{id}
```
**Ao menos um dos parâmetros devem ser passados no body.**
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Opcional**. Nome Do funcionário |
| `role` | `string` | **Opcional**. Cargo Do funcionário |
| `cpf` | `string` | **Opcional**. CPF Do funcionário |
| `salary` | `string` | **Opcional**. Salário Do funcionário |
| `age` | `string` | **Opcional**. Idade Do funcionário |

#### Deleta um funcionário

```http
  DELETE /employees/{id}
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID Do funcionário |


## Rodando a aplicação

### Rodando os Testes
```bash
  npm run test # Roda todos testes
  npm run test:coverage # Roda todos testes e gera coverage
  npm run test:unit # Roda os testes unitários
  npm run test:integration # Roda os testes de integração
```

### Deploy
```bash
  npm run deploy # Faz o deploy da aplicação
  npm run deploy:offline # Faz o deploy local da aplicação
```