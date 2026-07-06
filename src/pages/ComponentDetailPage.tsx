import { useState, type ElementType, type ReactNode } from 'react'
import { components, slugify } from '../data/design-system'
import { Badge } from '../../packages/design-system/src/Badge'
import { Button } from '../../packages/design-system/src/Button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '../../packages/design-system/src/ButtonGroup'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../packages/design-system/src/Card'
import { Field, FieldLabel, TextInput, TextArea, Checkbox, Radio, Selector, Slider, Switch } from '../../packages/design-system/src/Forms'
import { AspectRatio, Center, Grid, HStack, VStack } from '../../packages/design-system/src/Layout'
import { BreadcrumbItem, Breadcrumbs, CommandPalette, CommandPaletteEmpty, CommandPaletteGroup, CommandPaletteInput, CommandPaletteItem, CommandPaletteList, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Tab, TabList, TabPanel, Tabs } from '../../packages/design-system/src/Navigation'
import { HoverCard, HoverCardContent, HoverCardTrigger, Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../packages/design-system/src/Surface'
import { ToggleButton } from '../../packages/design-system/src/ToggleButton'
import { ToggleButtonGroup, ToggleButtonGroupItem } from '../../packages/design-system/src/ToggleButtonGroup'
import { Avatar, Calendar, EmptyState, ProgressBar, Skeleton, Spinner, Table, Toast } from '../../packages/design-system/src/DataDisplay'
import * as ShadcnPrimitives from '../../packages/design-system/src/ShadcnPrimitives'
import { ArabicText, Heading, Prose, Text } from '../../packages/design-system/src/Typography'

type ComponentDetailPageProps = {
  componentId: string
  tab?: string
}

export function ComponentDetailPage({ componentId, tab = 'overview' }: ComponentDetailPageProps) {
  const entry = components.components.find((component) => slugify(component.name) === componentId)

  if (!entry) {
    return (
      <div className="page">
        <section className="page-hero compact">
          <p className="eyebrow">Components</p>
          <h1>Not in current catalog</h1>
          <p>This route is outside the current shadcn/ui-based component set.</p>
        </section>
      </div>
    )
  }

  if (entry.name === 'Button') return <ButtonDetailPage tab={tab} />
  if (entry.name === 'Button Group') return <ButtonGroupDetailPage tab={tab} />
  if (entry.name === 'Toggle') return <ToggleButtonDetailPage tab={tab} name="Toggle" />
  if (entry.name === 'Toggle Group') return <ToggleButtonGroupDetailPage tab={tab} name="Toggle Group" />

  return <GenericComponentDetailPage entry={entry} tab={tab} />
}

function ButtonDetailPage({ tab }: { tab: string }) {
  const [label, setLabel] = useState('Click me')
  const [variant, setVariant] = useState<'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'>('default')
  const [size, setSize] = useState<'sm' | 'default' | 'lg' | 'icon'>('default')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [startContent, setStartContent] = useState(false)
  const [endContent, setEndContent] = useState(false)
  const [isIconOnly, setIsIconOnly] = useState(false)
  const [buttonType, setButtonType] = useState<'button' | 'submit' | 'reset'>('button')
  const isProperties = tab === 'properties'
  const previewLabel = label.trim() || 'Button'

  return (
    <div className="page component-doc-page">
      <section className="component-doc-hero">
        <h1>Button</h1>
        <p>@utopia-studio-design/design-system v0.1.0 · Button</p>
        <nav className="component-tabs" aria-label="Button documentation views">
          <a href="#/components/button#overview" aria-current={isProperties ? undefined : 'page'}>Overview</a>
          <a href="#/components/button?tab=properties#props" aria-current={isProperties ? 'page' : undefined}>Props</a>
        </nav>
      </section>

      {isProperties ? (
        <article className="docs-article">
          <section id="props">
            <div className="component-stage properties-stage">
              <Button
                aria-label={isIconOnly ? previewLabel : undefined}
                disabled={disabled}
                endContent={endContent && !isIconOnly ? <Badge variant="secondary">3</Badge> : undefined}
                isIconOnly={isIconOnly}
                loading={loading}
                loadingText="Working"
                size={size}
                startContent={startContent && !isIconOnly ? '+' : undefined}
                type={buttonType}
                variant={variant}
              >
                {isIconOnly || size === 'icon' ? previewLabel.slice(0, 1).toUpperCase() : previewLabel}
              </Button>
            </div>
            <h2>Props</h2>
            <p>Change a prop value to update the preview above.</p>
            <div className="props-table">
              <div className="prop-row">
                <strong>children</strong>
                <div>
                  <code>ReactNode</code>
                  <p>Visible button content.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="children value" value={label} onChange={(event) => setLabel(event.target.value)} />
                </div>
              </div>
              <div className="prop-row">
                <strong>variant</strong>
                <div>
                  <code>'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'</code>
                  <p>Visual style variant.</p>
                </div>
                <div className="prop-control">
                  <select aria-label="variant value" value={variant} onChange={(event) => setVariant(event.target.value as typeof variant)}>
                    <option value="default">default</option>
                    <option value="secondary">secondary</option>
                    <option value="outline">outline</option>
                    <option value="ghost">ghost</option>
                    <option value="destructive">destructive</option>
                  </select>
                </div>
              </div>
              <div className="prop-row">
                <strong>size</strong>
                <div>
                  <code>'sm' | 'default' | 'lg' | 'icon'</code>
                  <p>Size variant.</p>
                </div>
                <div className="prop-control">
                  <select aria-label="size value" value={size} onChange={(event) => setSize(event.target.value as typeof size)}>
                    <option value="sm">sm</option>
                    <option value="default">default</option>
                    <option value="lg">lg</option>
                    <option value="icon">icon</option>
                  </select>
                </div>
              </div>
              <div className="prop-row">
                <strong>disabled</strong>
                <div>
                  <code>boolean</code>
                  <p>Disables the button.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="disabled value" checked={disabled} type="checkbox" onChange={(event) => setDisabled(event.target.checked)} />
                </div>
              </div>
              <div className="prop-row">
                <strong>loading</strong>
                <div>
                  <code>boolean</code>
                  <p>Shows progress, sets aria-busy, and prevents duplicate activation.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="loading value" checked={loading} type="checkbox" onChange={(event) => setLoading(event.target.checked)} />
                </div>
              </div>
              <div className="prop-row">
                <strong>startContent</strong>
                <div>
                  <code>ReactNode</code>
                  <p>Leading content rendered before the visible label. Use text marks or theme-approved symbols.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="startContent value" checked={startContent} type="checkbox" onChange={(event) => setStartContent(event.target.checked)} />
                </div>
              </div>
              <div className="prop-row">
                <strong>endContent</strong>
                <div>
                  <code>ReactNode</code>
                  <p>Trailing content rendered after the label, commonly a count or short status badge.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="endContent value" checked={endContent} type="checkbox" onChange={(event) => setEndContent(event.target.checked)} />
                </div>
              </div>
              <div className="prop-row">
                <strong>isIconOnly</strong>
                <div>
                  <code>boolean</code>
                  <p>Renders a square button. Always provide aria-label when visible text is shortened.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="isIconOnly value" checked={isIconOnly} type="checkbox" onChange={(event) => setIsIconOnly(event.target.checked)} />
                </div>
              </div>
              <div className="prop-row">
                <strong>type</strong>
                <div>
                  <code>'button' | 'submit' | 'reset'</code>
                  <p>HTML button type attribute.</p>
                </div>
                <div className="prop-control">
                  <select aria-label="type value" value={buttonType} onChange={(event) => setButtonType(event.target.value as typeof buttonType)}>
                    <option value="button">button</option>
                    <option value="submit">submit</option>
                    <option value="reset">reset</option>
                  </select>
                </div>
              </div>
              <div className="prop-row">
                <strong>asChild</strong>
                <div>
                  <code>boolean</code>
                  <p>Render through Radix Slot for composition.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="asChild value" type="checkbox" />
                </div>
              </div>
            </div>
          </section>
        </article>
      ) : (
      <article className="docs-article">
        <section id="overview">
          <div className="component-stage">
            <div className="component-stage-actions">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          <div className="overview-contract">
            <div>
              <h2>Architecture</h2>
              <p>
                Button follows the Utopia Design System component standard: shadcn/ui-compatible structure,
                Radix Slot composition through <code>asChild</code>, CVA variants, semantic CSS classes,
                and token-driven styling. Components consume roles such as <code>--primary</code>,
                <code>--secondary</code>, <code>--radius-control</code>, and <code>--button-height</code>
                instead of hardcoding Utopia Default brand primitives.
              </p>
            </div>
            <div>
              <h2>Motion</h2>
              <p>
                Motion belongs to the design-system contract. Interaction timing uses semantic duration and easing
                tokens, and richer transitions can be implemented with Framer Motion when a component needs
                choreographed state changes. Motion should clarify state, never become decorative noise.
              </p>
            </div>
            <div>
              <h2>AI-readable</h2>
              <p>
                Button exposes copy-paste imports, interactive props, token requirements, examples, and a dense CLI
                command so AI agents can choose the correct action primitive without inventing local button styles.
              </p>
            </div>
            <div>
              <h2>Arabic-friendly</h2>
              <p>
                Arabic-friendly means every primitive should be ready for Arabic and mixed-script products:
                support <code>dir="rtl"</code>, prefer logical start/end APIs, avoid left/right assumptions,
                preserve readable typography across Latin and Arabic scripts, and never invent Arabic copy.
                The goal is for Utopia Design System to become a serious foundation for Arabic-region products,
                not a left-to-right system with RTL added later.
              </p>
            </div>
          </div>
        </section>

        <section id="usage">
          <h2>Usage</h2>
          <p>Button triggers an action when clicked. Use it for form submissions, confirmations, and interactions that need a clear call to action.</p>
          <div className="code-block">
            <span>tsx</span>
            <pre>{`import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button>Save changes</Button>;
}`}</pre>
          </div>
        </section>

        <section id="examples">
          <h2>Examples</h2>
          <p>Common configurations, variations, and states.</p>
          <ExampleCard title="Button - Sizes" description="Small, default, and large buttons side by side. Use small in dense UIs, default for most cases, and large for prominent CTAs.">
            <div className="example-stack">
              <span>Primary</span>
              <div className="component-example">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
              <span>Secondary</span>
              <div className="component-example">
                <Button size="sm" variant="secondary">Small</Button>
                <Button variant="secondary">Default</Button>
                <Button size="lg" variant="secondary">Large</Button>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Button - Variants" description="Use primary for the main action, secondary for supporting actions, ghost for low-emphasis actions, and destructive for dangerous actions.">
            <div className="example-stack">
              <span>Default</span>
              <div className="component-example">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <span>Disabled</span>
              <div className="component-example">
                <Button disabled>Primary</Button>
                <Button disabled variant="secondary">Secondary</Button>
                <Button disabled variant="ghost">Ghost</Button>
                <Button disabled variant="destructive">Destructive</Button>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Button - States" description="Buttons expose hover, focus-visible, pressed, and disabled states. These states use semantic tokens so each theme can define its own interaction language.">
            <div className="example-stack">
              <span>Default variant states</span>
              <div className="component-example">
                <Button>Rest</Button>
                <Button className="uds-button-state-hover">Hover</Button>
                <Button className="uds-button-state-focus">Focus</Button>
                <Button className="uds-button-state-active">Pressed</Button>
                <Button disabled>Disabled</Button>
              </div>
              <span>Destructive states</span>
              <div className="component-example">
                <Button variant="destructive">Rest</Button>
                <Button className="uds-button-state-hover" variant="destructive">Hover</Button>
                <Button className="uds-button-state-focus" variant="destructive">Focus</Button>
                <Button className="uds-button-state-active" variant="destructive">Pressed</Button>
                <Button disabled variant="destructive">Disabled</Button>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Button - Loading" description="Use loading when an action is in progress. The button announces busy state and blocks duplicate activation while the task is pending.">
            <div className="example-stack">
              <span>Progress states</span>
              <div className="component-example">
                <Button loading loadingText="Saving">Save</Button>
                <Button loading loadingText="Sending" variant="secondary">Send invite</Button>
                <Button loading aria-label="Loading more" isIconOnly>+</Button>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Button - Slots" description="Use start and end content for compact metadata such as signs, counts, or short status labels. Do not use theme-specific icon rules in the reusable primitive.">
            <div className="example-stack">
              <span>Text marks and badges</span>
              <div className="component-example">
                <Button startContent="+">New project</Button>
                <Button endContent={<Badge variant="secondary">12</Badge>} variant="secondary">Notifications</Button>
                <Button endContent={<Badge variant="outline">New</Badge>} variant="ghost">Updates</Button>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Button - Icon only" description="Use icon-only shape only for dense repeated actions. In Utopia Default, visible glyph choices belong to the theme layer and every square button needs an accessible label.">
            <div className="example-stack">
              <span>Square actions</span>
              <div className="component-example">
                <Button aria-label="Add item" isIconOnly>+</Button>
                <Button aria-label="More options" isIconOnly variant="secondary">..</Button>
                <Button aria-label="Delete item" isIconOnly variant="destructive">x</Button>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Button - Arabic / RTL" description="Use Arabic labels only when they come from product content or localization. The component must support dir='rtl', mixed-script labels, and logical start/end content without left/right assumptions.">
            <div className="example-stack">
              <span>RTL direction</span>
              <div className="component-example" dir="rtl" lang="ar">
                <Button>حفظ</Button>
                <Button variant="secondary">معاينة</Button>
                <Button startContent="+">مشروع جديد</Button>
              </div>
              <span>Mixed script</span>
              <div className="component-example" dir="rtl" lang="ar">
                <Button endContent={<Badge variant="secondary">Beta</Badge>} variant="secondary">إصدار 2</Button>
                <Button loading loadingText="جار الحفظ">حفظ</Button>
              </div>
            </div>
          </ExampleCard>
        </section>

        <section id="best-practices">
          <h2>Best practices</h2>
          <div className="practice-table">
            {[
              ['Do', 'Reserve primary for the single most important action in the view.'],
              ['Do', 'Write labels that describe the action, like "Save changes" or "Send invite".'],
              ['Do', 'Show a loading state for actions that take time.'],
              ['Do', 'Always provide an accessible label for icon-only buttons.'],
              ['Do', 'Test Arabic labels in dir="rtl" and mixed-script labels before shipping.'],
              ["Don't", 'Place more than one primary button in the same view.'],
              ["Don't", 'Use the destructive variant without a confirmation step for irreversible actions.'],
              ["Don't", 'Invent Arabic copy; use product localization or verified content.'],
              ["Don't", 'Use a button for navigation when a link is the correct element.'],
            ].map(([kind, guidance]) => (
              <div key={guidance} className="practice-row">
                <Badge variant={kind === 'Do' ? 'success' : 'destructive'}>{kind}</Badge>
                <p>{guidance}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="props">
          <h2>Props</h2>
          <p>Interactive controls shown here are documentation affordances. The component API remains shadcn-style and semantic-token driven.</p>
          <div className="props-table">
            {buttonProps.map((prop) => (
              <div key={prop.name} className="prop-row">
                <strong>{prop.name}</strong>
                <div>
                  <code>{prop.type}</code>
                  <p>{prop.description}</p>
                </div>
                <div className="prop-control">{prop.control}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="tokens">
          <h2>Tokens</h2>
          <p>Button consumes semantic roles. Utopia Default maps those roles to Brick Red, Special Black, square geometry, and TWK Lausanne.</p>
          <div className="chip-list">
            {['--primary', '--primary-hover', '--primary-active', '--primary-foreground', '--secondary', '--secondary-foreground', '--destructive', '--radius-control', '--button-height', '--focus-ring-width'].map((token) => (
              <span key={token}>{token}</span>
            ))}
          </div>
        </section>

        <section id="ai-rules">
          <h2>AI rules</h2>
          <p>Use Button for actions. Do not invent button colors or hardcode Utopia brand primitives inside reusable component logic.</p>
          <div className="code-block">
            <span>dense</span>
            <pre>{`npm run ds -- component "Button" --dense`}</pre>
          </div>
        </section>
      </article>
      )}
    </div>
  )
}

function ButtonGroupDetailPage({ tab }: { tab: string }) {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const [density, setDensity] = useState<'default' | 'compact'>('default')
  const [asToolbar, setAsToolbar] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const isProperties = tab === 'properties'

  return (
    <div className="page component-doc-page">
      <section className="component-doc-hero">
        <h1>Button Group</h1>
        <p>@utopia-studio-design/design-system v0.1.0 · ButtonGroup</p>
        <nav className="component-tabs" aria-label="Button Group documentation views">
          <a href="#/components/button-group#overview" aria-current={isProperties ? undefined : 'page'}>Overview</a>
          <a href="#/components/button-group?tab=properties#props" aria-current={isProperties ? 'page' : undefined}>Props</a>
        </nav>
      </section>

      {isProperties ? (
        <article className="docs-article">
          <section id="props">
            <div className="component-stage properties-stage">
              <ButtonGroup asToolbar={asToolbar} density={density} label="Preview actions" orientation={orientation}>
                <Button disabled={disabled}>Save</Button>
                <ButtonGroupSeparator orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} />
                <Button disabled={disabled} variant="secondary">Preview</Button>
                <ButtonGroupSeparator orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} />
                <Button disabled={disabled} variant="ghost">Cancel</Button>
              </ButtonGroup>
            </div>
            <h2>Props</h2>
            <p>Change a prop value to update the preview above.</p>
            <div className="props-table">
              <div className="prop-row">
                <strong>orientation</strong>
                <div>
                  <code>'horizontal' | 'vertical'</code>
                  <p>Direction of the grouped actions. Uses logical layout and supports RTL contexts.</p>
                </div>
                <div className="prop-control">
                  <select aria-label="orientation value" value={orientation} onChange={(event) => setOrientation(event.target.value as typeof orientation)}>
                    <option value="horizontal">horizontal</option>
                    <option value="vertical">vertical</option>
                  </select>
                </div>
              </div>
              <div className="prop-row">
                <strong>density</strong>
                <div>
                  <code>'default' | 'compact'</code>
                  <p>Spacing density for grouped actions.</p>
                </div>
                <div className="prop-control">
                  <select aria-label="density value" value={density} onChange={(event) => setDensity(event.target.value as typeof density)}>
                    <option value="default">default</option>
                    <option value="compact">compact</option>
                  </select>
                </div>
              </div>
              <div className="prop-row">
                <strong>asToolbar</strong>
                <div>
                  <code>boolean</code>
                  <p>Uses role="toolbar" for toolbar-like action clusters; otherwise role="group".</p>
                </div>
                <div className="prop-control">
                  <input aria-label="asToolbar value" checked={asToolbar} type="checkbox" onChange={(event) => setAsToolbar(event.target.checked)} />
                </div>
              </div>
              <div className="prop-row">
                <strong>label</strong>
                <div>
                  <code>string</code>
                  <p>Convenience alias for aria-label. Required when the group purpose is not clear from surrounding text.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="label value" placeholder="Preview actions" />
                </div>
              </div>
              <div className="prop-row">
                <strong>children</strong>
                <div>
                  <code>ReactNode</code>
                  <p>Usually Button children. Keep the actions related and ordered by user intent.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="children value" placeholder="Button children" />
                </div>
              </div>
              <div className="prop-row">
                <strong>disabled children</strong>
                <div>
                  <code>boolean</code>
                  <p>Documentation control for previewing disabled child buttons.</p>
                </div>
                <div className="prop-control">
                  <input aria-label="disabled children value" checked={disabled} type="checkbox" onChange={(event) => setDisabled(event.target.checked)} />
                </div>
              </div>
            </div>
          </section>
        </article>
      ) : (
        <article className="docs-article">
          <section id="overview">
            <div className="component-stage">
              <ButtonGroup label="Editing actions">
                <Button variant="secondary">Copy</Button>
                <ButtonGroupSeparator />
                <Button variant="secondary">Cut</Button>
                <ButtonGroupSeparator />
                <Button variant="secondary">Paste</Button>
                <Button>Save</Button>
              </ButtonGroup>
            </div>
            <div className="overview-contract">
              <div>
                <h2>Architecture</h2>
                <p>
                  Button Group exists in shadcn/ui. Utopia Button Group follows that foundation: compositional
                  <code>ButtonGroup</code>, <code>ButtonGroupSeparator</code>, and <code>ButtonGroupText</code>
                  parts, CVA variants, semantic CSS classes, and token-driven connected-control styling.
                  It groups real <code>Button</code> primitives instead of inventing a separate action style.
                </p>
              </div>
              <div>
                <h2>Motion</h2>
                <p>
                  Button Group itself should stay quiet. Child buttons carry hover, focus, pressed, disabled, and
                  loading states. If a toolbar needs richer transitions, use Framer Motion around state changes while
                  keeping timing mapped to semantic motion tokens.
                </p>
              </div>
              <div>
                <h2>AI-readable</h2>
                <p>
                  Button Group documents its import path, child composition rules, props, tokens, and dense CLI command
                  so AI agents create grouped actions with JSX composition instead of serialized children.
                </p>
              </div>
              <div>
                <h2>Arabic-friendly</h2>
                <p>
                  Button Group uses orientation and logical spacing instead of left/right assumptions. In RTL contexts,
                  preserve action meaning, use start/end language for any slots, and never reorder destructive or primary
                  actions just to mirror the visual layout.
                </p>
              </div>
            </div>
          </section>

          <section id="usage">
            <h2>Usage</h2>
            <p>Use Button Group for related actions that belong to the same decision or toolbar. Keep one clear primary action. Prefer JSX composition over serialized React children arrays.</p>
            <div className="code-block">
              <span>tsx</span>
              <pre>{`import { Button } from '@utopia-studio-design/design-system/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@utopia-studio-design/design-system/ButtonGroup';

export function Example() {
  return (
    <ButtonGroup label="Editing actions">
      <Button variant="secondary">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Cut</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Paste</Button>
    </ButtonGroup>
  );
}`}</pre>
            </div>
          </section>

          <section id="examples">
            <h2>Examples</h2>
            <p>Common configurations for action clusters and toolbar-like groups.</p>
            <ExampleCard title="Button Group - Connected actions" description="Use connected button groups for related operations that read as one control, like copy, cut, and paste.">
              <ButtonGroup label="Editing actions">
                <Button variant="secondary">Copy</Button>
                <ButtonGroupSeparator />
                <Button variant="secondary">Cut</Button>
                <ButtonGroupSeparator />
                <Button variant="secondary">Paste</Button>
              </ButtonGroup>
            </ExampleCard>

            <ExampleCard title="Button Group - Hierarchy" description="Use one primary action with secondary or ghost supporting actions. This keeps the decision clear.">
              <ButtonGroup label="Publishing actions">
                <Button>Publish</Button>
                <Button variant="secondary">Schedule</Button>
                <Button variant="ghost">Save draft</Button>
              </ButtonGroup>
            </ExampleCard>

            <ExampleCard title="Button Group - Compact toolbar" description="Use compact density for dense toolbars where the actions are peers. Use role='toolbar' when the group behaves like a toolbar.">
              <ButtonGroup label="Text actions" asToolbar density="compact">
                <Button variant="secondary">Bold</Button>
                <ButtonGroupSeparator />
                <Button variant="secondary">Italic</Button>
                <ButtonGroupSeparator />
                <Button variant="secondary">Link</Button>
              </ButtonGroup>
            </ExampleCard>

            <ExampleCard title="Button Group - Vertical" description="Use vertical orientation when horizontal space is limited or actions are scanned as a short stack.">
              <ButtonGroup label="Review actions" orientation="vertical">
                <Button>Approve</Button>
                <ButtonGroupSeparator orientation="horizontal" />
                <Button variant="secondary">Request changes</Button>
                <ButtonGroupSeparator orientation="horizontal" />
                <Button variant="destructive">Reject</Button>
              </ButtonGroup>
            </ExampleCard>

            <ExampleCard title="Button Group - Text" description="Use ButtonGroupText for short static text inside a grouped control, such as a scope or currency marker.">
              <ButtonGroup label="Amount actions">
                <ButtonGroupText>USD</ButtonGroupText>
                <Button variant="secondary">Decrease</Button>
                <Button variant="secondary">Increase</Button>
              </ButtonGroup>
            </ExampleCard>

            <ExampleCard title="Button Group - Arabic / RTL" description="Grouped actions must work in RTL without changing the API. Use label for the accessible group name, logical orientation, and translated button labels from localization.">
              <div dir="rtl" lang="ar">
                <ButtonGroup label="إجراءات التحرير">
                  <Button variant="secondary">نسخ</Button>
                  <ButtonGroupSeparator />
                  <Button variant="secondary">قص</Button>
                  <ButtonGroupSeparator />
                  <Button variant="secondary">لصق</Button>
                  <Button>حفظ</Button>
                </ButtonGroup>
              </div>
            </ExampleCard>

            <ExampleCard title="Button Group - Disabled children" description="Disable child buttons individually based on action availability. The group itself should not hide unavailable actions without a product reason.">
              <ButtonGroup label="Disabled example">
                <Button disabled>Save</Button>
                <Button disabled variant="secondary">Preview</Button>
                <Button variant="ghost">Cancel</Button>
              </ButtonGroup>
            </ExampleCard>
          </section>

          <section id="best-practices">
            <h2>Best practices</h2>
            <div className="practice-table">
              {[
                ['Do', 'Group only actions that belong to the same task or decision.'],
                ['Do', 'Keep one primary action in the group and make supporting actions lower emphasis.'],
                ['Do', 'Provide label or aria-label when the group purpose is not obvious from nearby text.'],
                ['Do', 'Use compact density for toolbars, not for major confirmation decisions.'],
                ['Do', 'Use ButtonGroupSeparator or ButtonGroupText for shadcn-style grouped controls when needed.'],
                ['Do', 'Test connected controls in dir="rtl" so separators, focus, and logical edges remain correct.'],
                ["Don't", 'Mix unrelated actions just because they fit visually.'],
                ["Don't", 'Use multiple primary buttons in the same group.'],
                ["Don't", 'Pass serialized React element objects as children; write JSX composition instead.'],
                ["Don't", 'Reorder Arabic actions only to mirror the visual layout; preserve product meaning.'],
                ["Don't", 'Depend on left/right order for meaning; use logical language and clear labels.'],
              ].map(([kind, guidance]) => (
                <div key={guidance} className="practice-row">
                  <Badge variant={kind === 'Do' ? 'success' : 'destructive'}>{kind}</Badge>
                  <p>{guidance}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="props">
            <h2>Props</h2>
            <p>Button Group wraps related Button primitives. It should not add visual styles that bypass Button tokens. Size belongs on child Button primitives.</p>
            <div className="props-table">
              {buttonGroupProps.map((prop) => (
                <div key={prop.name} className="prop-row">
                  <strong>{prop.name}</strong>
                  <div>
                    <code>{prop.type}</code>
                    <p>{prop.description}</p>
                  </div>
                  <div className="prop-control">{prop.control}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="tokens">
            <h2>Tokens</h2>
            <p>Button Group consumes spacing and control tokens. Child buttons continue to consume Button semantic roles.</p>
            <div className="chip-list">
              {['--button-group-gap', '--button-group-gap-compact', '--radius-control', '--button-height', '--focus-ring-width'].map((token) => (
                <span key={token}>{token}</span>
              ))}
            </div>
          </section>

          <section id="ai-rules">
            <h2>AI rules</h2>
            <p>Use Button Group only for related actions. Do not invent group colors, do not create left/right-only APIs, and do not place unrelated CTAs in one group.</p>
            <div className="code-block">
              <span>dense</span>
              <pre>{`npm run ds -- component "Button Group" --dense`}</pre>
            </div>
          </section>
        </article>
      )}
    </div>
  )
}

function ToggleButtonDetailPage({ name = 'Toggle', tab }: { name?: string; tab: string }) {
  const [pressed, setPressed] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const isProperties = tab === 'properties'

  return (
    <ActionDocPage
      aiRules="Use ToggleButton for persistent selected/unselected states such as formatting, mute, favorite, or bookmark. Do not use it for submit/delete actions or settings that should be Switch."
      examples={[
        ['ToggleButton - Color', <div className="component-example"><ToggleButton label="Star" icon="☆" isPressed pressedIcon="★" /><ToggleButton label="Heart" icon="♡" isPressed pressedIcon="♥" variant="destructive" /><ToggleButton label="Bookmark" icon="□" isPressed pressedIcon="■" /></div>],
        ['ToggleButton - Icon Swap', <div className="component-example"><ToggleButton label="Favorite" icon="☆" pressedIcon="★" /><ToggleButton label="Mute" icon="sound" pressedIcon="muted" /></div>],
        ['ToggleButton - Label', <div className="component-example"><ToggleButton label="Bold" isPressed /><ToggleButton label="Italic" /><ToggleButton label="Underline" /></div>],
        ['ToggleButton - States', <div className="component-example"><ToggleButton label="Default" /><ToggleButton label="Pressed" isPressed /><ToggleButton label="Disabled" isDisabled /><ToggleButton label="Loading" isLoading loadingText="Loading" /></div>],
        ['ToggleButton - Arabic / RTL', <div dir="rtl" lang="ar"><ToggleButton label="مميز" isPressed /></div>],
      ]}
      importCode={`import { ToggleButton } from '@utopia-studio-design/design-system/ToggleButton';`}
      isProperties={isProperties}
      name={name}
      overview={<ToggleButton isDisabled={disabled} isPressed={pressed} label="Bold" onPressedChange={setPressed} />}
      propsPanel={(
        <div className="props-table">
          <PropRow control={<input aria-label="isPressed value" checked={pressed} type="checkbox" onChange={(event) => setPressed(event.target.checked)} />} description="Astryx-style controlled pressed state alias. Maps to Radix pressed." name="isPressed" type="boolean" />
          <PropRow control={<input aria-label="isDisabled value" checked={disabled} type="checkbox" onChange={(event) => setDisabled(event.target.checked)} />} description="Disables the toggle. Maps to Radix disabled." name="isDisabled" type="boolean" />
          <PropRow control={<input aria-label="label value" placeholder="Bold" />} description="Visible label and fallback accessible label." name="label" type="ReactNode" />
          <PropRow control={<input aria-label="icon value" placeholder="☆" />} description="Optional theme-approved mark shown before the label." name="icon" type="ReactNode" />
          <PropRow control={<input aria-label="pressedIcon value" placeholder="★" />} description="Optional icon/mark shown when pressed." name="pressedIcon" type="ReactNode" />
        </div>
      )}
      tokens={['--secondary', '--secondary-active', '--radius-control', '--button-height', '--focus-ring-width']}
      usageCode={`import { ToggleButton } from '@utopia-studio-design/design-system/ToggleButton';

export function Example() {
  return <ToggleButton label="Bold" />;
}`}
    />
  )
}

function ToggleButtonGroupDetailPage({ name = 'Toggle Group', tab }: { name?: string; tab: string }) {
  const [value, setValue] = useState('center')
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const isProperties = tab === 'properties'

  return (
    <ActionDocPage
      aiRules="Use ToggleButtonGroup for related toggle options. Use type='single' for mutually exclusive choices and type='multiple' for independent formatting states."
      examples={[
        ['ToggleButton - Group', <div className="example-stack"><span>Single select</span><ToggleButtonGroup label="View mode" type="single" defaultValue="list"><ToggleButtonGroupItem label="List" value="list" /><ToggleButtonGroupItem label="Grid" value="grid" /><ToggleButtonGroupItem label="Board" value="board" /></ToggleButtonGroup><span>Multiple select</span><ToggleButtonGroup label="Formatting" type="multiple" defaultValue={['bold']}><ToggleButtonGroupItem label="Bold" value="bold" /><ToggleButtonGroupItem label="Italic" value="italic" /><ToggleButtonGroupItem label="Underline" value="underline" /></ToggleButtonGroup></div>],
        ['ToggleButtonGroup - Vertical', <div className="example-stack"><span>Single select</span><ToggleButtonGroup label="View mode" orientation="vertical" type="single" defaultValue="list"><ToggleButtonGroupItem label="List" value="list" /><ToggleButtonGroupItem label="Grid" value="grid" /><ToggleButtonGroupItem label="Board" value="board" /></ToggleButtonGroup><span>Multiple select</span><ToggleButtonGroup label="Formatting" orientation="vertical" type="multiple" defaultValue={['bold']}><ToggleButtonGroupItem label="Bold" value="bold" /><ToggleButtonGroupItem label="Italic" value="italic" /><ToggleButtonGroupItem label="Underline" value="underline" /></ToggleButtonGroup></div>],
        ['ToggleButtonGroup - Arabic / RTL', <div dir="rtl" lang="ar"><ToggleButtonGroup label="محاذاة" type="single" defaultValue="start"><ToggleButtonGroupItem label="بداية" value="start" /><ToggleButtonGroupItem label="وسط" value="center" /><ToggleButtonGroupItem label="نهاية" value="end" /></ToggleButtonGroup></div>],
      ]}
      importCode={`import { ToggleButtonGroup, ToggleButtonGroupItem } from '@utopia-studio-design/design-system/ToggleButton';`}
      isProperties={isProperties}
      name={name}
      overview={(
        <ToggleButtonGroup label="Alignment" orientation={orientation} type="single" value={value} onValueChange={(nextValue: string) => nextValue && setValue(nextValue)}>
          <ToggleButtonGroupItem label="Start" value="start" />
          <ToggleButtonGroupItem label="Center" value="center" />
          <ToggleButtonGroupItem label="End" value="end" />
        </ToggleButtonGroup>
      )}
      propsPanel={(
        <div className="props-table">
          <PropRow control={<select aria-label="value value" value={value} onChange={(event) => setValue(event.target.value)}><option value="start">start</option><option value="center">center</option><option value="end">end</option></select>} description="Controlled selected value for type='single'." name="value" type="string" />
          <PropRow control={<select aria-label="type value" defaultValue="single"><option value="single">single</option><option value="multiple">multiple</option></select>} description="Discriminated union mode for exclusive or multi-select behavior." name="type" type="'single' | 'multiple'" />
          <PropRow control={<select aria-label="orientation value" value={orientation} onChange={(event) => setOrientation(event.target.value as typeof orientation)}><option value="horizontal">horizontal</option><option value="vertical">vertical</option></select>} description="Logical group orientation." name="orientation" type="'horizontal' | 'vertical'" />
          <PropRow control={<input aria-label="label value" placeholder="Alignment" />} description="Accessible group label." name="label" type="string" />
          <PropRow control={<input aria-label="onChange value" placeholder="(value) => ..." />} description="Astryx-style change callback alias. Maps to Radix onValueChange." name="onChange" type="(value) => void" />
        </div>
      )}
      tokens={['--button-group-gap', '--secondary', '--secondary-active', '--radius-control', '--button-height', '--focus-ring-width']}
      usageCode={`import {
  ToggleButtonGroup,
  ToggleButtonGroupItem,
} from '@utopia-studio-design/design-system/ToggleButton';

export function Example() {
  return (
    <ToggleButtonGroup label="Alignment" type="single" defaultValue="center">
      <ToggleButtonGroupItem label="Start" value="start" />
      <ToggleButtonGroupItem label="Center" value="center" />
      <ToggleButtonGroupItem label="End" value="end" />
    </ToggleButtonGroup>
  );
}`}
    />
  )
}

type ComponentManifestEntry = typeof components.components[number]

function GenericComponentDetailPage({ entry, tab }: { entry: ComponentManifestEntry; tab: string }) {
  const isProperties = tab === 'properties'

  return (
    <ActionDocPage
      aiRules={`Use ${entry.name} when: ${entry.useWhen.join(', ')}. Avoid it when: ${entry.avoidWhen.join(', ')}. Never invent: ${entry.neverInvent.join(', ')}.`}
      examples={genericExamples(entry.name)}
      importCode={entry.packageImport}
      isProperties={isProperties}
      name={entry.name}
      overview={renderGenericPreview(entry.name)}
      propsPanel={genericProps(entry.name)}
      tokens={entry.requiredTokens}
      usageCode={usageFor(entry.name)}
      usageDescription={`${entry.name} is a ${entry.category.toLowerCase()} primitive. It follows shadcn/ui architecture where relevant and stays on semantic Utopia tokens.`}
    />
  )
}

function ActionDocPage({
  aiRules,
  examples,
  importCode,
  isProperties,
  name,
  overview,
  propsPanel,
  tokens,
  usageCode,
  usageDescription = 'Keep behavior explicit, accessible, and token-driven.',
}: {
  aiRules: string
  examples: Array<[string, ReactNode]>
  importCode: string
  isProperties: boolean
  name: string
  overview: ReactNode
  propsPanel: ReactNode
  tokens: string[]
  usageCode: string
  usageDescription?: string
}) {
  const slug = slugify(name)

  return (
    <div className="page component-doc-page">
      <section className="component-doc-hero">
        <h1>{name}</h1>
        <p>@utopia-studio-design/design-system v0.1.0 · {name.replaceAll(' ', '')}</p>
        <nav className="component-tabs" aria-label={`${name} documentation views`}>
          <a href={`#/components/${slug}#overview`} aria-current={isProperties ? undefined : 'page'}>Overview</a>
          <a href={`#/components/${slug}?tab=properties#props`} aria-current={isProperties ? 'page' : undefined}>Props</a>
        </nav>
      </section>

      {isProperties ? (
        <article className="docs-article">
          <section id="props">
            <div className="component-stage properties-stage">{overview}</div>
            <h2>Props</h2>
            <p>Change a prop value to update the preview above.</p>
            {propsPanel}
          </section>
        </article>
      ) : (
        <article className="docs-article">
          <section id="overview">
            <div className="component-stage">{overview}</div>
            <div className="overview-contract">
              <div>
                <h2>Architecture</h2>
                <p>{name} follows the shadcn/ui foundation, Radix behavior where appropriate, CVA-compatible variants, semantic CSS classes, and token-driven styling.</p>
              </div>
              <div>
                <h2>AI-readable</h2>
                <p>Every component page exposes copy-paste imports, props, token requirements, usage guidance, and a dense CLI command so coding agents can choose the right primitive without inventing local UI.</p>
              </div>
              <div>
                <h2>Arabic-friendly</h2>
                <p>Use logical start/end language, support <code>dir="rtl"</code>, use IBM Plex Sans Arabic through <code>--font-arabic</code>, and never invent Arabic production copy.</p>
              </div>
            </div>
          </section>
          <section id="usage">
            <h2>Usage</h2>
            <p>{usageDescription}</p>
            <div className="code-block"><span>tsx</span><pre>{usageCode}</pre></div>
          </section>
          <section id="examples">
            <h2>Examples</h2>
            <p>Common configurations, variations, and Arabic-friendly checks.</p>
            {examples.map(([title, content]) => (
              <ExampleCard key={title} title={title} description={`${title} rendered with real design-system primitives.`}>
                {content}
              </ExampleCard>
            ))}
          </section>
          <section id="best-practices">
            <h2>Best practices</h2>
            <div className="practice-table">
              {[
                ['Do', 'Use semantic tokens and accessible labels.'],
                ['Do', 'Prefer shadcn/Radix behavior and Utopia wrappers before creating custom component logic.'],
                ['Do', 'Test RTL and mixed-script labels.'],
                ['Do', 'Use logical CSS properties and start/end naming instead of left/right APIs.'],
                ["Don't", 'Invent colors, icon rules, or Arabic copy inside the component.'],
              ].map(([kind, guidance]) => (
                <div key={guidance} className="practice-row">
                  <Badge variant={kind === 'Do' ? 'success' : 'destructive'}>{kind}</Badge>
                  <p>{guidance}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="props">
            <h2>Props</h2>
            {propsPanel}
          </section>
          <section id="tokens">
            <h2>Tokens</h2>
            <div className="chip-list">{tokens.map((token) => <span key={token}>{token}</span>)}</div>
          </section>
          <section id="ai-rules">
            <h2>AI rules</h2>
            <p>{aiRules}</p>
            <div className="code-block"><span>dense</span><pre>{`npm run ds -- component "${name}" --dense`}</pre></div>
            <div className="code-block"><span>import</span><pre>{importCode}</pre></div>
          </section>
        </article>
      )}
    </div>
  )
}

function PropRow({ control, description, name, type }: { control: ReactNode; description: string; name: string; type: string }) {
  return (
    <div className="prop-row">
      <strong>{name}</strong>
      <div>
        <code>{type}</code>
        <p>{description}</p>
      </div>
      <div className="prop-control">{control}</div>
    </div>
  )
}

function ExampleCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <article className="example-card">
      <div className="example-card-preview">
        <span>{title}</span>
        <div>{children}</div>
      </div>
      <div className="example-card-footer">
        <strong>Description</strong>
        <p>{description}</p>
      </div>
    </article>
  )
}

function genericExamples(name: string): Array<[string, ReactNode]> {
  const base = renderGenericPreview(name)

  if (name === 'Typography') {
    return [
      ['Human-readable hierarchy', (
        <Prose>
          <Heading level={2}>System typography</Heading>
          <Text size="lg">Use semantic text primitives so hierarchy stays readable across themes.</Text>
          <Text tone="muted">Muted text is for supporting copy, metadata, and lower-emphasis guidance.</Text>
        </Prose>
      )],
      ['Mixed script', (
        <Prose>
          <Heading level={3}>Arabic-friendly typography</Heading>
          <ArabicText>هذا نص تجريبي لا يمثل نسخة إنتاجية.</ArabicText>
          <Text tone="muted">Keep Arabic line-height, direction, and font decisions in the theme contract.</Text>
        </Prose>
      )],
      ['AI-safe copy contract', (
        <div className="code-block">
          <span>rule</span>
          <pre>{'Use <Heading>, <Text>, <Prose>, and <ArabicText>. Do not invent Arabic production copy.'}</pre>
        </div>
      )],
    ]
  }

  if (name === 'Card') {
    return [
      ['Surface composition', (
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>Header, content, action, and footer use a shared spacing contract.</CardDescription>
            <CardAction><Badge variant="outline">Available</Badge></CardAction>
          </CardHeader>
          <CardContent>Use this structure for repeated content or framed tool surfaces.</CardContent>
          <CardFooter><Button variant="secondary">View details</Button></CardFooter>
        </Card>
      )],
      ['Compact surface', <Card size="sm"><CardHeader><CardTitle>Compact</CardTitle><CardDescription>Smaller spacing for dense UI.</CardDescription></CardHeader></Card>],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><Card><CardHeader><CardTitle>بطاقة النظام</CardTitle><CardDescription>نص تجريبي لا يمثل نسخة إنتاجية.</CardDescription></CardHeader></Card></div>],
    ]
  }

  if (['Hover Card', 'Popover', 'Tooltip'].includes(name)) {
    return [
      ['Floating surface', base],
      ['Token contract', <Popover><PopoverTrigger asChild><Button variant="secondary">Theme tokens</Button></PopoverTrigger><PopoverContent>Uses surface, border, shadow, and radius tokens.</PopoverContent></Popover>],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="secondary">مساعدة</Button></TooltipTrigger><TooltipContent>نص تجريبي</TooltipContent></Tooltip></TooltipProvider></div>],
    ]
  }

  if (['Aspect Ratio'].includes(name)) {
    return [
      ['Layout primitive', base],
      ['Mixed composition', <Grid columns={2}><Card><CardContent>Primary panel</CardContent></Card><VStack><Button>Action</Button><Button variant="secondary">Secondary</Button></VStack></Grid>],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><HStack><Button>حفظ</Button><Button variant="secondary">إلغاء</Button></HStack></div>],
    ]
  }

  if (['Breadcrumb', 'Command', 'Context Menu', 'Dropdown Menu', 'Tabs'].includes(name)) {
    return [
      ['Navigation primitive', base],
      ['Composition', <ButtonGroup label={`${name} example actions`}><Button variant="secondary">Docs</Button><Button variant="secondary">Components</Button></ButtonGroup>],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><ButtonGroup label="تنقل"><Button variant="secondary">المستندات</Button><Button variant="secondary">المكونات</Button></ButtonGroup></div>],
    ]
  }

  return shadcnConversionExamples(name, base)
}

function genericProps(name: string) {
  const rows = genericPropRows(name)

  return (
    <div className="props-table">
      {rows.map((row) => (
        <PropRow key={row.name} control={row.control} description={row.description} name={row.name} type={row.type} />
      ))}
    </div>
  )
}

function genericPropRows(name: string) {
  const common = [
    { name: 'className', type: 'string', description: 'Optional class hook. Use it for composition, not for bypassing semantic tokens.', control: <input aria-label="className value" placeholder="value" /> },
    { name: 'children', type: 'ReactNode', description: 'Visible content rendered inside the primitive.', control: <input aria-label="children value" placeholder="content" /> },
    { name: 'dir', type: "'ltr' | 'rtl' | 'auto'", description: 'Direction override for RTL smoke testing. Prefer app-level direction when possible.', control: <select aria-label="dir value"><option>auto</option><option>ltr</option><option>rtl</option></select> },
    { name: 'lang', type: 'string', description: 'Language hint for mixed-script typography and Arabic-friendly rendering.', control: <input aria-label="lang value" placeholder="ar" /> },
  ]

  if (['Breadcrumb', 'Dropdown Menu', 'Context Menu', 'Navigation Menu', 'Pagination', 'Sidebar', 'Menubar'].includes(name)) {
    return [
      { name: 'href', type: 'string', description: 'Destination for link-based navigation items. Keep routing app-owned.', control: <input aria-label="href value" placeholder="#/components" /> },
      { name: 'aria-current', type: "'page' | undefined", description: 'Marks the current navigation destination for assistive technology.', control: <select aria-label="aria-current value"><option>undefined</option><option>page</option></select> },
      ...common,
    ]
  }

  if (['Accordion', 'Collapsible'].includes(name)) {
    return [
      { name: 'type', type: "'single' | 'multiple'", description: 'Disclosure mode. Keep keyboard behavior aligned with the shadcn/Radix source pattern.', control: <select aria-label="type value"><option>single</option><option>multiple</option></select> },
      { name: 'defaultValue', type: 'string | string[]', description: 'Initial open item value.', control: <input aria-label="defaultValue value" placeholder="item-1" /> },
      ...common,
    ]
  }

  if (['Alert Dialog', 'Dialog', 'Drawer', 'Sheet', 'Sonner', 'Toast', 'Alert'].includes(name)) {
    return [
      { name: 'open', type: 'boolean', description: 'Controlled visibility state where the implementation supports it.', control: <input aria-label="open value" type="checkbox" /> },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'State change callback. Keep business side effects in the app layer.', control: <input aria-label="onOpenChange value" placeholder="setOpen" /> },
      { name: 'role', type: 'string', description: 'Accessible role inherited from the shadcn primitive or native element.', control: <input aria-label="role value" placeholder="dialog" /> },
      ...common,
    ]
  }

  if (['Input', 'Input Group', 'Input OTP', 'Native Select', 'Select', 'Textarea', 'Combobox', 'Date Picker', 'Checkbox', 'Radio Group', 'Switch', 'Slider', 'Field', 'Label'].includes(name)) {
    return [
      { name: 'name', type: 'string', description: 'Form submission name. Keep product data rules outside the reusable component.', control: <input aria-label="name value" placeholder="fieldName" /> },
      { name: 'value', type: 'string | number | boolean', description: 'Controlled value where applicable.', control: <input aria-label="value value" placeholder="value" /> },
      { name: 'disabled', type: 'boolean', description: 'Disabled state. Preserve focus and accessibility behavior from the source primitive.', control: <input aria-label="disabled value" type="checkbox" /> },
      { name: 'required', type: 'boolean', description: 'Required field signal. Pair with Field status text in product forms.', control: <input aria-label="required value" type="checkbox" /> },
      ...common,
    ]
  }

  if (['Aspect Ratio', 'Resizable', 'Scroll Area', 'Separator', 'Direction'].includes(name)) {
    return [
      { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 6 | 8 | 12', description: 'Spacing token scale. Never pass raw pixel strings.', control: <select aria-label="gap value"><option>2</option><option>4</option><option>6</option><option>8</option></select> },
      { name: 'columns', type: '1 | 2 | 3 | 4 | 6 | 12', description: 'Grid column count where applicable.', control: <select aria-label="columns value"><option>1</option><option>2</option><option>3</option><option>4</option></select> },
      ...common,
    ]
  }

  if (name === 'Aspect Ratio') {
    return [
      { name: 'ratio', type: 'number', description: 'Aspect ratio, for example 16 / 9 or 1 / 1.', control: <input aria-label="ratio value" placeholder="16 / 9" /> },
      ...common,
    ]
  }

  if (['Hover Card', 'Popover', 'Tooltip', 'Command', 'Tabs'].includes(name)) {
    return [
      { name: 'open', type: 'boolean', description: 'Controlled open or selected state where the Radix-backed implementation supports it.', control: <input aria-label="open value" type="checkbox" /> },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'State change callback for controlled surfaces.', control: <input aria-label="onOpenChange value" placeholder="setOpen" /> },
      ...common,
    ]
  }

  if (name === 'Typography') {
    return [
      { name: 'level', type: '1 | 2 | 3 | 4', description: 'Heading hierarchy. Use semantic levels instead of visual-only font sizes.', control: <select aria-label="level value"><option>1</option><option>2</option><option>3</option><option>4</option></select> },
      { name: 'tone', type: "'default' | 'muted' | 'subtle'", description: 'Text emphasis mapped to semantic foreground tokens.', control: <select aria-label="tone value"><option>default</option><option>muted</option><option>subtle</option></select> },
      { name: 'lang', type: 'string', description: 'Set lang for Arabic or mixed-script content so theme typography can respond.', control: <input aria-label="lang value" placeholder="ar" /> },
      ...common,
    ]
  }

  if (['Avatar', 'Badge', 'Calendar', 'Carousel', 'Chart', 'Data Table', 'Empty', 'Item', 'Kbd', 'Progress', 'Skeleton', 'Spinner', 'Table', 'Attachment', 'Bubble', 'Marker', 'Message', 'Message Scroller'].includes(name)) {
    return [
      { name: 'aria-label', type: 'string', description: 'Accessible label when visible text is insufficient.', control: <input aria-label="aria-label value" placeholder={`${name} label`} /> },
      { name: 'data-state', type: 'string', description: 'Optional state attribute for token-safe styling and AI-readable examples.', control: <input aria-label="data-state value" placeholder="active" /> },
      ...common,
    ]
  }

  return common
}

function renderGenericPreview(name: string) {
  if (name === 'Typography') {
    return (
      <Prose>
        <Heading level={2}>Typography</Heading>
        <Text size="lg">Readable hierarchy for humans, stable semantic primitives for AI agents.</Text>
        <ArabicText>هذا نص تجريبي لا يمثل نسخة إنتاجية.</ArabicText>
      </Prose>
    )
  }

  if (name === 'Card') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card content uses semantic surface tokens.</CardDescription>
        </CardHeader>
        <CardContent><Button variant="outline">Open</Button></CardContent>
      </Card>
    )
  }
  if (name === 'Hover Card') {
    return <HoverCard><HoverCardTrigger asChild><Button variant="secondary">Hover target</Button></HoverCardTrigger><HoverCardContent>Preview details</HoverCardContent></HoverCard>
  }
  if (name === 'Popover') {
    return <Popover><PopoverTrigger asChild><Button variant="secondary">Open popover</Button></PopoverTrigger><PopoverContent>Popover content</PopoverContent></Popover>
  }
  if (name === 'Tooltip') {
    return <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="secondary">Target</Button></TooltipTrigger><TooltipContent>Helpful label</TooltipContent></Tooltip></TooltipProvider>
  }
  if (name === 'Aspect Ratio') {
    return <AspectRatio ratio={16 / 9}><Center>16:9</Center></AspectRatio>
  }
  if (name === 'Breadcrumb') {
    return <Breadcrumbs><BreadcrumbItem><a href="#/components">Components</a></BreadcrumbItem><BreadcrumbItem>Breadcrumb</BreadcrumbItem></Breadcrumbs>
  }
  if (name === 'Tabs') return <Tabs defaultValue="overview"><TabList><Tab value="overview">Overview</Tab><Tab value="properties">Properties</Tab></TabList><TabPanel value="overview">Overview content</TabPanel></Tabs>
  if (name === 'Dropdown Menu') return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary">Open menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Components</DropdownMenuItem><DropdownMenuItem>Themes</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
  if (name === 'Context Menu') return <ContextMenu><ContextMenuTrigger><Card><CardContent>Context target</CardContent></Card></ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Components</ContextMenuItem><ContextMenuItem>Themes</ContextMenuItem></ContextMenuContent></ContextMenu>
  if (name === 'Command') {
    return (
      <CommandPalette>
        <CommandPaletteInput placeholder="Search commands..." />
        <CommandPaletteList>
          <CommandPaletteEmpty>No command found.</CommandPaletteEmpty>
          <CommandPaletteGroup heading="Design System">
            <CommandPaletteItem>Open components</CommandPaletteItem>
            <CommandPaletteItem>Search tokens</CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPalette>
    )
  }
  if (name === 'Field') return <Field><FieldLabel>Label</FieldLabel><TextInput placeholder="Value" /></Field>
  if (name === 'Input') return <Field><FieldLabel>Search</FieldLabel><TextInput placeholder="Search components" /></Field>
  if (name === 'Textarea') return <Field><FieldLabel>Project note</FieldLabel><TextArea placeholder="Write a note" /></Field>
  if (name === 'Checkbox') return <label><Checkbox defaultChecked /> Remember me</label>
  if (name === 'Radio Group') return <label><Radio name="demo-radio" defaultChecked /> Option</label>
  if (name === 'Select') return <Selector defaultValue="one"><option value="one">One</option><option value="two">Two</option></Selector>
  if (name === 'Slider') return <Field><FieldLabel>Volume 40%</FieldLabel><Slider defaultValue={40} /></Field>
  if (name === 'Switch') return <label><Switch defaultChecked /> Enable notifications</label>
  if (name === 'Avatar') return <Avatar>US</Avatar>
  if (name === 'Calendar') return <Calendar>Calendar preview</Calendar>
  if (name === 'Empty') return <EmptyState>No items yet.</EmptyState>
  if (name === 'Progress') return <Field><FieldLabel>Upload progress 62%</FieldLabel><ProgressBar value={62} /></Field>
  if (name === 'Skeleton') return <Field><FieldLabel>Loading profile</FieldLabel><Skeleton /></Field>
  if (name === 'Spinner') return <Field><FieldLabel>Loading</FieldLabel><Spinner /></Field>
  if (name === 'Table') return <Table><tbody><tr><th>Component</th><td>Available</td></tr></tbody></Table>
  if (name === 'Toast') return <Toast>Saved</Toast>
  if (name === 'Badge') return <Badge>Default</Badge>
  if (isShadcnMappedPrimitive(name)) {
    return renderShadcnMappedPreview(name)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Manifest-backed component contract and starter preview.</CardDescription>
      </CardHeader>
    </Card>
  )
}

function isShadcnMappedPrimitive(name: string) {
  return components.components.some((component) => component.name === name && component.sourcePath.includes('ShadcnPrimitives'))
}

function renderShadcnMappedPreview(name: string) {
  if (name === 'Separator') {
    return (
      <VStack>
        <span>Section start</span>
        <ShadcnPrimitives.Separator aria-label="Section separator" />
        <span>Section end</span>
      </VStack>
    )
  }
  if (name === 'Input OTP') {
    return (
      <Field>
        <FieldLabel>One-time code</FieldLabel>
        <ShadcnPrimitives.InputOTP aria-label="One-time code" />
      </Field>
    )
  }
  if (name === 'Kbd') return <ShadcnPrimitives.Kbd>⌘ K</ShadcnPrimitives.Kbd>
  if (name === 'Label') return <ShadcnPrimitives.Label>Field label</ShadcnPrimitives.Label>
  if (name === 'Native Select') {
    return (
      <ShadcnPrimitives.NativeSelect defaultValue="default" aria-label="Theme">
        <option value="default">Utopia Default</option>
        <option value="future">Future theme</option>
      </ShadcnPrimitives.NativeSelect>
    )
  }

  if (['Accordion', 'Collapsible'].includes(name)) {
    if (name === 'Accordion') {
      return (
        <ShadcnPrimitives.Accordion type="single" defaultValue="semantic-tokens" collapsible>
          <ShadcnPrimitives.AccordionItem value="semantic-tokens">
            <ShadcnPrimitives.AccordionTrigger>Semantic tokens</ShadcnPrimitives.AccordionTrigger>
            <ShadcnPrimitives.AccordionContent>
              Components consume roles such as --surface, --border, and --radius-surface.
            </ShadcnPrimitives.AccordionContent>
          </ShadcnPrimitives.AccordionItem>
          <ShadcnPrimitives.AccordionItem value="rtl">
            <ShadcnPrimitives.AccordionTrigger>Arabic-friendly</ShadcnPrimitives.AccordionTrigger>
            <ShadcnPrimitives.AccordionContent>
              Triggers use start-aligned text and logical spacing so RTL can mirror cleanly.
            </ShadcnPrimitives.AccordionContent>
          </ShadcnPrimitives.AccordionItem>
        </ShadcnPrimitives.Accordion>
      )
    }

    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Disclosure content follows keyboard and ARIA behavior from shadcn/Radix.</ShadcnPrimitives.PrimitiveItem>
          <ShadcnPrimitives.PrimitiveItem>Use logical spacing and start/end language for RTL.</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Alert', 'Alert Dialog', 'Dialog', 'Drawer', 'Sheet', 'Sonner'].includes(name)) {
    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component role={name === 'Alert' ? 'alert' : 'dialog'}>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Surface, border, focus, and motion are semantic-token driven.</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Attachment', 'Bubble', 'Marker', 'Message', 'Message Scroller'].includes(name)) {
    if (name === 'Attachment') {
      return <ShadcnPrimitives.Attachment name="brief.pdf" meta="PDF · 2.4 MB" />
    }

    if (name === 'Bubble') {
      return <ShadcnPrimitives.Bubble>Use Bubble for compact conversational content that still follows semantic surface tokens.</ShadcnPrimitives.Bubble>
    }

    if (name === 'Marker') {
      return <ShadcnPrimitives.Marker tone="accent">AI</ShadcnPrimitives.Marker>
    }

    if (name === 'Message') {
      return (
        <ShadcnPrimitives.Message author="Utopia AI" meta="Now">
          <ShadcnPrimitives.Bubble>Message content supports mixed-script text and RTL smoke checks.</ShadcnPrimitives.Bubble>
        </ShadcnPrimitives.Message>
      )
    }

    return (
      <ShadcnPrimitives.MessageScroller>
        <ShadcnPrimitives.Message author="Human" meta="09:30">
          <ShadcnPrimitives.Bubble>Can you summarize this direction?</ShadcnPrimitives.Bubble>
        </ShadcnPrimitives.Message>
        <ShadcnPrimitives.Message author="Utopia AI" meta="09:31">
          <ShadcnPrimitives.Bubble tone="accent">Yes. Keep AI-readable docs, semantic tokens, and Arabic-friendly checks together.</ShadcnPrimitives.Bubble>
        </ShadcnPrimitives.Message>
      </ShadcnPrimitives.MessageScroller>
    )
  }

  if (['Navigation Menu', 'Pagination', 'Sidebar', 'Menubar'].includes(name)) {
    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Docs</ShadcnPrimitives.PrimitiveItem>
          <ShadcnPrimitives.PrimitiveItem>Components</ShadcnPrimitives.PrimitiveItem>
          <ShadcnPrimitives.PrimitiveItem>Themes</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Combobox', 'Date Picker', 'Input Group'].includes(name)) {
    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Form composition must keep label, status, and value rules explicit.</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Carousel', 'Chart', 'Data Table', 'Item'].includes(name)) {
    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Preview data</ShadcnPrimitives.PrimitiveItem>
          <ShadcnPrimitives.PrimitiveItem>Token-safe state</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Direction', 'Resizable', 'Scroll Area'].includes(name)) {
    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component dir="rtl">
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>RTL smoke: start/end layout must mirror without left/right assumptions.</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  const Component = shadcnPrimitiveComponent(name)
  if (Component) {
    return (
      <Component>
        <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
        <ShadcnPrimitives.PrimitiveItem>{shadcnPrimitiveDescription(name)}</ShadcnPrimitives.PrimitiveItem>
      </Component>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{shadcnPrimitiveDescription(name)}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function shadcnPrimitiveComponent(name: string): ElementType | null {
  const componentName = components.components
    .find((component) => component.name === name)
    ?.packageImport.match(/\{ ([^ }]+)/)?.[1]

  if (!componentName) return null

  const registry = ShadcnPrimitives as unknown as Record<string, ElementType | undefined>
  return registry[componentName] ?? null
}

function shadcnPrimitiveDescription(name: string) {
  const entry = components.components.find((component) => component.name === name)
  const source = entry?.shadcnFoundation[0] ?? slugify(name)
  return `Maps the shadcn/ui ${source} pattern into Utopia semantic tokens, Arabic-friendly layout rules, and AI-readable usage contracts.`
}

function shadcnConversionExamples(name: string, base: ReactNode): Array<[string, ReactNode]> {
  return [
    [`${name} conversion target`, base],
    ['Human-readable contract', (
      <Card>
        <CardHeader>
          <CardTitle>Use when the pattern is needed</CardTitle>
          <CardDescription>{shadcnPrimitiveDescription(name)}</CardDescription>
        </CardHeader>
      </Card>
    )],
    ['Arabic / RTL smoke', (
      <div dir="rtl" lang="ar">
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>نص تجريبي لا يمثل نسخة إنتاجية.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )],
  ]
}

const buttonProps = [
  { name: 'children', type: 'ReactNode', description: 'Visible button content.', control: <input aria-label="children value" placeholder="value" /> },
  { name: 'startContent', type: 'ReactNode', description: 'Leading content rendered before the visible label.', control: <input aria-label="startContent value" type="checkbox" /> },
  { name: 'endContent', type: 'ReactNode', description: 'Trailing content rendered after the visible label.', control: <input aria-label="endContent value" type="checkbox" /> },
  { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'", description: 'Visual style variant.', control: <select aria-label="variant value" defaultValue="default"><option>default</option><option>secondary</option><option>outline</option><option>ghost</option><option>destructive</option></select> },
  { name: 'size', type: "'sm' | 'default' | 'lg' | 'icon'", description: 'Size variant.', control: <select aria-label="size value" defaultValue="default"><option>sm</option><option>default</option><option>lg</option><option>icon</option></select> },
  { name: 'loading', type: 'boolean', description: 'Shows progress, sets aria-busy, and blocks duplicate activation.', control: <input aria-label="loading value" type="checkbox" /> },
  { name: 'loadingText', type: 'ReactNode', description: 'Optional visible label while loading.', control: <input aria-label="loadingText value" placeholder="Working" /> },
  { name: 'disabled', type: 'boolean', description: 'Disables the button.', control: <input aria-label="disabled value" type="checkbox" /> },
  { name: 'isIconOnly', type: 'boolean', description: 'Renders a square action. Provide aria-label when visible text is shortened.', control: <input aria-label="isIconOnly value" type="checkbox" /> },
  { name: 'type', type: "'button' | 'submit' | 'reset'", description: 'HTML button type attribute.', control: <select aria-label="type value" defaultValue="button"><option>button</option><option>submit</option><option>reset</option></select> },
  { name: 'asChild', type: 'boolean', description: 'Render through Radix Slot for composition.', control: <input aria-label="asChild value" type="checkbox" /> },
]

const buttonGroupProps = [
  { name: 'children', type: 'ReactNode', description: 'Related Button primitives rendered as a group.', control: <input aria-label="children value" placeholder="Button children" /> },
  { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Direction of the grouped actions.', control: <select aria-label="orientation value" defaultValue="horizontal"><option>horizontal</option><option>vertical</option></select> },
  { name: 'density', type: "'default' | 'compact'", description: 'Spacing density for the group.', control: <select aria-label="density value" defaultValue="default"><option>default</option><option>compact</option></select> },
  { name: 'asToolbar', type: 'boolean', description: 'Uses role="toolbar" instead of role="group".', control: <input aria-label="asToolbar value" type="checkbox" /> },
  { name: 'label', type: 'string', description: 'Convenience alias for aria-label when the group purpose is not clear from context.', control: <input aria-label="label value" placeholder="Document actions" /> },
  { name: 'className', type: 'string', description: 'Optional class hook. Do not use it to bypass semantic tokens.', control: <input aria-label="className value" placeholder="value" /> },
  { name: 'ButtonGroupSeparator', type: 'component', description: 'Optional visual separator between grouped controls.', control: <input aria-label="separator value" type="checkbox" /> },
  { name: 'ButtonGroupText', type: 'component', description: 'Optional short static text inside the group, with asChild support.', control: <input aria-label="text value" type="checkbox" /> },
]

function usageFor(name: string) {
  if (name === 'Button') {
    return `import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button>Continue</Button>;
}`
  }

  if (name === 'Button Group') {
    return `import { Button } from '@utopia-studio-design/design-system/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@utopia-studio-design/design-system/ButtonGroup';

export function Example() {
  return (
    <ButtonGroup label="Editing actions">
      <Button variant="secondary">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Cut</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Paste</Button>
    </ButtonGroup>
  );
}`
  }

  if (name === 'Badge') {
    return `import { Badge } from '@utopia-studio-design/design-system/Badge';

export function Example() {
  return <Badge variant="outline">Available</Badge>;
}`
  }

  if (name === 'Typography') {
    return `import {
  ArabicText,
  Heading,
  Prose,
  Text,
} from '@utopia-studio-design/design-system/Typography';

export function Example() {
  return (
    <Prose>
      <Heading level={2}>System typography</Heading>
      <Text size="lg">Readable hierarchy for humans and AI agents.</Text>
      <ArabicText>هذا نص تجريبي لا يمثل نسخة إنتاجية.</ArabicText>
    </Prose>
  );
}`
  }

  if (name === 'Card') {
    return `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@utopia-studio-design/design-system/Card';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Program snapshot</CardTitle>
        <CardDescription>Reusable surface content.</CardDescription>
        <CardAction>Available</CardAction>
      </CardHeader>
      <CardContent>Use cards for repeated content, grouped data, or framed tool surfaces.</CardContent>
      <CardFooter>Updated today</CardFooter>
    </Card>
  );
}`
  }

  if (name === 'Hover Card') {
    return `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@utopia-studio-design/design-system/Surface';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="secondary">Preview</Button>
      </HoverCardTrigger>
      <HoverCardContent>Supplemental preview content.</HoverCardContent>
    </HoverCard>
  );
}`
  }

  if (name === 'Popover') {
    return `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@utopia-studio-design/design-system/Surface';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open</Button>
      </PopoverTrigger>
      <PopoverContent>Small contextual panel.</PopoverContent>
    </Popover>
  );
}`
  }

  if (name === 'Tooltip') {
    return `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@utopia-studio-design/design-system/Surface';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Target</Button>
        </TooltipTrigger>
        <TooltipContent>Short helper text.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`
  }

  if (name === 'Aspect Ratio') {
    return `import { AspectRatio, Center } from '@utopia-studio-design/design-system/Layout';

export function Example() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Center>Media preview</Center>
    </AspectRatio>
  );
}`
  }

  if (name === 'Accordion') {
    return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Accordion type="single" defaultValue="tokens" collapsible>
      <AccordionItem value="tokens">
        <AccordionTrigger>Semantic tokens</AccordionTrigger>
        <AccordionContent>
          Components consume semantic roles instead of Utopia brand primitives.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`
  }

  if (name === 'Breadcrumb') {
    return `import { Breadcrumb, BreadcrumbItem } from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbItem><a href="/components">Components</a></BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  );
}`
  }

  if (name === 'Tabs') {
    return `import { Tabs, TabList, Tab, TabPanel } from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="properties">Properties</Tab>
      </TabList>
      <TabPanel value="overview">Overview content</TabPanel>
      <TabPanel value="properties">Properties content</TabPanel>
    </Tabs>
  );
}`
  }

  if (name === 'Dropdown Menu') {
    return `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@utopia-studio-design/design-system/Navigation';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Components</DropdownMenuItem>
        <DropdownMenuItem>Themes</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`
  }

  if (name === 'Context Menu') {
    return `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Context target</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`
  }

  if (name === 'Command') {
    return `import {
  Command,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <Command>
      <CommandPaletteInput placeholder="Search commands..." />
      <CommandPaletteList>
        <CommandPaletteEmpty>No command found.</CommandPaletteEmpty>
        <CommandPaletteGroup heading="Design System">
          <CommandPaletteItem>Open components</CommandPaletteItem>
          <CommandPaletteItem>Search tokens</CommandPaletteItem>
        </CommandPaletteGroup>
      </CommandPaletteList>
    </Command>
  );
}`
  }

  const entry = components.components.find((component) => component.name === name)
  if (entry) {
    if (entry.sourcePath.includes('ShadcnPrimitives')) {
      const componentName = entry.packageImport.match(/\\{ ([^ }]+)/)?.[1] ?? name.replace(/[^a-z0-9]/gi, '')
      return `import {
  ${componentName},
  PrimitiveHeader,
  PrimitiveItem,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <${componentName}>
      <PrimitiveHeader>${name}</PrimitiveHeader>
      <PrimitiveItem>
        Convert the shadcn/ui ${entry.shadcnFoundation[0]} pattern through Utopia semantic tokens.
      </PrimitiveItem>
    </${componentName}>
  );
}`
    }

    const componentName = name.replace(/[^a-z0-9]/gi, '')
    const selfClosing = ['Input', 'Textarea', 'Checkbox', 'Radio Group', 'Select', 'Slider', 'Switch', 'Spinner', 'Skeleton', 'Progress'].includes(name)
    const hook = name.startsWith('use')
    if (hook) {
      return `${entry.packageImport}

export function Example() {
  const result = ${componentName}();
  return result;
}`
    }
    if (selfClosing) {
      return `${entry.packageImport}

export function Example() {
  return <${componentName} />;
}`
    }

    return `${entry.packageImport}

export function Example() {
  return (
    <${componentName}>
      ${name}
    </${componentName}>
  );
}`
  }

  return `import { Card, CardContent, CardHeader, CardTitle } from '@utopia-studio-design/design-system/Card';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Surface</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  );
}`
}
