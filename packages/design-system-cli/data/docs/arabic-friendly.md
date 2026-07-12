# Arabic Friendly Design

Arabic-friendly support is a first-class design-system goal. It is broader than RTL.

- Use logical CSS properties.
- Support `dir="ltr"` and `dir="rtl"`.
- Use start/end naming, not left/right APIs.
- Mirror or replace directional icons in RTL contexts.
- Validate mixed English/Arabic labels.
- Do not invent Arabic copy.
- Require localized props for visible labels, `aria-label`, live-region status, empty-state copy, pagination controls, and formatter-generated accessibility text. Reusable components must not fall back to embedded English UI strings.

## Side Navigation Requirements

Side navigation is a release-gate component for Arabic-friendly quality because it controls product IA.

- Keep page links and collapsible section titles separate. A page row such as `Side Nav` must not also be the disclosure trigger for its parts.
- Preserve scroll position when a persistent side navigation collapses and expands.
- Use `inline-start` and `inline-end` spacing for depth, nested section borders, badges, and trailing slots.
- In `dir="rtl"`, collapsed disclosure indicators must rotate toward inline start. Direction-neutral panel icons may stay unmirrored.
- Keep `icon`/`startContent` as inline-start slots and `badge`/`endContent` as inline-end slots.
- Test mixed-script labels, numeric badges, current page state, disabled state, focus-visible, hover, and collapse/expand in both `dir="ltr"` and `dir="rtl"`.
- Use Arabic strings only as supplied localization or explicitly marked test placeholders. Do not write production Arabic copy inside examples, manifests, or reusable components.

## Arabic Typography Requirements

Arabic typography needs its own role contract. It is not Latin typography translated into Arabic.

- Required font roles: `--font-arabic`, `--font-arabic-body`, and `--font-arabic-display`.
- Required rhythm roles: `--line-height-arabic`, `--line-height-arabic-body`, and `--line-height-arabic-display`.
- Required display roles: `--font-size-arabic-display`, `--font-weight-arabic-display`, and `--tracking-arabic-display`.
- Required body roles: `--font-size-arabic-body`, `--font-size-arabic-body-lg`, `--font-weight-arabic-body`, and `--tracking-arabic`.
- Arabic display text must use scale, weight, rhythm, and Arabic display typeface rules. Do not map Latin all-caps styling to Arabic.
- Arabic display size should track the Latin display scale at about 95%, rather than becoming visually larger than the Latin equivalent.
- Arabic contexts must force `text-transform: none`.

## RTL Layout Requirements

Every reusable component and template must be written in logical layout terms.

- Use `padding-inline`, `margin-inline`, `border-inline`, `inset-inline`, `inline-size`, and `block-size`.
- Use `start`, `end`, `inline`, `block`, `leading`, or `trailing` naming in APIs.
- Avoid `left`, `right`, `margin-left`, `padding-right`, and left/right-only prop names unless documenting a physical side.
- Navigation, drawer, sidebar, pagination, carousel, progress, timeline, stepper, tabs, and menu patterns require explicit RTL checks.

## Directional Mirroring Requirements

Directional UI must mirror intentionally.

- Mirror or replace arrows and chevrons used for previous/next, expand/collapse, breadcrumb, carousel, and inline motion.
- Do not mirror direction-neutral icons by default: settings, add, home, camera, download, panel, and document icons.
- Progress indicators and steppers should reverse visual flow only when the product sequence follows reading direction.
- Motion should enter from inline start/end instead of physical left/right.

## Accessibility Localization Contract

- Icon-only actions require a localized accessible label from the consumer.
- Composite widgets require localized landmark and slot labels, including Breadcrumb, Pagination, Input OTP, Chat actions, Spinner, and tool-call summaries.
- Numeric values remain machine-readable while visible and spoken formatting comes from product locale data.
- Direction-neutral icons such as loading spinners do not mirror; directional actions mirror through component direction.

## Required Arabic Mockups

The design system should include Arabic/RTL previews for:

- Hero or display section.
- Form.
- Dashboard or table.
- Empty state.
- Side navigation.

Mockups may use clearly marked test placeholder Arabic. They must not invent production Arabic marketing copy.
