import { useEffect, useRef, useState } from 'react';
import { ChatMessage, DEVICE_ID, subscribeToChat } from '../lib/chat';
import { notifyNewMessage } from '../lib/notifications';

export type ChatStatus = 'connecting' | 'live' | 'error';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('connecting');
  const seenIds = useRef<Set<string> | null>(null);

  useEffect(() => {
    seenIds.current = null;
    setMessages([]);
    setStatus('connecting');

    const onMessages = (list: ChatMessage[]) => {
      if (seenIds.current === null) {
        // the first call is history: remember it, notify nothing
        seenIds.current = new Set(list.map((m) => m.id));
      } else {
        for (const message of list) {
          if (!seenIds.current.has(message.id)) {
            seenIds.current.add(message.id);
            if (message.deviceId !== DEVICE_ID) {
              notifyNewMessage(eventTitle, message);
            }
          }
        }
      }
      setMessages(list);
      setStatus('live');
    };

    const onError = () => {
      setStatus('error');
    };

    const unsubscribe = subscribeToChat(eventId, onMessages, onError);
    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}
