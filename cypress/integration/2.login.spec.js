/// <reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'


describe('Casos de teste sobre a rota /login da API Serverest', () => {

    it('Deve realizar o login corretamente', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.logar(usuario).then( res => {
              cy.contractValidation(res, 'post-login', 200)
              ValidaServerest.validaLoginComSucesso(res)
              Serverest.salvarBearer(res)
        })
      })
    })

    it('Deve realizar a tentativa de login com senha errada sem sucesso', () => {
        Serverest.buscarUsuarioComSenhaErrada()
        cy.get('@usuarioComSenhaErrada').then( usuario => {
            Serverest.logar(usuario).then( res => {
              cy.contractValidation(res, 'post-login', 400)
              ValidaServerest.validaLoginSemSucesso(res)
            })
        })
    })

})