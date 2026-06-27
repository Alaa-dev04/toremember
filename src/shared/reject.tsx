import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RejectConfirmationDialougProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title?: string;
  description?: string;
}

const RejectConfirmationDialoug = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأكيد رفض الطلب',
  description = 'يرجى توضيح سبب الرفض لتقديم الطلب',
}: RejectConfirmationDialougProps) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent className="border border-red-500/70 bg-[#1A1A1A] p-8 sm:max-w-179.25">
        <DialogHeader className="flex flex-col items-center gap-4">
          <CircleX className="h-11 w-11 text-red-500" />
          <DialogTitle className="text-center text-xl text-white md:text-2xl">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-[#B6B6B6] md:text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="اكتب سبب الرفض..."
            className="min-h-32 w-full rounded-lg border border-[#3B3B3B] bg-[#101010] p-3 text-right text-sm text-white outline-none placeholder:text-[#6F6F6F] focus:border-red-500"
          />

          <div className="flex w-full flex-col gap-3">
            <Button
              onClick={handleConfirm}
              variant="destructive"
              className="w-full bg-[#FF2E2E] hover:bg-[#d92626]"
            >
              رفض الطلب
            </Button>
            <Button
              onClick={handleClose}
              variant="secondary"
              className="w-full"
            >
              الغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectConfirmationDialoug;
