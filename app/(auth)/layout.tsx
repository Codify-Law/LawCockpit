import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-100">
      {/* Header section with navigation links */}
      <header className="text-white bg-[#27272ABF] w-full px-[54px] py-5 flex items-center justify-start">
        {/* Logo/Brand link */}
        <Link
          href="https://codifylaw.ai/"
          target="_blank"
          className="font-bold text-2xl font-EB-Garamond mr-6"
        >
          CodifyLaw
        </Link>

        {/* Main navigation links */}
        <div className="flex items-center justify-start gap-6 text-base font-medium leading-7 pt-1">
          <Link href={"https://codifylaw.ai/"}>Home</Link>
          <Link href={"https://codifylaw.ai/blog/"}>Blog</Link>
          <Link href={"https://codifylaw.ai/about-us/"}>About Us</Link>
        </div>

        {/* Right-aligned navigation links */}
        <div className="flex items-center justify-start gap-6 text-base font-medium leading-7 pt-1 mr-0 ml-auto">
          <Link href={"https://codifylaw.ai/contact-us/"}>Contact Support</Link>
          <Link href={"/signin"}>Sign In</Link>
          <Link
            href={"/book-a-demo"}
            className="bg-white text-neutral-900 px-3 rounded-md h-8 flex items-center justify-center font-bold"
          >
            Book a Demo
          </Link>
        </div>
      </header>
      {/* Render child components */}
      {children}
    </div>
  );
}
