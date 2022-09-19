

export default class ValidaServerest {

    //VALIDAÇÕES DE USUÁRIOS

    static validarBuscaDeUsuarios(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        expect(resposta.status).to.equal(200)
    }

    static validarCadastroDeUsuarioComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.status).to.equal(201)
        Cypress.env('idUsuarioCadastrado', resposta.body._id)
    }

    static validarCadastroDeUsuarioSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Este email já está sendo usado')
        expect(resposta.status).to.equal(400)
    }

    static validarBuscaDeUsuarioPorId(resposta) {
        expect(resposta.body).to.be.a('object')
        expect(resposta.status).to.equal(200)
    }

    static validarBuscaDeUsuarioPorIdSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Usuário não encontrado')
        expect(resposta.status).to.equal(400)
    }

    static validarEdicaoDeUsuario(resposta) {
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
        expect(resposta.status).to.equal(200)
    }

    static validarExclusaoDeUsuario(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
        expect(resposta.status).to.equal(200)

    }

    //VALIDAÇÕES DE LOGIN

    static validaLoginComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Login realizado com sucesso')
        expect(resposta.status).to.equal(200)
    }

    static validaLoginSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
        expect(resposta.status).to.equal(400)
    }

    //VALIDAÇÕES DE PRODUTOS

    static validarBuscaDeProdutos(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        expect(resposta.status).to.equal(200)
    }

    static validarCadastroDeProdutoComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.status).to.equal(201)
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static validarBuscaDeProdutoCadastradoPorId(resposta) {
        expect(resposta.body).to.be.a('object')
        expect(resposta.status).to.equal(200)
    }

    static validarBuscaDeProdutoCadastradoPorIdSemSucesso(resposta) {
        expect(resposta.body).to.be.a('object')
        expect(resposta.status).to.equal(400)
    }

    static validarEdicaoDeProdutoCadastradoComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
        expect(resposta.status).to.equal(200)
    }

    static validarExclusaoDeProduto(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
        expect(resposta.status).to.equal(200)
    }

    //VALIDAÇÕES DE CARRINHOS

    static validarBuscaDeCarrinhos(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        expect(resposta.status).to.equal(200)
    }

    static validarCadastroDeCarrinho(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.status).to.equal(201)
    }

    static validarFinalizaçãoDeCompraComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
        expect(resposta.status).to.equal(200)
    }

}