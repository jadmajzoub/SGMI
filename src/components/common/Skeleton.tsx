import { Box, Paper, Stack, Typography, Skeleton as MuiSkeleton, Grid } from '@mui/material'

interface SkeletonCardProps {
  height?: number
  width?: string | number
}

export function SkeletonCard({ height = 120, width = '100%' }: SkeletonCardProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: 2, minHeight: height, display: 'flex', flexDirection: 'column', justifyContent: 'center', width }}>
      <MuiSkeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
      <MuiSkeleton variant="text" width="60%" height={32} />
    </Paper>
  )
}

export function SkeletonMetricsCards() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4].map((i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
  )
}

export function SkeletonChart({ height = 320 }: { height?: number }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <MuiSkeleton variant="text" width="30%" height={28} sx={{ mb: 2 }} />
      <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MuiSkeleton variant="rectangular" width="100%" height={height - 40} sx={{ borderRadius: 1 }} />
      </Box>
    </Paper>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <MuiSkeleton variant="text" width="30%" height={28} sx={{ mb: 2 }} />
      <Stack spacing={1}>
        {Array.from({ length: rows }, (_, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
            <MuiSkeleton variant="text" width="20%" height={20} />
            <MuiSkeleton variant="text" width="30%" height={20} />
            <MuiSkeleton variant="text" width="15%" height={20} />
            <MuiSkeleton variant="text" width="25%" height={20} />
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}

export function SkeletonProductList({ items = 3 }: { items?: number }) {
  return (
    <Stack spacing={2}>
      {Array.from({ length: items }, (_, i) => (
        <Paper key={i} sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <MuiSkeleton variant="text" width="30%" height={24} />
            <MuiSkeleton variant="text" width="20%" height={24} />
          </Box>
        </Paper>
      ))}
    </Stack>
  )
}

export function SkeletonReportScreen() {
  return (
    <Box sx={{ width: '100%', px: { xs: 2, md: 3 }, pt: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <MuiSkeleton variant="text" width="40%" height={48} />
        
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <MuiSkeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 1 }} />
            <MuiSkeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
            <MuiSkeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
          </Box>
        </Paper>
        
        <SkeletonMetricsCards />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <SkeletonChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <SkeletonChart />
          </Grid>
        </Grid>
        
        <SkeletonChart />
        <SkeletonTable />
      </Stack>
    </Box>
  )
}

export function SkeletonProductionEntry() {
  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 3 }, pt: { xs: 3, md: 4 } }}>
      <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <MuiSkeleton variant="text" width={300} height={48} />
              <MuiSkeleton variant="text" width={200} height={20} />
            </Box>
            <MuiSkeleton variant="rectangular" width={180} height={40} sx={{ borderRadius: 2 }} />
          </Box>
          
          <Box sx={{ borderTop: 1, borderColor: 'divider', my: 2 }} />
          
          <Box>
            <MuiSkeleton variant="text" width={250} height={32} sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <SkeletonCard height={140} />
              </Grid>
              <Grid item xs={12} md={8}>
                <SkeletonProductList />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}