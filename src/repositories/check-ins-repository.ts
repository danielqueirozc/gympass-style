import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> // escolhi o unchecked pq e como se o gym_id e user_id ja estivessem criados
} 