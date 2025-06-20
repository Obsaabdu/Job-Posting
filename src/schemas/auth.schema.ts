    import {z} from 'zod';

    export const signupSchema = z.object({
        name: z.string().min(1).regex(/^[A-Za-z]+$/, "Only letters allowed"),
        email: z.string().email(),
        password: z.string().min(8).refine(
            (val) => 
                /[A-Z]/.test(val) &&
                /[a-z]/.test(val) &&
                /[0-9]/.test(val) &&
                /[!@#$%^&*]/.test(val),
                {
                    message: "Password must include upper, lower, and special character.",
                }
        ),
        role: z.enum(["company", "applicant"]),
    });


    export type SignupInput = z.infer<typeof signupSchema>;