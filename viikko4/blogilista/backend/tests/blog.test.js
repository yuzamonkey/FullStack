const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('correct number of blogs', () => {
    test('return right number of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(3)
    })
})

describe('check that all blogs have id-field called "id"', () => {
    test('id is called id, not _id', async () => {
        const response = await api.get('/api/blogs')
        const body = response.body
        body.forEach(item => {
            expect(item.id).toBeDefined()
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})








































/*
const listHelper = require('../utils/list_helper')

const blog = []
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const blogs = [
    {
        _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0
    }
]

describe('return one', () => {
    test('dummy return one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {

    test('return total likes', () => {
        const result1 = listHelper.totalLikes(blog)
        expect(result1).toBe(0)
        const result2 = listHelper.totalLikes(listWithOneBlog)
        expect(result2).toBe(5)
        const result3 = listHelper.totalLikes(blogs)
        expect(result3).toBe(36)
    })
})

describe('get favorite blog', () => {
    test('favorite blog', () => {
        const result1 = listHelper.favoriteBlog(blog)
        expect(result1).toEqual(undefined)
        const result2 = listHelper.favoriteBlog(listWithOneBlog)
        expect(result2).toEqual({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5
        })
        const result3 = listHelper.favoriteBlog(blogs)
        expect(result3).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })
    })
})

*/