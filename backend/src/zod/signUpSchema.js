import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email : z.string().email(),
});