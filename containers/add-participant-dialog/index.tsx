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
import { Atom, LoaderCircle } from "lucide-react";
import useAddParticipant from "./lib/useAddParticipant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddParticipantDialog() {
  const { variables } = useAddParticipant();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center pb-2.5 h-11 cursor-pointer font-semibold"
          disabled={variables.isPending}
        >
          {variables.isPending ? (
            <LoaderCircle className="size-5 animate-spin mr-1 mt-0.5" />
          ) : (
            <Atom className="size-5 mr-1 mt-0.5" />
          )}{" "}
          Add Participant
        </Button>
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
            <Select>
              <SelectTrigger className="col-span-3 w-full capitalize">
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              {/* prettier-ignore */}
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="action" className="text-right">
              Action
            </Label>
            <Select>
              <SelectTrigger className="col-span-3 w-full capitalize">
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              {/* prettier-ignore */}
              <SelectContent>
                <SelectItem value="signature">Signature</SelectItem>
                <SelectItem value="ratification">Ratification</SelectItem>
                <SelectItem value="accession">Accession</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="succession_to_signature">Succession to Signature</SelectItem>
                <SelectItem value="withdrawal_of_declaration">Withdrawal of Declaration</SelectItem>
                <SelectItem value="territorial_exclusion">Territorial Exclusion</SelectItem>
                <SelectItem value="application">Application</SelectItem>
                <SelectItem value="termination_in_the_relations_between_participants">Termination in the Relations Between Participants</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="filePath" className="text-right">
              File Path
            </Label>
            <Input id="filePath" className="col-span-3" />
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
