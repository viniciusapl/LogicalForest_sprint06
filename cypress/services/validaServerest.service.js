

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

    static validarAdm(resposta) {
        expect(resposta).to.be.a('object')
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

    static validarCadastroDeProdutoSemLogar(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        expect(resposta.status).to.equal(401)
    }

    static validarCadastroDeProdutoComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.status).to.equal(201)
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static validarCadastroDeProdutoSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Já existe produto com esse nome')
        expect(resposta.status).to.equal(400)
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

    static validarEdicaoDeProdutoSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Já existe produto com esse nome')
        expect(resposta.status).to.equal(400)
    }

    static validarExclusaoDeProduto(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
        expect(resposta.status).to.equal(200)
    }

    static validarCadastroDeProdutoUsuarioNaoAdm(resposta) {
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
        expect(resposta.status).to.equal(403)
    }

    static validarEdicaoDeProdutoUsuarioNaoAdm(resposta) {
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
        expect(resposta.status).to.equal(403)
    }

    //VALIDAÇÕES DE CARRINHOS

    static validarBuscaDeCarrinhos(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        expect(resposta.status).to.equal(200)
    }

    static validarCadastroDeCarrinho(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.status).to.equal(201)
        Cypress.env('idCarrinhoCadastrado', resposta.body._id)
    }

    static validarCadastroDeCarrinhoSemAutenticacao(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        expect(resposta.status).to.equal(401)
    }

    static validarCadastroDeCarrinhoComProdutoDuplicado(resposta) {
        expect(resposta.body.message).to.be.eq('Não é permitido possuir produto duplicado')
        expect(resposta.status).to.equal(400)
    }

    static validarCadastroDeCarrinhoParaUsuarioComCarrinho(resposta) {
        expect(resposta.body.message).to.be.eq('Não é permitido ter mais de 1 carrinho')
        expect(resposta.status).to.equal(400)
    }

    static validarBuscaDeCarrinhoPorId(resposta) {
        expect(resposta.status).to.equal(200)
    }

    static validarBuscaDeCarrinhoCadastradoPorIdSemSucesso(resposta) {
        expect(resposta.body).to.be.a('object')
        expect(resposta.status).to.equal(400)
    }

    static validarFinalizaçãoDeCompraComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
        expect(resposta.status).to.equal(200)
    }

    static validarFinalizaçãoDeCompraSemLogin(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        expect(resposta.status).to.equal(401)
    }
}