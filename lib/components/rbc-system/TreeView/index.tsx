import React from "react";
import {
  ChevronDown,
  ChevronLeft,
  RotateCcw,
  Check,
} from "lucide-react";
import Button from "@lib/components/rbc-base/Button";

interface TreeNode {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  children?: TreeNode[];
  status?: "active" | "completed" | "pending" | "error";
  icon?: React.ReactNode;
  details?: React.ReactNode;
}

interface TreeViewProps {
  nodes: TreeNode[];
  onRevert?: (nodeId: string) => void;
  defaultExpanded?: string[];
  className?: string;
  onSelectionChange?: (selectedIds: string[]) => void;
}

// Helper function to get all descendant IDs
const getAllDescendantIds = (node: TreeNode): string[] => {
  const ids: string[] = [node.id];
  if (node.children) {
    node.children.forEach(child => {
      ids.push(...getAllDescendantIds(child));
    });
  }
  return ids;
};

// Helper function to get all ancestor IDs
const getAncestorIds = (nodes: TreeNode[], targetId: string, parentMap: Map<string, string>): string[] => {
  const ancestors: string[] = [];
  let currentId = parentMap.get(targetId);
  console.log(nodes)
  while (currentId) {
    ancestors.push(currentId);
    currentId = parentMap.get(currentId);
  }
  
  return ancestors;
};

// Helper function to build parent-child relationship map
const buildParentMap = (nodes: TreeNode[], parentId?: string, map: Map<string, string> = new Map()): Map<string, string> => {
  nodes.forEach(node => {
    if (parentId) {
      map.set(node.id, parentId);
    }
    if (node.children) {
      buildParentMap(node.children, node.id, map);
    }
  });
  return map;
};

export const TreeViewNode: React.FC<{
  node: TreeNode;
  level: number;
  onRevert?: (nodeId: string) => void;
  expandedNodes: Set<string>;
  expandedDetails: Set<string>;
  selectedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
  toggleDetails: (nodeId: string) => void;
  toggleSelection: (nodeId: string, isShiftKey: boolean) => void;
  parentMap: Map<string, string>;
}> = ({
  node,
  level,
  onRevert,
  expandedNodes,
  expandedDetails,
  selectedNodes,
  toggleNode,
  toggleDetails,
  toggleSelection,
  parentMap,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const hasDetails = Boolean(node.details);
  const isExpanded = expandedNodes.has(node.id);
  const isDetailsExpanded = expandedDetails.has(node.id);
  const isSelected = selectedNodes.has(node.id);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "rbc-bg-green-500";
      case "error":
        return "rbc-bg-red-500";
      case "active":
        return "rbc-bg-blue-500";
      default:
        return "rbc-bg-gray-200";
    }
  };

  return (
    <div className="rbc-relative">
      {level > 0 && (
        <div
          className="rbc-absolute rbc-w-0.5 rbc-bg-gray-200"
          style={{
            right: `${level * 2}rem`,
            top: "0",
            bottom: hasChildren && isExpanded ? "50%" : "0",
          }}
        />
      )}

      <div className="rbc-relative rbc-mb-2">
        {level > 0 && (
          <>
            <div
              className="rbc-absolute rbc-h-0.5 rbc-bg-gray-200"
              style={{
                right: `${level * 2 + 1}rem`,
                width: "1rem",
                top: "1.6rem",
                transform: "rotate(180deg)",
              }}
            />
            <div
              className="rbc-absolute rbc-h-0.5 rbc-bg-gray-200"
              style={{
                right: `${level * 2}rem`,
                width: "2rem",
                top: "0.6rem",
                transform: "rotate(90deg)",
              }}
            />
          </>
        )}

        <div
          className="rbc-relative rbc-flex rbc-flex-col rbc-gap-2"
          style={{ marginRight: `${level * 2 + 2}rem` }}
        >
          <div className="rbc-flex rbc-items-center rbc-gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => hasChildren && toggleNode(node.id)}
              disabled={!hasChildren}
              className="!rbc-w-8 !rbc-h-8 !rbc-p-0 !rbc-border !rbc-border-gray-200"
              icon={
                hasChildren ? (
                  isExpanded ? (
                    <ChevronDown size={16} className="rbc-text-gray-500" />
                  ) : (
                    <ChevronLeft size={16} className="rbc-text-gray-500" />
                  )
                ) : (
                  <div
                    className={`rbc-w-3 rbc-h-3 rbc-rounded-full ${getStatusColor(
                      node.status
                    )}`}
                  />
                )
              }
            />

            <div
              className={`rbc-flex-1 rbc-bg-white rbc-border rbc-border-gray-200 rbc-rounded-lg rbc-p-4 hover:rbc-bg-gray-50 transition-colors ${
                isSelected ? "rbc-border-blue-500 rbc-bg-blue-50" : ""
              }`}
              onClick={(e) => {
                if (hasDetails) {
                  toggleDetails(node.id);
                }
                toggleSelection(node.id, e.shiftKey);
              }}
            >
              <div className="rbc-flex rbc-items-center rbc-justify-between rbc-gap-4">
                <div className="rbc-flex rbc-items-center rbc-gap-2">
                  <div 
                    className={`rbc-w-5 rbc-h-5 rbc-border rbc-border-gray-300 rbc-rounded flex rbc-items-center rbc-justify-center ${
                      isSelected ? "rbc-bg-blue-500 rbc-border-blue-500" : "rbc-bg-white"
                    }`}
                  >
                    {isSelected && <Check size={16} className="rbc-text-white" />}
                  </div>
                  {node.icon && (
                    <span className="rbc-text-gray-500">{node.icon}</span>
                  )}
                  <span className="rbc-font-medium">{node.title}</span>
                  {hasDetails && (
                    <ChevronDown
                      size={16}
                      className={`rbc-text-gray-400 rbc-transition-transform ${
                        isDetailsExpanded ? "rbc-rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                <div className="rbc-flex rbc-items-center rbc-gap-4 rbc-text-sm">
                  {node.timestamp && (
                    <span className="rbc-text-gray-500">{node.timestamp}</span>
                  )}
                  {onRevert && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRevert(node.id);
                      }}
                      icon={<RotateCcw size={16} />}
                      className="!rbc-p-1.5"
                      title="بازگشت به این نقطه"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {hasDetails && isDetailsExpanded && (
            <div className="rbc-mr-11 rbc-bg-gray-50 rbc-border rbc-border-gray-200 rbc-rounded-lg rbc-p-4 rbc-animate-slideDown">
              {node.details}
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="rbc-mt-2">
            {node.children!.map((child) => (
              <TreeViewNode
                key={child.id}
                node={child}
                level={level + 1}
                onRevert={onRevert}
                expandedNodes={expandedNodes}
                expandedDetails={expandedDetails}
                selectedNodes={selectedNodes}
                toggleNode={toggleNode}
                toggleDetails={toggleDetails}
                toggleSelection={toggleSelection}
                parentMap={parentMap}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  onRevert,
  defaultExpanded = [],
  className = "",
  onSelectionChange,
}) => {
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(
    new Set(defaultExpanded)
  );
  const [expandedDetails, setExpandedDetails] = React.useState<Set<string>>(
    new Set()
  );
  const [selectedNodes, setSelectedNodes] = React.useState<Set<string>>(
    new Set()
  );

  const parentMap = React.useMemo(() => buildParentMap(nodes), [nodes]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      return newExpanded;
    });
  };

  const toggleDetails = (nodeId: string) => {
    setExpandedDetails(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      return newExpanded;
    });
  };

  const toggleSelection = (nodeId: string, isShiftKey: boolean) => {
    setSelectedNodes(prev => {
      const newSelected = new Set(prev);
      const node = findNodeById(nodes, nodeId);
      
      if (!node) return prev;

      const isCurrentlySelected = newSelected.has(nodeId);
      
      // Get all descendant IDs
      const descendantIds = getAllDescendantIds(node);
      
      // Get all ancestor IDs
      const ancestorIds = getAncestorIds(nodes, nodeId, parentMap);
      
      if (isCurrentlySelected) {
        // Deselect node and all its descendants
        descendantIds.forEach(id => newSelected.delete(id));
        
        // Check if we need to deselect ancestors
        ancestorIds.forEach(ancestorId => {
          const ancestor = findNodeById(nodes, ancestorId);
          if (ancestor && ancestor.children) {
            const hasSelectedChildren = ancestor.children.some(child => 
              getAllDescendantIds(child).some(id => newSelected.has(id))
            );
            if (!hasSelectedChildren) {
              newSelected.delete(ancestorId);
            }
          }
        });
      } else {
        // Select node and all its descendants
        descendantIds.forEach(id => newSelected.add(id));
        
        // If shift key is pressed, also select all ancestors
        if (isShiftKey) {
          ancestorIds.forEach(id => newSelected.add(id));
        }
      }

      return newSelected;
    });
  };

  // Helper function to find a node by ID
  const findNodeById = (nodes: TreeNode[], targetId: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === targetId) return node;
      if (node.children) {
        const found = findNodeById(node.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  // Notify parent component of selection changes
  React.useEffect(() => {
    onSelectionChange?.(Array.from(selectedNodes));
  }, [selectedNodes, onSelectionChange]);

  return (
    <div className={`rbc-w-full rbc-p-4 ${className}`} dir="rtl">
      {nodes.map((node) => (
        <TreeViewNode
          key={node.id}
          node={node}
          level={0}
          onRevert={onRevert}
          expandedNodes={expandedNodes}
          expandedDetails={expandedDetails}
          selectedNodes={selectedNodes}
          toggleNode={toggleNode}
          toggleDetails={toggleDetails}
          toggleSelection={toggleSelection}
          parentMap={parentMap}
        />
      ))}
    </div>
  );
};

export default TreeView;