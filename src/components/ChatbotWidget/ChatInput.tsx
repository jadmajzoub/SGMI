import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, TextField, Alert } from '@mui/material';

export default function ChatInput({
  onSend,
  disabled,
  error,
  onRetry,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
  error?: string | null;
  onRetry?: () => void;
}) {
  const [text, setText] = useState('');
  // ✅ TextField usa input de <input> ou <textarea>, não <div>
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const send = useCallback(() => {
    const t = text.trim();
    if (!t || disabled) return;
    onSend(t);
    setText('');
  }, [text, disabled, onSend]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    };
    el.addEventListener('keydown', handler as any);
    return () => el.removeEventListener('keydown', handler as any);
  }, [send]);

  return (
    <Box sx={{ borderTop: theme => `1px solid ${theme.palette.divider}`, p: 1.25 }}>
      <Stack spacing={1}>
        {error && (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={onRetry}>
                Tentar novamente
              </Button>
            }
          >
            {error}
          </Alert>
        )}
        <Stack direction="row" spacing={1.25} alignItems="flex-end">
          <TextField
            inputRef={ref}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Digite sua mensagem… (Enter envia, Shift+Enter quebra linha)"
            variant="outlined"
            fullWidth
            multiline
            minRows={1}
            maxRows={6}
            size="small"
          />
          <Button variant="contained" onClick={send} disabled={!!disabled}>
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
