'use client';
import Link from "next/link";

import { ContentLayout } from "@/app/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/app/components/ui/breadcrumb";

import ClassDetails from "@/app/components/demo/admin/classDetails"

interface ClassDetailsParams {
    classCode: string; 
}

interface ClassDetailsPageProps {
    params: { classCode: string }; 
}

export default function ClassDetailsPage({params}:ClassDetailsPageProps) {
    const { classCode } = params;
    console.log('Received classCode:', classCode);
    
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
                <Link href="/users/classes">Classes</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>Class Detail</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <ClassDetails params={{classCode}}/>
    </ContentLayout>
    );
}
