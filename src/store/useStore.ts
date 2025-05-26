import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performance: number;
  address: string;
  phone: string;
  bio: string;
}

interface StoreState {
  employees: Employee[];
  bookmarkedEmployees: number[];
  setEmployees: (employees: Employee[]) => void;
  toggleBookmark: (employeeId: number) => void;
  isBookmarked: (employeeId: number) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      employees: [],
      bookmarkedEmployees: [],
      setEmployees: (employees) => set({ employees }),
      toggleBookmark: (employeeId) =>
        set((state) => ({
          bookmarkedEmployees: state.bookmarkedEmployees.includes(employeeId)
            ? state.bookmarkedEmployees.filter((id) => id !== employeeId)
            : [...state.bookmarkedEmployees, employeeId],
        })),
      isBookmarked: (employeeId) =>
        get().bookmarkedEmployees.includes(employeeId),
    }),
    {
      name: "hr-dashboard-storage",
    }
  )
);
