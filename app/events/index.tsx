import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const [query, setQuery] = useState('');
  const { savedIds, toggleSaved } = useSavedIds();

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.text}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Could not load events</Text>
        <Text style={styles.text}>{error.message}</Text>
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const visible = data.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );

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
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onToggleSaved={() => toggleSaved(item.id)}
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 16, backgroundColor: '#ffffff' },
  search: { minHeight: 44, paddingHorizontal: 12, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, fontSize: 16 },
  hint: { fontSize: 14, color: '#4b5563' },
  list: { gap: 12, paddingBottom: 24 },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 24 },
  title: { fontSize: 20, fontWeight: '700' },
  text: { fontSize: 16, textAlign: 'center' },
  button: { minHeight: 44, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: '#2563eb', borderRadius: 8 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});