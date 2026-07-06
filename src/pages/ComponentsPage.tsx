import { components, getArea, statusForComponent } from '../data/design-system'
import { Badge } from '../../packages/design-system/src/Badge'
import { Button } from '../../packages/design-system/src/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../packages/design-system/src/Card'

export function ComponentsPage() {
  const area = getArea('components')

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">Components</p>
        <h1>shadcn-founded component catalog.</h1>
        <p>{area?.description}</p>
      </section>

      <section className="split-grid" id="available-now">
        <aside className="rail tall">
          {area?.groups.map((group) => (
            <div key={group.id} className="rail-group">
              <strong>{group.label}</strong>
              {group.items.map((item) => (
                <span key={item}>
                  {item}
                  <small>{statusForComponent(item)}</small>
                </span>
              ))}
            </div>
          ))}
        </aside>

        <div className="content-stack">
          <div className="section-heading">
            <p>Available Now</p>
            <h2>Implemented primitives with import contracts.</h2>
          </div>
          <div className="card-grid">
            <Card id="architecture-smoke-test">
              <CardHeader>
                <Badge variant="outline">real primitive</Badge>
                <CardTitle>shadcn architecture smoke test</CardTitle>
                <CardDescription>Slot, CVA variants, cn, semantic tokens, and square Utopia Default theme mapping.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="component-example">
                  <Button>Primary</Button>
                  <Button variant="outline">Outline</Button>
                  <Badge>Badge</Badge>
                </div>
              </CardContent>
            </Card>
            {components.components.map((entry) => (
              <article key={entry.name} className="card" id={entry.name.toLowerCase()}>
                <div className="card-row">
                  <span className="kicker">{entry.category}</span>
                  <span className="pill">{entry.status}</span>
                </div>
                <h3>{entry.name}</h3>
                <p>{entry.useWhen.join(' ')}</p>
                <code>{entry.packageImport}</code>
                <small>shadcn: {entry.shadcnFoundation.join(', ')}</small>
                <small>tokens: {entry.requiredTokens.slice(0, 4).join(', ')}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
