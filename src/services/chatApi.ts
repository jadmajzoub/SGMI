import { ChatMessage } from '../types/chat';

export interface SendMessagePayload {
  messages: Pick<ChatMessage, 'role' | 'content'>[];
}

export async function sendMessageAPI(payload: SendMessagePayload): Promise<ChatMessage> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { role: 'assistant'; content: string };
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: data.content,
      createdAt: Date.now(),
    };
  } catch {
    // Fallback mock para dev do front
    await new Promise(r => setTimeout(r, 700));
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '⚠️ (mock) Backend ainda não está ativo. Resposta simulada.',
      createdAt: Date.now(),
    };
  }
}
