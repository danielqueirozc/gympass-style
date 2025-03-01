import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import { stat } from 'fs'

export const app = fastify()

 app.post('/users', async (request, reply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body) // safe vai disparar um throw se a validação falhar e vai para o codigo

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password
        }
    })

    return reply.status(201).send()
 }) 