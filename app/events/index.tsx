import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

export default function EventsScreen() {
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // computed on every render, not stored in state
  const visible = events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  function toggleSaved(id: number) {
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search events"
        style={styles.search}
      />
      <Text style={styles.hint}>Long-press an event to save it. Saved: {savedIds.length}</Text>
      <FlatList
        data={visible}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#ffffff' },
  search: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
  },
  hint: { fontSize: 14, color: '#4b5563' },
  list: { gap: 12, paddingBottom: 24 },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 24 },
});