"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/useStore";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const projects = [
  "Website Redesign",
  "Mobile App Development",
  "Data Migration",
  "Security Audit",
  "Cloud Infrastructure",
];

export default function BookmarksPage() {
  const router = useRouter();
  const { employees, bookmarkedEmployees, toggleBookmark } = useStore();
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  const bookmarkedEmployeesList = employees.filter((employee) =>
    bookmarkedEmployees.includes(employee.id)
  );

  const handleAssignProject = (employeeId: number) => {
    setSelectedEmployee(employeeId);
    setShowProjectModal(true);
  };

  const confirmProjectAssignment = () => {
    if (selectedEmployee && selectedProject) {
      alert(
        `Assigned ${
          employees.find((e) => e.id === selectedEmployee)?.firstName
        } to ${selectedProject}`
      );
      setShowProjectModal(false);
      setSelectedProject("");
      setSelectedEmployee(null);
    }
  };

  if (bookmarkedEmployeesList.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <StarOutlineIcon className="h-12 w-12 text-gray-400" />
        <p className="text-lg text-gray-500">No bookmarked employees yet</p>
        <Button variant="primary" onClick={() => router.push("/")}>
          Browse Employees
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bookmarked Employees
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {bookmarkedEmployeesList.length} employees bookmarked
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarkedEmployeesList.map((employee) => (
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
                className="text-yellow-500 hover:text-yellow-600 transition-colors"
                title="Remove from bookmarks"
              >
                <StarIcon className="h-5 w-5" />
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
                onClick={() => handleAssignProject(employee.id)}
                className="flex-1"
              >
                Assign Project
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Project Assignment Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">Assign to Project</h3>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Project
              </label>
              <select
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Choose a project...</option>
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowProjectModal(false);
                  setSelectedProject("");
                  setSelectedEmployee(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={confirmProjectAssignment}
                disabled={!selectedProject}
              >
                Assign
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
