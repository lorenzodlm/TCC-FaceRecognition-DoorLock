import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex flex-col h-14 items-center">
        <p className="text-gray-400">
            <a href="/info/about" className="text-black dark:text-gray-200 hover:underline">About Us </a> | 
            <a href="/info/contact" className="text-black dark:text-gray-200 hover:underline"> Contact </a> | 
            <a href="/info/privacy" className="text-black dark:text-gray-200 hover:underline"> Privacy Policy </a> | 
            <a href="/info/terms" className="text-black dark:text-gray-200 hover:underline"> Terms of Service </a>
        </p>
        <p className="mt-2">© 2024 AfterFall. All rights reserved.</p>
        
      </div>
    </div>
  );
}
