# Sistema de Compras Online

**Autores:** Felipe de Paula Gonçalves E Vítor Fagundes Alves Nogueira

## Descrição

O Sistema de Compras Online é uma aplicação web que permite aos usuários pesquisar, visualizar e comprar produtos online. Os clientes podem criar uma conta, adicionar produtos ao carrinho de compras, finalizar compras e muito mais.

## Tecnologia

O nosso sistema é construído com [Nest.js](https://nestjs.com/), um poderoso framework Node.js que facilita o desenvolvimento de aplicações robustas e escaláveis.

### Visão Geral da Arquitetura

O nosso sistema segue uma arquitetura baseada no padrão MVC (Model-View-Controller) e utiliza os princípios de injeção de dependência para garantir a separação de preocupações. A arquitetura é composta por três camadas principais:

1. **Controller:** Esta camada recebe as requisições HTTP dos clientes e encaminha os dados para o serviço apropriado. Os controladores são responsáveis por lidar com a entrada e saída de dados.

2. **Service:** O serviço contém a lógica de negócios da aplicação. Ele aplica regras de negócios, processa dados e coordena a interação entre diferentes componentes da aplicação. O serviço é a camada intermediária entre o controlador e o repositório.

3. **Repository:** O repositório lida com a persistência de dados, seja em um banco de dados, sistema de arquivos ou qualquer outro mecanismo de armazenamento. Ele fornece métodos para criar, ler, atualizar e excluir dados.

### Exemplo de Fluxo de Trabalho

1. Um cliente faz uma requisição HTTP para o controlador apropriado.
2. O controlador recebe a requisição, valida os dados de entrada e chama o serviço correspondente.
3. O serviço aplica as regras de negócios, processa os dados, realiza consultas no repositório, se necessário, e prepara a resposta.
4. O serviço retorna a resposta para o controlador, que então envia a resposta de volta ao cliente.

## Pré-requisitos

- Node.js instalado
- npm ou yarn instalado