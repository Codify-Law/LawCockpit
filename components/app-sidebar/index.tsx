import Link from "next/link";
import {
  BrainCircuit,
  Building2,
  FileStack,
  LayoutDashboard,
} from "lucide-react";
import { useGlobalStore } from "@/store/global";

export default function AppSidebar() {
  const globalStore = useGlobalStore((state) => state);

  return (
    <div className="w-sidebar border-r border-[#E0E0E0] py-6 flex flex-col items-start justify-between">
      {/* Logo and navigation section */}
      <div className="flex flex-col items-start justify-start w-full">
        <Link
          href={"/dashboard"}
          className="w-full font-black text-[24px] text-black flex items-center justify-between gap-2.5 px-6"
        >
          <div className="p-3 rounded-sm bg-black text-white">
            <BrainCircuit />
          </div>
          CodifyLaw Cockpit
        </Link>

        <div className="w-full mt-6 pt-6 border-t">
          <div className="px-4 space-y-1.5">
            <Link
              href={"/organizations"}
              className="flex items-center justify-start gap-2 py-2 hover:bg-gray-100 rounded-sm px-2"
            >
              <LayoutDashboard />
              Demo Requests
            </Link>
            <Link
              href={"/organizations"}
              className="flex items-center justify-start gap-2 py-2 hover:bg-gray-100 rounded-sm px-2"
            >
              <Building2 />
              Organizations
            </Link>
            <Link
              href={"/organizations"}
              className="flex items-center justify-start gap-2 py-2 hover:bg-gray-100 rounded-sm px-2"
            >
              <FileStack />
              Documents
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center px-4">
        {/* User profile section */}
        <div className="px-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-start gap-4"
          >
            {/* User avatar */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="24" fill="#D1D5DB" />
              <path
                d="M24 39C32.2843 39 39 32.2843 39 24C39 15.7157 32.2843 9 24 9C15.7157 9 9 15.7157 9 24C9 32.2843 15.7157 39 24 39Z"
                stroke="#1F2937"
                strokeWidth="2.25"
              />
              <path
                d="M17.25 31.5C20.7476 27.8367 27.2148 27.6642 30.75 31.5M27.7427 20.25C27.7427 22.321 26.0613 24 23.9872 24C21.9133 24 20.232 22.321 20.232 20.25C20.232 18.1789 21.9133 16.5 23.9872 16.5C26.0613 16.5 27.7427 18.1789 27.7427 20.25Z"
                stroke="#1F2937"
                strokeWidth="2.25"
                strokeLinecap="round"
              />
            </svg>

            {/* User info and sign out button */}
            <div className="flex flex-col items-start justify-center">
              <p>Abbas Poorhashemi</p>
              <p
                className="flex items-center justify-start text-sm text-[#6B7280] font-normal gap-1 hover:text-red-600"
                onClick={() => globalStore.signOut()}
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66675 8.50002C1.66675 5.51446 1.66675 4.02168 2.59424 3.09418C3.52174 2.16669 5.01452 2.16669 8.00008 2.16669C10.9856 2.16669 12.4784 2.16669 13.4059 3.09418C14.3334 4.02168 14.3334 5.51446 14.3334 8.50002C14.3334 11.4856 14.3334 12.9784 13.4059 13.9059C12.4784 14.8334 10.9856 14.8334 8.00008 14.8334C5.01452 14.8334 3.52174 14.8334 2.59424 13.9059C1.66675 12.9784 1.66675 11.4856 1.66675 8.50002Z"
                    stroke="currentColor"
                  />
                  <path
                    d="M10.6666 8.49998H5.33325M10.6666 8.49998C10.6666 8.03318 9.33705 7.161 8.99992 6.83331M10.6666 8.49998C10.6666 8.96678 9.33705 9.83898 8.99992 10.1666"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sign out
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
