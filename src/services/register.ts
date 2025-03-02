import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}
export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6) // qaundo retorna uma promise usamos o await para aguardar finalizar
    // 6 e o numero de rounds -> quanto mais rounds mais seguro, porem mais lento

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        throw new Error('User already exists')
    }
    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })
}
