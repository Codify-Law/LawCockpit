"use client";

import AppSidebar from "@/components/app-sidebar";
import Search from "@/components/search";
import { FileNode } from "@/components/tree";

const files: FileNode[] = [
  {
    name: "Iran - Russia",
    children: [
      {
        name: "Bilateral Treaties",
        children: [
          {
            name: "Trade Agreements",
            children: [
              { name: "trade_protocol_2023.pdf", children: [] },
              { name: "economic_cooperation.pdf", children: [] },
              { name: "investment_treaty.pdf", children: [] },
              { name: "customs_agreement_2022.pdf", children: [] },
              { name: "technology_transfer.pdf", children: [] },
            ],
          },
          {
            name: "Defense Agreements",
            children: [
              { name: "military_cooperation.pdf", children: [] },
              { name: "security_protocol.pdf", children: [] },
              { name: "intelligence_sharing.pdf", children: [] },
              { name: "joint_training_program.pdf", children: [] },
            ],
          },
          { name: "framework_agreement.pdf", children: [] },
          { name: "memorandum_understanding.pdf", children: [] },
        ],
      },
      { name: "treaty_summary.pdf", children: [] },
      { name: "legal_analysis.pdf", children: [] },
    ],
  },
  {
    name: "China - Russia",
    children: [
      {
        name: "Economic Partnership",
        children: [
          {
            name: "Energy Sector",
            children: [
              { name: "gas_pipeline_agreement.pdf", children: [] },
              { name: "oil_trade_protocol.pdf", children: [] },
              { name: "renewable_energy_mou.pdf", children: [] },
            ],
          },
          {
            name: "Financial Cooperation",
            children: [
              { name: "banking_protocol.pdf", children: [] },
              { name: "currency_swap.pdf", children: [] },
              { name: "investment_framework.pdf", children: [] },
            ],
          },
        ],
      },
      { name: "executive_summary.pdf", children: [] },
      { name: "risk_assessment.pdf", children: [] },
    ],
  },
  {
    name: "India - UAE",
    children: [
      {
        name: "Commercial Agreements",
        children: [
          {
            name: "Maritime Trade",
            children: [
              { name: "port_development.pdf", children: [] },
              { name: "shipping_routes.pdf", children: [] },
            ],
          },
          {
            name: "Technology",
            children: [
              { name: "digital_partnership.pdf", children: [] },
              { name: "cybersecurity_framework.pdf", children: [] },
            ],
          },
        ],
      },
      { name: "diplomatic_brief.pdf", children: [] },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Main container with flex layout
    <div className="flex items-stretch justify-start min-h-screen">
      {/* Sidebar component */}
      <AppSidebar files={files} />
      {/* Main content wrapper */}
      <div className="w-wrapper flex flex-col items-start justify-between">
        <div className="flex flex-col items-start justify-start w-full">
          <Search />
        </div>

        {children}
      </div>
    </div>
  );
}
