import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authenticate, profile } from "@/api/auth";
import { isAxiosError } from "axios";
import { EN_API_ERROR_MESSAGES } from "@/lib/api-error-messages";
import { useEffect } from "react";
import { useGlobalStore } from "@/store/global";
import StorageService from "@/lib/storage";

export default function useLogin() {
  const router = useRouter();
  const globalStore = useGlobalStore((state) => state);

  // Initialize form with validation schema and default values
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Query for fetching user profile (disabled by default)
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await profile();
      return res;
    },
    enabled: false,
  });

  // Mutation for handling login authentication
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const res = await authenticate({
        username: data.email,
        password: data.password,
      });
      return res;
    },
    onSuccess: async (data) => {
      // Set authentication token in cookies
      const storage = new StorageService();
      storage.set("authorizationToken", data.access_token);
      profileQuery.refetch();
    },
    onError: (error) => {
      // Handle unauthorized access error
      if (
        isAxiosError(error) &&
        error.response?.data?.error === "UNAUTHORIZED_TYPE"
      ) {
        form.setError("email", {
          type: "server",
          message: EN_API_ERROR_MESSAGES.UNAUTHORIZED_TYPE,
        });
        return;
      } else {
        // Handle general errors
        form.setError("email", {
          type: "client",
          message:
            "Something went wrong. please contact admin@codylex.com for assistance.",
        });
        return;
      }
    },
  });

  /**
   * Handle form submission
   * @param {LoginFormValues} data - Form data containing email and password
   */
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if (profileQuery.isSuccess) {
      globalStore.setProfile({
        id: profileQuery.data.id,
        email: profileQuery.data.email,
        first_name: profileQuery.data.first_name,
        last_name: profileQuery.data.last_name,
        phone_number: profileQuery.data.phone_number,
        country: profileQuery.data.country,
      });

      // Redirect to dashboard on successful login
      router.push("/dashboard");
    }

    if (profileQuery.isError) {
      form.setError("email", {
        type: "client",
        message:
          "Something went wrong. please contact admin@codylex.com for assistance.",
      });
    }
  }, [profileQuery.isSuccess]);

  return {
    variables: {
      form,
      isLoading: loginMutation.isPending || profileQuery.isFetching,
      error: loginMutation.error,
    },
    methods: {
      onSubmit,
    },
  };
}
