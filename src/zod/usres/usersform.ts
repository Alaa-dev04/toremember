import { z } from "zod";
export const Createusershema = z.object({
  frist_name: z.string().min(2, "الاسم يجب ان يكون حرفين على الاقل "),
  last_name: z.string().min(2, "الاسم يجب ان يكون حرفين على الاقل "),
  user_name: z.string().min(3, "الاسم يجب ان يكون حرفين على الاقل "),
  dep_id: z.string().min(1, "يرجى اختيار القسم "),
  role: z.string().min(1, "  يرجى اختيار الصلاحيه  "),
  password: z.string().min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل"),
  confirm_password: z.string().min(1, "يرجى تأكيد كلمة السر"),
}).refine((data)=>data.password=== data.confirm_password,{
    message:'الكلمات غير متطتبقتان',
    path:['confirm_password'],

});
export type CreateUserFormValues = z.infer<typeof  Createusershema>;


