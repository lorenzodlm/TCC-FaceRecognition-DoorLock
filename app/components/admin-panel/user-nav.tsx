'use client';

import Link from "next/link";
import { LayoutGrid, LogOut, LogIn, User } from "lucide-react";
import { useEffect, useState } from "react";


import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "../../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";

export function UserNav() {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const _id = localStorage.getItem('_id');

  useEffect(() => {
    const fetchUserData = async () => {
      if (_id) {
        try {
          const res = await fetch(`/api/users?id=${_id}`);
          const data = await res.json();
          if (res.ok) {
            setUserName(data.name);
            setUserEmail(data.email);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [_id]);

  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.length > 1
      ? names[0][0] + names[names.length - 1][0] // First and last initials
      : names[0][0]; // Just the first initial if only one name
    return initials.toUpperCase(); // Return initials in uppercase
  };

  const handleSignOut = () => {
    localStorage.removeItem('_id');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    setUserName(null); 
    setUserEmail(null); 
    window.location.href = window.location.href;
  };

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    {userName ? getInitials(userName) : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        {userName && userEmail ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="/dashboard" className="flex items-center">
                  <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="/account" className="flex items-center">
                  <User className="w-4 h-4 mr-3 text-muted-foreground" />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/auth/signin" className="flex items-center">
              <LogIn className="w-4 h-4 mr-3 text-muted-foreground" />
              Sign in
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
