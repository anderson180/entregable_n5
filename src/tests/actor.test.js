const request = require("supertest")
const app = require('../app')

let actorId

const actor = {
    firtName: "anderson",
    lastName: "acibe",
    nationality: "ecuador",
    image: "cualquier",
    birthday: "1992"
}

const BASE_URL = '/api/v1/actors'

test("Post -> 'BASE_URL', should return status code 201 and res.body.firtName === actor.firtName", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firtName).toBe(actor.firtName);
})

//Debe tener la cantidad de registros, que en este caso solo es 1
test("Get -> 'BASE_URL', should return status code 200 and res.body to have length = 1", async () => {
    const res = await request(app)

        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    //expect(res.body.length).toBe(1) => Mas lento
    expect(res.body).toHaveLength(1) //=> Mas rrapido - optimizado por la libreria
})

test("Get -> 'BASE_URL/:id', should return status code 200, res.body.firtName === actor.firtName", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)// Dinamico

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firtName).toBe(actor.firtName)
})

test("Put -> 'BASE_URL/:id', should return status code 200, res.body.lastName === actorUpdate.lastName", async () => {
    const actorUpdate = {
        //Ristros que se van a modificar
        lastName: "soto",
        nationality: "cuba"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(actorUpdate.lastName)
    expect(res.body.nationality).toBe(actorUpdate.nationality)
})

test("Delete -> 'BASE_URL'/:id, should return status code 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
})