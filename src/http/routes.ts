import { FastifyInstance } from "fastify";
import { register } from "./controllers/regsiter";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register) 

}