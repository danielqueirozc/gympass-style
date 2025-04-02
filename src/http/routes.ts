import { FastifyInstance } from "fastify";
import { register } from "./controllers/regsiter";
import { authenticate } from "./controllers/authenticate";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate) // sessao de login ou autenticacao / traduzir rotas para entidades


}