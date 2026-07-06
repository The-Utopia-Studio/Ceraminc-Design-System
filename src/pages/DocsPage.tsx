export function DocsPage() {
  return (
    <div className="page">
      <section className="page-hero compact">
        <h1>Getting Started</h1>
        <p>Add the design system to your project and start building.</p>
      </section>

      <article className="docs-article">
        <section id="quick-start-ai">
          <h2>Quick Start with AI</h2>
          <p>Paste this into your AI coding tool and let it handle the setup.</p>
          <div className="code-block">
            <span>text</span>
            <pre>{`Install @utopia-studio-design/design-system and @utopia-studio-design/design-system-cli in this project. Run \`npx utopia-ds init\` to set up agent docs. Read the generated files to learn the conventions.`}</pre>
          </div>
        </section>

        <section id="install">
          <h2>Install</h2>
          <p>Add the core package, a theme, and the CLI to your existing project.</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npm install @utopia-studio-design/design-system @utopia-studio-design/design-system-cli`}</pre>
          </div>
          <p>Then run the init wizard to set up AI agent docs, pick a starter template, and learn about theming.</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npx utopia-ds init`}</pre>
          </div>
        </section>

        <section id="add-theme-css">
          <h2>Add the theme CSS</h2>
          <p>Import the core stylesheet and a theme in your global CSS file. Themes provide all design tokens as CSS custom properties.</p>
          <div className="code-block">
            <span>css</span>
            <pre>{`@import '@utopia-studio-design/design-system/core.css';
@import '@utopia-studio-design/design-system/themes/utopia-default.css';`}</pre>
          </div>
        </section>

        <section id="add-first-component">
          <h2>Add your first component</h2>
          <p>Components are imported from per-component subpath entrypoints. This keeps intent clear for humans and AI agents.</p>
          <div className="code-block">
            <span>tsx</span>
            <pre>{`import { Button } from '@utopia-studio-design/design-system/Button';

export default function Page() {
  return <Button>Build with Utopia</Button>;
}`}</pre>
          </div>
        </section>

        <section id="customize">
          <h2>Customize with className</h2>
          <p>Utopia components support semantic tokens and standard React styling surfaces. Start with className overrides, then add project-specific CSS only at the app layer.</p>
          <div className="code-block">
            <span>tsx</span>
            <pre>{`import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button className="justify-self-end">Save</Button>;
}`}</pre>
          </div>
        </section>

        <section id="example-apps">
          <h2>Example Apps</h2>
          <p>Example apps will become complete setups with routing, theming, Arabic-friendly checks, and components wired together.</p>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Example</th>
                <th>Stack</th>
                <th>Path</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Next.js</td>
                <td>Next.js + theme CSS</td>
                <td>apps/example-nextjs</td>
              </tr>
              <tr>
                <td>Vite</td>
                <td>Vite + theme CSS</td>
                <td>apps/example-vite</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="explore-cli">
          <h2>Explore the CLI</h2>
          <p>The CLI is the AI-readable reference for components, tokens, templates, themes, and docs.</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npm run ds -- component --list --dense
npm run ds -- component Button --dense
npm run ds -- theme utopia-default --dense
npm run ds -- docs theme-authoring --dense`}</pre>
          </div>
        </section>
      </article>
    </div>
  )
}
