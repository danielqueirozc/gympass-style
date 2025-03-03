import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "@/services/register"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body) // safe vai disparar um throw se a validação falhar e vai para o codigo

   try {
          const usersRepository = new PrismaUsersRepository()
          const registerUseCase = new RegisterUseCase(usersRepository)

          await registerUseCase.execute({ name, email, password })

     } catch (error) {
          if (error instanceof UserAlreadyExistsError) {
               return reply.status(409).send({ message: error.message })
          }

          throw error // fastify que esta lidando com esse erro
     }

 return reply.status(201).send()

}
