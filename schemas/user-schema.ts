import { EMAIL_REGEX } from '@/lib/regex';
import {z} from 'zod';

export const SigninSchema = z.object({
    email: z.string().regex(EMAIL_REGEX, {
        message: "L'adresse e-mail n'est pas valide",
    }),
    password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
})

export type SigninSchemaType = z.infer<typeof SigninSchema>;