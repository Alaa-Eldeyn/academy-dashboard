
import { z } from "zod";

export  const signinValidation = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
      .min(5, "Password must be at least 5 characters")
});

