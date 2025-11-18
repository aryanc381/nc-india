import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Navbar from "./navbar"
import { useNavigate } from "react-router-dom"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  return (
    <div className={cn("flex flex-col gap-[5vw]", className)} {...props}>
      <Navbar />
      <div className="w-full justify-center">
        <Card className="border rounded-[0vw]">
          <CardHeader>
            <CardTitle>Attendance System Signup</CardTitle>
            <CardDescription>Enter your credentials below to create your account at NComputing India.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup className="gap-[5vw]">
                
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input id="name" type="text" placeholder="Aryan Chauhan" required className="rounded-[1vw]" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="employeeID">Employee ID</FieldLabel>
                  <Input id="id" type="employeeID" placeholder="5434321" required className="rounded-[1vw]" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="aryan@ncomputing.com" required className="rounded-[1vw]" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="contact">Contact Number</FieldLabel>
                  <Input id="contact" type="contact" placeholder="+91 9049122622" required className="rounded-[1vw]" />
                </Field>
                
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input id="password" type="password" placeholder="************************" required className="rounded-[1vw]" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="region">Region</FieldLabel>
                  <Input id="email" type="email" placeholder="aryan@ncomputing.com" required className="rounded-[1vw]" />
                </Field>
                <Field>
                  <Button type="submit" className="rounded-[1vw] mt-[4vw]">Signup</Button>
                  <Button onClick={() => {navigate('/')}} variant="outline" type="button" className="rounded-[1vw]">Login instead</Button>
                  <div className="flex text-gray-500 text-[3.5vw] text-center mt-[2vw]">
                    <p className="mr-[1vw]">If you have forgotten password, please</p>
                    <p className="underline">click here.</p>
                  </div>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}