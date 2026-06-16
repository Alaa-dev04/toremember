import React from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '@/components/ui/button';
import ContractIcon from '../components/icons/contract';
import PackageIcon from '../components/icons/package';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Briefcase,
  CircleCheck,
  CircleX,
  FileText,
  PenLine,
  X,
} from 'lucide-react';

interface SuccessDialougProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNew?: () => void;
  onGoToOrders?: () => void;

  orderNumber?: string | number;
  orderDate?: string;

  title?: string;
  description?: string;

  statusText?: string;
  statusLabel?: string;

  createNewLabel?: string;
  goToOrdersLabel?: string;

  showOrderDetails?: boolean;
  showStatus?: boolean;

  type?: 'success' | 'delete';

  variant?: 'default' | 'approval';
}

const SuccessDialoug = ({
  isOpen,
  onClose,
  onCreateNew,
  onGoToOrders,
  orderNumber = 123,
  orderDate,

  title,
  description,
  statusText = 'سيظهر الطلب ضمن قائمة طلباتي',
  statusLabel = 'قيد المراجعة',
  createNewLabel = 'انشاء طلب جديد',
  goToOrdersLabel = 'الذهاب الى طلباتي',
  showOrderDetails = true,
  showStatus = true,
  type = 'success',
  variant = 'default',
}: SuccessDialougProps) => {
  const isDelete = type === 'delete';
  const formattedOrderDate = orderDate
    ? new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
        .format(new Date(orderDate))
        .replace('،', ' -')
    : null;

  const displayTitle =
    title ||
    (isDelete ? 'تم حذف العنصر بنجاح' : 'تم ارسال الطلب بنجاح!');

  const displayDescription =
    description !== undefined
      ? description
      : isDelete
        ? ''
        : 'تم ارسال طلبك بنجاح وسيتم مراجعته من قسم المحاسبة';

  if (variant === 'approval') {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <DialogContent className="border border-white/10 bg-[#1B1B1B] p-0 text-white shadow-2xl sm:max-w-[740px]">
          <div className="relative rounded-[inherit] border border-white/5 bg-[#1B1B1B] px-6 py-8 sm:px-10 sm:py-10">
            <DialogClose asChild>
              <button
                type="button"
                aria-label="Close dialog"
                className="absolute end-5 top-5 text-[#848484] transition hover:text-white"
              >
                <X size={22} />
              </button>
            </DialogClose>

            <DialogHeader className="items-center gap-5 text-center">
              <div className="flex size-16 items-center justify-center rounded-full border-[3px] border-emerald-400 bg-emerald-400/10">
                <CircleCheck className="size-8 text-emerald-400" />
              </div>

              <DialogTitle className="text-[26px] leading-tight font-bold text-white sm:text-[30px]">
                {displayTitle}
              </DialogTitle>

              <DialogDescription className="max-w-[460px] text-sm leading-7 text-[#A8A8A8] sm:text-base">
                {displayDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 space-y-4">
              {showOrderDetails && (
                <div className="mx-auto w-full max-w-[470px] rounded-[10px] bg-[#2C2C2C] px-6 py-7">
                  <div className="flex items-center gap-5">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#4B2614] text-[#FF6A00]">
                      <FileText className="size-8" />
                    </div>

                    <div className="min-w-0 flex-1 text-start">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-base text-[#B7B7B7]">
                            رقم الطلب
                          </p>
                          <p className="truncate text-lg font-semibold text-white">
                            {orderNumber}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-base text-[#B7B7B7]">
                            التاريخ
                          </p>
                          <p className="text-base font-semibold text-white">
                            {orderDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showStatus && (
                <div className="text-center">
                  <p className="text-lg text-[#A8A8A8]">
                    {statusText}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-base text-[#B7B7B7]">
                      الحالة :
                    </span>
                    <Badge
                      variant="warning"
                      className="min-w-0 border border-[#9F6D00] bg-transparent px-4 py-1.5 text-sm font-medium text-[#FFB000]"
                    >
                      {statusLabel}
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col-reverse justify-center gap-3 sm:flex-row">
              <Button
                onClick={onGoToOrders}
                variant="secondary"
                className="h-11 min-w-[196px] rounded-lg bg-[#4B4B4B] px-5 text-sm font-semibold text-white hover:bg-[#595959]"
              >
                <Briefcase className="size-4" />
                {goToOrdersLabel}
              </Button>

              <Button
                onClick={onCreateNew}
                className="h-11 min-w-[196px] rounded-lg bg-[#FF6A00] px-5 text-sm font-semibold text-white hover:bg-[#E85F00]"
              >
                <PenLine className="size-4" />
                {createNewLabel}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border border-[#A3A3A3]/41 p-8 sm:max-w-179.25">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center">
            {isDelete ? (
              <CircleX className="h-16 w-16 text-red-500" />
            ) : (
              <CircleCheck className="h-16 w-16 text-[#4BDF82]" />
            )}
          </div>

          <DialogTitle className="text-center text-2xl text-white">
            {displayTitle}
          </DialogTitle>

          {displayDescription && (
            <DialogDescription className="text-center text-lg text-[#A3A3A3]">
              {displayDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        {!isDelete && (showOrderDetails || showStatus) ? (
          <div className="flex flex-col items-center gap-4 py-4">
            {showOrderDetails && (
              <div className="w-full max-w-[445px] rounded-[6px] bg-[#272727] p-9 text-[#A3A3A3]">
                <div dir="ltr" className="flex items-center gap-6">
                  <div className="bg-primary/12 text-primary flex size-18 shrink-0 items-center justify-center rounded-[8px]">
                    <FileText className="size-9" />
                  </div>

                  <div dir="rtl" className="min-w-0 flex-1 text-end">
                    <p className="mb-3 text-xl leading-5 text-[#A3A3A3]">
                      رقم الطلب
                    </p>
                    <p className="mt-1 truncate text-lg leading-5 font-semibold text-white">
                      {orderNumber}
                    </p>

                    {formattedOrderDate && (
                      <p className="mt-4 truncate text-base leading-5 text-[#A3A3A3]">
                        {formattedOrderDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {showStatus && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg text-[#A3A3A3]">{statusText}</p>

                <div className="flex items-center gap-2">
                  <span className="text-lg text-[#A3A3A3]">
                    الحالة :{' '}
                  </span>
                  <Badge variant="warning">{statusLabel}</Badge>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {!isDelete && (
          <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={onCreateNew}
              variant="default"
              className="w-full gap-3 sm:w-auto"
            >
              {createNewLabel} <ContractIcon />
            </Button>

            <Button
              variant="secondary"
              onClick={onGoToOrders}
              className="w-full gap-3 bg-[#3A3A3A] text-white hover:bg-[#4A4A4A] sm:w-auto"
            >
              {goToOrdersLabel} <PackageIcon />
            </Button>

            <DialogClose asChild>
              <button
                type="button"
                aria-label="Close dialog"
                className="absolute top-5 right-5 text-[#A3A3A3] transition hover:text-white"
              >
                <X size={20} />
              </button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialoug;
