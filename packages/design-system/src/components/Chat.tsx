import * as React from 'react'
import { ArrowUp, Check, ChevronDown, LoaderCircle, Mic, Wrench, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { Badge, type BadgeProps } from './Badge'
import { Button, type ButtonProps } from './Button'

export type ChatMessageRole = 'assistant' | 'system' | 'user'

export interface ChatLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  composer?: React.ReactNode
  messages?: React.ReactNode
}

export function ChatLayout({ children, className, composer, messages, ...props }: ChatLayoutProps) {
  return (
    <section className={cn('uds-chat-layout', className)} {...props}>
      {messages ? <div className="uds-chat-layout-messages">{messages}</div> : null}
      {children}
      {composer ? <div className="uds-chat-layout-composer">{composer}</div> : null}
    </section>
  )
}

export function ChatMessageList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-chat-message-list', className)} role="list" {...props} />
}

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  metadata?: React.ReactNode
  role?: ChatMessageRole
}

export function ChatMessage({
  children,
  className,
  metadata,
  role = 'assistant',
  ...props
}: ChatMessageProps) {
  return (
    <article className={cn('uds-chat-message', className)} data-role={role} role="listitem" {...props}>
      <div className="uds-chat-message-body">{children}</div>
      {metadata ? <ChatMessageMetadata>{metadata}</ChatMessageMetadata> : null}
    </article>
  )
}

export interface ChatMessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: Exclude<ChatMessageRole, 'system'>
  tone?: 'default' | 'muted' | 'primary'
}

export function ChatMessageBubble({
  className,
  role = 'assistant',
  tone = role === 'user' ? 'primary' : 'default',
  ...props
}: ChatMessageBubbleProps) {
  return <div className={cn('uds-chat-message-bubble', className)} data-role={role} data-tone={tone} {...props} />
}

export function ChatMessageMetadata({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-chat-message-metadata', className)} {...props} />
}

export interface ChatSystemMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
}

export function ChatSystemMessage({ children, className, label, ...props }: ChatSystemMessageProps) {
  return (
    <div className={cn('uds-chat-system-message', className)} role="status" {...props}>
      {label ? <span className="uds-chat-system-message-label">{label}</span> : null}
      {children ? <span className="uds-chat-system-message-body">{children}</span> : null}
    </div>
  )
}

export function ChatTokenizedText({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('uds-chat-tokenized-text', className)} {...props} />
}

export interface ChatComposerTokenElementProps extends BadgeProps {
  tokenType?: 'command' | 'mention' | 'tag' | 'tool'
}

export function ChatComposerTokenElement({
  className,
  tokenType = 'tag',
  variant = 'secondary',
  ...props
}: ChatComposerTokenElementProps) {
  return <Badge className={cn('uds-chat-composer-token', className)} data-token-type={tokenType} variant={variant} {...props} />
}

export interface ChatToolCall {
  description?: React.ReactNode
  duration?: React.ReactNode
  id: string
  label: React.ReactNode
  status?: 'error' | 'pending' | 'success'
}

export interface ChatToolCallsProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  calls?: ChatToolCall[]
  defaultExpanded?: boolean
  label: React.ReactNode
}

export function ChatToolCalls({
  calls = [],
  children,
  className,
  defaultExpanded = true,
  label,
  ...props
}: ChatToolCallsProps) {
  return (
    <details className={cn('uds-chat-tool-calls', className)} open={defaultExpanded} {...props}>
      <summary className="uds-chat-tool-calls-summary">
        <Wrench aria-hidden="true" className="uds-chat-tool-calls-icon" />
        <span>{label}</span>
        <ChevronDown aria-hidden="true" className="uds-chat-tool-calls-disclosure" />
      </summary>
      <div className="uds-chat-tool-calls-list">
        {calls.map((call) => (
          <div className="uds-chat-tool-call" data-status={call.status ?? 'pending'} key={call.id}>
            <span aria-hidden="true" className="uds-chat-tool-call-status">
              <ChatToolCallStatusIcon status={call.status ?? 'pending'} />
            </span>
            <span className="uds-chat-tool-call-label">{call.label}</span>
            {call.description ? <span className="uds-chat-tool-call-description">{call.description}</span> : null}
            {call.duration ? <span className="uds-chat-tool-call-duration">{call.duration}</span> : null}
          </div>
        ))}
        {children}
      </div>
    </details>
  )
}

function ChatToolCallStatusIcon({ status }: { status: NonNullable<ChatToolCall['status']> }) {
  if (status === 'success') return <Check />
  if (status === 'error') return <X />
  return <LoaderCircle />
}

export interface ChatComposerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  actions?: React.ReactNode
  drawer?: React.ReactNode
  input?: React.ReactNode
}

export function ChatComposer({
  actions,
  children,
  className,
  drawer,
  input,
  ...props
}: ChatComposerProps) {
  return (
    <form className={cn('uds-chat-composer', className)} {...props}>
      {drawer ? <ChatComposerDrawer>{drawer}</ChatComposerDrawer> : null}
      <div className="uds-chat-composer-row">
        {input ?? children}
        {actions ? <div className="uds-chat-composer-actions">{actions}</div> : null}
      </div>
    </form>
  )
}

export function ChatComposerInput({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('uds-chat-composer-input', className)} rows={2} {...props} />
}

export function ChatComposerDrawer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-chat-composer-drawer', className)} {...props} />
}

export interface ChatSendButtonProps extends Omit<ButtonProps, 'children' | 'isIconOnly'> {
  icon?: React.ReactNode
  label: string
}

export function ChatSendButton({
  className,
  icon = <ArrowUp />,
  label,
  variant = 'default',
  ...props
}: ChatSendButtonProps) {
  return (
    <Button aria-label={label} className={cn('uds-chat-send-button', className)} isIconOnly type="submit" variant={variant} {...props}>
      {icon}
    </Button>
  )
}

export interface ChatDictationButtonProps extends Omit<ButtonProps, 'children' | 'isIconOnly'> {
  icon?: React.ReactNode
  label: string
}

export function ChatDictationButton({
  className,
  icon = <Mic />,
  label,
  variant = 'ghost',
  ...props
}: ChatDictationButtonProps) {
  return (
    <Button aria-label={label} className={cn('uds-chat-dictation-button', className)} isIconOnly type="button" variant={variant} {...props}>
      {icon}
    </Button>
  )
}

export interface ChatLayoutScrollButtonProps extends Omit<ButtonProps, 'children' | 'isIconOnly'> {
  accessibilityLabel: string
  icon?: React.ReactNode
  label?: React.ReactNode
}

export function ChatLayoutScrollButton({
  accessibilityLabel,
  className,
  icon = '⌄',
  label,
  variant = 'secondary',
  ...props
}: ChatLayoutScrollButtonProps) {
  return (
    <Button aria-label={accessibilityLabel} className={cn('uds-chat-layout-scroll-button', className)} isIconOnly={!label} type="button" variant={variant} {...props}>
      <span aria-hidden="true">{icon}</span>
      {label ? <span className="uds-chat-layout-scroll-button-label">{label}</span> : null}
    </Button>
  )
}
