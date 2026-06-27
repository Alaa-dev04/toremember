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
import useEditUser from "@/hooks/use-edit-user";
import { Switch } from '@/components/ui/switch';
import { $api } from "@/lib/tanstack.lib";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
function EditUserModel() {
  const {
    form,
    isOpen,
    closeDialog,
    onCancel,
    onSubmit,
    mutation,
    onToggleStatus,
    statsmutation
  } = useEditUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  // departments
  const { data: departments } = $api.useQuery('get', '/departments');
  // roles
  const { data: roles } = $api.useQuery('get', '/roles');
  const [userId] = useQueryState(
  "dialog-edit-user",
  parseAsString.withDefault("")
);
  return (
    <Dialog
     key={userId}
      open={isOpen('edit-user')}
      onOpenChange={(status) => {
        if (!status) {
          closeDialog();
        }
      }}
    >
      <DialogOverlay />
      <DialogContenWiden
        showCloseButton={false}
        className="max-h-screen overflow-y-auto rounded-sm bg-[#222222]"
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <DialogHeader className="mb-3.5">
              <DialogTitle className="text-2xl font-medium text-white">
                تعديل المستخدم
              </DialogTitle>
            </DialogHeader>

            <div className="flex gap-3.5">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="justify-between"
              >
                {mutation.isPending
                  ? 'جاري الحفظ...'
                  : 'حفظ التعديلات'}
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
          <div className="flex grid-cols-1 flex-col gap-6 lg:grid lg:grid-cols-2">
            <Controller
              name="frist_name"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel className="text-white">
                    الاسم الأول
                  </FieldLabel>
                  <Input
                    {...field}
                    className="text-white"
                    placeholder="اكتب الاسم الأول للمستخدم"
                  />
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />
            <Controller
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>الاسم الأخير</FieldLabel>
                  <Input
                    className="text-white"
                    {...field}
                    placeholder="اكتب الاسم الأخير للمستخدم"
                  />
                </Field>
              )}
            />
            <Controller
              name="user_name"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>اسم المستخدم</FieldLabel>
                  <Input
                    {...field}
                    className="text-white"
                    placeholder="اكتب الاسم الأخير للمستخدم"
                  />
                </Field>
              )}
            />

            <Controller
              name="dep_id"
              control={form.control}
              render={({ field }) => (
                <Field className="col-span-1">
                  <FieldLabel>القسم</FieldLabel>
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
                </Field>
              )}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field className="col-span-1">
                  <FieldLabel>الصلاحية</FieldLabel>
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
                  <FieldLabel>كلمة السر</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full text-white placeholder:text-[#A3A3A3]"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 left-3 -translate-y-1/2 text-[#A3A3A3]"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />

            <Controller
              name="confirm_password"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <FieldLabel>تأكيد كلمة السر</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full text-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 left-3 -translate-y-1/2 text-[#A3A3A3]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                  {error && <FieldError errors={[error]} />}
                </Field>
              )}
            />

            <div className="col-span-2 flex items-center justify-between rounded-sm bg-[#49291C] px-8 py-3.5">
              <span className="text-sm font-semibold text-[#FDFDFD]">
                تعطيل الحساب
              </span>

              <Controller
                name="is_disabled"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={onToggleStatus}
                    disabled={statsmutation.isPending}
                    className="scale-150 p-px pt-0.5! text-white"
                  />
                )}
              />
            </div>
          </div>
        </form>
      </DialogContenWiden>
    </Dialog>
  );
}

export default EditUserModel;
