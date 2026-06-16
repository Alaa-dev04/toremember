'use client';
import { AppDataTable } from '@/shared/appdatatable';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DownloadIcon } from 'lucide-react';
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';

import {
  orderSchema,
  OrderFormValues,
} from '@/zod/orders/neworder.shema';
import { useState } from 'react';
import ConfirmationDialoug from '@/shared/ConfirmationDialoug';
import { $api } from '@/lib/tanstack.lib';
import Stepper from '@/shared/stepper';
import InsertForm from '@/components/new-order/InsertForm';
import SuccessDialoug from '@/shared/sucessdialoug';
import { useRouter } from 'next/navigation';
const NewOrder = () => {
  const form = useForm<OrderFormValues>({
    // zod version mismatch between resolver and schema can cause type errors
    // cast to any to bypass incompatible Zod versions at compile time
    resolver: zodResolver(orderSchema as any),
    defaultValues: {
      tempItem: {
        item_id: '',
        company_id: '',
        department_id: '',
        quantity: 1,
        applier_id: '',
      },
      items: [],
      notes: '',
      editingIndex: null,
    },
    mode: 'onChange',
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [stepperIndex, setStepperIndex] = useState(1);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const { fields, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items') || [];

  const editItemIndex = watch('editingIndex');
  const showTable = items.length > 0 && editItemIndex === null;

  const handleDelete = (index: number) => {
    setIsDeleteDialogOpen(true);
    form.setValue('deleteIndex', index);
  };
  const confirmDelete = () => {
    const itemIndex = form.watch('deleteIndex');
    console.log('itemIndex', itemIndex);
    if (typeof itemIndex !== 'number')
      return toast.error('حدث خطأ في حذف العنصر');
    remove(itemIndex);
    toast.success('تم حذف العنصر بنجاح');
  };

  const handleEdit = (index: number) => {
    const itemToEdit = items[index];
    form.setValue('tempItem', {
      item_id: itemToEdit.item_id.toString(),
      company_id: itemToEdit.company_id.toString(),
      department_id: itemToEdit.department_id.toString(),
      quantity: itemToEdit.quantity,
      applier_id: itemToEdit.applier_id.toString(),
    });
    form.setValue('editingIndex', index);
  };

  const { mutate: createOrder, data: createOrderData } =
    $api.useMutation('post', '/orders', {
      onSuccess: () => {
        toast.success('تم حفظ الطلب بنجاح!');
        setIsSuccessOpen(true);
        setStepperIndex(2);
        form.reset();
      },
      onError: () => {
        toast.error('حدث خطأ في حفظ الطلب');
      },
    });

  const onSubmit = async () => {
    const data = form.getValues();

    if (!data.items.length)
      return toast.error('يرجى اضافة عنصر واحد على الاقل');
    const result = await form.trigger('notes');
    if (!result) return null;
    const requestPayload = {
      items: data.items.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
        company_id: item.company_id,
        department_id: item.department_id,
        applier_id: item.applier_id,
      })),
      notes: data.notes,
    };

    createOrder({
      body: requestPayload,
    });

    form.reset({
      tempItem: {
        item_id: '',
        company_id: '',
        department_id: '',
        quantity: 1,
        applier_id: '',
      },
      items: [],
      editingIndex: null,
    });
  };

  const handleReset = () => {
    form.setValue('tempItem', {
      item_id: '',
      company_id: '',
      department_id: '',
      quantity: 1,
      applier_id: '',
    });
    form.setValue('editingIndex', null);
    form.clearErrors('tempItem');
    setStepperIndex(1);
  };
  console.log(form.formState.errors);
  return (
    <div>
    

      <div className="mx-auto mt-6 w-full max-w-xl">
        <Stepper
          currentStep={stepperIndex}
          steps={[
            { title: 'تفاصيل الطلب' },
            { title: 'ارسال الطلب' },
          ]}
        />
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InsertForm />

          <div className="card mt-10 p-0">
            {showTable && (
              <>
                <AppDataTable
                  tableHeader={
                    <h3 className="mt-2 mb-6 text-base font-medium text-[#FDFDFD]">
                      العناصر المطلوبة
                    </h3>
                  }
                  columns={[]}
                  data={items}
                  meta={{
                    onDelete: handleDelete,
                    onEdit: handleEdit,
                  }}
                  isPaginated={false}
                />
                {items.length > 0 && (
                  <div className="p-4">
                    <Controller
                      control={control}
                      name="notes"
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel className="mb-2 text-base">
                            ملحوظات
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <FieldContent>
                            <Textarea
                              {...field}
                              placeholder="اكتب سبب الطلب بالتفصيل"
                            />
                          </FieldContent>
                          <FieldError errors={[fieldState.error]} />
                        </Field>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={onSubmit}
                      className="ms-auto mt-6 mb-2 flex justify-between"
                    >
                      <span>حفظ الطلب</span>
                      <DownloadIcon />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </form>
        <ConfirmationDialoug
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            confirmDelete();
            setIsDeleteDialogOpen(false);
          }}
        />
        <SuccessDialoug
          isOpen={isSuccessOpen}
          onClose={() => {
            setIsSuccessOpen(false);
            setStepperIndex(1);
          }}
          onCreateNew={() => {
            setIsSuccessOpen(false);
            handleReset();
          }}
          onGoToOrders={() => {
            setIsSuccessOpen(false);
            router.push(`/orders`);
          }}
          orderNumber={createOrderData?.data?.id}
          orderDate={createOrderData?.data?.created_at}
        />
      </FormProvider>
    </div>
  );
};

export default NewOrder;
