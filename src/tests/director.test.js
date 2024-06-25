const request = require("supertest")
const app = require('../app')

let directorId

const director = {
    firtName: "andres",
    lastName: "Gonzales",
    nationality: "Mexico",
    image: "cualquier",
    birthday: "1982"
}

const BASE_URL = '/api/v1/directors'

test("Post -> 'BASE_URL', should return status code 201 and res.body.nationality === director.nationality", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.nationality).toBe(director.nationality);
})

test("Get -> 'BASE_URL', should return status code 200 and res.body to have length = 1", async () => {
    const res = await request(app)

        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Get -> 'BASE_URL/:id', should status code 200, res.body.lastName === director.lastName", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(director.lastName)
})

test("Put -> 'BASE_URL/:id', should return status code 200, res.body.firtName === directorUpdate.firtName", async () => {
    const directorUpdate = {
        firtName: "Juanito"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firtName).toBe(directorUpdate.firtName)
})

test("Delete -> 'BASE_URL'/:id, should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})