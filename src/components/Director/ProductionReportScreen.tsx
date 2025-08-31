import {
  Box, Grid, Paper, Stack, Typography, useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis,
} from 'recharts';
import { THEME_COLORS } from '../../constants/theme';
import {
  chartService,
  DailyProductionChart,
  ProductionMetrics,
  ProductShareChart,
  TableRow,
  TrendChart
} from '../../services/charts';
import { createDefaultFilter, ProductionFilter } from '../../types/filters';
import DataTable from './DataTable';
import ProductionFilters from './ProductionFilters';

export default function ProductionReportScreen() {
  const theme = useTheme()
  
  // State for filters
  const [filter, setFilter] = useState<ProductionFilter>(createDefaultFilter())
  
  // State for chart data
  const [daily, setDaily] = useState<DailyProductionChart[]>([])
  const [productShare, setProductShare] = useState<ProductShareChart[]>([])
  const [trend, setTrend] = useState<TrendChart[]>([])
  const [tableRows, setTableRows] = useState<TableRow[]>([])
  const [metrics, setMetrics] = useState<ProductionMetrics>({
    totalKg: 0,
    totalBatches: 0,
    minutesProduced: 0,
    kgPerBatch: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all chart data when filters change
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch all data in parallel with current filter
        const [
          dailyData,
          shareData,
          trendData,
          tableData,
          metricsData
        ] = await Promise.all([
          chartService.getDailyProduction(filter),
          chartService.getProductShare(filter),
          chartService.getTrend(filter),
          chartService.getTableData(filter),
          chartService.getMetrics(filter)
        ])

        setDaily(dailyData)
        setProductShare(shareData)
        setTrend(trendData)
        setTableRows(tableData)
        setMetrics(metricsData)
      } catch (error) {
        console.error('Erro ao carregar dados dos relatórios:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllData()
  }, [filter])

  // Paleta de cores consistente
  const primary = theme.palette.primary.main
  const secondary = theme.palette.secondary?.main || '#7c3aed'
  const accent = theme.palette.error?.main || '#ef4444'
  const grid = theme.palette.divider
  const PIE_COLORS = [primary, secondary, accent]

  const handleFilterChange = (newFilter: ProductionFilter) => {
    setFilter(newFilter);
  };

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

        {/* Filtros */}
        <ProductionFilters filter={filter} onFilterChange={handleFilterChange} />

        {/* KPIs */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">kg Produzidos</Typography>
              <Typography variant="h4" fontWeight={700}>{isLoading ? '...' : metrics.totalKg.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Bateladas Produzidas</Typography>
              <Typography variant="h4" fontWeight={700}>{isLoading ? '...' : metrics.totalBatches.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">kg por Batelada</Typography>
              <Typography variant="h4" fontWeight={700}>{isLoading ? '...' : metrics.kgPerBatch.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Tempo de Produção (em minutos)</Typography>
              <Typography variant="h4" fontWeight={700}>{isLoading ? '...' : metrics.minutesProduced}</Typography>
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
