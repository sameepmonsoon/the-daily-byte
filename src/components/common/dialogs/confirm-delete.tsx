import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingContainer from "@/components/skeleton/loading-container";

interface ConfirmDeleteDialogProps {
  open: boolean;
  name?: string;
  onReset: () => void;
  onDelete: () => void;
  loading?: boolean;
}

const ConfirmDeleteDialog = ({
  open,
  name = "this item",
  onReset,
  onDelete,
  loading = false,
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onReset}>
      <DialogContent>
        <LoadingContainer loading={loading} className="p-2">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-[22px]">
              Are you sure you want to delete {name}?
            </DialogTitle>
            <DialogDescription>
              This will permanently delete {name} and all associated details.
              <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={onReset}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </DialogFooter>
        </LoadingContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
