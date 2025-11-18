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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Navbar />
      <div className="w-full justify-center mt-[10vw]">
        <Card className="border rounded-[0vw]">
          <CardHeader>
            <CardTitle>Attendance System Login</CardTitle>
            <CardDescription>Enter your email below to login to access your attendance stats at NComputing India.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup className="gap-[5vw]">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="aryan@ncomputing.com" required className="rounded-[1vw]" />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input id="password" type="password" placeholder="************************" required className="rounded-[1vw]" />
                </Field>
                <Field>
                  <Button type="submit" className="mt-[4vw] rounded-[1vw]">Login</Button>
                  <Button variant="outline" type="button" className="rounded-[1vw]" onClick={() => {navigate('/signup')}}>Signup instead</Button>
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
