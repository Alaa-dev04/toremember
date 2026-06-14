'use client';

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  functionalUpdate,
  TableMeta,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ReactNode, useCallback, useTransition } from 'react';

import Pagination from './pagenation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { AppTableSkeleton } from './apptableskeleton';
import { cn } from '@/lib/utils';

interface AppDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableHeader?: ReactNode;
  EmptyMessage?: ReactNode;
  isLoading?: boolean;
  isPaginated?: boolean;
  totalItems?: number;
  pageSize?: number;
  pageIndex?: number;
  meta?: TableMeta<TData>;
  tableCellClassName?: string;
  containerClassName?: string;
}

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export function AppDataTable<TData, TValue>({
  columns,
  data,
  tableHeader,
  EmptyMessage,
  totalItems,
  isLoading = false,
  isPaginated = true,
  pageSize = 10,
  pageIndex = 1,
  meta,
  tableCellClassName,
  containerClassName,
}: AppDataTableProps<TData, TValue>) {
  const [, startTransition] = useTransition();

  const [{ page, paginate }, setTableQuery] = useQueryStates(
    {
      page: parseAsInteger.withDefault(pageIndex),
      paginate: parseAsInteger.withDefault(pageSize),
    },
    {
      history: 'replace',
      shallow: true,
      startTransition,
    }
  );

  // Derive pagination state directly from URL params — no duplicated useState
  const pagination: PaginationState = {
    pageIndex: Math.max(page - 1, 0),
    pageSize: paginate,
  };

  const commitPagination = useCallback(
    (next: PaginationState) => {
      setTableQuery({
        page: Math.max(next.pageIndex, 0) + 1,
        paginate: next.pageSize,
      });
    },
    [setTableQuery]
  );
console.log("columns:", columns);
console.log("data:", data);
  const table = useReactTable({
    data,
    columns,
    rowCount: totalItems,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const next = functionalUpdate(updater, pagination);
      commitPagination(next);
    },
    manualPagination: true,
    state: {
      pagination: isPaginated
        ? pagination
        : { pageIndex: 0, pageSize: Math.max(data.length, 1) },
    },
    meta,
  });

  if (isLoading) {
    return <AppTableSkeleton columns={columns.length} rows={10} />;
  }

  return (
    <div
      className={cn(
        'w-full grow overflow-hidden rounded-md bg-[#222222] p-4',
        containerClassName
      )}
    >
      {tableHeader}

      <div className="grid">
        <Table hidden={!data.length}>
          <TableHeader className="sticky top-0 right-0 left-0 h-14 bg-[#303030] p-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="pe-4 text-start text-base font-bold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="py-10"
                data-state={
                  row.getIsSelected() ? 'selected' : undefined
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'py-3 pe-4 text-start text-sm font-medium text-[#FDFDFD]',
                      tableCellClassName
                    )}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty state */}
        {!data.length && !isLoading && EmptyMessage}
      </div>

      {isPaginated && (
        <div className="mt-4 flex h-fit min-w-0 items-center justify-center overflow-hidden rounded-xl bg-[#1E1E1E] p-2.5 md:justify-between">
          <div className="flex w-fit items-center gap-4 max-md:hidden">
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) =>
                commitPagination({
                  pageIndex: 0,
                  pageSize: Number(value),
                })
              }
            >
              <SelectTrigger className="bg-primary! h-10 w-fit! max-w-fit! min-w-fit! border border-white/5 text-sm text-white! hover:bg-white/5 hover:text-white">
                <SelectValue
                  placeholder={`${table.getState().pagination.pageSize}`}
                />
              </SelectTrigger>
              <SelectContent className="border border-white/5 bg-[#222222]">
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem
                    key={size}
                    value={`${size}`}
                    className="text-sm text-[#A3A3A3] hover:bg-white/5 hover:text-white"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="mt-1 text-base font-medium text-[#FDFDFD]/50">
              الصفحة {table.getState().pagination.pageIndex + 1} من{' '}
              {table.getPageCount()}
            </span>
          </div>

          <Pagination
            pageCount={table.getPageCount()}
            currentPage={table.getState().pagination.pageIndex}
            onPageChange={(pageIndex) =>
              table.setPageIndex(pageIndex)
            }
          />
        </div>
      )}
    </div>
  );
}
