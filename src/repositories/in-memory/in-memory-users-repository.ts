import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> { // nao e necessario colocar o que vai reotar pq ele ja sabe automaticamente, so coloquei para nao esquecer
        const user= this.items.find(item => item.email === email) // busca pelo email

        if (!user) {    
            return null
        }

        return user
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

        this.items.push(user)

        return user
    }

} 