import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/app/components/ui/button";
import { ModeToggle } from "@/app/components/mode-toggle";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
        <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
            <div className="container h-14 flex items-center">
            <Link
                href="/"
                className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
            >
                <span className="font-bold">AfterFall</span>
                <span className="sr-only">AfterFall</span>
            </Link>
            <nav className="ml-auto flex items-center gap-2">
                <Button
                variant="outline"
                size="icon"
                className="rounded-full w-8 h-8 bg-background"
                asChild
                >
                <Link href="https://github.com/lorenzodlm/AfterFall-next">
                    <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                </Link>
                </Button>
                <ModeToggle />
            </nav>
            </div>
        </header>
        <main className="min-h-[calc(100vh-57px-97px)] flex-1">
            <div className="container relative pb-10">
            <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Terms of Services
                </h1>
                <span className="max-w-[750px] text-center text-lg font-dark text-foreground">
                </span>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                This website is operated by AfterFall. Throughout the site, the terms “we”, “us” and “our” refer to AfterFall. AfterFall offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                <br /><br />
                By visiting our site, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.&nbsp;
                <br /><br />
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                <br /><br />
                Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                SECTION 1 - GENERAL CONDITIONS
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                We reserve the right to refuse Service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us. The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                SECTION 2 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk. This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                SECTION 3 - MODIFICATIONS TO THE SERVICE AND PRICES
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                SECTION 4 - OPTIONAL TOOLS
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of the optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future, offer new Services and/or features through the website (including the release of new tools and resources). Such new features and/or Services shall also be subject to these Terms of Service.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                SECTION 5 - THIRD PARTY LINKS
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Certain content, products and Services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or Services of third-parties. We are not liable for any harm or damages related to the purchase or use of goods, Services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                SECTION 6 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                If, at our request, you send certain specific submissions (for example contest entries) or without a request from us, you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments. We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service. You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                SECTION 7 - PERSONAL INFORMATION
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Your submission of personal information through the store is governed by our Privacy Policy, which can be viewed here: <a href="/info/privacy" className="text-black-500 underline">Privacy Policy</a>           
                </p>
                </div>


            </section>
            </div>
        </main>
        <footer className="py-6 md:py-0 border-t border-border/40">
            <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
                <a href="/info/about" className="text-black dark:text-gray-200 hover:underline"> About Us </a> |
                <a href="/info/contact" className="text-black dark:text-gray-200 hover:underline"> Contact </a> | 
                <a href="/info/privacy" className="text-black dark:text-gray-200 hover:underline"> Privacy Policy </a> | 
                <a href="/info/terms" className="text-black dark:text-gray-200 hover:underline"> Terms of Service </a>
            </p>
            </div>
        </footer>
        </div>
    );
}
