import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Calendar, Package, Target, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { THEME_COLORS } from '../../constants/theme';
import { ProductionReport } from '../../types/production';

const PRODUCTION_REPORT_DATA: ProductionReport[] = [
  { date: '10-08-2025', shift: 'Manhã', product: 'Fandangos', batches: 12, totalKg: 180 },
  { date: '10-08-2025', shift: 'Tarde', product: 'Doritos', batches: 10, totalKg: 150 },
  { date: '11-08-2025', shift: 'Manhã', product: 'Baconzitos', batches: 8, totalKg: 120 },
  { date: '11-08-2025', shift: 'Tarde', product: 'Fandangos', batches: 15, totalKg: 225 },
  { date: '12-08-2025', shift: 'Manhã', product: 'Doritos', batches: 14, totalKg: 210 },
  { date: '12-08-2025', shift: 'Tarde', product: 'Baconzitos', batches: 11, totalKg: 165 },
  { date: '13-08-2025', shift: 'Manhã', product: 'Fandangos', batches: 16, totalKg: 240 },
  { date: '13-08-2025', shift: 'Tarde', product: 'Doritos', batches: 9, totalKg: 135 },
  { date: '14-08-2025', shift: 'Manhã', product: 'Baconzitos', batches: 13, totalKg: 195 },
  { date: '14-08-2025', shift: 'Tarde', product: 'Fandangos', batches: 18, totalKg: 270 },
]

const CHART_COLORS = ['#2563eb', '#7c3aed', '#dc2626', '#059669', '#ea580c']

export default function ProductionReportScreen() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('all')
  const [selectedShift, setSelectedShift] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const filteredData = useMemo(() => {
    return PRODUCTION_REPORT_DATA.filter(item => {
      const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.date.includes(searchTerm)
      const matchesProduct = selectedProduct === 'all' || item.product === selectedProduct
      const matchesShift = selectedShift === 'all' || item.shift === selectedShift
      
      return matchesSearch && matchesProduct && matchesShift
    })
  }, [searchTerm, selectedProduct, selectedShift])

  const chartData = useMemo(() => {
    const dailyTotals = filteredData.reduce((acc, item) => {
      const key = item.date
      if (!acc[key]) {
        acc[key] = { date: key, totalKg: 0, batches: 0 }
      }
      acc[key].totalKg += item.totalKg
      acc[key].batches += item.batches
      return acc
    }, {} as Record<string, { date: string; totalKg: number; batches: number }>)

    return Object.values(dailyTotals).sort((a, b) => a.date.localeCompare(b.date))
  }, [filteredData])

  const productDistribution = useMemo(() => {
    const productTotals = filteredData.reduce((acc, item) => {
      if (!acc[item.product]) {
        acc[item.product] = 0
      }
      acc[item.product] += item.totalKg
      return acc
    }, {} as Record<string, number>)

    return Object.entries(productTotals).map(([product, totalKg], index) => ({
      name: product,
      value: totalKg,
      color: CHART_COLORS[index % CHART_COLORS.length]
    }))
  }, [filteredData])

  const shiftDistribution = useMemo(() => {
    const shiftTotals = filteredData.reduce((acc, item) => {
      if (!acc[item.shift]) {
        acc[item.shift] = 0
      }
      acc[item.shift] += item.totalKg
      return acc
    }, {} as Record<string, number>)

    return Object.entries(shiftTotals).map(([shift, totalKg], index) => ({
      name: shift,
      value: totalKg,
      color: CHART_COLORS[index % CHART_COLORS.length]
    }))
  }, [filteredData])

  const getUniqueProducts = () => {
    return Array.from(new Set(PRODUCTION_REPORT_DATA.map(item => item.product)))
  }

  const getTotalProduction = () => {
    return filteredData.reduce((sum, item) => sum + item.totalKg, 0)
  }

  const getTotalBatches = () => {
    return filteredData.reduce((sum, item) => sum + item.batches, 0)
  }

  const getAveragePerBatch = () => {
    const totalBatches = getTotalBatches()
    return totalBatches > 0 ? Math.round(getTotalProduction() / totalBatches) : 0
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 1400, 
      mx: 'auto',
      p: { xs: 2, md: 3 }
    }}>
      <Paper 
        elevation={2}
        sx={{ 
          p: { xs: 3, md: 4 }, 
          borderRadius: 3,
          bgcolor: THEME_COLORS.BACKGROUND_PAPER,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: THEME_COLORS.PRIMARY_BLUE,
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1
              }}
            >
              Relatório de Produção
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
            >
              Análise detalhada da produção com gráficos e histórico
            </Typography>
          </Box>

          {/* Filters */}
          <Paper 
            elevation={1}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'grey.50'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Filtros de Pesquisa
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pesquisar"
                  placeholder="Buscar por produto ou data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Produto</InputLabel>
                  <Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    label="Produto"
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    {getUniqueProducts().map(product => (
                      <MenuItem key={product} value={product}>
                        {product}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Turno</InputLabel>
                  <Select
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                    label="Turno"
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="Manhã">Manhã</MenuItem>
                    <MenuItem value="Tarde">Tarde</MenuItem>
                    <MenuItem value="Noite">Noite</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <Chip 
                    label={`${filteredData.length} registros`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* KPI Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={1} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Package size={32} color={THEME_COLORS.PRIMARY_BLUE} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: THEME_COLORS.PRIMARY_BLUE }}>
                    {getTotalProduction().toLocaleString('pt-BR')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    kg Produzidos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={1} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Target size={32} color="#7c3aed" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#7c3aed' }}>
                    {getTotalBatches()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lotes Produzidos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={1} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <TrendingUp size={32} color="#059669" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669' }}>
                    {getAveragePerBatch()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    kg por Lote
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={1} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Calendar size={32} color="#dc2626" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#dc2626' }}>
                    {chartData.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dias de Produção
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3}>
            {/* Daily Production Chart */}
            <Grid item xs={12} lg={8}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Produção Diária (kg)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        `${value} kg`, 
                        name === 'totalKg' ? 'Total' : 'Lotes'
                      ]}
                      labelFormatter={(label) => `Data: ${label}`}
                    />
                    <Bar dataKey="totalKg" fill={THEME_COLORS.PRIMARY_BLUE} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Product Distribution */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Distribuição por Produto
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                      {productDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value} kg`, 'Total']} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Trend Line Chart */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Tendência de Produção
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        `${value} ${name === 'totalKg' ? 'kg' : 'lotes'}`, 
                        name === 'totalKg' ? 'Produção' : 'Lotes'
                      ]}
                      labelFormatter={(label) => `Data: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="totalKg" 
                      stroke={THEME_COLORS.PRIMARY_BLUE} 
                      strokeWidth={3}
                      dot={{ fill: THEME_COLORS.PRIMARY_BLUE, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: THEME_COLORS.PRIMARY_BLUE, strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="batches" 
                      stroke="#7c3aed" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#7c3aed', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  )
}