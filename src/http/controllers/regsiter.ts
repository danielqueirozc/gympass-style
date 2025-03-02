import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { registerUseCase } from "@/services/register"

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body) // safe vai disparar um throw se a validação falhar e vai para o codigo

   try {
        registerUseCase({ name, email, password })
   } catch {
        return reply.status(409).send() // erro 409: conflict / dados duplicados
   }

    return reply.status(201).send()
 }

 // 
