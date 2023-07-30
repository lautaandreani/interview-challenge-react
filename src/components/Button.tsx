import { SortBy } from '../models/models'

interface Props {
  children: React.ReactNode
  event?: () => void
  active?: SortBy | boolean
}

export function Button({ children, event, active }: Props) {
  const isActive = active === SortBy.COUNTRY
  return (
    <button className={`bg-gray text-white border border-[#222] p-2 rounded text-xs ${isActive && '!bg-brand'}`} onClick={event}>
      {children}
    </button>
  )
}
