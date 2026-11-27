import { SearchIcon } from './Icons.jsx'

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search tools, keywords or categories…', autoFocusId }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.(value)
      }}
      role="search"
      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 pl-4 shadow-soft focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
    >
      <SearchIcon className="shrink-0 text-slate-400" />
      <input
        id={autoFocusId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search tools"
        className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-slate-500"
      />
      <button type="submit" className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
        Search
      </button>
    </form>
  )
}
