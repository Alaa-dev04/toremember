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
import { CircleCheck, CircleX, FileText, X, Download } from 'lucide-react';

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

  // ✅ added missing props that document 3 passes
  variant?: 'success' | 'delete' | 'approval';
  createNewLabel?: string;
  goToOrdersLabel?: string;

  type?: 'success' | 'delete';
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
  statusText = 'سيتم مراجعة طلبك قريبًا',
  statusLabel = 'قيد المراجعة',
  variant = 'success',
  createNewLabel,
  goToOrdersLabel,
  type,
}: SuccessDialougProps) => {
  // ✅ derive isDelete from either `type` or `variant`
  const isDelete = type === 'delete' || variant === 'delete';
  const isApproval = variant === 'approval';

  const displayTitle =
    title || (isDelete ? 'تم الحذف' : 'تم إرسال الطلب');

  const displayDescription =
    description ||
    (isDelete ? '' : 'تم استلام طلبك وسيتم مراجعته من الفريق المختص');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-[#1B1B1B] text-white border border-white/10">

        <DialogClose asChild>
          <button className="absolute right-4 top-4 text-white/60 hover:text-white">
            <X size={18} />
          </button>
        </DialogClose>

        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto">
            {isDelete ? (
              <CircleX className="h-12 w-12 text-red-500" />
            ) : (
              <CircleCheck className="h-12 w-12 text-green-500" />
            )}
          </div>

          <DialogTitle className="text-xl font-semibold">
            {displayTitle}
          </DialogTitle>

          {displayDescription && (
            <DialogDescription className="text-sm text-white/60">
              {displayDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        {!isDelete && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
              <FileText className="w-5 h-5 text-orange-400" />
              <div className="text-sm">
                <p className="text-white/60">Order #</p>
                <p className="font-medium text-white">{orderNumber}</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-white/60">{statusText}</p>
              <Badge variant="warning" className="px-3 py-1 text-xs">
                {statusLabel}
              </Badge>
            </div>
          </div>
        )}

        {!isDelete && (
          <DialogFooter className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onCreateNew}
              className="w-full sm:w-auto gap-2 bg-orange-500 hover:bg-orange-600"
            >
              {/* ✅ uses createNewLabel if passed, falls back to default */}
              {createNewLabel ?? 'New Order'} 
              {isApproval ? <Download className="size-4" /> : <ContractIcon />}
            </Button>

            <Button
              onClick={onGoToOrders}
              variant="secondary"
              className="w-full sm:w-auto gap-2 bg-white/10 hover:bg-white/20 text-white"
            >
              {/* ✅ uses goToOrdersLabel if passed, falls back to default */}
              {goToOrdersLabel ?? 'My Orders'}
              {!isApproval && <PackageIcon />}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialoug;