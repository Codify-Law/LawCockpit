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
import useVectorizationDocument from "./lib/useVectorizationDocument";
import { LoaderCircle, SquareStack } from "lucide-react";

export default function VectorizeDocumentModal() {
  const { variables, methods } = useVectorizationDocument();

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
            <SquareStack className="size-5 mr-1 mt-0.5" />
          )}{" "}
          Vectorize Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Vectorize</DialogTitle>
          <DialogDescription>
            Are you sure you want to vectorize this document?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button
              type="button"
              className="cursor-pointer min-w-32 text-white bg-red-500 font-semibold"
              ref={variables.closeButtonRef}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="cursor-pointer min-w-32 text-white bg-green-500 font-semibold"
            onClick={() => methods.vectorize()}
          >
            {variables.isPending && (
              <LoaderCircle className="size-5 animate-spin mr-1 mt-0.5" />
            )}{" "}
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
