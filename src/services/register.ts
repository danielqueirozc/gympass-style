import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

// SOLID
// D - Dependency Inversion Priciple

export class RegisterUseCase {

    constructor (private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const password_hash = await hash(password, 6) // quando retorna uma promise usamos o await para aguardar finalizar
        // 6 e o numero de rounds -> quanto mais rounds mais seguro, porem mais lento
    
        
        const user = await this.usersRepository.create({ name, email, password_hash })

        return {
            user,
        }
        
    }
      
}
 