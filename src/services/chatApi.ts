import { ChatMessage } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';

export interface SendMessagePayload {
  messages: Pick<ChatMessage, 'role' | 'content'>[];
}

export async function sendMessageAPI(payload: SendMessagePayload): Promise<ChatMessage> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 🔴 Obrigatório para o backend aceitar (SGMI-only)
        'x-tenant': 'sgmi',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Se o backend recusou (ex.: 403 por falta de header), informa melhor
      const msg = `HTTP ${res.status}`;
      throw new Error(msg);
    }

    const data = (await res.json()) as { role: 'assistant'; content: string };
    return {
      id: uuidv4(),
      role: 'assistant',
      content: data.content,
      createdAt: Date.now(),
    };
  } catch (err: any) {
    // Fallback mock para dev do front
    const reason = String(err?.message || '');
    const hint =
      reason.includes('HTTP 403')
        ? ' (dica: verifique se o header x-tenant: sgmi está sendo enviado)'
        : '';
    await new Promise(r => setTimeout(r, 700));
    return {
      id: uuidv4(),
      role: 'assistant',
      content: `⚠️ (mock) Não foi possível contatar o backend${hint}. Resposta simulada.`,
      createdAt: Date.now(),
    };
  }
}
