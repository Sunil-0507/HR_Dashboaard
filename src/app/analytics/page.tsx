"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/useStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsPage() {
  const { employees, bookmarkedEmployees } = useStore();
  const [departmentStats, setDepartmentStats] = useState<{
    [key: string]: { count: number; totalRating: number };
  }>({});

  useEffect(() => {
    const stats = employees.reduce((acc, employee) => {
      const dept = employee.department;
      if (!acc[dept]) {
        acc[dept] = { count: 0, totalRating: 0 };
      }
      acc[dept].count++;
      acc[dept].totalRating += employee.performance;
      return acc;
    }, {} as { [key: string]: { count: number; totalRating: number } });

    setDepartmentStats(stats);
  }, [employees]);

  const departmentData = {
    labels: Object.keys(departmentStats),
    datasets: [
      {
        label: "Average Rating",
        data: Object.values(departmentStats).map(
          (stat) => stat.totalRating / stat.count
        ),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const bookmarkData = {
    labels: ["Bookmarked", "Not Bookmarked"],
    datasets: [
      {
        data: [
          bookmarkedEmployees.length,
          employees.length - bookmarkedEmployees.length,
        ],
        backgroundColor: ["rgba(234, 179, 8, 0.5)", "rgba(156, 163, 175, 0.5)"],
        borderColor: ["rgb(234, 179, 8)", "rgb(156, 163, 175)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">
            Department-wise Average Ratings
          </h3>
          <div className="h-[300px]">
            <Bar
              data={departmentData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold">Bookmark Distribution</h3>
          <div className="h-[300px]">
            <Pie
              data={bookmarkData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="mb-4 text-lg font-semibold">Department Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Employees</th>
                <th className="px-4 py-2 text-left">Average Rating</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(departmentStats).map(([dept, stats]) => (
                <tr key={dept} className="border-b">
                  <td className="px-4 py-2">{dept}</td>
                  <td className="px-4 py-2">{stats.count}</td>
                  <td className="px-4 py-2">
                    {(stats.totalRating / stats.count).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
