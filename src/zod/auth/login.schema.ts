import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "اسم المستخدم لازم يكون 3 حروف على الأقل"),

  password: z
    .string()
    .min(6, "كلمة المرور لازم تكون 6 أحرف على الأقل"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;