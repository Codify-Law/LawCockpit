import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  FolderClose,
  FolderOpen,
  File,
  ThreeDots,
} from "./lib/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Trash2, UserPlus } from "lucide-react";

export interface FileNode {
  name: string;
  children: FileNode[];
}

/**
 * Renders a tree node component that represents either a file or folder in a file system structure
 * @param {Object} props - Component props
 * @param {FileNode} props.node - The node data containing name and children
 * @param {number} [props.level=0] - The nesting level of the node, used for indentation
 * @returns {React.ReactElement} A tree node component with expandable folders and files
 */
const TreeNode = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
  // Track expanded/collapsed state of folders
  const [isOpen, setIsOpen] = useState(false);
  // Determine if node is a folder by checking for children
  const isFolder = node.children && node.children.length > 0;

  /**
   * Handles the expand/collapse toggle for folders
   */
  const toggleOpen = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "h-9 grid items-center cursor-pointer w-full pr-1.5 hover:bg-gray-100 transition-colors rounded-sm",
          // Use different grid layouts for files vs folders
          isFolder
            ? "grid-cols-[32px_24px_1fr_24px]"
            : "grid-cols-[32px_1fr_24px]"
        )}
        style={{ paddingLeft: `${level * (level ? 32 : 0)}px` }} // Calculate indentation based on nesting level
        onClick={toggleOpen}
      >
        {isFolder ? (
          <>
            {/* Render folder UI with dynamic expand/collapse chevron */}
            <span className="pr-2 text-gray-500">
              {isOpen ? <ChevronDown /> : <ChevronRight />}
            </span>
            {/* Render folder icon that changes based on expanded state */}
            {isOpen ? <FolderOpen /> : <FolderClose />}
          </>
        ) : (
          <>
            {/* Render file icon for non-folder items */}
            <File />
          </>
        )}

        {/* Node name with truncation for overflow */}
        <span className="font-medium pl-2 truncate pr-2">{node.name}</span>
        {/* Actions menu button that prevents event propagation */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="ml-auto mr-0 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <ThreeDots />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <UserPlus /> Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Render child nodes when folder is expanded */}
      {isFolder && isOpen && (
        <div className="transition-all duration-200">
          {node.children.map((childNode, index) => (
            <TreeNode
              key={`${childNode.name}-${index}`}
              node={childNode}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FileTree({ data }: { data: FileNode[] }) {
  return (
    <div className="pl-6 pr-2 w-full max-w-xs">
      {data.map((node, index) => (
        <TreeNode key={`${node.name}-${index}`} node={node} />
      ))}
    </div>
  );
}
