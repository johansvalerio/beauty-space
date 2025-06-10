import { Cita } from '@prisma/client';

export type Citas = CitaWithUser[]

export interface CitaWithUser extends Cita {
    user: {
        user_name: string;
        user_email: string;
        user_phone: string;
        user_image: string;
        // ... otras propiedades del usuario
    };
}