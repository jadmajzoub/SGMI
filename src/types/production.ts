export interface ProductionEntry {
  product: string
  quantityKg: number
}

export interface ProductionReport {
  date: string
  shift: 'Manhã' | 'Tarde' | 'Noite'
  product: string
  batches: number
  totalKg: number
}

export interface ProductionTotal {
  product: string
  totalKg: number
}

export type MenuItem = 'production-entry' | 'production-report'

export interface MenuItemConfig {
  key: MenuItem
  label: string
  icon: React.ComponentType<{ size?: string | number }>
}