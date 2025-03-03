import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import {  expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

// describe: grupos de testes / categorias
describe('Register use case', () => {
    it('shold hash user password ipon registration', async () => {
        const prismaUsersRepository = new PrismaUsersRepository() // usando o repositorio nao e mais um teste unitario mas sim um teste de integracao, (testando a integracao do  prisma repository com o registerUseCase)
        // teste unitario nunca toca no banco de dados da aplicacao e em camadas externas
        const resgisterUseCase = new RegisterUseCase(prismaUsersRepository)

        const { user } = await resgisterUseCase.execute({ // PEGANDO O USUARIO QUE FOI CRIADO NO TESTE
            name: 'John Doe',
            email: 'KZd2Q@example.com',
            password: '123456'
        })

        // console.log(user.password_hash)

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash) // compare: compara a senha criptografada com a senha original

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
}) 
