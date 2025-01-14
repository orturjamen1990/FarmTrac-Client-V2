import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createContext, useCallback, useContext, useState } from "react";

type ConfirmOptions = {
  title?: string;
  message: string;
  acceptClassName?: string;
  acceptLabel?: string;
  acceptIcon?: string;
  rejectClassName?: string;
  rejectLabel?: string;
  rekectIcon?: string;
  onConfirm?: () => Promise<void>;
  onCancel?: () => void;
};

const ConfirmContext = createContext<
  ((options: ConfirmOptions) => void) | null
>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    setIsOpen(true);
    setOptions(options);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (!options?.onConfirm) return;

    setIsLoading(true);
    try {
      await options.onConfirm();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    options?.onCancel?.();
    handleClose();
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options?.title}</AlertDialogTitle>
            <AlertDialogDescription>{options?.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={options?.rejectClassName}
              onClick={onCancel}
              disabled={isLoading}
            >
              {options?.rejectLabel || "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              className={options?.acceptClassName}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {options?.acceptLabel || "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  if (!confirm)
    throw new Error("useConfirm must be used within ConfirmProvider");
  return confirm;
};
