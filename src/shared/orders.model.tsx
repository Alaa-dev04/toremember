'use client';

import { useQueryState, parseAsString } from 'nuqs';

import {
  Dialog,
  DialogContenWiden,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';

import { Skeleton } from '@/components/ui/skeleton';
import { $api } from '@/lib/tanstack.lib';
import { useQueryDialog } from '@/hooks/useQueryopendia';

import { AppDataTable } from '@/shared/appdatatable';

import {
  ctoViewOrderTableColumns,
  itViewOrdersTableHeader,
} from '@/features/orders/open-order-table';

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
  </div>
);

const OrdersModel = () => {
  const { isOpen, closeDialog } = useQueryDialog('orders');

  const [orderId] = useQueryState(
    'dialog-orders',
    parseAsString.withDefault('')
  );

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

  return (
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
        className="max-h-screen overflow-y-auto rounded-sm bg-[#222222]"
      >
        {/* ✅ FIX (DO NOT CHANGE UI) — required by Radix */}
        <DialogHeader>
          <DialogTitle className="sr-only">
            معلومات عن الطلب
          </DialogTitle>
        </DialogHeader>

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
              <AppDataTable
                columns={itViewOrdersTableHeader}
                data={[
                  {
                    id: data?.data?.id || '',
                    created_at: data?.data?.created_at || '',
                  },
                ]}
                isPaginated={false}
                isLoading={isLoading}
                containerClassName="border-2 border-[#535353] p-0"
                tableCellClassName="bg-[#1A1A1A]"
              />

              <AppDataTable
                columns={ctoViewOrderTableColumns}
                data={data?.data?.order_items || []}
                isPaginated={false}
                isLoading={isLoading}
                containerClassName="border-2 border-[#535353] p-0"
                tableCellClassName="bg-[#1A1A1A]"
              />

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
            </div>
          </>
        )}
      </DialogContenWiden>
    </Dialog>
  );
};

export default OrdersModel;