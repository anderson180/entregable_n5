const request = require("supertest")
const app = require('../app')

let movieId

const movie = {
    name: "El Perrito Callejero",
    image: "El Perrito",
    synopsis: "nada",
    relaseYear: "1950",
}

const BASE_URL = '/api/v1/movies'

test("Post -> 'BASE_URL', should return status code 201 and res.body.name === movie.name", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name);
})

test("Get -> 'BASE_URL/:id', should return status code 200, res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("Put -> 'BASE_URL/:id', should return status code 200, res.body.name === movieUpdate.relaseYear", async () => {
    const movieUpdate = {
        relaseYear: "2024",
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.relaseYear).toBe(movieUpdate.relaseYear)
})

test("Delete -> 'BASE_URL'/:id, should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
})