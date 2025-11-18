import { IoSettingsOutline } from "react-icons/io5";

function Navbar() {
    return(
        <div className="border p-[3vw] flex w-full h-full justify-between items-center">
            <img className="w-[40vw]" src="/light.png" alt="" />
            <IoSettingsOutline   className="size-[7vw]" />
        </div>
    )
}

export default Navbar;