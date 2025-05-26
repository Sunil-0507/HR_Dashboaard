"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/useStore";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: {
    address: string;
    city: string;
  };
  phone: string;
}

export default function Home() {
  const router = useRouter();
  const { employees, setEmployees, toggleBookmark, isBookmarked } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://dummyjson.com/users?limit=20");
        const data = await response.json();
        const processedEmployees = data.users.map((user: DummyUser) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department:
            departments[Math.floor(Math.random() * departments.length)],
          performance: Math.floor(Math.random() * 5) + 1,
          address: `${user.address.address}, ${user.address.city}`,
          phone: user.phone,
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        }));
        setEmployees(processedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [setEmployees]);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      !selectedDepartment || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {filteredEmployees.length} employees found
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select
            className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card
            key={employee.id}
            className="space-y-4 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-500">{employee.email}</p>
              </div>
              <button
                onClick={() => toggleBookmark(employee.id)}
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                title={
                  isBookmarked(employee.id) ? "Remove bookmark" : "Add bookmark"
                }
              >
                {isBookmarked(employee.id) ? (
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                ) : (
                  <StarOutlineIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Department:</span>{" "}
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                  {employee.department}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Age:</span> {employee.age}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Performance:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < employee.performance
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push(`/employee/${employee.id}`)}
                className="flex-1"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const confirmed = window.confirm(
                    `Are you sure you want to promote ${employee.firstName} ${employee.lastName}?`
                  );
                  if (confirmed) {
                    alert("Promotion request submitted!");
                  }
                }}
                className="flex-1"
              >
                Promote
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
          <p className="text-lg text-gray-500">No employees found</p>
          <Button
            variant="primary"
            onClick={() => {
              setSearchTerm("");
              setSelectedDepartment("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
