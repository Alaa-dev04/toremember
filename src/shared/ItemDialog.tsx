import React, { useRef } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '../components/ui/input';

interface ItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title?: string;
  confirmLabel?: string;
  inputPlaceholder?: string;
}

const ItemDialog = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  confirmLabel,
  inputPlaceholder,
}: ItemDialogProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (ref.current) {
      onSubmit(ref.current.value);
      ref.current.value = '';
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="border border-[#A3A3A3]/41 p-6 sm:max-w-235"
      >
        <DialogHeader className="flex gap-2">
          <DialogTitle className="text-xl text-[#FDFDFD]">
            {title}
          </DialogTitle>
        </DialogHeader>
        <Input
          ref={ref}
          className="bg-[#121212] text-[#FDFDFD]"
          placeholder={inputPlaceholder}
        />
        <DialogFooter className="">
          <Button
            onClick={handleSubmit}
            type="button"
            className="flex w-full justify-between sm:w-auto"
          >
            {confirmLabel}
            <Plus className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDialog;
