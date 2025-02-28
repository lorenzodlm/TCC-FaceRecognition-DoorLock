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

// import LocationDetails from "@/app/components/demo/admin/locationDetails"
import LocationDetails from "@/app/components/demo/admin/editLocation";

interface LocationDetailsParams {
    locationID: string; 
}

interface LocationDetailsPageProps {
    params: { locationID: string }; 
}

export default function LocationDetailsPage({params}:LocationDetailsPageProps) {
    const { locationID } = params;
    console.log('Received locationID:', locationID);
    
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
                <Link href="/users/locations">Locations</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>Location Details</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <LocationDetails params={{locationID}}/>
    </ContentLayout>
    );
}
