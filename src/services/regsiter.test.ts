import {  expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

// describe: grupos de testes / categorias
describe('Register use case', () => {
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()

        const resgisterUseCase = new RegisterUseCase(usersRepository)

        const { user } = await resgisterUseCase.execute({
            name: 'John Doe',
            email: 'KZd2Q@example.com',
            password: '123456'
        })


        expect(user.id).toEqual(expect.any(String)) // eu espero que o user.id seja igual a qualquer string
      
    })

    it('shold hash user password ipon registration', async () => {
        // const prismaUsersRepository = new PrismaUsersRepository() // usando o repositorio nao e mais um teste unitario mas sim um teste de integracao, (testando a integracao do  prisma repository com o registerUseCase)
        // // teste unitario nunca toca no banco de dados da aplicacao e em camadas externas


        const usersRepository = new InMemoryUsersRepository()

        // criei um mock para simular o prismaUsersRepository, assim posso testar o registerUseCase sem o banco de dados
        const resgisterUseCase = new RegisterUseCase(usersRepository)

        const { user } = await resgisterUseCase.execute({ // PEGANDO O USUARIO QUE FOI CRIADO NO TESTE
            name: 'John Doe',
            email: 'KZd2Q@example.com',
            password: '123456'
        })

        // console.log(user.password_hash)

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash) // compare: compara a senha criptografada com a senha original

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        // const prismaUsersRepository = new PrismaUsersRepository() // usando o repositorio nao e mais um teste unitario mas sim um teste de integracao, (testando a integracao do  prisma repository com o registerUseCase)
        // // teste unitario nunca toca no banco de dados da aplicacao e em camadas externas


        const usersRepository = new InMemoryUsersRepository()

        // criei um mock para simular o prismaUsersRepository, assim posso testar o registerUseCase sem o banco de dados
        const resgisterUseCase = new RegisterUseCase(usersRepository)

        const email = 'johndoe.example.com'

       await resgisterUseCase.execute({ 
            name: 'John Doe',
            email,
            password: '123456'
        })

        expect(() => 
            resgisterUseCase.execute({ 
                name: 'John Doe',
                email,
                password: '123456'
            }) // eu espero que quando essa promise terminar de executar
        ).rejects.toBeInstanceOf(UserAlreadyExistsError) // eu quero que ela rejeite e que o resultado seja uma instancia da classe UserAlreadyExistsError
      
    })
}) 
