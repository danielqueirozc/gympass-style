import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

// funcao que vai lidar com os erros globais
app.setErrorHandler((error, _, reply) => { // quando houver um erro, ele vai executar essa funcao / quando nao estiver usando um parametro colocar um underline
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'validation error', isseus: error.format() }) // status: bad request
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'internal server error' })
}) 

// quando instalar o vitest, instalar esse plugin tambem: vite-tsconfig-paths para ele reconhecer o caminho com @ que configurei no tsconfig
// mo package.json: test: "vitest run" => vai rodar os testes mas nao vai ficar no modo watch esperando alteracoes