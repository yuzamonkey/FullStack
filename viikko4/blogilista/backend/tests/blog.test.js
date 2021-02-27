const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')

const api = supertest(app)

const TEST_USER_USERNAME = 'integration-test'
const TEST_USER_PASSWORD = 'password'

const MOCK_BLOG = {
    title: "mock-title",
    url: "www.mock.com",
    likes: 123
}

const loginTestUser = async () => {
    const response = await api
        .post('/api/login')
        .send({
            username: TEST_USER_USERNAME,
            password: TEST_USER_PASSWORD
        })
    return response.body.token
}

const addBlogPost = async (accessToken, blog = MOCK_BLOG) => {
    const response = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + accessToken)
        .send(blog)
    return response.body
}

const getBlogPost = async (id) => {
    const blog = await api.get(`/api/blogs/${id}`)
    return blog.body
}
const getBlogPostCount = async () => {
    const get = await api.get('/api/blogs')
    const count = get.body.length
    return count
}
const deleteBlogPost = async (id) => {
    await api.delete(`/api/blogs/${id}`)
}
const updateLikes = async (id, newLikes) => {
    await api.put(`/api/blogs/${id}`).send({likes: newLikes})
}

describe('correct number of blogs', () => {
    test('return right number of blogs', async () => {
        const response = await api.get('/api/blogs')
        const actualCount = response.body.length
        const expectedCount = await Blog.count()
        expect(actualCount).toBe(expectedCount)
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

describe('add blog increases amount of blogs by one', () => {
    test('add blog', async () => {
        const accessToken = await loginTestUser()
        const beforeCount = await getBlogPostCount()
        const addedBlog = await addBlogPost(accessToken)
        expect(addedBlog.title).toBeDefined()
        expect(addedBlog.url).toBeDefined()
        expect(addedBlog.likes).toBeDefined()
        expect(addedBlog.id).toBeDefined()
        const afterCount = await getBlogPostCount()
        expect(afterCount).toBe(beforeCount + 1)
    })
})

describe('if no likes, put value 0', () => {
    test('no likes in post-method', async () => {
        const accessToken = await loginTestUser()
        const blog  = {
            title : 'x',
            url: 'y'
        }
        const id = (await addBlogPost(accessToken, blog)).id
        const actualLikes = (await getBlogPost(id)).likes
        expect(actualLikes).toBe(0)
    })
})

describe('if no title or url, 400 Bad Request', () => {
    test('response 400 for invalid request', async () => {
        await api.post('/api/blogs').expect(400)
    })
})

// 4.13 ok
describe('delete item', () => {
    test('deleting item by id', async () => {
        const id = await addBlogPost().id
        const countBefore = await getBlogPostCount()
        await deleteBlogPost(id)
        const countAfter = await getBlogPostCount()
        expect(countAfter).toEqual(countBefore - 1)
    })
})

//4.14 kesken
describe('edit likes of blog', () => {
    test('editing updates likes', async () => {
        //addBlog
        const id = await addBlogPost().id
        //getLikes
        const likesBefore = await getBlogPost(id).likes
        //console.log("LIKES BEFORE", likesBefore)
        //updateLikes+10
        await updateLikes(id, likesBefore+10)
        //getLikes
        const likesAfter = await getBlogPost(id).likes
        expect(likesAfter).toEqual(likesBefore+10)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})


