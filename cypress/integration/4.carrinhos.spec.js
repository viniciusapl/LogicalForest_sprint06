/// <reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'


describe('Casos de teste sobre a rota /carrinhos da API Serverest', () => {

  it('Deve buscar todos os carrinhos cadastrados', () => {
    Serverest.buscarCarrinhos().then(res => {
      cy.contractValidation(res, 'get-carrinhos', 200)
      ValidaServerest.validarBuscaDeCarrinhos(res)
    })
  })

  context('Realizar o login com sucesso', () => {
    beforeEach('Logar', () => {
      Serverest.buscarUsuarioParaLogin()
      cy.get('@usuarioLogin').then( usuario => {
        Serverest.logar(usuario).then( res => {
          ValidaServerest.validaLoginComSucesso(res)
          Serverest.salvarBearer(res) // O Bearer está sendo salvo aqui, ele é necessário para realizar algumas requisições dentro de /carrinhos
        })
      })
    })

    it('Deve cadastrar um carrinho com sucesso', () => {
      Serverest.buscarProdutoParaCarrinho() //Aqui eu faço a busca de um produto aleatório dentro da lista de produtos
      cy.get('@produtoParaCarrinho').then( produto => {//O produto retornado na linha acima é chamado aqui no cy.get('@produtoParaCarrinho') e enviado para a próxima função para a adição do carrinho
        Serverest.adicionarCarrinhoComSucesso(produto).then( res => {
          cy.contractValidation(res, 'post-carrinhos', 201)
          ValidaServerest.validarCadastroDeCarrinho(res)
        })
      })
    })

    it('Deve buscar um carrinho pelo seu Id', () => {
      Serverest.buscarCarrinhoCadastradoPorId().then( res => {
        cy.contractValidation(res, 'get-carrinhos-by-id', 200)
        ValidaServerest.validarBuscaDeCarrinhoPorId(res)
      })
    })

    it('Deve realizar a busca de um carrinho por um Id não existente', () => {
      Serverest.buscarCarrinhoCadastradoPorIdSemSucesso().then( res => {
          cy.contractValidation(res, 'get-carrinhos-by-id', 400)
          ValidaServerest.validarBuscaDeCarrinhoCadastradoPorIdSemSucesso(res)
      })
  })

    //A exclusão do carrinho será feita aqui através da finalização da compra
    //O carrinho selecionado para exclusão é sempre o carrinho relacionado ao Bearer Token
    it('Deve realizar a exclusão do carrinho através da finalização da compra com sucesso', () => {
      Serverest.concluirCompraComSucesso().then(res => {
        cy.contractValidation(res, 'delete-carrinhos-concluir-compra', 200)
        ValidaServerest.validarFinalizaçãoDeCompraComSucesso(res)
      })
    })

    it('Não deve cadastrar um carrinho com produto duplicado', () => {
      Serverest.buscarProdutoParaCarrinho() //Aqui eu faço a busca de um produto aleatório dentro da lista de produtos
      cy.get('@produtoParaCarrinho').then( produto => {//O produto retornado na linha acima é chamado aqui no cy.get('@produtoParaCarrinho') e enviado para a próxima função para a adição do carrinho com produto duplicado
        Serverest.adicionarCarrinhoComProdutoDuplicado(produto).then( res => {
          cy.contractValidation(res, 'post-carrinhos', 400)
          ValidaServerest.validarCadastroDeCarrinhoComProdutoDuplicado(res)
        })
      })
    })
  })
  
  it('Não deve cadastrar carrinho sem possuir um token de autenticação', () => {
    Serverest.buscarProdutoParaCarrinho()
    cy.get('@produtoParaCarrinho').then( produto => {
      Serverest.postarCarrinhoSemAutenticacao(produto).then( res => {
        cy.contractValidation(res, 'post-carrinhos', 401)
        ValidaServerest.validarCadastroDeCarrinhoSemAutenticacao(res)
      })
    })
  })

  it('Não deve realizar a finalização da compra sem realizar o login', () => {
    Serverest.concluirCompraSemLogin().then(res => {
      cy.contractValidation(res, 'delete-carrinhos-concluir-compra', 200)
      ValidaServerest.validarFinalizaçãoDeCompraSemLogin(res)
    })
  })

  context('Realizar o login com sucesso usando um usuário com carrinho já cadastrado', () => {
    beforeEach('Logar', () => {
      Serverest.buscarUsuarioComCarrinho()
      cy.get('@usuarioComCarrinho').then( usuario => {
        Serverest.logar(usuario).then( res => {
          ValidaServerest.validaLoginComSucesso(res)
          Serverest.salvarBearer(res) // O Bearer está sendo salvo aqui, ele é necessário para realizar algumas requisições dentro de /carrinhos
        })
      })
    })

    it('Não deve cadastrar um carrinho para usuário com carrinho já cadastrado', () => {
      Serverest.buscarProdutoParaCarrinho() //Aqui eu faço a busca de um produto aleatório dentro da lista de produtos
      cy.get('@produtoParaCarrinho').then( produto => {//O produto retornado na linha acima é chamado aqui no cy.get('@produtoParaCarrinho') e enviado para a próxima função para a adição do carrinho
        Serverest.adicionarCarrinhoComSucesso(produto).then( res => {
          cy.contractValidation(res, 'post-carrinhos', 400)
          ValidaServerest.validarCadastroDeCarrinhoParaUsuarioComCarrinho(res)
        })
      })
    })
  })
})