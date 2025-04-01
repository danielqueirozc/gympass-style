import {  expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService
// describe: grupos de testes / categorias
describe('Authenticate use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {
      
        await usersRepository.create({
            name: 'John Doe',
            email: 'KZd2Q@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'KZd2Q@example.com',
            password: '123456'
        })


        expect(user.id).toEqual(expect.any(String)) // eu espero que o user.id seja igual a qualquer string
      
    })

    it('should not be able to authenticate with wrong email', async () => {

        expect(() => 
                sut.execute({
                email: 'KZd2Q@example.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError) 
      
    })

    it('should not be able to authenticate with wrong password', async () => {
        
        await usersRepository.create({
            name: 'John Doe',
            email: 'KZd2Q@example.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => 
                sut.execute({
                email: 'KZd2Q@example.com',
                password: '122222'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
      
    })
}) 
