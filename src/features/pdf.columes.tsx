'use client';
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { paths } from "@/lib/api/generated";
///type invoice does not come from the back end there is no data 
export type invoices = paths ['/orders/{id}/pdf']['get']['responses']['200']['content']['application/json']['data'];
export type ItInvoiceColumnsType = {
  id: number;
  item: string;
  company: string;
  department: string;
  applicant: string;
  quantity: number;
};
/* ─── Column definitions ─── */
export const invoiceColumns: ColumnDef<ItInvoiceColumnsType>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'item',
    header: 'العنصر',
    cell: ({ row }) => <div>{row.getValue('item')}</div>,
  },
  {
    accessorKey: 'company',
    header: 'الشركة',
    cell: ({ row }) => <div>{row.getValue('company')}</div>,
  },
  {
    accessorKey: 'department',
    header: 'القسم',
    cell: ({ row }) => <div>{row.getValue('department')}</div>,
  },
  {
    accessorKey: 'applicant',
    header: 'مقدم الطلب',
    cell: ({ row }) => <div>{row.getValue('applicant')}</div>,
  },
  {
    accessorKey: 'quantity',
    header: 'الكمية',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('quantity')}</div>
    ),
  },
];