import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service"

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body) // safe vai disparar um throw se a validação falhar e vai para o codigo

   try {
          const authenticateService = makeAuthenticateService()  


          await authenticateService.execute({ email, password })

     } catch (error) {
          if (error instanceof InvalidCredentialsError) {
               return reply.status(400).send({ message: error.message }) // status: bad request: foi passada informacoes erradas
          }

          throw error // fastify que esta lidando com esse erro
     }
 
    return reply.status(200).send() // nao vou retornar 201 pq n ao estou criando nenhum recurso

}
