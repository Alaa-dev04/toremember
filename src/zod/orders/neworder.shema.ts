import { z } from 'zod';

export const itemSchema = z.object({
  item_id: z.string().min(1, 'يرجى اختيار العنصر المطلوب'),
  company_id: z.string().min(1, 'يرجى اختيار الشركة'),
  department_id: z.string().min(1, 'يرجى اختيار القسم'),
  quantity: z.number().min(1, 'الكمية يجب أن تكون أكبر من 0'),
  applier_id: z.string().min(1, 'يرجى اختيار مقدم الطلب'),
});

export const orderSchema = z.object({
  tempItem: itemSchema,
  items: z
    .array(
      z.object({
        id: z.string(),
        item_id: z.number(),
        item: z.string(),
        quantity: z.number(),
        company_id: z.number(),
        company: z.string(),
        department_id: z.number(),
        department: z.string(),
        applier_id: z.number(),
        applicant: z.string(),
        date: z.string(),
      })
    )
    .min(1, 'يجب إضافة عنصر واحد على الأقل للطلب'),
  notes: z.string().min(1, 'يرجى كتابة سبب الطلب بالتفصيل'),
  editingIndex: z.number().nullable().optional(),
  deleteIndex: z.number().nullable().optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
export type ItemValues = z.infer<typeof itemSchema>;
