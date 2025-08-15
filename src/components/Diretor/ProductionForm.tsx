import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function ProductionForm() {
  const [produto, setProduto] = useState('')
  const [quantidadeKg, setQuantidadeKg] = useState<number | ''>('')

  const handleSalvar = () => {
    // aqui você pluga sua lógica real (API/localStorage)
    console.log({ produto, quantidadeKg })
  }

  return (
    <Paper sx={{ p: 3, minWidth: { xs: 1, sm: 480 } }}>
      <Typography variant="h6" fontWeight={700} mb={2}>Entrada de Produção</Typography>
      <Stack gap={2}>
        <TextField
          label="Nome do produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          fullWidth
        />
        <TextField
          label="Quantidade (kg)"
          type="number"
          value={quantidadeKg}
          onChange={(e) => setQuantidadeKg(e.target.value === '' ? '' : Number(e.target.value))}
          fullWidth
        />
        <Box>
          <Button variant="contained" color="primary" onClick={handleSalvar}>SALVAR</Button>
        </Box>
      </Stack>
    </Paper>
  )
}
