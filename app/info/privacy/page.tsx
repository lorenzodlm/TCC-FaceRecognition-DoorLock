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
                Privacy Policy
                </h1>
                <span className="max-w-[750px] text-center text-lg font-dark text-foreground">
                    Last Updated: October 19th, 2024
                </span>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                This Privacy Policy describes how AfterFall (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services or otherwise communicate with us regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
                <br /><br />
                Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Changes to Privacy Policy
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                How We Collect and Use Your Personal Information
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                To provide the Services, we collect personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.                
                <br /><br />
                In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide or improve or improve the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                What Personal Information We Collect
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Information We Collect Directly from You                
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Information that you directly submit to us through our Services may include: Name, Email, Phone Number, Address, Payment Information, and any other information you choose to provide.   
                <br /><br />
                Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Information We Collect about Your Usage             
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                We may also automatically collect certain information about your interaction with the Services ("<b>Usage Data</b>"). To do this, we may use cookies, pixels and similar technologies ("<b>Cookies</b>"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                How We Use Your Personal Information           
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                <li><b>Security and Fraud Prevention:</b> We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately.</li>
                <br/>
                <li><b>Communications:</b> We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you</li>
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Cookies
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Like many websites, we use Cookies on our Site. We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services (in our legitimate interests to administer, improve and optimize the Services). We may also permit third parties and services providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites.
                <br /><br />
                Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available. Additionally, blocking Cookies may not completely prevent how we share information with third parties such as our advertising partners.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Third Party Websites and Links
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Children's Data
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.                
                <br /><br />
                As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we “share” or “sell” (as those terms are defined in applicable law) personal information of individuals under 16 years of age.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Security and Retention of Your Information
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information you send to us may not be secure while in transit. We recommend that you do not use insecure channels to communicate sensitive or confidential information to us.
                <br /><br />
                How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Your Rights
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.
                <br /><br />
                <li><b>Right to Access / Know:</b> You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.</li>
                <br/>
                <li><b>Right to Delete / Erase:</b> You may have the right to request that we delete your personal information.</li>
                <br/>
                <li><b>Right to Correct:</b> You may have a right to request that we correct inaccurate personal information we maintain about you.</li>
                <br/>
                <li><b>Right of Portability:</b> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.</li>
                <br/>
                <li><b>Restriction of Processing:</b> You may have the right to ask us to stop or restrict our processing of personal information.</li>
                <br/>
                <li><b>Withdrawal of Consent:</b> Where we rely on consent to process your personal information, you may have the right to withdraw this consent.</li>
                <br/>
                <li><b>Appeal:</b> You may have a right to appeal our decision if we decline to process your request. You can do so by replying directly to our denial.</li>
                <br/><br/>
                You may exercise any of these rights where indicated on our Site or by contacting us using the contact details provided below.
                <br/><br/>
                We will not discriminate against you for exercising any of these rights. We may need to collect information from you to verify your identity, such as your email address or account information, before providing a substantive response to the request. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Complaints
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                International Users
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Please note that we may transfer, store and process your personal information outside the country you live in. Your personal information is also processed by staff and third party service providers and partners in these countries.
                <br /><br />
                If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.
                </p>
                </div>

                <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Contact                   
                </h1>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                <p className="text-center text-lg font-light text-foreground">
                Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at u6420015@au.edu.
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
