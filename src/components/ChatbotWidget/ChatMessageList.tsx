// src/components/ChatbotWidget/ChatMessageList.tsx
import React from 'react';
import { Box, Stack, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ChatMessage } from '../../types/chat';

export default function ChatMessageList({
  messages,
  bottomRef,
}: {
  messages: ChatMessage[];
  bottomRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <Box sx={{ overflowY: 'auto', p: 1.5 }}>
      <Stack spacing={1}>
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <Box
              key={m.id}
              sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}
            >
              <Paper
                elevation={0}
                sx={{
                  maxWidth: '80%',
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: isUser ? 'background.default' : 'success.dark',
                  color: isUser ? 'text.primary' : 'success.contrastText',
                  // ✅ Corrigido: success.dark (ou use alpha para um tom suave)
                  border: (theme) =>
                    `1px solid ${
                      isUser
                        ? theme.palette.divider
                        : alpha(theme.palette.success.dark, 0.5)
                    }`,
                  whiteSpace: 'pre-wrap',
                }}
              >
                <Typography variant="body2">
                  {m.pending && !m.error ? 'digitando…' : m.content}
                </Typography>
              </Paper>
            </Box>
          );
        })}
      </Stack>
      <div ref={bottomRef} />
    </Box>
  );
}
