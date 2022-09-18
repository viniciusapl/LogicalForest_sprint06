



export default class ValidaServerest {

    //VALIDAÇÕES DE USUÁRIOS

    static validarBuscaDeUsuarios(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarCadastroDeUsuarioComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        Cypress.env('idUsuarioCadastrado', resposta.body._id)
    }

    static validarCadastroDeUsuarioSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Este email já está sendo usado')
    }

    static validarBuscaDeUsuarioPorId(resposta) {
        expect(resposta.body).to.be.a('object')
    }

    static validarEdicaoDeUsuario(resposta) {
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static validarExclusaoDeUsuario(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')

    }

    //VALIDAÇÕES DE LOGIN

    static validaLoginComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Login realizado com sucesso')
    }

    static validaLoginSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
        expect(resposta.status).to.equal(400)
    }

    //VALIDAÇÕES DE PRODUTOS

    static validarBuscaDeProdutos(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarCadastroDeProdutoComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static validarBuscaDeProdutoCadastradoPorId(resposta) {
        expect(resposta.body).to.be.a('object')
    }

    static validarEdicaoDeProdutoCadastradoComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static validarExclusaoDeProduto(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    //VALIDAÇÕES DE CARRINHOS

    static validarBuscaDeCarrinhos(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarCadastroDeCarrinho(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarFinalizaçãoDeCompraComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

}