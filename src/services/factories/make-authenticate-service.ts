import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../authenticate"

export function makeAuthenticateService() {
    const usersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    return authenticateService
}

// agora quando precisar de mais alguma dependecia eu so preciso importar ela por aqui, nao preciso mais importar em cada um dos arquivos