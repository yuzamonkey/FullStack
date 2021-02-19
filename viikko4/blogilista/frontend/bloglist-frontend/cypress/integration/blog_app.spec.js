describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Testi Kayttaja',
            username: 'testikayttaja',
            password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('#username')
        cy.get('#password')
        cy.get('#login-button')
    })
    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('testikayttaja')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
        })

        it.only('fails with wrong credentials', function () {
            cy.get('#username').type('testayttaja')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
            cy.contains('Wrong username or password')
            cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
})



