'use client';

import { useState } from 'react';
import { useQueryState, parseAsString } from 'nuqs';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContenWiden,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { $api } from '@/lib/tanstack.lib';
import { useQueryDialog } from '@/hooks/useQueryopendia';

import { AppDataTable } from '@/shared/appdatatable';
import {
  itViewOrdersTableHeader
} from '@/features/orders/open-order-table';

import SuccessDialoug from '@/shared/sucessdialoug';
import { Badge } from '@/components/ui/badge';

const OrdersModelSkeleton = () => (
  <div className="flex flex-col gap-6">
    <DialogHeader>
      <Skeleton className="h-8 w-44 bg-white/10" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full bg-white/5" />
        <Skeleton className="h-5 w-4/5 bg-white/5" />
      </div>
    </DialogHeader>

    <div className="overflow-hidden rounded-md border-2 border-[#535353] bg-[#222222]">
      <div className="grid grid-cols-2 bg-[#303030] p-4">
        <Skeleton className="h-6 w-28 bg-white/10" />
        <Skeleton className="h-6 w-36 bg-white/10" />
      </div>
      <div className="grid grid-cols-2 bg-[#1A1A1A] p-4">
        <Skeleton className="h-6 w-24 bg-white/5" />
        <Skeleton className="h-6 w-32 bg-white/5" />
      </div>
    </div>

    <div className="overflow-hidden rounded-md border-2 border-[#535353] bg-[#222222]">
      <div className="grid grid-cols-4 gap-4 bg-[#303030] p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-6 bg-white/10" />
        ))}
      </div>
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-4 gap-4 border-t border-white/5 bg-[#1A1A1A] p-4"
        >
          {Array.from({ length: 4 }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-6 bg-white/5" />
          ))}
        </div>
      ))}
    </div>

    <div className="flex flex-col gap-3 rounded-md bg-[#303030] p-4">
      <Skeleton className="h-6 w-36 bg-white/10" />
      <Skeleton className="h-24 w-full bg-white/5" />
    </div>

    <div className="my-8 flex gap-20">
      <Skeleton className="h-14 flex-1 rounded-xs bg-white/10" />
      <Skeleton className="h-14 flex-1 rounded-xs bg-white/10" />
    </div>
  </div>
);

const OrdersModel = () => {
  const { isOpen, closeDialog } = useQueryDialog('orders');
  const [orderId] = useQueryState(
    'dialog-orders',
    parseAsString.withDefault('')
  );

  const queryClient = useQueryClient();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState(false);

  const { mutateAsync: updateStatus, isPending } = $api.useMutation(
    'put',
    '/orders/{id}/status'
  );

  const handleApprove = async () => {
    await updateStatus(
      {
        params: {
          path: { id: orderId },
        },
        body: {
          status: 'accepted',
          rejection_reason: null,
        },
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.invalidateQueries();
          setIsSuccessDialogOpen(true);
        },
        onError: (error: Error) => {
          toast.error(error?.message);
          console.error(error);
        },
      }
    );
  };

  const handleRejectConfirm = async (reason: string) => {
    if (reason === '') {
      toast.error('الرجاء إدخال سبب الرفض');
      return;
    }

    await updateStatus(
      {
        params: {
          path: { id: orderId },
        },
        body: {
          status: 'rejected',
          rejection_reason: reason,
        },
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.invalidateQueries();
          setIsRejectDialogOpen(false);
          closeDialog();
        },
        onError: (error: Error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  const { data, isLoading } = $api.useQuery(
    'get',
    '/orders/{id}',
    {
      params: {
        path: { id: orderId },
      },
    },
    {
      enabled: !!orderId,
    }
  );

  const canShowAccountActions = data?.data?.status === 'pending';
  const orderCreatedAt = data?.data?.created_at
    ? new Date(data.data.created_at)
    : null;
  const arabicDateFormatter = new Intl.DateTimeFormat(
    'ar-EG-u-nu-latn',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );
  const arabicTimeFormatter = new Intl.DateTimeFormat(
    'ar-EG-u-nu-latn',
    {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }
  );
  const orderDisplayNumber =
    orderCreatedAt && data?.data?.id
      ? `Req${orderCreatedAt.getFullYear()}-${data.data.id}`
      : '';
  const orderDisplayDate = orderCreatedAt
    ? `${arabicDateFormatter.format(orderCreatedAt)} - ${arabicTimeFormatter.format(orderCreatedAt)}`
    : '';

  return (
    <>
      <Dialog
        open={isOpen('orders')}
        onOpenChange={(status) => {
          if (!status) {
            closeDialog();
          }
        }}
      >
        <DialogOverlay />

        <DialogContenWiden
          showCloseButton={true}
          hidden={!orderId}
          className="max-h-screen overflow-y-auto rounded-sm bg-[#222222]"
        >
          {isLoading ? (
            <OrdersModelSkeleton />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-medium text-white">
                  معلومات عن الطلب
                </DialogTitle>
                <DialogDescription className="text-base text-[#A0A0A0]">
                  عرض كافة تفاصيل الطلب المالي والمستندات المرتبطة به،
                  مع إمكانية مراجعة البيانات واتخاذ القرار المناسب
                  بشأن الطلب.
                </DialogDescription>
              
              </DialogHeader>

              <div className="flex flex-col gap-6">
                {/* <IsAllowed roles={['it', 'cto']}>
                  <AppDataTable
                    columns={itViewOrdersTableHeader}
                    data={
                      [
                        {
                          id: data?.data?.id || '',
                          created_at: data?.data?.created_at || '',
                        },
                      ] as itViewOrdersTableHeaderType[]
                    }
                    isPaginated={false}
                    isLoading={isLoading}
                    containerClassName="border-2 border-[#535353] p-0"
                    tableCellClassName="bg-[#1A1A1A]"
                  />
                </IsAllowed> */}

                {/* <AppDataTable
                  columns={}
                  data={data?.data?.order_items || []}
                  isPaginated={false}
                  isLoading={isLoading}
                  containerClassName="border-2 border-[#535353] p-0"
                  tableCellClassName="bg-[#1A1A1A]"
                /> */}

                {isLoading ? (
                  <div className="flex flex-col gap-3 rounded-md bg-[#303030] p-4">
                    <Skeleton className="h-6 w-36 bg-white/10" />
                    <Skeleton className="h-24 w-full bg-white/5" />
                  </div>
                ) : (
                  <div
                    className={`flex flex-col gap-2 rounded-md text-[#FDFDFD] ${
                      data?.data?.status === 'rejected'
                        ? 'bg-[#EC0909]'
                        : 'bg-[#303030]'
                    }`}
                  >
                    <h3 className="p-4 text-base font-bold text-white">
                      {data?.data?.status === 'rejected'
                        ? 'سبب الرفض'
                        : 'ملاحظات الطلب'}
                    </h3>
                    <p className="bg-[#1A1A1A] p-4 pt-6 text-base text-[#A0A0A0]">
                      {data?.data?.status === 'rejected'
                        ? data?.data?.rejection_reason
                        : data?.data?.notes}
                    </p>
                  </div>
                )}

                {/* <IsAllowed roles={['account']}>
                  {isLoading ? (
                    <div className="my-8 flex gap-20">
                      <Skeleton className="h-14 flex-1 rounded-xs bg-white/10" />
                      <Skeleton className="h-14 flex-1 rounded-xs bg-white/10" />
                    </div>
                  ) : canShowAccountActions ? (
                    <div className="my-8 flex gap-20">
                      <Button
                        variant={'success'}
                        className="h-14 flex-1 rounded-xs text-xl font-bold"
                        onClick={handleApprove}
                        disabled={isPending}
                      >
                        اعتماد الطلب
                      </Button>
                      <Button
                        variant={'destructive'}
                        className="h-14 flex-1 rounded-xs text-xl font-bold"
                        onClick={() => setIsRejectDialogOpen(true)}
                        disabled={isPending}
                      >
                        رفض الطلب
                      </Button>
                    </div>
                  ) : null}
                </IsAllowed> */}
              </div>
            </>
          )}
        </DialogContenWiden>
      </Dialog>


      <SuccessDialoug
        isOpen={isSuccessDialogOpen}
        onClose={() => {
          setIsSuccessDialogOpen(false);
          closeDialog();
        }}
        onGoToOrders={() => {
          setIsSuccessDialogOpen(false);
          closeDialog();
        }}
        variant="approval"
        title="تم اعتماد الطلب بنجاح!"
        description="تم إرسال الطلب بنجاح لقسم الدعم الفني لاستكمال عملية التوريد"
        orderNumber={orderDisplayNumber}
        orderDate={orderDisplayDate}
        createNewLabel="تحميل الطلب"
        goToOrdersLabel="الذهاب إلى الطلبات"
      />
    </>
  );
};

export default OrdersModel;
