'use client';
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContenWiden,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, Eye, EyeOff, User } from 'lucide-react';
import { useNewUser } from "@/hooks/user-new";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from '@/components/ui/switch';
import { $api } from "@/lib/tanstack.lib";
import { useState } from "react";
import { toast } from 'sonner';
function NewUserModel() {
  const { form, isOpen, closeDialog, onCancel } = useNewUser();
  const queryClient = useQueryClient();

  const createUserMutation = $api.useMutation('post', '/users', {
    onSuccess: (res) => {
      toast.success(res?.message ?? 'تم إنشاء المستخدم بنجاح');
      form.reset();
      closeDialog?.();

      queryClient.invalidateQueries({
        queryKey: ['get', '/users'],
      });
    },
    onError: () => {
      toast.error('حدث خطأ أثناء إنشاء المستخدم');
    },
  });

  const { data: departments } = $api.useQuery('get', '/departments');
  const { data: roles } = $api.useQuery('get', '/roles');

  return (
    <Dialog
      open={isOpen('create-user')}
      onOpenChange={(status) => {
        if (!status) closeDialog();
      }}
    >
      <DialogOverlay />

      <DialogContenWiden
        showCloseButton={false}
        className="max-h-screen overflow-y-auto rounded-sm bg-[#222222]"
      >
        <form
          onSubmit={form.handleSubmit((data) => {
            createUserMutation.mutate({
              body: {
                first_name: data.frist_name,
                last_name: data.last_name,
                username: data.user_name,
                password: data.password,
                password_confirmation: data.confirm_password,
                role: data.role,
                department_id: Number(data.dep_id),
              } as any,
            });
          })}
        >
          <div className="flex items-center justify-between">
            <DialogHeader>
              <DialogTitle className="text-2xl font-medium text-white">
                إضافة مستخدم جديد
              </DialogTitle>
            </DialogHeader>

            <div className="flex gap-3.5">
              <Button
                type="submit"
                className="mr-auto w-fit"
                disabled={createUserMutation.isPending}
              >
                {createUserMutation.isPending
                  ? 'جاري الإضافة...'
                  : 'اضافة مستخدم'}
                <User className="mr-11" size={20} />
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
              >
                إلغاء
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Controller
              name="frist_name"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel className="text-white">
                    الاسم الأول
                  </FieldLabel>
                  <Input {...field} className="text-white" />
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />

            <Controller
              name="last_name"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel className="text-white">
                    الاسم الأخير
                  </FieldLabel>
                  <Input {...field} className="text-white" />
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />

            <Controller
              name="user_name"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel className="text-white">
                    اسم المستخدم
                  </FieldLabel>
                  <Input {...field} className="text-white" />
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />

            <Controller
              name="dep_id"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel className="text-white">
                    القسم
                  </FieldLabel>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="border-0 text-white">
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>

                    <SelectContent>
                      {departments?.data?.map((dep) => (
                        <SelectItem
                          key={dep.id}
                          value={dep.id.toString()}
                        >
                          {dep.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel className="text-white">
                    الصلاحية
                  </FieldLabel>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="border-0 text-white">
                      <SelectValue placeholder="اختر دور" />
                    </SelectTrigger>

                    <SelectContent>
                      {roles?.data?.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel className="text-white">
                    كلمة السر
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    className="text-white"
                  />
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />

            <Controller
              name="confirm_password"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel className="text-white">
                    تأكيد كلمة السر
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    className="text-white"
                  />
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />
          </div>
        </form>
      </DialogContenWiden>
    </Dialog>
  );
}

export default NewUserModel;