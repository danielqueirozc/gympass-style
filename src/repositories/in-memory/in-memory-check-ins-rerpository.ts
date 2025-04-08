import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = [];

    
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = {
            id: randomUUID(),
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null, // se vier um valor vai ser salvo como Date
            user_id: data.user_id,
            gym_id: data.gym_id
        }

        this.items.push(checkIn)

        return checkIn
    }

}