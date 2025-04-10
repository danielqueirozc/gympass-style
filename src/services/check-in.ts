import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInServiceRequest {
    userId: string
    gymId: string
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService {
    constructor (private checkInsRepository: CheckInsRepository) {}

    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn
        }
        
    }

    // Boolean => "is" ""has" "does":  verbos que vao trazer sentido se sim ou nao
}

  