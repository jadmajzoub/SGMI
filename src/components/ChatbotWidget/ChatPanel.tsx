import { useEffect } from 'react';
import { Box, Drawer, IconButton, Toolbar, Typography, Divider } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { useChat } from './useChat';
import { ChatMessage } from '../../types/chat';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPanel({
  open,
  onClose,
  anchor = 'left',
}: {
  open: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right';
}) {
  const welcome: ChatMessage = {
    id: uuidv4(),
    role: 'assistant',
    content: 'Olá! Sou seu assistente. Como posso ajudar?',
    createdAt: Date.now(),
  };

  const { messages, canSend, send, retry, error, bottomRef } = useChat([welcome]);

  // ESC para fechar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      keepMounted
      PaperProps={{
        sx: {
          width: { xs: '92vw', sm: 420 },
          height: { xs: '70vh', sm: '80vh' },
          m: 2,
          borderRadius: 2,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
        },
      }}
      ModalProps={{ slotProps: { backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.25)' } } } }}
    >
      {/* Header */}
      <Box sx={{ px: 1, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
        <Toolbar disableGutters sx={{ minHeight: 52, px: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
            Chatbot • AI
          </Typography>
          <IconButton size="small" onClick={onClose} aria-label="Fechar chat">
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </Box>

      {/* Messages */}
      <ChatMessageList messages={messages} bottomRef={bottomRef} />

      {/* Input */}
      <Divider />
      <ChatInput onSend={send} disabled={!canSend} error={error} onRetry={retry} />
    </Drawer>
  );
}
