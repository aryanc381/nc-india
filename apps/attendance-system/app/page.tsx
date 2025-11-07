
import { ModeToggle } from "@/components/theme";

import LoginPage from "./login/page";

export default function Home() {
  return (
    <div className="flex flex-col m-[4vw]">
      <div className="flex justify-between">
        <ModeToggle />
      </div>
      <div className="mt-[10vw]">
        <LoginPage />
      </div>
    </div>
  );
}