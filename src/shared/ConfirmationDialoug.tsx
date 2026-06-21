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
  type?: 'delete' | 'reject';
}

const ConfirmationDialoug = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  type = 'delete',
}: ConfirmationDialougProps) => {
  const isReject = type === 'reject';

  const displayTitle =
    title || (isReject ? 'رفض الطلب؟' : 'حذف العنصر؟');

  const displayDescription =
    description ||
    (isReject
      ? 'هل أنت متأكد من رفض هذا الطلب؟'
      : 'هل أنت متأكد من حذف هذا العنصر؟');

  const displayConfirmLabel =
    confirmLabel || (isReject ? 'رفض' : 'حذف');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-[#1B1B1B] text-white border border-white/10">

        {/* Close */}
        <DialogClose asChild>
          <button className="absolute right-4 top-4 text-white/50 hover:text-white">
            <X size={18} />
          </button>
        </DialogClose>

        {/* Header */}
        <DialogHeader className="text-center space-y-3">

          <div className="mx-auto">
            {isReject ? (
              <XCircle className="h-12 w-12 text-red-500" />
            ) : (
              <Trash2 className="h-12 w-12 text-red-500" />
            )}
          </div>

          <DialogTitle className="text-xl font-semibold">
            {displayTitle}
          </DialogTitle>

          <DialogDescription className="text-sm text-white/60">
            {displayDescription}
          </DialogDescription>

        </DialogHeader>

        {/* Footer */}
        <DialogFooter className="mt-6 flex flex-col gap-3 sm:flex-row">

          <Button
            onClick={onConfirm}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            {displayConfirmLabel}
          </Button>

          <DialogClose asChild>
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white"
            >
              إلغاء
            </Button>
          </DialogClose>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialoug;