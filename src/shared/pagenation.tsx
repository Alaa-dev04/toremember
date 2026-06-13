'use client';

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const getResponsivePageRange = () => {
  if (typeof window === 'undefined') {
    return 2;
  }

  if (window.innerWidth < 420) {
    return 1;
  }

  if (window.innerWidth < 1024) {
    return 2;
  }

  if (window.innerWidth < 1280) {
    return 3;
  }

  return 5;
};

export interface PaginationProps {
  /**
   * The total number of pages.
   */
  pageCount: number;
  /**
   * The current page number (0-indexed).
   */
  currentPage: number;
  /**
   * Callback fired when a page is changed.
   * @param selectedPage The 0-indexed page number that was selected.
   */
  onPageChange: (selectedPage: number) => void;
  /**
   * The range of pages displayed.
   * @default 3 on mobile, 5 on desktop
   */
  pageRangeDisplayed?: number;
  /**
   * The number of pages to display for margins.
   * @default 1
   */
  marginPagesDisplayed?: number;
  /**
   * Custom label for the "Previous" button.
   * If not provided, it will automatically use "السابق" for Arabic and "Previous" for other locales.
   */
  previousLabel?: React.ReactNode;
  /**
   * Custom label for the "Next" button.
   * If not provided, it will automatically use "التالي" for Arabic and "Next" for other locales.
   */
  nextLabel?: React.ReactNode;
  /**
   * Label for ellipsis/break separator.
   * @default "..."
   */
  breakLabel?: React.ReactNode;
  /**
   * Custom className for the outer wrapper container.
   */
  className?: string;
  /**
   * Visual variant style for the pagination component.
   * - 'default': Transparent container with subtle borders on items.
   * - 'card': Premium dark pill background container (matches screenshot).
   * - 'ghost': Flat style with no borders on inactive items.
   * @default 'card'
   */
  variant?: 'default' | 'card' | 'ghost';
  /**
   * Whether to show arrow icons next to the labels.
   * @default false
   */
  showIcons?: boolean;
  /**
   * Whether to hide the pagination component completely when there is only 1 page.
   * @default true
   */
  hideOnSinglePage?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
  pageRangeDisplayed,
  marginPagesDisplayed,
  previousLabel,
  nextLabel,
  breakLabel = '...',
  className,
  variant = 'card',
  showIcons = false,
  hideOnSinglePage = true,
}) => {


  const [responsivePageRange, setResponsivePageRange] = useState(5);

  useEffect(() => {
    if (pageRangeDisplayed !== undefined) {
      return;
    }

    const updateResponsivePageRange = () => {
      setResponsivePageRange(getResponsivePageRange());
    };

    updateResponsivePageRange();
    window.addEventListener('resize', updateResponsivePageRange);

    return () => {
      window.removeEventListener('resize', updateResponsivePageRange);
    };
  }, [pageRangeDisplayed]);

  // Automatically hide when there's only 1 page (or less)
  if (hideOnSinglePage && pageCount <= 1) {
    return null;
  }

  // Dynamic responsive display range (can be overridden by prop or defaults to 3/5)
  const defaultPageRange =
    pageRangeDisplayed !== undefined
      ? pageRangeDisplayed
      : responsivePageRange;
  const defaultMarginPagesDisplayed =
    marginPagesDisplayed ?? (defaultPageRange <= 2 ? 0 : 1);
  const isCompact = defaultPageRange <= 2;
  // Format Previous/Next with compact icon-only labels on narrow screens.
  // Determine RTL / locale and default texts/icons
  const isRtl = typeof document !== 'undefined' && (document.documentElement?.dir === 'rtl' || navigator.language?.startsWith('ar'));

  const previousIcon = <ChevronLeft className="h-4.5 w-4.5" />;
  const nextIcon = <ChevronRight className="h-4.5 w-4.5" />;

  const defaultPreviousText = isRtl ? 'السابق' : 'Previous';
  const defaultNextText = isRtl ? 'التالي' : 'Next';

  // Format Previous/Next with compact icon-only labels on narrow screens.
  const formattedPreviousLabel = previousLabel ?? (
    <span className="flex items-center justify-center gap-1.5">
      {(showIcons || isCompact) && previousIcon}
      <span className={cn(isCompact && 'sr-only')}>
        {defaultPreviousText}
      </span>
    </span>
  );

  const formattedNextLabel = nextLabel ?? (
    <span className="flex items-center justify-center gap-1.5">
      <span className={cn(isCompact && 'sr-only')}>
        {defaultNextText}
      </span>
      {(showIcons || isCompact) && nextIcon}
    </span>
  );

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={cn(
        'flex w-full min-w-0 items-center justify-center overflow-hidden sm:w-fit',
        className
      )}
    >
      <div
        className={cn(
          'flex max-w-full min-w-0 items-center justify-center duration-300',
          variant === 'card' && 'rounded-[20px]',
          variant === 'default' && 'rounded-xl bg-transparent p-2'
        )}
      >
        <ReactPaginate
          breakLabel={breakLabel}
          nextLabel={formattedNextLabel}
          onPageChange={handlePageClick}
          pageRangeDisplayed={defaultPageRange}
          marginPagesDisplayed={defaultMarginPagesDisplayed}
          pageCount={pageCount}
          previousLabel={formattedPreviousLabel}
          forcePage={currentPage}
          renderOnZeroPageCount={null}
          // Container classes
          containerClassName="flex max-w-full min-w-0 flex-nowrap items-center justify-center gap-1 select-none list-none m-0 p-0 sm:gap-1.5 md:gap-2"
          // Page number classes
          pageClassName="list-none"
          pageLinkClassName={cn(
            'flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[10px] text-sm font-semibold select-none sm:h-9 sm:w-9 xl:h-12 xl:w-12 xl:rounded-[12px] xl:text-base',
            variant === 'ghost'
              ? 'bg-transparent text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              : 'border border-white/5 bg-transparent text-[#A3A3A3] hover:bg-white/5 hover:text-white'
          )}
          // Active page classes
          activeClassName="list-none"
          activeLinkClassName="!bg-primary !text-white !border-primary font-bold shadow-md shadow-primary/20 scale-105 hover:!bg-primary hover:!text-white"
          // Previous classes
          previousClassName="list-none"
          previousLinkClassName="flex h-8 w-8 shrink-0 cursor-pointer select-none items-center justify-center px-0 text-sm font-semibold text-[#A3A3A3] hover:text-white sm:h-9 sm:w-9 xl:h-12 xl:w-auto xl:px-4 xl:text-base"
          // Next classes
          nextClassName="list-none"
          nextLinkClassName="flex h-8 w-8 shrink-0 cursor-pointer select-none items-center justify-center px-0 text-sm font-semibold text-[#A3A3A3] hover:text-white sm:h-9 sm:w-9 xl:h-12 xl:w-auto xl:px-4 xl:text-base"
          // Break classes
          breakClassName="list-none"
          breakLinkClassName="flex h-8 w-5 shrink-0 items-center justify-center text-sm font-medium text-[#A3A3A3] select-none sm:h-9 sm:w-6 xl:h-12 xl:w-12 xl:text-base"
          // Disabled state classes
          disabledClassName="opacity-30 pointer-events-none cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default Pagination;
