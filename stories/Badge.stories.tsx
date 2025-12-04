import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/feedback/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'New',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Active',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Failed',
    variant: 'error',
  },
};

export const Info: Story = {
  args: {
    children: 'Beta',
    variant: 'info',
  },
};

export const Dot: Story = {
  args: {
    dot: true,
    variant: 'success',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="primary">3</Badge>
      <Badge variant="error">99+</Badge>
      <Badge variant="success">12</Badge>
    </div>
  ),
};
