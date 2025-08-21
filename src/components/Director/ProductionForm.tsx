import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { ProductionEntry } from '../../types/production'
import { SPACING } from '../../constants/theme'

export default function ProductionForm() {
  const [product, setProduct] = useState('')
  const [quantityKg, setQuantityKg] = useState<number | ''>('')

  const handleSave = () => {
    if (product && quantityKg) {
      const entry: ProductionEntry = { product, quantityKg: Number(quantityKg) }
      console.log('Production entry:', entry)
    }
  }

  return (
    <Paper sx={{ p: SPACING.PAPER_PADDING, minWidth: { xs: 1, sm: 480 } }}>
      <Typography variant="h6" fontWeight={700} mb={2}>Production Entry</Typography>
      <Stack gap={2}>
        <TextField
          label="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          fullWidth
        />
        <TextField
          label="Quantity (kg)"
          type="number"
          value={quantityKg}
          onChange={(e) => setQuantityKg(e.target.value === '' ? '' : Number(e.target.value))}
          fullWidth
        />
        <Box>
          <Button variant="contained" color="primary" onClick={handleSave}>SAVE</Button>
        </Box>
      </Stack>
    </Paper>
  )
}
