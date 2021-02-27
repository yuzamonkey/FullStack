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
  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('testikayttaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create blog').click()
      cy.get('#title').type('testiotsikko')
      cy.get('#author').type('testikirjailija')
      cy.get('#url').type('testiurl')
      cy.get('#createBlog').click()
      cy.contains('testiotsikko')
      cy.contains('testikirjailija')
    })

    it('A blog can be liked', function () {
      cy.contains('create blog').click()
      cy.get('#title').type('testiotsikko')
      cy.get('#author').type('testikirjailija')
      cy.get('#url').type('testiurl')
      cy.get('#createBlog').click()
      cy.contains('testiotsikko')
      cy.contains('testikirjailija')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be deleted', function () {
      cy.contains('create blog').click()
      cy.get('#title').type('testiotsikko')
      cy.get('#author').type('testikirjailija')
      cy.get('#url').type('testiurl')
      cy.get('#createBlog').click()
      cy.contains('testiotsikko')
      cy.contains('testikirjailija')
      cy.contains('view').click()
      cy.contains('delete').click()
    })

    const like = (title, n) => {
      for (let i = 0; i < n; i++) {
        cy.contains(title).contains('like').click()
      }
    }
    const createBlogs = (n) => {
      for (let i = 1; i <= n; i++) {
        cy.contains('create blog').click()
        cy.get('#title').type(`testiotsikko ${i}`)
        cy.get('#author').type(`testikirjailija${i}`)
        cy.get('#url').type(`testiurl${i}`)
        cy.get('#createBlog').click()
      }
    }

    it.only('Blogs are ordered by likes', function () {
      createBlogs(4)
      cy.contains('testiotsikko 1').parent().find('button').click()
      like('testiotsikko 1', 3)
      cy.contains('testiotsikko 2').parent().find('button').click()
      cy.contains('testiotsikko 3').parent().find('button').click()
      like('testiotsikko 3', 7)
      cy.contains('testiotsikko 4').parent().find('button').click()

      //cy.get('#blogs .likeCount').each(element => likes.push(element.text()))
      let previousLikeCount = undefined
      cy.get('#blogs .likeCount').each(element => {
        const likeCount = Number(element.text())
        if (!previousLikeCount || likeCount <= previousLikeCount) {
          previousLikeCount = likeCount
        } else {
          throw new Error("NOT IN ORDER")
        }
      })
    })
  })
})



