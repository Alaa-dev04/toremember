import { ColumnDef } from '@tanstack/react-table';
import { paths } from '@/lib/api/generated';

// This type is used to define the shape of our data.
export type ctoViewOrderTableColumnsType =
  paths['/orders/{id}']['get']['responses']['200']['content']['application/json']['data']['order_items'][number];

export const ctoViewOrderTableColumns: ColumnDef<ctoViewOrderTableColumnsType>[] =
  [
    {
      accessorKey: 'id',
      header: '#',
    },
    {
      accessorKey: 'item',
      header: 'العنصر',
    },
    {
      accessorKey: 'company',
      header: 'الشركة',
    },
    {
      accessorKey: 'department',
      header: 'القسم',
    },
    {
      accessorKey: 'applier',
      header: 'مقدم الطلب',
    },
    {
      accessorKey: 'quantity',
      header: 'الكمية',
    },
  ];

export const itViewOrdersTableHeader = [
  {
    accessorKey: 'id',
    header: 'رقم الطلب',
  },
  {
    accessorKey: 'date',
    header: 'التاريخ',
  },
];
