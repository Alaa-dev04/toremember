'use client';
import { useSearchParams } from 'next/navigation';
import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';

export const useQueryDialog = (
  dialogName: string = 'dialog-open'
) => {
  const [dialogNameState, setDialogNameState] = useQueryState(
    `dialog-${dialogName}`,
    parseAsString.withDefault('')
  );
  const searchParams = useSearchParams();

  const isOpen = (name: string) =>
    searchParams.get(`dialog-${name}`) === dialogNameState;
  const openDialog = (value: string) => {
    const newSearchParams = new URLSearchParams(
      window.location.search
    );

    if (value) {
      newSearchParams.set(`dialog-${dialogName}`, value);
    } else {
      newSearchParams.delete(`dialog-${dialogName}`);
    }
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${newSearchParams.toString()}`
    );
  };
  const updateDialog = (value: string) => {
    setDialogNameState(value);
  };
  const closeDialog = () => {
    setDialogNameState('');
  };
  return { isOpen, openDialog, updateDialog, closeDialog };
};

export default useQueryDialog;
