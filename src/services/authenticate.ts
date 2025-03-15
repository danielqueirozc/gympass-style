import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServiceRequest {
    email: string
    password: string
}

interface AuthenticateServiceResponse {
    user: User
}

export class AuthenticateService {
    constructor (private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
         const user = await this.usersRepository.findByEmail(email)

         if (!user) {
             throw new InvalidCredentialsError()
         }

         const doesPasswordMatches = await compare(password, user.password_hash) // pega a senha sem o hash e a senha com hash e compara se a senha sem hash e verifica se ela pode ser usada para gerar aquele hash

         if (!doesPasswordMatches) {
             throw new InvalidCredentialsError()
         }

         return {
            user,
         }
    }

    // Boolean => "is" ""has" "does":  verbos que vao trazer sentido se sim ou nao
}

  