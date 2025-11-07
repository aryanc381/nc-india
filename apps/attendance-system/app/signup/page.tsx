import { ModeToggle } from "@/components/theme";
import { SignupForm } from "@/components/signup-form";

export default function() {
    return(
        <div className="flex flex-col m-[4vw]">
            <div className="flex justify-between">
                <ModeToggle />
            </div>
            <div className="mt-[3vw] m-[5vw]">
                <SignupForm />
            </div>
        </div>
    )
}