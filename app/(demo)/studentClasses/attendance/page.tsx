'use client';
import Link from "next/link";
import { useRouter } from 'next/router';
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
    const router = useRouter();
    const { classId, studentId } = router.query; 

    // Handle loading state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only proceed if classId and studentId are available
        if (classId && studentId) {
            setIsLoading(false);
        }
    }, [classId, studentId]);

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
                <div>Loading...</div> // Show a loading state while waiting for classId and studentId
            ) : (
                <StudentAttendancePage classId={classId} studentId={studentId} />
            )}
        </ContentLayout>
    );
}
