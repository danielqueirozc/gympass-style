import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

// SOLID
// D - Dependency Inversion Priciple

export class RegisterUseCase {

    constructor (private usersRepository: UsersRepository) {

    }

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('User already exists')
        }

        const password_hash = await hash(password, 6) // quando retorna uma promise usamos o await para aguardar finalizar
        // 6 e o numero de rounds -> quanto mais rounds mais seguro, porem mais lento
    
        
        await this.usersRepository.create({ name, email, password_hash })
        
    }
      
}
 