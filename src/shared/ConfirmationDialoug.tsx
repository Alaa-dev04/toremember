import React from 'react';
import { Trash2, X, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmationDialougProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'delete' | 'reject';
}

const ConfirmationDialoug = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  type = 'delete',
}: ConfirmationDialougProps) => {
  const isReject = type === 'reject';
  const displayTitle =
    title || (isReject ? 'رفض الطلب؟' : 'حذف العنصر؟');
  const displayDescription =
    description !== undefined
      ? description
      : isReject
        ? 'هل انت متأكد من رفض هذا الطلب؟'
        : 'هل انت متأكد من حذف هذا العنصر من طلبك؟';
  const displayConfirmLabel =
    confirmLabel || (isReject ? 'رفض الطلب' : 'حذف العنصر');
  // const displayCancelLabel = cancelLabel || 'الغاء';
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="border border-[#A3A3A3]/41 p-8 sm:max-w-179.25"
      >
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center">
            {isReject ? (
              <XCircle className="h-14 w-14 text-red-600" />
            ) : (
              <Trash2 className="h-14 w-14 text-red-600" />
            )}
          </div>
          <DialogTitle className="text-center text-2xl text-white">
            {displayTitle}
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-[#A3A3A3]">
            {displayDescription}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col-reverse gap-3 sm:flex-row-reverse sm:justify-center">
          <DialogClose asChild>
            <button className="absolute top-5 right-5 text-[#A3A3A3] transition hover:text-white">
              <X size={20} />
            </button>
          </DialogClose>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            {displayConfirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialoug;
