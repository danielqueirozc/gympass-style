// make: criar

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register"


// Factory Pattern
export function makeRegisterService() {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    return registerUseCase
}