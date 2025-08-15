import { Box, Button, Stack, Typography } from '@mui/material'
import { Building2, Package, FileText, Calculator } from 'lucide-react'

interface Props {
  activeMenuItem: 'entrada-producao' | 'relatorio' | 'total'
  onMenuItemClick: (key: Props['activeMenuItem']) => void
}

const items = [
  { key: 'entrada-producao', label: 'Entrada de Produção', icon: Package },
  { key: 'relatorio', label: 'Relatório de Produção', icon: FileText },
  { key: 'total', label: 'Total a Ser Produzido', icon: Calculator },
] as const

export default function Sidebar({ activeMenuItem, onMenuItemClick }: Props) {
  return (
    <Box component="aside" sx={{
      width: 260, bgcolor: '#1f2937', color: '#f9fafb', height: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: '32px 20px'
    }}>
      <Stack gap={3}>
        <Typography sx={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Building2 size={20} /> Área do Diretor
        </Typography>
        <Stack gap={1}>
          {items.map(({ key, label, icon: Icon }) => {
            const active = activeMenuItem === key
            return (
              <Button key={key}
                onClick={() => onMenuItemClick(key)}
                startIcon={<Icon size={18} />} fullWidth
                sx={{
                  justifyContent: 'flex-start', gap: 1.5, borderRadius: 2,
                  fontSize: 14, fontWeight: 500,
                  color: active ? '#ffffff' : '#d1d5db',
                  backgroundColor: active ? '#2563eb' : 'transparent',
                  '&:hover': { backgroundColor: active ? '#1e55c9' : 'rgba(255,255,255,0.06)' }
                }}>
                {label}
              </Button>
            )
          })}
        </Stack>
      </Stack>
      <Typography variant="caption" sx={{ color: '#d1d5db' }}>
        SGMI © {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}
