import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Skeleton
} from '@mui/material'

interface Column {
  key: string
  label: string
}

interface TableSkeletonProps {
  title: string
  columns: Column[]
  rows?: number
  minWidth?: { xs: number; md?: number }
}

const DEFAULT_SKELETON_ROWS = 5

export default function TableSkeleton({ 
  title, 
  columns, 
  rows = DEFAULT_SKELETON_ROWS, 
  minWidth = { xs: 1, md: 600 } 
}: TableSkeletonProps) {
  return (
    <TableContainer component={Paper} sx={{ minWidth }}>
      <Typography variant="h6" fontWeight={700} p={2}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>
                <Skeleton width="80%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <Skeleton 
                    width={Math.random() * 40 + 60 + '%'} 
                    height={20}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}