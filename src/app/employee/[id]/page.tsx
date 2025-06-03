"use client";

import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/useStore";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "feedback", label: "Feedback" },
];

// Generate random performance history
const generatePerformanceHistory = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month) => ({
    month,
    rating: Math.floor(Math.random() * 5) + 1,
    feedback: [
      "Excellent work on project deliverables",
      "Great team collaboration",
      "Strong problem-solving skills",
      "Consistent performance",
      "Good communication skills",
    ][Math.floor(Math.random() * 5)],
  }));
};

// Generate random projects
const generateProjects = () => {
  return [
    {
      name: "Website Redesign",
      status: "In Progress",
      progress: 75,
      dueDate: "2024-04-15",
      description:
        "Modernizing the company website with new features and improved UX.",
    },
    {
      name: "Mobile App Development",
      status: "Completed",
      progress: 100,
      dueDate: "2024-03-01",
      description: "Developed a new mobile app for customer engagement.",
    },
    {
      name: "Data Migration",
      status: "Planning",
      progress: 20,
      dueDate: "2024-05-30",
      description: "Planning the migration of legacy data to new systems.",
    },
  ];
};

// Generate random feedback
const generateFeedback = () => {
  return [
    {
      author: "John Smith",
      role: "Project Manager",
      date: "2024-03-15",
      rating: 5,
      comment:
        "Exceptional work on the latest project. Great attention to detail and timely delivery.",
    },
    {
      author: "Sarah Johnson",
      role: "Team Lead",
      date: "2024-02-28",
      rating: 4,
      comment:
        "Strong technical skills and good team player. Could improve on documentation.",
    },
    {
      author: "Michael Brown",
      role: "Department Head",
      date: "2024-02-15",
      rating: 5,
      comment:
        "Outstanding performance in the last quarter. Keep up the good work!",
    },
  ];
};

const getPerformanceColor = (rating: number) => {
  switch (rating) {
    case 5:
      return "bg-green-100 text-green-800";
    case 4:
      return "bg-blue-100 text-blue-800";
    case 3:
      return "bg-yellow-100 text-yellow-800";
    case 2:
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-red-100 text-red-800";
  }
};

export default function EmployeePage() {
  const params = useParams();
  // const router = useRouter();
  const { employees, toggleBookmark, isBookmarked } = useStore();
  const [activeTab, setActiveTab] = useState("overview");

  const employee = employees.find((emp) => emp.id === Number(params.id));
  const performanceHistory = generatePerformanceHistory();
  const projects = generateProjects();
  const feedback = generateFeedback();

  if (!employee) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-500">Employee not found</p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <Card>
              <h3 className="mb-4 text-lg font-semibold">
                Personal Information
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{employee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{employee.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{employee.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{employee.department}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bio</p>
                    <p className="mt-1 text-sm text-gray-600">{employee.bio}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="mb-4 text-lg font-semibold">
                Current Performance
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-6 w-6 ${
                        i < employee.performance
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getPerformanceColor(
                    employee.performance
                  )}`}
                >
                  {employee.performance}/5 Rating
                </span>
              </div>
            </Card>

            <Card>
              <h3 className="mb-4 text-lg font-semibold">
                Performance History
              </h3>
              <div className="space-y-4">
                {performanceHistory.map((record) => (
                  <div
                    key={record.month}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                  >
                    <div>
                      <p className="font-medium">{record.month}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {record.feedback}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < record.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPerformanceColor(
                          record.rating
                        )}`}
                      >
                        {record.rating}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case "projects":
        return (
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Current Projects</h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        );

      case "feedback":
        return (
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Recent Feedback</h3>
            <div className="space-y-4">
              {feedback.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{item.author}</h4>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPerformanceColor(
                          item.rating
                        )}`}
                      >
                        {item.rating}/5
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.comment}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{employee.department}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toggleBookmark(employee.id)}>
            {isBookmarked(employee.id) ? (
              <>
                <StarIcon className="mr-2 h-5 w-5 text-yellow-500" />
                Bookmarked
              </>
            ) : (
              <>
                <StarOutlineIcon className="mr-2 h-5 w-5" />
                Bookmark
              </>
            )}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const confirmed = window.confirm(
                `Are you sure you want to promote ${employee.firstName} ${employee.lastName}?`
              );
              if (confirmed) {
                alert("Promotion request submitted!");
              }
            }}
          >
            Promote
          </Button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 py-4 text-sm font-medium ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  );
}
