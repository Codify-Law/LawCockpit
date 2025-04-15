import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddParticipantDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Participant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Participant</DialogTitle>
          <DialogDescription>
            Add a new participant to the document.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="depositary" className="text-right">
              Depositary
            </Label>
            <Input id="depositary" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer min-w-32">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
