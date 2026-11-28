import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { StarIcon } from '../components/Icons.jsx'
import ToolCard from '../components/ToolCard.jsx'
import { Button, Card, Container, Section } from '../components/ui.jsx'
import { getTool } from '../config/tools.js'
import { useFavorites } from '../hooks/useToolStorage.js'

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites()
  const favoriteTools = favorites.map((slug) => getTool(slug)).filter(Boolean)

  const clearAll = () => {
    favoriteTools.forEach((tool) => toggleFavorite(tool.slug))
  }

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Favorites' }]} />

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your favorites</h1>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              Tools you star are saved privately in this browser. They never leave your device and are not sent to analytics or ads.
            </p>
          </div>
          {favoriteTools.length > 0 && (
            <Button variant="secondary" onClick={clearAll}>Clear all favorites</Button>
          )}
        </div>

        {favoriteTools.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-300">
              {favoriteTools.length} saved {favoriteTools.length === 1 ? 'tool' : 'tools'}. Click the star on a card to remove it.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
            </div>
          </>
        ) : (
          <Card className="mx-auto max-w-xl px-6 py-14 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-300">
              <StarIcon width={28} height={28} />
            </div>
            <h2 className="text-xl font-semibold">No favorites yet</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Open any tool and click the star on its card. Your saved tools will appear here for quick access.
            </p>
            <Button as={Link} to="/tools/" className="mt-6">Browse all tools</Button>
          </Card>
        )}
      </Container>
    </Section>
  )
}
