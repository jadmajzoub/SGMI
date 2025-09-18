import {
  Box,
  Grid,
  Paper, Stack, Typography, useTheme
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
  DailyProductionChart,
  ProductionMetrics,
  ProductShareChart,
  sessionChartService,
  TableRow,
  TrendChart
} from '../../services/sessionCharts';
import { createDefaultFilter, ProductionFilter } from '../../types/filters';
import { SkeletonReportScreen } from '../common/Skeleton';
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
    totalMinutes: 0,
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
          sessionChartService.getDailyProduction(filter),
          sessionChartService.getProductShare(filter),
          sessionChartService.getTrend(filter),
          sessionChartService.getTableData(filter),
          sessionChartService.getMetrics(filter)
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

  if (isLoading) {
    return <SkeletonReportScreen />
  }

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, md: 3 },
        pt: { xs: 2, md: 3 },
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
        <Grid container spacing={3} sx={{ mb: 3, width: '100%' }}>
          <Grid item xs={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 2, 
              textAlign: 'center', 
              height: 140,
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out'
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>kg Produzidos</Typography>
              <Typography variant="h4" fontWeight={700} color="primary">{isLoading ? '...' : metrics.totalKg.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 2, 
              textAlign: 'center', 
              height: 140,
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out'
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>Bateladas Produzidas</Typography>
              <Typography variant="h4" fontWeight={700} color="primary">{isLoading ? '...' : metrics.totalBatches.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 2, 
              textAlign: 'center', 
              height: 140,
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out'
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>kg por Batelada</Typography>
              <Typography variant="h4" fontWeight={700} color="primary">{isLoading ? '...' : metrics.kgPerBatch.toLocaleString('pt-BR')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 2, 
              textAlign: 'center', 
              height: 140,
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out'
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>Tempo de Produção (em minutos)</Typography>
              <Typography variant="h4" fontWeight={700} color="primary">{isLoading ? '...' : metrics.totalMinutes}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Gráficos: Barras + Pizza */}
        <Grid container spacing={3} sx={{ mb: 3, width: '100%' }}>
          <Grid item xs={8}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Produção Diária (kg)</Typography>
              <Box sx={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={daily}>
                    <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => [`${v} kg`, 'Produção']} />
                    <Bar dataKey="kg" fill={primary} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>Distribuição por Produto</Typography>
              <Box sx={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie 
                      data={productShare} 
                      dataKey="value" 
                      nameKey="name" 
                      outerRadius={80} 
                      label={false}
                      stroke="#fff"
                      strokeWidth={2}
                    >
                      {productShare.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(v: number, name: string) => [`${v}%`, name]} 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value: string) => value.length > 12 ? `${value.substring(0, 12)}...` : value}
                      wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Tendência (linha) */}
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Tendência de Produção</Typography>
          <Box sx={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={trend}>
                <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(v: number) => [`${v} kg`, 'Produção']} />
                <Legend />
                <Line type="monotone" dataKey="kg" stroke={secondary} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* TABELA */}
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Planilha de Produção</Typography>
          <DataTable rows={tableRows} pageSize={10} />
        </Paper>
      </Stack>
    </Box>
  )
}
