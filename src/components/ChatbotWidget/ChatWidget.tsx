import { useEffect, useState } from 'react';
import { Badge, Fab, Box, Paper, Typography, IconButton, Fade } from '@mui/material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChatPanel from './ChatPanel';

const HINT_KEY = 'chatbot_help_hint_shown_v1';

// Ajuste aqui a distância da borda inferior/esquerda
const FAB_BOTTOM = 96; // estava 20 — "um pouco mais alto" para não cobrir SGMI@2025
const FAB_LEFT = 20;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Mostra a dica "Posso te ajudar?" apenas uma vez por navegador
  useEffect(() => {
    const seen = localStorage.getItem(HINT_KEY);
    if (seen) return;

    const showTimer = setTimeout(() => setShowHint(true), 800);
    const hideTimer = setTimeout(() => {
      setShowHint(false);
      localStorage.setItem(HINT_KEY, '1');
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
    if (!localStorage.getItem(HINT_KEY)) {
      localStorage.setItem(HINT_KEY, '1');
    }
    setShowHint(false);
  };

  const handleClose = () => setOpen(false);

  const dismissHint = () => {
    setShowHint(false);
    localStorage.setItem(HINT_KEY, '1');
  };

  return (
    <>
      {!open && (
        <Box
          sx={{
            position: 'fixed',
            left: FAB_LEFT,
            bottom: FAB_BOTTOM,
            zIndex: 1500,           // acima do footer, abaixo de modals pesados
            width: 1,
            maxWidth: '100vw',
            pointerEvents: 'none',  // evita bloquear cliques fora; reativa nos filhos
          }}
        >
          <Box sx={{ position: 'relative', display: 'inline-block', pointerEvents: 'auto' }}>
            <Badge color="error" badgeContent={unread} overlap="circular">
              <Fab color="primary" onClick={handleOpen} aria-label="Abrir chat">
                <ChatRoundedIcon />
              </Fab>
            </Badge>

            {/* Balão "Posso te ajudar?" preso ao FAB */}
            <Fade in={showHint}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 68,     // colado ao lado do FAB (56px) + 12px de gap
                  bottom: 6,    // levemente acima da base do FAB
                }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    px: 1.25,
                    py: 0.75,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    maxWidth: 220,
                  }}
                  role="status"
                  aria-live="polite"
                >
                  <Typography variant="body2">Posso te ajudar?</Typography>
                  <IconButton size="small" onClick={dismissHint} aria-label="Fechar dica">
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Box>
            </Fade>
          </Box>
        </Box>
      )}

      {/* Painel ancorado à esquerda para combinar com a posição do FAB */}
      <ChatPanel open={open} onClose={handleClose} anchor="left" />
    </>
  );
}
