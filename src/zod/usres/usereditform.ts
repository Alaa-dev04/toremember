import { Update } from './usershared';
import { z } from "zod";
export const Editeusershema = z
  .object({
    frist_name:
     z.string()
     .min(2, "الاسم يجب ان يكون حرفين على الاقل "),
    last_name:
    z.string()
    .min(2, "الاسم يجب ان يكون حرفين على الاقل "),
    user_name: 
    z.string()
    .min(3, "الاسم يجب ان يكون حرفين على الاقل "),
    dep_id: 
    z.string()
    .min(1, "يرجى اختيار القسم "),
    role: 
    z.string()
    .min(1, "  يرجى اختيار الصلاحيه  "),
    password:
     z.string().optional(),
    confirm_password: 
    z.string().optional(),
   is_disabled:z.boolean(),
  })
   .refine(
    (data) => {
      // only validate if password was entered
      if (!data.password) return true;

      return data.password === data.confirm_password;
    },
    {
      message: 'كلمتا السر غير متطابقتين',
      path: ['confirm_password'],
    }
  );
export type UpdateUserFormValues = z.infer<typeof Editeusershema>;
