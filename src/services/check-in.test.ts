import {  expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-rerpository'
import { CheckInService } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService
// describe: grupos de testes / categorias
describe('Check-in use case', () => {
    // beforeEach: executa antes de cada um dos testes
    beforeEach(() => {
        
        checkInsRepository = new InMemoryCheckInsRepository()
        // criei um mock para simular o prismaUsersRepository, assim posso testar o registerUseCase sem o banco de dados
        sut = new CheckInService(checkInsRepository)
    })
    
    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
           gymId: 'gym-01',
           userId: 'user-01'
        })


        expect(checkIn.id).toEqual(expect.any(String)) // eu espero que o user.id seja igual a qualquer string
      
    })

}) 
