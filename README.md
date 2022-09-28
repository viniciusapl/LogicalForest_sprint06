# LogicalForest_sprint06
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/viniciusapl/LogicalForest_sprint06/blob/develop/LICENSE)

Este projeto foi realizado durante a sexta sprint do programa de bolsas Compass.UOL para automação de testes com a ferramenta Cypress, buscando implementar todo o conhecimento adquirido sobre a realização de testes, para isso realizei alguns testes e o mapeamento da API Pública [Serverest](https://serverest.dev/).

## Apresentação

Para obter uma cópia do projeto você pode acessar o repositório e cloná-lo em sua máquina. Para isso é só clicar [aqui](https://github.com/viniciusapl/LogicalForest_sprint06). 
É necessário a utilização de uma Interface para auxiliá-lo no desenvolvimento, para isso recomendo que use o [VSCode](https://code.visualstudio.com/).

### Pré requisitos

```
- Node.Js (A partir da versão 14);
- Cypress(Na versão 9.7.0)
- IDE (Recomendo o uso do VSCode)
- AJV (Another Json Validator - usado nas validações de contrato)
- Mochawesome (Usado ao gerar reports)
```

### Mapa Mental

Para a execução e leitura do mapa mental feito para essa API é necessária a instalação do [XMind](https://xmind.app/).

Para o download do mapa mental é só clicar [aqui](https://github.com/viniciusapl/LogicalForest_sprint06/blob/develop/Serverest.xmind)

### Instalação

Você pode clonar o repositório do Git [aqui](https://github.com/viniciusapl/LogicalForest_ViniciusLima_Compass) ou então realizar o seguinte comando em seu cmd
```bash
git clone https://github.com/viniciusapl/LogicalForest_sprint06/
```

Após realizar a clonagem do repositório, em sua máquina localize a pasta criada para ele e execute o terminal de comando.

Para instalar os node modules, basta dar o seguinte comando no cmd:

```
npm install
```
Através desse comando, as dependências necessárias para o projeto serão instaladas através do Package.json

Caso prefira, também poderá instalar as dependências para o projeto manualmente, através dos comandos

Para instalar o Cypress em sua versão 9 mais recente:

```
npm install --save-dev cypress@9.7.0
```
Para instalar a biblioteca faker-js
```
npm install @faker-js/faker --save-dev
```
Para instalar AJV (Another Json Validator)
```
npm install ajv
```

## Execução dos testes

Para a execução dos testes, após a instalação de todos os componentes, realizar o seguinte comando no terminal:

```
npm run test
```
Após a execução do comando um arquivo html será gerado dentro da pasta Cypress/reports/mochareports , através desse html é possível visualizar o report de todos os testes executados, que serão exibidos como no seguinte exemplo:

![exemplo2](https://user-images.githubusercontent.com/101907229/192670137-ca5408fe-3bfe-40a3-b418-546d4be2e3d3.png)


Os testes foram desenvolvidos usando validações para seu contrato conforme a documentação e também validações de resultados esperados, como no exemplo:

![exemplo-teste](https://user-images.githubusercontent.com/101907229/192669206-b24579c8-5ba7-43b0-abbf-ada507defc14.png)


## Tecnologias utilizadas

* [Node.JS](https://nodejs.org/)
* [Cypress](https://www.cypress.io/)
* [AJV](https://ajv.js.org/)
* [Fakerjs](https://fakerjs.dev/)
* Mochawesome

## Contribuição

Esse repositório foi feito apenas para estudos durante o Programa de Bolsas Compass.UOL

## Autores

* **Vinicius Lima** - [GitHub](https://github.com/viniciusapl) - [LinkedIn](https://www.linkedin.com/in/vinicius-lima-4347b3212/)

## Créditos

* Meus sinceros agradecimentos à Regina Azzi, João Ricardo, Diego Vieira, Karoline Dantas, Ester Oliveira, Vitória Gomes e Cátia Lima que me apoiaram durante todo o desenvolvimento do projeto.
* [Wikipedia](https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal)
* [Stack Overflow](https://stackoverflow.com/)
