import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { IoMailOpenOutline } from "react-icons/io5"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-medium">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="admin@ncomputing.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input id="password" type="password" placeholder="admin@123" required />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Don&apos;t have an account?{" "}</FieldSeparator>
        <Field>
          <Link href={'/signup'} className="w-full">
            <Button variant="outline" type="button" className="w-full">
              <div className="flex jusitfy-center gap-[1.5vw]">
                <IoMailOpenOutline className="mt-[0.5vw]" />
                <p>Signup instead</p>
              </div>
            </Button>
          </Link>
        </Field>
      </FieldGroup>
    </form>
  )
}
