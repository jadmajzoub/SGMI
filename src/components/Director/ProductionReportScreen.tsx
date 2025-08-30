import {
  Box, Grid, Paper, Stack, Typography, useTheme
} from '@mui/material'
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts'
import DataTable, { DataRow } from './DataTable'
import { THEME_COLORS } from '../../constants/theme'

// ======== MOCKS DE DADOS (substitua pelos seus depois) ========
const daily = [
  { date: '2025-08-10', kg: 320 },
  { date: '2025-08-11', kg: 340 },
  { date: '2025-08-12', kg: 360 },
  { date: '2025-08-13', kg: 350 },
  { date: '2025-08-14', kg: 470 },
]

const productShare = [
  { name: 'Fandangos', value: 48 },
  { name: 'Doritos', value: 26 },
  { name: 'Baconzitos', value: 26 },
]

const trend = [
  { day: '10-08', kg: 320 },
  { day: '11-08', kg: 340 },
  { day: '12-08', kg: 360 },
  { day: '13-08', kg: 350 },
  { day: '14-08', kg: 470 },
]

// Tabela (no relatório)
const tableRows: DataRow[] = [
  { date: '10/08/2025', shift: 'Manhã', product: 'Fandangos',  batches: 12, approxKg: 240 },
  { date: '10/08/2025', shift: 'Tarde', product: 'Doritos',    batches: 8,  approxKg: 160 },
  { date: '11/08/2025', shift: 'Noite', product: 'Baconzitos', batches: 9,  approxKg: 180 },
  { date: '12/08/2025', shift: 'Manhã', product: 'Fandangos',  batches: 10, approxKg: 200 },
  { date: '12/08/2025', shift: 'Tarde', product: 'Doritos',    batches: 7,  approxKg: 140 },
  { date: '13/08/2025', shift: 'Noite', product: 'Baconzitos', batches: 9,  approxKg: 180 },
  { date: '14/08/2025', shift: 'Manhã', product: 'Fandangos',  batches: 15, approxKg: 300 },
]

// ======== KPIs ========
const totalKg = daily.reduce((acc, d) => acc + d.kg, 0)
const totalLotes = 126
const diasProd = daily.length
const kgPorLote = Math.round(totalKg / Math.max(totalLotes, 1))

export default function ProductionReportScreen() {
  const theme = useTheme()

  // Paleta de cores consistente
  const primary = theme.palette.primary.main
  const secondary = theme.palette.secondary?.main || '#7c3aed'
  const accent = theme.palette.error?.main || '#ef4444'
  const grid = theme.palette.divider
  const PIE_COLORS = [primary, secondary, accent]

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, md: 3 },

        /**
         * ---- FIX DO CORTE NO TOPO ----
         * Muitos layouts usam AppBar/Toolbar fixa ou um wrapper com overflow/position.
         * Aqui garantimos um espaço "de segurança" grande o suficiente,
         * independente do layout pai.
         */
        pt: { xs: 8, sm: 10 }, // empurra TUDO pra baixo do header fixo (56~64px+)
        scrollPaddingTop: { xs: 64, sm: 88 }, // caso haja ancoras/scrollTo
      }}
    >
      <Stack spacing={2} sx={{ pb: 3 }}>
        {/* Título */}
        <Typography variant="h4" sx={{ fontWeight: 700, color: THEME_COLORS.PRIMARY_BLUE }}>
          Relatório de Produção
        </Typography>

        {/* KPIs */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">kg Produzidos</Typography>
              <Typography variant="h4" fontWeight={700}>{totalKg.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Lotes Produzidos</Typography>
              <Typography variant="h4" fontWeight={700}>{totalLotes.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">kg por Lote</Typography>
              <Typography variant="h4" fontWeight={700}>{kgPorLote.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Dias de Produção</Typography>
              <Typography variant="h4" fontWeight={700}>{diasProd}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Gráficos: Barras + Pizza */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Produção Diária (kg)</Typography>
              <Box sx={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={daily}>
                    <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => [`${v} kg`, 'Produção']} />
                    <Bar dataKey="kg" fill={primary} /> {/* cor explícita */}
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Distribuição por Produto</Typography>
              <Box sx={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={productShare} dataKey="value" nameKey="name" outerRadius={110} label={(e) => `${e.name}: ${e.value}%`}>
                      {productShare.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`${v}%`, 'Participação']} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Tendência (linha) */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Tendência de Produção</Typography>
          <Box sx={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={trend}>
                <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(v: number) => [`${v} kg`, 'Produção']} />
                <Legend />
                <Line type="monotone" dataKey="kg" stroke={secondary} strokeWidth={2} dot={false} /> {/* cor explícita */}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* TABELA */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Planilha de Produção</Typography>
          <DataTable rows={tableRows} pageSize={10} />
        </Paper>
      </Stack>
    </Box>
  )
}
