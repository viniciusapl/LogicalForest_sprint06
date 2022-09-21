//import cypress from "cypress"
import Factory from "../fixtures/facture"



const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {

    //Buscar todos os usuários
    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)
    }

    //Buscar um usuário e utilizar as informações dele para o login
    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password
            }).as('usuarioLogin')
        })
    }

    static buscarUsuarioComSenhaErrada() {
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password.slice(2)
            }).as('usuarioComSenhaErrada')
        })
    }

    //Buscar as informações de um usuário
    static buscarUsuarioExistente() {
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                nome: res.body.usuarios[0].nome,
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password,
                administrador: res.body.usuarios[0].administrador
            }).as('usuarioExistente')
        })
    }

    // Função para filtrar os usuários administradores
    static buscarUsuariosAdministradores() {
        cy.request(URL_USUARIOS).then( res => { //eu faço um GET na URL de usuários para obter a lista completa deles
            let listaDeUsuarios = res.body.usuarios //após isso salvo o array onde ficam as informações dos usuários dentro da variável 'listaDeUsuarios'
            let adms = {
                quantidade: listaDeUsuarios.filter(usuario => (usuario.administrador === "true")).length,
                administradores: listaDeUsuarios.filter(usuario => (usuario.administrador === "true"))
            }//após salvar eu filtro os usuários e adiciono todos que possuem administrador = true em um novo objeto onde posso validar quantos usuários administradores tenho e acessar a informação de cada um deles
            cy.wrap(adms).as('listaDeAdms')//"Embalo" as informações que consegui com o filtro para poder usá-las e assim salvar dentro de um JSON para usá-las futuramente
        })
    }

    //Cadastrar um novo usuário
    static cadastrarNovoUsuarioAleatorio() {
        let usuario = Factory.gerarUsuarioAdministrador()
        return cy.rest('POST', URL_USUARIOS, usuario)
    }

    static cadastrarNovoUsuario(usuario) {
        return cy.rest('POST', URL_USUARIOS, usuario)
    }

    static buscarUsuarioPorId() {
        return cy.request({
            method: 'GET',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado')}`
        })
    }

    static buscarUsuarioPorIdSemSucesso() {
        return cy.request({
            method: 'GET',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado').slice(3)}`,
            failOnStatusCode: false
        })
    }

    static editarUsuarioCadastrado() {
        let usuario = Factory.gerarUsuarioAdministrador()

        return cy.request({
            method: 'PUT',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado')}`,
            body: usuario
        })
    }

    static excluirUsuarioCadastrado() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado')}`
        })
    }

    //Realizar o login
    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    //SALVAR O TOKEN

    static salvarBearer(res) {
        Cypress.env('bearer', res.body.authorization.slice(7))
    }

    //PRODUTOS
    //Faz a busca de todos os produtos
    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    //Cadastra um novo produto
    static cadastrarProdutoComSucesso(produto) {
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }

        })
    }

    //Realizar a busca de um produto pelo seu Id
    static buscarProdutoCadastradoPorId() {
        return cy.request({
            method: 'GET',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`
        })
    }

    static buscarProdutoCadastradoPorIdSemSucesso() {
        return cy.request({
            method: 'GET',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado').slice(2)}`,
            failOnStatusCode: false
        })
    }

    static buscarProdutoExistente() {
        cy.request(URL_PRODUTOS).then( res => {
            cy.wrap({
                nome: res.body.produtos[0].nome,
                preco: res.body.produtos[0].preco,
                descricao: res.body.produtos[0].descricao,
                quantidade: res.body.produtos[0].quantidade
            }).as('produtoExistente')
        })
    }

    //Usa o Id do produto para realizar a alteração nos dados cadastrados
    static editarProdutoCadastrado() {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: 'PUT',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            body: produto,
            auth: {
                bearer: Cypress.env('bearer')
            },
            failOnStatusCode: false
        })
    }

    //Excluir um produto cadastrado
    static deletarProdutoCadastrado() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    //Essa função abaixo fiz para conseguir realizar a adição de um carrinho
    //Nela eu faço uma requisição GET na url de produtos para ter a lista de todos os produtos cadastrados
    static buscarProdutoParaCarrinho() {
        cy.request(URL_PRODUTOS).then( res => {
            let qtd_produtos = res.body.quantidade - 1 //Nessa requisição, uma das respostas que obtemos é a quantidade de produtos cadastrados, então aproveito essa informação e uso aqui
            let inteiro = Factory.gerarInteiroAleatorio(qtd_produtos) // Aqui eu passo o número dos produtos cadastrados como parâmetro para ser sorteado um número aleatório dentro do intervalo de 0 até o número de produtos cadastrados, e assim selecionar um produto dentro da lista de produtos 

            // Depois de selecionar o produto vou "embalar" as informações dele que preciso
            cy.wrap({
                idProduto: res.body.produtos[inteiro]._id, //Para gerar um carrinho preciso do id do produto
                quantidade: Factory.gerarInteiroAleatorio(5)// e também da quantidade de produtos que será adicionada ao carrinho
            }).as('produtoParaCarrinho')
        })
    }


    //CARRINHOS
    //Buscar carrinhos
    static buscarCarrinhos() {
        return cy.rest('GET', URL_CARRINHOS)
    }

    static adicionarCarrinhoComSucesso(produto) {
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                produtos: [produto]
            },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static buscarCarrinhoCadastradoPorId() {
        return cy.request({
            method: 'GET',
            url: `${URL_CARRINHOS}/${Cypress.env('idCarrinhoCadastrado')}`
        })
    }

    static buscarCarrinhoCadastradoPorIdSemSucesso() {
        return cy.request({
            method: 'GET',
            url: `${URL_CARRINHOS}/${Cypress.env('idCarrinhoCadastrado').slice(2)}`,
            failOnStatusCode: false
        })
    }

    static concluirCompraComSucesso() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_CARRINHOS}/concluir-compra`,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

}