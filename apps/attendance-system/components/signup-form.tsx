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
import { useEmployeeInfoStore } from "@/app/store/employeeStore";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const employee = useEmployeeInfoStore((state) => state.employee);
  const updateInfo = useEmployeeInfoStore((state) => state.updateInfo);

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
          <Input value={employee.employeeInformation.name} onChange={(e) => {updateInfo("name", e.target.value)}} id="name" type="text" placeholder="Ameer Mokashi" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input value={employee.employeeInformation.email} onChange={(e) => {updateInfo("email", e.target.value)}} id="email" type="email" placeholder="ameer@techminds.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
          <Input value={employee.employeeInformation.employeeID ?? ""} onChange={(e) => {const value = e.target.value; updateInfo("employeeID", value === "" ? null : Number(value));}} id="id" type="number" placeholder="5434321" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Contact Number</FieldLabel>
          <Input value={employee.employeeInformation.contact.cNumber ?? ""} onChange={(e) => {const value = e.target.value; updateInfo("contact", {...employee.employeeInformation.contact, cNumber: value === "" ? null : Number(value)});}} id="phone" type="number" placeholder="+91 9049122622" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="region">Region</FieldLabel>
          <RegionMenu />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Password</FieldLabel>
          <Input value={employee.employeeInformation.password} onChange={(e) => {updateInfo("password", e.target.value)}} id="password" type="password" placeholder="ameer@123" required />
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
