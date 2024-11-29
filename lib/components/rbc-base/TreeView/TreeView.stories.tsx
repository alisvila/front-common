import type { Meta, StoryObj } from '@storybook/react';
import TreeView from '.';
import { 
  FileText, 
  GitCommit, 
  GitBranch, 
  GitMerge, 
  GitPullRequest,
  Package,
  Upload,
  Check,
  AlertCircle
} from 'lucide-react';

const meta = {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tree view component that represents a timeline with nested nodes and revert actions.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof TreeView>;

// Sample data for different stories
const gitHistory = [
  {
    id: '1',
    title: 'main',
    icon: <GitBranch size={16} />,
    status: 'completed' as const,
    timestamp: '2 hours ago',
    children: [
      {
        id: '1-1',
        title: 'Merge pull request #123',
        description: 'Add new feature implementation',
        icon: <GitMerge size={16} />,
        status: 'completed' as const,
        timestamp: '1 hour ago',
        children: [
          {
            id: '1-1-1',
            title: 'Update documentation',
            icon: <FileText size={16} />,
            status: 'completed' as const,
            timestamp: '45 mins ago',
          },
          {
            id: '1-1-2',
            title: 'Fix failing tests',
            icon: <GitCommit size={16} />,
            status: 'error' as const,
            timestamp: '30 mins ago',
          }
        ]
      },
      {
        id: '1-2',
        title: 'Feature branch',
        icon: <GitPullRequest size={16} />,
        status: 'active' as const,
        timestamp: 'Just now',
      }
    ]
  }
];

const deploymentHistory = [
  {
    id: 'deploy-1',
    title: 'Production Deployment',
    icon: <Upload size={16} />,
    status: 'completed' as const,
    timestamp: '1 day ago',
    details: (
        <div className="rbc-space-y-3">
          <div className="rbc-grid rbc-grid-cols-2 rbc-gap-4">
            <div>
              <span className="rbc-text-sm rbc-text-gray-500">Commit Hash:</span>
              <p className="rbc-text-sm rbc-font-medium">8f4e2d1</p>
            </div>
            <div>
              <span className="rbc-text-sm rbc-text-gray-500">Author:</span>
              <p className="rbc-text-sm rbc-font-medium">John Doe</p>
            </div>
          </div>
          <div>
            <span className="rbc-text-sm rbc-text-gray-500">Message:</span>
            <p className="rbc-text-sm">Implemented new feature with tests</p>
          </div>
        </div>
      ),
    children: [
      {
        id: 'deploy-1-1',
        title: 'Build and Package',
        icon: <Package size={16} />,
        status: 'completed' as const,
        timestamp: '23 hours ago',
        children: [
          {
            id: 'deploy-1-1-1',
            title: 'Run Tests',
            icon: <Check size={16} />,
            status: 'completed' as const,
            timestamp: '22 hours ago',
            details: (
                <div className="rbc-space-y-3">
                  <div className="rbc-grid rbc-grid-cols-2 rbc-gap-4">
                    <div>
                      <span className="rbc-text-sm rbc-text-gray-500">Commit Hash:</span>
                      <p className="rbc-text-sm rbc-font-medium">8f4e2d1</p>
                    </div>
                    <div>
                      <span className="rbc-text-sm rbc-text-gray-500">Author:</span>
                      <p className="rbc-text-sm rbc-font-medium">John Doe</p>
                    </div>
                  </div>
                  <div>
                    <span className="rbc-text-sm rbc-text-gray-500">Message:</span>
                    <p className="rbc-text-sm">Implemented new feature with tests</p>
                  </div>
                </div>
              ),
          }
        ]
      },
      {
        id: 'deploy-1-2',
        title: 'Deploy to Staging',
        icon: <AlertCircle size={16} />,
        status: 'error' as const,
        timestamp: '21 hours ago',
      }
    ]
  }
];

// Basic example with git history
export const GitHistoryExample: Story = {
  args: {
    nodes: gitHistory,
    defaultExpanded: ['1', '1-1'],
    onRevert: (nodeId) => console.log('Reverting to:', nodeId)
  }
};

// Deployment history example
export const DeploymentHistoryExample: Story = {
  args: {
    nodes: deploymentHistory,
    defaultExpanded: ['deploy-1'],
    onRevert: (nodeId) => console.log('Rolling back to:', nodeId)
  }
};

// Example with all nodes expanded
export const FullyExpanded: Story = {
  args: {
    nodes: gitHistory,
    defaultExpanded: ['1', '1-1', '1-1-1', '1-1-2', '1-2'],
    onRevert: (nodeId) => console.log('Reverting to:', nodeId)
  }
};

// Example without revert actions
export const WithoutRevertActions: Story = {
  args: {
    nodes: gitHistory,
    defaultExpanded: ['1', '1-1']
  }
};