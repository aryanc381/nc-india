import { cn } from "@/lib/utils";
import { IoMailOpenOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import RegionMenu from "./dropdown";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-medium">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="Ameer Mokashi" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="ameer@techminds.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
          <Input id="id" type="id" placeholder="5434321" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Contact Number</FieldLabel>
          <Input id="phone" type="number" placeholder="+91 9049122622" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="text" placeholder="ameer@techminds.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Region</FieldLabel>
          <RegionMenu />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Password</FieldLabel>
          <Input id="password" type="password" placeholder="ameer@123" required />
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Link href={'/login'} className="w-full">
            <Button variant="outline" type="button" className="w-full">
              <div className="flex jusitfy-center gap-[1.5vw]">
                <IoMailOpenOutline className="mt-[0.5vw]" />
                <p>Login with email</p>
              </div>
            </Button>
          </Link>
        </Field>
      </FieldGroup>
    </form>
  )
}
