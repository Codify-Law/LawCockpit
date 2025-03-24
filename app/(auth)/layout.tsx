export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
