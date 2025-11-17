"use client"
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useEmployeeInfoStore } from "@/app/store/employeeStore";

interface Menu {
    zone: string;
    department: string[];
}

const regionInfo: Menu[] = [
    {
        zone: "INDIA-WEST",
        department: ['Baner, Pune', 'Sadashiv-Peth, Pune']
    }, 
    {
        zone: "INDIA-SOUTH",
        department: ['Bangalore, Karnataka', 'Hyderabad, Karnataka']
    },
    {
        zone: "INDIA-EAST",
        department: ['', '']
    },
    {
        zone: "INDIA-NORTH",
        department: ['Gurugram, Delhi', 'Haryana, Punjab']
    }
]

export default function RegionMenu() {
    const employee = useEmployeeInfoStore((state) => state.employee);
    const updateInfo = useEmployeeInfoStore((state) => state.updateInfo);
    return(
        <div className="flex">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant={"outline"}>Select Region</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-[10vw] w-[60vw] h-[40vw] overflow-y">
                    {regionInfo.map((item) => (
                        <div key={item.zone}>
                            <DropdownMenuLabel>{item.zone}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {item.department.map((data) => (
                                <DropdownMenuItem key={data} onClick={() => updateInfo("region", {zone: item.zone, city: data})}>{data}</DropdownMenuItem>
                            ))}
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div> 
    )
}