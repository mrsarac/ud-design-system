import { useState } from 'react';
import { ThemeProvider, useTheme } from '../hooks/useTheme';

// Primitives
import { Text, Surface, Divider, Icons, VStack, HStack } from '../components/primitives';

// Buttons
import { Button, IconButton, ButtonGroup } from '../components/buttons';

// Forms
import { Input, Textarea, Checkbox, Toggle, Select } from '../components/forms';

// Feedback
import { Badge, Toast, ToastContainer, Dialog, Tooltip } from '../components/feedback';

// Layout
import { Tabs, TabsList, TabsTrigger, TabsContent, Sidebar, SidebarHeader, SidebarContent, SidebarSection, SidebarItem, SidebarFooter, SidebarToggle, Panel } from '../components/layout';

function Demo() {
  const { theme, toggleTheme } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Demo */}
      <Sidebar defaultCollapsed={false}>
        <SidebarHeader
          logo={
            <div style={{ width: 32, height: 32, background: 'var(--ud-accent)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text variant="label" color="var(--ud-accent-text)">UD</Text>
            </div>
          }
          title="Design System"
        />
        <SidebarContent>
          <SidebarSection title="Components">
            <SidebarItem value="buttons" icon={<Icons.Plus size="sm" />}>
              Buttons
            </SidebarItem>
            <SidebarItem value="forms" icon={<Icons.Settings size="sm" />}>
              Forms
            </SidebarItem>
            <SidebarItem value="feedback" icon={<Icons.AlertCircle size="sm" />}>
              Feedback
            </SidebarItem>
            <SidebarItem value="layout" icon={<Icons.Menu size="sm" />}>
              Layout
            </SidebarItem>
          </SidebarSection>
          <SidebarSection title="Tokens">
            <SidebarItem value="colors" icon={<Icons.Sun size="sm" />}>
              Colors
            </SidebarItem>
            <SidebarItem value="typography" icon={<Icons.Info size="sm" />}>
              Typography
            </SidebarItem>
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>
          <HStack justify="between" align="center">
            <SidebarToggle />
            <IconButton
              icon={theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            />
          </HStack>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
        <VStack gap={12}>
          {/* Hero Section */}
          <VStack gap={4} align="center" style={{ textAlign: 'center', padding: '64px 0' }}>
            <Text variant="display">UD Design System</Text>
            <Text variant="bodyLarge" color="secondary" style={{ maxWidth: 600 }}>
              Tool-first, information-dense, calm but powerful design system inspired by Zed.dev's philosophy.
            </Text>
            <HStack gap={4} style={{ marginTop: 24 }}>
              <Button variant="primary" leftIcon={<Icons.ChevronRight />}>
                Get Started
              </Button>
              <Button variant="outline">
                Documentation
              </Button>
            </HStack>
          </VStack>

          <Divider />

          {/* Tabs Demo */}
          <Tabs defaultValue="buttons">
            <TabsList>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
            </TabsList>

            {/* Buttons Tab */}
            <TabsContent value="buttons">
              <VStack gap={8}>
                <Text variant="h3">Button Variants</Text>
                <HStack gap={4} wrap>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                </HStack>

                <Text variant="h3">Button Sizes</Text>
                <HStack gap={4} align="center">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </HStack>

                <Text variant="h3">Button States</Text>
                <HStack gap={4}>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button leftIcon={<Icons.Plus />}>With Icon</Button>
                </HStack>

                <Text variant="h3">Button Group</Text>
                <ButtonGroup attached>
                  <Button variant="secondary">Left</Button>
                  <Button variant="secondary">Center</Button>
                  <Button variant="secondary">Right</Button>
                </ButtonGroup>

                <Text variant="h3">Icon Buttons</Text>
                <HStack gap={3}>
                  <IconButton icon={<Icons.Plus />} aria-label="Add" />
                  <IconButton icon={<Icons.Settings />} variant="ghost" aria-label="Settings" />
                  <IconButton icon={<Icons.Search />} variant="outline" aria-label="Search" />
                </HStack>
              </VStack>
            </TabsContent>

            {/* Forms Tab */}
            <TabsContent value="forms">
              <VStack gap={8} style={{ maxWidth: 400 }}>
                <Text variant="h3">Input Fields</Text>
                <Input label="Name" placeholder="Enter your name" />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  leftElement={<Icons.Search size="sm" />}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  helperText="Must be at least 8 characters"
                />
                <Input
                  label="Error State"
                  state="error"
                  errorMessage="This field is required"
                  defaultValue="Invalid input"
                />

                <Text variant="h3">Textarea</Text>
                <Textarea
                  label="Message"
                  placeholder="Write your message..."
                  rows={4}
                />

                <Text variant="h3">Select</Text>
                <Select
                  label="Country"
                  placeholder="Select a country"
                  options={[
                    { value: 'tr', label: 'Turkey' },
                    { value: 'us', label: 'United States' },
                    { value: 'de', label: 'Germany' },
                    { value: 'uk', label: 'United Kingdom' },
                  ]}
                />

                <Text variant="h3">Checkbox & Toggle</Text>
                <Checkbox
                  label="Accept terms and conditions"
                  helperText="You must accept to continue"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <Toggle
                  label="Enable notifications"
                  helperText="Receive email updates"
                  checked={toggleValue}
                  onChange={(e) => setToggleValue(e.target.checked)}
                />
              </VStack>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <VStack gap={8}>
                <Text variant="h3">Badges</Text>
                <HStack gap={3} wrap>
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="success" dot />
                </HStack>

                <Text variant="h3">Tooltips</Text>
                <HStack gap={4}>
                  <Tooltip content="This is a tooltip">
                    <Button variant="secondary">Hover me</Button>
                  </Tooltip>
                  <Tooltip content="Bottom tooltip" placement="bottom">
                    <Button variant="secondary">Bottom</Button>
                  </Tooltip>
                </HStack>

                <Text variant="h3">Toast Notifications</Text>
                <HStack gap={4}>
                  <Button onClick={() => setShowToast(true)}>Show Toast</Button>
                </HStack>

                <Text variant="h3">Dialog</Text>
                <Button onClick={() => setShowDialog(true)}>Open Dialog</Button>
              </VStack>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography">
              <VStack gap={6}>
                <Text variant="display">Display Text</Text>
                <Text variant="h1">Heading 1</Text>
                <Text variant="h2">Heading 2</Text>
                <Text variant="h3">Heading 3</Text>
                <Text variant="h4">Heading 4</Text>
                <Text variant="h5">Heading 5</Text>
                <Divider />
                <Text variant="bodyLarge">
                  Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Text variant="body">
                  Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </Text>
                <Text variant="bodySmall">
                  Body Small - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Divider />
                <Text variant="label">Label Text</Text>
                <Text variant="labelSmall">Label Small</Text>
                <Text variant="caption" color="muted">Caption / Helper Text</Text>
                <Divider />
                <Text variant="code" mono>const code = "monospace";</Text>
              </VStack>
            </TabsContent>
          </Tabs>

          {/* Surfaces Section */}
          <VStack gap={6}>
            <Text variant="h2">Surfaces</Text>
            <HStack gap={4} wrap>
              <Surface padding="md" radius="md" bordered style={{ width: 200 }}>
                <Text variant="label">Default Surface</Text>
                <Text variant="caption" color="muted">With border</Text>
              </Surface>
              <Surface elevation="raised" padding="md" radius="md" style={{ width: 200 }}>
                <Text variant="label">Raised Surface</Text>
                <Text variant="caption" color="muted">With shadow</Text>
              </Surface>
              <Surface interactive padding="md" radius="md" bordered style={{ width: 200 }}>
                <Text variant="label">Interactive Surface</Text>
                <Text variant="caption" color="muted">Hover me</Text>
              </Surface>
            </HStack>
          </VStack>

          {/* Panel Demo */}
          <VStack gap={6}>
            <Text variant="h2">Panel</Text>
            <div style={{ display: 'flex', height: 300, border: '1px solid var(--ud-border)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text color="muted">Main Content Area</Text>
              </div>
              <Panel title="Properties" position="right" resizable defaultSize={250}>
                <VStack gap={4}>
                  <Input label="Width" defaultValue="100%" size="sm" />
                  <Input label="Height" defaultValue="auto" size="sm" />
                  <Select
                    label="Display"
                    size="sm"
                    options={[
                      { value: 'block', label: 'Block' },
                      { value: 'flex', label: 'Flex' },
                      { value: 'grid', label: 'Grid' },
                    ]}
                  />
                </VStack>
              </Panel>
            </div>
          </VStack>
        </VStack>

        {/* Toast Container */}
        {showToast && (
          <ToastContainer position="top-right">
            <Toast
              variant="success"
              title="Success!"
              description="Your changes have been saved."
              onClose={() => setShowToast(false)}
            />
          </ToastContainer>
        )}

        {/* Dialog */}
        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          title="Confirm Action"
          description="Are you sure you want to continue? This action cannot be undone."
          footer={
            <>
              <Button variant="ghost" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowDialog(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <Text variant="body">
            This is the dialog content. You can put any content here including forms, lists, or other components.
          </Text>
        </Dialog>
      </main>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Demo />
    </ThemeProvider>
  );
}
