'use client';
import Link from "next/link";
import { MenuIcon} from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Menu } from "@/app/components/admin-panel/menu";
import {
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTrigger,
    SheetTitle
} from "@/app/components/ui/sheet";
import { useEffect, useState } from "react";

export function SheetMenu() {
    const [storedRole, setStoredRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        setStoredRole(role);
    }, []);
    return (
        <Sheet>
        <SheetTrigger className="lg:hidden" asChild>
            <Button className="h-8" variant="outline" size="icon">
            <MenuIcon size={20} />
            </Button>
        </SheetTrigger>
        <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
            <SheetHeader>
            <Button
                className="flex justify-center items-center pb-2 pt-1"
                variant="link"
                asChild
            >
                <Link href="/dashboard" className="flex items-center gap-2">
                <SheetTitle className="font-bold text-lg">TCC - AfterFall</SheetTitle>
                </Link>
            </Button>
            </SheetHeader>
            <Menu isOpen role={storedRole || ""}/>
        </SheetContent>
        </Sheet>
    );
}
