/// <reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from "../fixtures/facture"


describe('Casos de teste sobre a rota /produtos da API Serverest', () => {

    //LISTAR TODOS OS PRODUTOS CADASTRADOS
    it('Deve buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then( res => {
            cy.contractValidation(res, 'get-produtos', 200)
            ValidaServerest.validarBuscaDeProdutos(res)
        })
    })

    it('Não deve postar produto sem estar logado', () => {
        let produto = Factory.gerarProduto()
        Serverest.cadastrarProdutoSemLogar(produto).then( res => {
            cy.contractValidation(res, 'post-produtos', 401)
            ValidaServerest.validarCadastroDeProdutoSemLogar(res)
        })
    })

    //Primeiro preciso realizar o login para conseguir realizar as validações que necessitam de autenticação
    context('Logar com sucesso usando um usuário administrador', () => {
        beforeEach('Logar', () => {
            Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
              Serverest.logar(usuario).then( res => {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
              })
            })
        })

        it('Deve postar um novo produto com sucesso', () => {
            let produto = Factory.gerarProduto()
            Serverest.cadastrarProduto(produto).then( res => {
                cy.contractValidation(res, 'post-produtos', 201)
                ValidaServerest.validarCadastroDeProdutoComSucesso(res)
            })
        })

        it('Não deve postar um produto já cadastrado', () => {
            Serverest.buscarProdutoExistente()
            cy.get('@produtoExistente').then( produto => {
                Serverest.cadastrarProduto(produto).then( res => {
                    cy.contractValidation(res, 'post-produtos', 400)
                    ValidaServerest.validarCadastroDeProdutoSemSucesso(res)
                })
            })
        })

        it('Deve realizar a busca do produto cadastrado pelo Id', () => {
            Serverest.buscarProdutoCadastradoPorId().then( res => {
                cy.contractValidation(res, 'get-produtos-by-id', 200)
                ValidaServerest.validarBuscaDeProdutoCadastradoPorId(res)
            })
        })

        it('Deve realizar a busca de um produto por um Id não existente', () => {
            Serverest.buscarProdutoCadastradoPorIdSemSucesso().then( res => {
                cy.contractValidation(res, 'get-produtos-by-id', 400)
                ValidaServerest.validarBuscaDeProdutoCadastradoPorIdSemSucesso(res)
            })
        })

        it('Deve editar os dados do produto cadastrado com sucesso', () => {
            let produto = Factory.gerarProduto()
            Serverest.editarProdutoCadastrado(produto).then( res => {
                cy.contractValidation(res, 'put-produtos-by-id', 200)
                ValidaServerest.validarEdicaoDeProdutoCadastradoComSucesso(res)
            })
        })

        it('Não deve editar um produto com as mesmas informações de produto já cadastrado', () => {
            Serverest.buscarProdutoExistente()
            cy.get('@produtoExistente').then( produto => {
                Serverest.editarProdutoCadastrado(produto).then( res => {
                    cy.contractValidation(res, 'put-produtos-by-id', 400)
                    ValidaServerest.validarEdicaoDeProdutoSemSucesso(res)
                })
            })
        })

        it('Deve excluir o produto cadastrado com sucesso', () => {
            Serverest.deletarProdutoCadastrado().then( res => {
                cy.contractValidation(res, 'delete-produtos-by-id', 200)
                ValidaServerest.validarExclusaoDeProduto(res)
            })
        })
    })

    context('Logar com sucesso usando um usuário não administrador', () => {
        beforeEach('Logar', () => {
            Serverest.buscarUsuarioNaoAdmParaLogin()
            cy.get('@usuarioNaoAdmLogin').then( usuario => {
              Serverest.logar(usuario).then( res => {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
              })
            })
        })

        it('Não deve postar um novo produto com usuário não administrador', () => {
            let produto = Factory.gerarProduto()
            Serverest.cadastrarProduto(produto).then( res => {
                cy.contractValidation(res, 'post-produtos', 403)
                ValidaServerest.validarCadastroDeProdutoUsuarioNaoAdm(res)
            })
        })

        it('Não deve editar produto usando usuário não administrador', () => {
            let produto = Factory.gerarProduto()
            Serverest.editarProdutoCadastrado(produto).then( res => {
                cy.contractValidation(res, 'put-produtos-by-id', 403)
                ValidaServerest.validarEdicaoDeProdutoUsuarioNaoAdm(res)
            }) 
        })


    })

  })