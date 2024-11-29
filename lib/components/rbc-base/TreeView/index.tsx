import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface TreeNode {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  children?: TreeNode[];
  status?: 'active' | 'completed' | 'pending' | 'error';
  icon?: React.ReactNode;
  details?: React.ReactNode; // New field for optional details content
}

interface TreeViewProps {
  nodes: TreeNode[];
  onRevert?: (nodeId: string) => void;
  defaultExpanded?: string[];
  className?: string;
}

// Separate component for recursive rendering
const TreeViewNode: React.FC<{
  node: TreeNode;
  level: number;
  onRevert?: (nodeId: string) => void;
  expandedNodes: Set<string>;
  expandedDetails: Set<string>;
  toggleNode: (nodeId: string) => void;
  toggleDetails: (nodeId: string) => void;
}> = ({ 
  node, 
  level, 
  onRevert, 
  expandedNodes, 
  expandedDetails,
  toggleNode, 
  toggleDetails 
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const hasDetails = Boolean(node.details);
  const isExpanded = expandedNodes.has(node.id);
  const isDetailsExpanded = expandedDetails.has(node.id);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'rbc-bg-green-500';
      case 'error':
        return 'rbc-bg-red-500';
      case 'active':
        return 'rbc-bg-blue-500';
      default:
        return 'rbc-bg-gray-300';
    }
  };

  return (
    <div className="rbc-relative">
      {/* Vertical line for connections */}
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
        {/* Horizontal connection line */}
        {level > 0 && (
          <>
            <div
              className="rbc-absolute rbc-h-0.5 rbc-bg-gray-200"
              style={{
                right: `${(level * 2) + 1}rem`,
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

        {/* Node Content */}
        <div
          className="rbc-relative rbc-flex rbc-flex-col rbc-gap-2"
          style={{ marginRight: `${level * 2 + 2}rem` }}
        >
          <div className="rbc-flex rbc-items-center rbc-gap-3">
            {/* Status indicator and expand/collapse button */}
            <button
              onClick={() => hasChildren && toggleNode(node.id)}
              className={`rbc-flex rbc-items-center rbc-justify-center rbc-w-8 rbc-h-8 rbc-rounded-full rbc-border rbc-border-gray-200 rbc-bg-white ${
                hasChildren ? "hover:rbc-bg-gray-50 rbc-cursor-pointer" : ""
              }`}
            >
              {hasChildren ? (
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
              )}
            </button>

            {/* Node details */}
            <div 
              className={`rbc-flex-1 rbc-bg-white rbc-border rbc-border-gray-200 rbc-rounded-lg rbc-p-4 hover:rbc-bg-gray-50 transition-colors ${
                hasDetails ? 'rbc-cursor-pointer' : ''
              }`}
              onClick={() => hasDetails && toggleDetails(node.id)}
            >
              <div className="rbc-flex rbc-items-center rbc-justify-between rbc-gap-4">
                <div className="rbc-flex rbc-items-center rbc-gap-2">
                  {node.icon && (
                    <span className="rbc-text-gray-500">{node.icon}</span>
                  )}
                  <span className="rbc-font-medium">{node.title}</span>
                  {hasDetails && (
                    <ChevronDown 
                      size={16} 
                      className={`rbc-text-gray-400 rbc-transition-transform ${
                        isDetailsExpanded ? 'rbc-rotate-180' : ''
                      }`} 
                    />
                  )}
                </div>

                <div className="rbc-flex rbc-items-center rbc-gap-4 rbc-text-sm">
                  {node.timestamp && (
                    <span className="rbc-text-gray-500">{node.timestamp}</span>
                  )}
                  {onRevert && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRevert(node.id);
                      }}
                      className="rbc-p-1.5 hover:rbc-bg-gray-100 rbc-rounded-full rbc-text-gray-500 hover:rbc-text-gray-700"
                      title="بازگشت به این نقطه"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Details Section */}
          {hasDetails && isDetailsExpanded && (
            <div 
              className="rbc-mr-11 rbc-bg-gray-50 rbc-border rbc-border-gray-200 rbc-rounded-lg rbc-p-4 rbc-animate-slideDown"
            >
              {node.details}
            </div>
          )}
        </div>

        {/* Render children recursively */}
        {hasChildren && isExpanded && (
          <div className="rbc-mt-2">
            {node.children!.map((child, index) => (
              <TreeViewNode
                key={child.id}
                node={child}
                level={level + 1}
                onRevert={onRevert}
                expandedNodes={expandedNodes}
                expandedDetails={expandedDetails}
                toggleNode={toggleNode}
                toggleDetails={toggleDetails}
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
  className = '',
}) => {
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(
    new Set(defaultExpanded)
  );
  const [expandedDetails, setExpandedDetails] = React.useState<Set<string>>(
    new Set()
  );

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleDetails = (nodeId: string) => {
    const newExpanded = new Set(expandedDetails);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedDetails(newExpanded);
  };

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
          toggleNode={toggleNode}
          toggleDetails={toggleDetails}
        />
      ))}
    </div>
  );
};

export default TreeView;