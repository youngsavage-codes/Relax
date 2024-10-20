'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function DeleteDialog({ name, handleDelete }: any) {
  const [repoName, setRepoName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ConfirmDelete = async (closeDialog: () => void) => {
    setLoading(true);
    if (repoName === name) {
      await handleDelete();
      setLoading(false);
    } else {
      setError('Repo Name Doesn\'t Match');
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="z-50 relative">
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Repository</DialogTitle>
          <DialogDescription className="font-[family-name:var(--font-geist-mono)] text-xs mt-2">
            Are you sure you want to delete "{name}"? Once confirmed, the repo will be lost.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 font-[family-name:var(--font-geist-mono)] text-sm">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Repo Name
            </Label>
            <Input
              id="name"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="col-span-3 text-xs"
              placeholder="Enter Name Of Repo"
            />
          </div>
        </div>
        <DialogFooter className="font-[family-name:var(--font-geist-mono)] text-sm">
          <Button variant='outline' type="button">Cancel</Button>
          <Button
            type="button"
            className="bg-red-600 text-white"
            onClick={() => ConfirmDelete(() => {/* Close dialog logic */})}
            disabled={repoName.trim() === ''} // Disable if input is empty
          >
            {loading ? 'Deleting' : 'Delete Repo'}
          </Button>
        </DialogFooter>
        <p className="text-xs text-red-500 text-center">{error}</p>
      </DialogContent>
    </Dialog>
  );
}
