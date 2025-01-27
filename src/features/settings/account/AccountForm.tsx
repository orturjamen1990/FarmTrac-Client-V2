import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export default function AccountForm({}: any) {
  const formSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().optional(),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  });

  type UserAccountSettings = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  } as UserAccountSettings;

  const form = useForm<UserAccountSettings>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: UserAccountSettings) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <div className="grid gap-4">
          <Form {...form}>
            <form
              id="Form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:col-span-2"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={true} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="text-left">
                          Phone Number
                        </FormLabel>
                        <FormControl className="w-full">
                          <PhoneInput
                            placeholder="Enter a phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-left">
                          Enter a phone number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-5">
                <Button type="submit">Update Account</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
