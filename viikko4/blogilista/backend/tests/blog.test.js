const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const addBlogPost = async () => {
    const blogObject = {
        title: "testi410sdkfjhsdlkfh",
        url: "www.sfogijdfgjs.com",
        likes: 10,
    }
    const response = await api
        .post('/api/blogs')
        .send(blogObject)
    return response.body.id
}
const getBlogPost = async (id) => {
    console.log("GET BLOGPOST BY ID === ", id)
    const blog = await api.get(`/api/blogs/${id}`)
    console.log("BLOG from test", blog)
    return blog
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
        expect(response.body).toHaveLength(3)
    })
})
//4.9. OK
describe('check that all blogs have id-field called "id"', () => {
    test('id is called id, not _id', async () => {
        const response = await api.get('/api/blogs')
        const body = response.body
        body.forEach(item => {
            console.log("ITEM", item)
            expect(item.id).toBeDefined()
        })
    })
})
//4.10 OK
describe('add blog increases amount of blogs by one', () => {
    test('add blog', async () => {
        const length = getBlogPostCount()
        addBlogPost()
        expect(response.body.title).toBeDefined()
        expect(response.body.url).toBeDefined()
        expect(response.body.likes).toBeDefined()
        expect(response.body.id).toBeDefined()
        const after = await api.get('/api/blogs')
        expect(after.body.length).toBe(length + 1)
    })
})

// 4.11 ok
describe('if no likes, put value 0', () => {
    test('no likes in post-method', async () => {
        const response = await api.post('/api/blogs')
        if (response.body.likes === undefined) {
            expect(response.body.likes).toBe(0)
        }
    })
})

// 4.12 ok
describe('if no title or url, 400 Bad Request', () => {
    test('response 400 for invalid request', async () => {
        await api.post('/api/blogs').expect(400)
    })
})

// 4.13 ok
describe('delete item', () => {
    test('deleting item by id', async () => {
        const id = await addBlogPost()
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
        const id = await addBlogPost()
        //getLikes
        const likesBefore = await getBlogPost(id).likes
        console.log("LIKES BEFORE", likesBefore)
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


