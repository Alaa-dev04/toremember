import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type ItNewOrdersColumnsType = {
  id: string;
  item: string;
  quantity: number;
  company: string;
  department: string;
  applicant: string;
  date: string;
  actions?: string;
};

export const ItNewOrdersColumns: ColumnDef<ItNewOrdersColumnsType>[] = [
  {
    id: 'actions',
    header: 'الإجراءات',
    cell: ({ row, table }) => {
      const index = row.index;
      const meta = table.options.meta as
        | {
            onEdit?: (index: number) => void;
            onDelete?: (index: number) => void;
          }
        | undefined;

      return (
        <span className="flex items-center gap-3">
          <Pencil
            className="h-4 w-4 cursor-pointer text-white transition-opacity hover:opacity-80"
            onClick={() => {
              meta?.onEdit?.(index);
            }}
          />
          <Trash2
            className="h-4 w-4 cursor-pointer text-red-600 transition-opacity hover:opacity-80"
            onClick={() => {
              meta?.onDelete?.(index);
            }}
          />
        </span>
      );
    },
  },

  {
    accessorKey: 'date',
    header: 'التاريخ',
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
  },

  {
    accessorKey: 'applicant',
    header: 'مقدم الطلب',
    cell: ({ row }) => <div>{row.getValue('applicant')}</div>,
  },

  {
    accessorKey: 'department',
    header: 'القسم',
    cell: ({ row }) => <div>{row.getValue('department')}</div>,
  },

  {
    accessorKey: 'company',
    header: 'الشركة',
    cell: ({ row }) => <div>{row.getValue('company')}</div>,
  },

  {
    accessorKey: 'quantity',
    header: 'الكمية',
    cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
  },

  {
    accessorKey: 'item',
    header: 'العنصر',
    cell: ({ row }) => <div>{row.getValue('item')}</div>,
  },

  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('id')}</div>
    ),
  },
];