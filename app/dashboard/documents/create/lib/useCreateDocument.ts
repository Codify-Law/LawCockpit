import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentFormData, documentSchema } from "./schema";
import { useForm } from "react-hook-form";

export default function useCreateDocument() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
  });

  const onSubmit = (data: DocumentFormData) => {
    console.log(data);
    // Handle form submission
  };
  return {
    variables: {
      errors,
    },
    methods: {
      register,
      handleSubmit,
      onSubmit,
      setValue,
      watch,
    },
  };
}
