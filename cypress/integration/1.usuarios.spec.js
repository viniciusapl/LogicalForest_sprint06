/// <reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from "../fixtures/facture"


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {
  
    it('Deve buscar todos os usuários cadastrados', () => {
      Serverest.buscarUsuarios().then( res => {
        cy.contractValidation(res, 'get-usuarios', 200)
        ValidaServerest.validarBuscaDeUsuarios(res)
      })
    })

    context('Filtrar e separar os usuários conforme sua categoria', () => {
      it('Deve buscar e salvar os usuários administradores em um arquivo json', () => {
        Serverest.buscarUsuariosAdministradores()
        cy.get('@listaDeAdms').then( res => {
          cy.log(JSON.stringify(res))
          cy.writeFile('./cypress/fixtures/usuarios-adms.json', res)
          ValidaServerest.validarAdm(res)
        })
      })
  
      it('Deve buscar e salvar os usuários não administradores em um arquivo json', () => {
        Serverest.buscarUsuariosNaoAdministradores()
        cy.get('@listaDeNaoAdms').then( res => {
          cy.log(JSON.stringify(res))
          cy.writeFile('./cypress/fixtures/usuarios-nao-adms.json', res)
          ValidaServerest.validarAdm(res)
        })
      })
    })

    it('Deve cadastrar um novo usuário administrador', () => {
      Serverest.cadastrarNovoUsuarioAleatorio().then( res => {
        cy.contractValidation(res, 'post-usuarios', 201)
        ValidaServerest.validarCadastroDeUsuarioComSucesso(res)
      })
    })

    it('Não deve realizar o cadastro de um usuário com e-mail já cadastrado', () => {
      Serverest.buscarUsuarioExistente()
      cy.get('@usuarioExistente').then( usuario => {
        Serverest.cadastrarNovoUsuario(usuario).then( res => {
          cy.contractValidation(res, 'post-usuarios', 400)
          ValidaServerest.validarCadastroDeUsuarioSemSucesso(res)
        })
      })
    })

    it('Deve buscar o usuário cadastrado pelo seu Id com sucesso', () => {
      Serverest.buscarUsuarioPorId().then(res => {
        cy.contractValidation(res, 'get-usuario-by-id', 200)
        ValidaServerest.validarBuscaDeUsuarioPorId(res)
      })
    })

    it('Deve buscar o usuário cadastrado pelo seu Id sem sucesso', () => {
      Serverest.buscarUsuarioPorIdSemSucesso().then(res => {
        cy.contractValidation(res, 'get-usuario-by-id', 400)
        ValidaServerest.validarBuscaDeUsuarioPorIdSemSucesso(res)
      })
    })

    it('Deve editar os dados do usuário cadastrado', () => {
      Serverest.editarUsuarioCadastrado().then(res => {
        cy.contractValidation(res, 'put-usuarios-by-id', 200)
        ValidaServerest.validarEdicaoDeUsuario(res)
      })
    })

    
    it('Deve excluir o usuário cadastrado', () => {
      Serverest.excluirUsuarioCadastrado().then(res => {
        cy.contractValidation(res, 'delete-usuarios-by-id', 200)
        ValidaServerest.validarExclusaoDeUsuario(res)
      })
    })
  })