'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

import { ContentLayout } from "../../components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../../components/ui/breadcrumb";

import AdminDashboard from "../../components/demo/dashboard/adminDashboard";
import StudentDashboard from "../../components/demo/dashboard/studentDashboard";
import TeacherDashboard from "../../components/demo/dashboard/teacherDashboard";
import Unauthorised from "../../components/demo/dashboard/unauthorised";

export default function DashboardPage() {

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  let dashboardContent;
  switch (userRole) {
    case "admin":
      dashboardContent = <AdminDashboard />;
      break;
    case "student":
      dashboardContent = <StudentDashboard />;
      break;
    case "teacher":
      dashboardContent = <TeacherDashboard />;
      break;
    default:
      dashboardContent = <Unauthorised />;
  }
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {dashboardContent}
    </ContentLayout>
  );
}
