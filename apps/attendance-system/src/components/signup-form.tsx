import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import axios from 'axios';
import { toast } from "sonner";

interface regionProps {
  zone: string;
  location: string[];
}

const regionArr: regionProps[] = [
  {zone: '| INDIA-WEST', location: ['Baner, Pune', 'Sadashiv Peth, Pune',]},
  {zone: '| INDIA-NORTH', location: ['Haryana, Delhi', 'Sadashiv Peth, Pune']}
]

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [region, setRegion] = useState('');
  const [office, setOffice] = useState('');

  const singupHandler = async() => {
    if(!name || !email || !pass || !phone || !id || !region || !office) {
      toast.warning('Missing credentials.');
      return;
    }

    toast.promise(() => 
      axios({
        url: 'http://192.168.10.72:5000/v1/api/auth/signup',
        method: 'POST',
        data: {
          name: name,
          email: email,
          password: pass,
          id: id,
          phone: phone,
          location: {
            office: office,
            region: region
          }
        }
      }),
      {
        loading: 'Signup initiated...',
        success: (res) => {
          const status = res.data.status;
          if(status === 403) { 
            return res.data.msg;
          } else if (status === 500) { 
            return res.data.msg;
          } else if (status === 201) {
            setTimeout(() => {navigate('/face-reg')}, 3000);
            return res.data.msg
          } else { 
            return 'Backend Live but unavailable.'
          }
        },
        error: () => {
          return 'Backend Unavailable, contact admin.';
        },
      }
    );
  }
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
                  <Input value={name} onChange={(e) => {setName(e.target.value)}} id="name" type="text" placeholder="Aryan Chauhan" required className="rounded-[1vw]" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="employeeID">Employee ID</FieldLabel>
                  <Input value={id} onChange={(e) => {setId(e.target.value)}} id="id" type="employeeID" placeholder="5434321" required className="rounded-[1vw]" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" type="email" placeholder="aryan@ncomputing.com" required className="rounded-[1vw]" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="contact">Contact Number</FieldLabel>
                  <Input value={phone} onChange={(e) => {setPhone(e.target.value)}} id="contact" type="contact" placeholder="+91 9049122622" required className="rounded-[1vw]" />
                </Field>
                
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input value={pass} onChange={(e) => {setPass(e.target.value)}} id="password" type="password" placeholder="************************" required className="rounded-[1vw]" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="region">Region</FieldLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex">
                        <Button variant={'outline'} className="rounded-[1vw]">{office || "Select your location"} {" "} {region}</Button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {regionArr.map((r) => (
                        <div key={r.zone}>
                          <DropdownMenuLabel onClick={() => { setRegion(r.zone); setOffice(""); }}>{r.zone}</DropdownMenuLabel>
                          {r.location.map((loc) => (
                            <DropdownMenuItem onClick={() => {setOffice(loc); setRegion(r.zone)}} key={loc}>
                              {loc}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Field>

                <Field>
                  <Button type="button" className="rounded-[1vw] mt-[4vw]" onClick={singupHandler}>Signup</Button>
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