import { Link } from 'react-router-dom'
import { getCategory } from '../config/categories.js'
import { useFavorites } from '../hooks/useToolStorage.js'
import { ArrowIcon, StarIcon } from './Icons.jsx'
import { Badge, Card } from './ui.jsx'

export default function ToolCard({ tool }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(tool.slug)
  const category = getCategory(tool.category)

  return (
    <Card className="group relative flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-700">
      <button
        type="button"
        onClick={() => toggleFavorite(tool.slug)}
        className={`absolute right-4 top-4 rounded-lg p-1.5 transition ${
          isFavorite
            ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10'
            : 'text-slate-300 hover:bg-slate-100 hover:text-slate-500 dark:text-slate-600 dark:hover:bg-slate-800'
        }`}
        aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
        aria-pressed={isFavorite}
      >
        <StarIcon filled={isFavorite} width={18} height={18} />
      </button>

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 font-mono text-sm font-bold text-brand-800 dark:bg-brand-600/15 dark:text-brand-200">
        {tool.icon}
      </div>
      <Badge className="mb-3 self-start">{category?.name || 'Tool'}</Badge>
      <h3 className="text-lg font-semibold pr-6">{tool.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{tool.short}</p>
      <Link
        to={`/tools/${tool.slug}/`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 dark:text-brand-200"
      >
        Open tool <ArrowIcon width={16} height={16} />
      </Link>
    </Card>
  )
}
