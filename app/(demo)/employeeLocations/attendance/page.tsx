'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

import EmployeeAttendancePage from "@/app/components/demo/employee/attendance";
import { ContentLayout } from "@/app/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/app/components/ui/breadcrumb";

export default function AttendancePage() {
    const [locationID, setlocationId] = useState<string | null>(null);
    const [employeeID, setEmployeeId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const locationIdFromUrl = urlParams.get('locationID');
        const employeeIdFromUrl = urlParams.get('employeeID');

        setlocationId(locationIdFromUrl);
        setEmployeeId(employeeIdFromUrl);

        if (locationIdFromUrl && employeeIdFromUrl) {
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
                            <Link href="/employeeLocations">Locations</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Attendance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {isLoading ? (
                <div>Loading...</div> 
            ) : (
                <EmployeeAttendancePage locationID={locationID} employeeID={employeeID} />
            )}
        </ContentLayout>
    );
}
