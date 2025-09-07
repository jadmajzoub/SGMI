import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatMessage } from '../../types/chat';
import { sendMessageAPI } from '../../services/chatApi';

export function useChat(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => !isSending, [isSending]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = useCallback(async (text: string) => {
    const value = text.trim();
    if (!value || isSending) return;

    setError(null);
    setIsSending(true);

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: value,
      createdAt: Date.now(),
    };
    const pending: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'digitando…',
      createdAt: Date.now(),
      pending: true,
    };

    setMessages(prev => [...prev, userMsg, pending]);

    try {
      const history = [...messages, userMsg]
        .slice(-20)
        .map(m => ({ role: m.role, content: m.content }));

      const assistant = await sendMessageAPI({ messages: history });

      setMessages(prev => prev.filter(m => m.id !== pending.id).concat(assistant));
    } catch (e: any) {
      setError(e?.message ?? 'Erro ao enviar');
      setMessages(prev =>
        prev.map(m => (m.id === pending.id ? { ...m, content: 'Erro ao responder', pending: false, error: true } : m))
      );
    } finally {
      setIsSending(false);
    }
  }, [isSending, messages]);

  const retry = useCallback(() => {
    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    if (lastUser) send(lastUser.content);
  }, [messages, send]);

  return { messages, canSend, send, retry, error, bottomRef, isSending };
}
