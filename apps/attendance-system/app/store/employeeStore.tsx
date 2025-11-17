import { create } from "zustand";
import { IEmployee } from "../types/employeeT";

interface EmployeeInfoState {
  employee: IEmployee;
  setBasicInfo: (info: Partial<IEmployee["employeeInformation"]>) => void;
  updateInfo: (key: string, value: any) => void;
}

const initialEmployee: IEmployee = {
  employeeInformation: {
    name: "",
    employeeID: null,
    contact: {
      cType: "",
      cNumber: null,
    },
    email: "",
    region: {
      zone: "",
      city: "",
    },
  },
  employeeAttendance: {
    data: [],
  },
  employeeLeave: {
    data: [],
  },
};

export const useEmployeeInfoStore = create<EmployeeInfoState>((set) => ({
  employee: initialEmployee,

  setBasicInfo: (info) => // this is to update various states at once
    set((state) => ({
      employee: {
        ...state.employee,
        employeeInformation: {
          ...state.employee.employeeInformation,
          ...info,
        },
      },
    })),

  updateInfo: (key, value) => // this shit is to update things once at a time
    set((state) => ({
      employee: {
        ...state.employee,
        employeeInformation: {
          ...state.employee.employeeInformation,
          [key]: value,
        },
      },
    })),
}));
