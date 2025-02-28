'use client';

import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { useStore } from "@/app/hooks/use-store";
import { Button } from "@/app/components/ui/button";
import { Menu } from "@/app/components/admin-panel/menu";
import { useSidebarToggle } from "@/app/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/app/components/admin-panel/sidebar-toggle";
import Image from 'next/image';

import { useEffect, useState } from 'react';


export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const [role, setRole] = useState(null);
  const storedRole = localStorage.getItem('role') || "";

  
  if(!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen ? "w-72" : "w-[90px]"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800 overflow-hidden">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative flex justify-center items-center mt-12 py-4">
              <Image
                src="/tcc-logo.png"
                alt="TCC Logo"
                width={sidebar?.isOpen ? 150 : 50}
                height={sidebar?.isOpen ? 50 : 50}
                className={cn(
                  "transition-[transform,opacity,display] ease-in-out duration-300ß object-contain",
                  sidebar?.isOpen === false
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                )}
              />
            </div>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} role={storedRole} />
      </div>
    </aside>
  );
}
