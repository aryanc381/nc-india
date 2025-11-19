import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const loginHandler = async() => {
    if(!email || !pass) {
      toast.warning('Empty credentials.');
      return;
    }
    toast.promise(
      () => axios({
        url: 'http://192.168.10.72:5000/v1/api/auth/login',
        method: 'POST',
        data: {
          email: email,
          password: pass
        }
      }),
      {
        loading: 'Login initiated...',
        success: (res) => {
          const status = res.data.status;
          if(status === 403) return res.data.msg;
          else if (status === 405) return res.data.msg;
          else if (status === 401) return res.data.msg;
          else if (status === 200) { setTimeout(() => {navigate('/home')}, 4000); return res.data.msg; }
          else if (status === 500) return res.data.msg;
        }, error: () => 'Backend Unavailable, please contact admin.'
      }
    );
  }

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
                  <Input value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" type="email" placeholder="aryan@ncomputing.com" required className="rounded-[1vw]" />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input value={pass} onChange={(e) => {setPass(e.target.value)}} id="password" type="password" placeholder="************************" required className="rounded-[1vw]" />
                </Field>
                <Field>
                  <Button type="button" className="mt-[4vw] rounded-[1vw]" onClick={loginHandler}>Login</Button>
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
