import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type Props = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: Props) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const trimmed = text.trim();
  const disabled = trimmed.length === 0;

  const onSend = () => {
    if (disabled) {
      return;
    }
    sendMessage(eventId, trimmed);
    setText('');
  };

  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.panel}>
      <Text style={styles.heading}>Live chat</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a message"
        value={text}
        onChangeText={setText}
        maxLength={200}
        onSubmitEditing={onSend}
        returnKeyType="send"
      />
      <Pressable
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onSend}
        disabled={disabled}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text style={styles.status}>Connecting</Text>}
      {status === 'error' && <Text style={styles.status}>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && (
        <Text style={styles.status}>No messages yet</Text>
      )}

      {newestFirst.map((m) => (
        <Text key={m.id} style={styles.message}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { marginTop: 16, gap: 8 },
  heading: { fontSize: 20, fontWeight: '700' },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  buttonDisabled: { backgroundColor: '#94a3b8' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  status: { fontSize: 16, color: '#475569' },
  message: { fontSize: 16 },
});
