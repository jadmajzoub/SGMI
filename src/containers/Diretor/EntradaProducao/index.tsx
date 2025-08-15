import { useState } from 'react'
import Sidebar from '../../../components/Diretor/Sidebar'
import ProductionForm from '../../../components/Diretor/ProductionForm'
import RelatorioTabela from '../../../components/Diretor/RelatorioTabela'
import TotalTabela from '../../../components/Diretor/TotalTabela'
import { Box } from '@mui/material'

export default function EntradaProducaoPage() {
  const [activeMenuItem, setActiveMenuItem] =
    useState<'entrada-producao'|'relatorio'|'total'>('entrada-producao')

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f8fafc' }}>
      <Sidebar activeMenuItem={activeMenuItem} onMenuItemClick={setActiveMenuItem} />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', p: 2 }}>
        {activeMenuItem === 'entrada-producao' && <ProductionForm />}
        {activeMenuItem === 'relatorio' && <RelatorioTabela />}
        {activeMenuItem === 'total' && <TotalTabela />}
      </Box>
    </Box>
  )
}
