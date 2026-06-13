import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export function AppTableSkeleton({
  columns = 5,
  rows = 5,
}: TableSkeletonProps) {
  return (
    <div className="w-full grow overflow-hidden rounded-md border bg-[#222222]">
      <div className="mb-6 flex justify-between">
        <Skeleton className="mt-2 h-6 w-32 bg-white/10" />
        <Skeleton className="h-6 w-24 bg-white/10" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead
                key={i}
                className="pe-4 text-start text-base font-bold"
              >
                <Skeleton className="h-6 w-full bg-white/10" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  className="py-3 pe-4 text-start text-sm font-medium text-[#FDFDFD]"
                >
                  <Skeleton className="h-6 w-full bg-white/5" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
