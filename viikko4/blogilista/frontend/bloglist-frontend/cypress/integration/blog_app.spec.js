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

        it('fails with wrong credentials', function () {
            cy.get('#username').type('testayttaja')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
            cy.contains('Wrong username or password')
            cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('testikayttaja')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function() {
            cy.contains('create blog').click()
            cy.get('#title').type('testiotsikko')
            cy.get('#author').type('testikirjailija')
            cy.get('#url').type('testiurl')
            cy.get('#createBlog').click()
            cy.contains('testiotsikko')
            cy.contains('testikirjailija')
        })

        it.only('A blog can be liked', function () {
            cy.contains('create blog').click()
            cy.get('#title').type('testiotsikko')
            cy.get('#author').type('testikirjailija')
            cy.get('#url').type('testiurl')
            cy.get('#createBlog').click()
            cy.contains('testiotsikko')
            cy.contains('testikirjailija')
            cy.contains('view').click()
            //outoa, ettei päivity yhdellä klikkauksella
            cy.contains('like').click()
            cy.contains('like').click()
            cy.contains('likes: 1')
        })
    })
})



