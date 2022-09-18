const { faker } = require('@faker-js/faker')

export default class Factory {

    //Gerar produtos aleatórios
    static gerarProduto() {
        return {
        "nome": faker.commerce.productName(),
        "preco": faker.datatype.number(),
        "descricao": faker.commerce.productDescription(),
        "quantidade": faker.datatype.number()
        }
    }

    //Gerar um número inteiro aleatório
    static gerarInteiroAleatorio(qtd = 0) {
        return faker.datatype.number(qtd)
    }

    //Gerar um usuário administrador aleatório 
    static gerarUsuarioAdministrador() {
        return {
            "nome": faker.name.fullName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": "true"
        }
    }
}