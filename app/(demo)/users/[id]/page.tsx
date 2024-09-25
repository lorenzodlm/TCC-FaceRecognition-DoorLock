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

import UserDetails from "@/app/components/demo/admin/userDetails"

interface UserDetailsParams {
    id: string; // Assuming `id` is a string
}

interface UserDetailsPageProps {
    params: UserDetailsParams;
}

export default function UserDetailsPage({params}:UserDetailsPageProps) {
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
                <Link href="/users">Users</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>User Detail</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <UserDetails params={params}/>
    </ContentLayout>
    );
}
