import Ajv from 'ajv'
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

Cypress.Commands.add('contractValidation', (res, schema, status) => {
    cy.log('Validando contrato para ' + schema + ' com status ' + status)
    cy.fixture(`schemas/${schema}/${status}.json`).then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        if (!valid) {
            var errors = ''
            for (let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but received ${typeof err.data}`
            }
            throw new Error('Erros encontrados na validação de contrato, por favor verifique: ' + errors)
        }
    })
})

Cypress.Commands.add('postarUsuarioSemSucesso', (email, password) => { 
    cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: {
          "nome": "Fulano da Silva",
          "email": "beltrano@qa.com.br",
          "password": "teste",
          "administrador": "true"
        }
    })
 })

 Cypress.Commands.add('rest', (method = 'GET', url = '/', body, failOnStatusCode = false) => {
    return cy.request({
        method: method,
        url: url,
        failOnStatusCode: failOnStatusCode,
        body: body
    })
 })

 Cypress.Commands.add('logar', (email, senha) => {
    cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            "email": email,
            "password": senha
        }
    })
 })

 Cypress.Commands.add('buscarUsuarioParaLogin', () => {
    cy.rest('GET', '/usuarios').then( res => {
        return {
            email: res.body.usuarios[0].email,
            senha: res.body.usuarios[0].password
        }
      })
 })