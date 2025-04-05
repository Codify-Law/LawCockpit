import { FileText } from "lucide-react";

interface Document {
  name: string;
  status: "not-indexed" | "indexed" | "processing" | "failed";
  dateAdded: string;
  path: string;
  category: string;
}

const document: Document = {
  name: "Vienna Convention on the Law of Treaties",
  status: "indexed",
  dateAdded: "12 April 2025",
  path: "/files/treaties",
  category: "treaties",
};

export default function DocumentDetailPage() {
  return (
    <>
      <div className="px-8 shadow-sm w-full py-4 bg-gray-50 text-xl text-neutral-900 flex items-center justify-start gap-2.5">
        <FileText />
        Document Details
      </div>
      <div className="flex flex-col items-start justify-start w-full p-8">
        <div className="bg-gray-50 border border-gray-100 w-full rounded-md overflow-hidden shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-6">{document.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`px-2 py-1 rounded-full text-sm w-26 text-center inline-block capitalize mt-1 ${
                    document.status === "indexed"
                      ? "bg-green-100 text-green-800"
                      : document.status === "not-indexed"
                      ? "bg-yellow-100 text-yellow-800"
                      : document.status === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {document.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Added</p>
                <p className="mt-1">{document.dateAdded}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Path</p>
                <p className="mt-1">{document.path}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="mt-1 capitalize">{document.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
