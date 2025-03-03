export class UserAlreadyExistsError extends Error { // estendendo a classe erro do js nativa
    constructor() {
        super('E-mail  already exists.') // super: e o new Error do js
    }
} 