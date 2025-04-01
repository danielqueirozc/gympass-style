import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "@/services/authenticate"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body) // safe vai disparar um throw se a validação falhar e vai para o codigo

   try {
          const usersRepository = new PrismaUsersRepository()
          const authenticateService = new AuthenticateService(usersRepository)

          await authenticateService.execute({ email, password })

     } catch (error) {
          if (error instanceof InvalidCredentialsError) {
               return reply.status(400).send({ message: error.message }) // status: bad request: foi passada informacoes erradas
          }

          throw error // fastify que esta lidando com esse erro
     }
 
    return reply.status(200).send() // nao vou retornar 201 pq n ao estou criando nenhum recurso

}
