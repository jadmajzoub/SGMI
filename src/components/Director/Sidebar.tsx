import { Box, Button, Stack, Typography } from '@mui/material';
import { Building2, FileText, Package } from 'lucide-react';
import { DIMENSIONS, SPACING, THEME_COLORS } from '../../constants/theme';
import { MenuItem, MenuItemConfig } from '../../types/production';

interface Props {
  activeMenuItem: MenuItem
  onMenuItemClick: (key: MenuItem) => void
}

const MENU_ITEMS: MenuItemConfig[] = [
  { key: 'production-entry', label: 'Planejamento de Produção', icon: Package },
  { key: 'production-report', label: 'Relatório de Produção', icon: FileText },
]

export default function Sidebar({ activeMenuItem, onMenuItemClick }: Props) {
  return (
    <Box component="aside" sx={{
      width: DIMENSIONS.SIDEBAR_WIDTH, bgcolor: THEME_COLORS.SIDEBAR_DARK, color: THEME_COLORS.SIDEBAR_TEXT_LIGHT, height: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: SPACING.SIDEBAR_PADDING
    }}>
      <Stack gap={3}>
        <Typography sx={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Building2 size={20} /> Área do Diretor
        </Typography>
        <Stack gap={1}>
          {MENU_ITEMS.map(({ key, label, icon: Icon }) => {
            const active = activeMenuItem === key
            return (
              <Button key={key}
                onClick={() => onMenuItemClick(key)}
                startIcon={<Icon size={18} />} fullWidth
                sx={{
                  justifyContent: 'flex-start', gap: 1.5, borderRadius: DIMENSIONS.BORDER_RADIUS_SMALL,
                  fontSize: 14, fontWeight: 500,
                  color: active ? '#ffffff' : THEME_COLORS.SIDEBAR_TEXT_SECONDARY,
                  backgroundColor: active ? THEME_COLORS.PRIMARY_BLUE : 'transparent',
                  '&:hover': { backgroundColor: active ? THEME_COLORS.PRIMARY_BLUE_HOVER : 'rgba(255,255,255,0.06)' }
                }}>
                {label}
              </Button>
            )
          })}
        </Stack>
      </Stack>
      <Typography variant="caption" sx={{ color: THEME_COLORS.SIDEBAR_TEXT_SECONDARY }}>
        SGMI © {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}
