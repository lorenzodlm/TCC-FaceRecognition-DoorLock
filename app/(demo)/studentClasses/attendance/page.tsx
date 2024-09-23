'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

import StudentAttendancePage from "../../../components/demo/student/attendance";
import { ContentLayout } from "../../../components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "../../../components/ui/breadcrumb";

export default function AttendancePage() {
    const [classId, setClassId] = useState<string | null>(null);
    const [studentId, setStudentId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const classIdFromUrl = urlParams.get('classId');
        const studentIdFromUrl = urlParams.get('studentId');

        setClassId(classIdFromUrl);
        setStudentId(studentIdFromUrl);

        if (classIdFromUrl && studentIdFromUrl) {
            setIsLoading(false);
        }
    }, []); 

    return (
        <ContentLayout title="Attendance">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/studentClasses">Classes</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Attendance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {isLoading ? (
                <div>Loading...</div> // Show loading state while waiting for classId and studentId
            ) : (
                <StudentAttendancePage classId={classId} studentId={studentId} />
            )}
        </ContentLayout>
    );
}
