import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export default function EventRow({ event, saved = false, onPress, onToggleSaved }: EventRowProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>
          {saved && <Animated.Text entering={ZoomIn} style={styles.saved}>★ Saved</Animated.Text>}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    gap: 4,
  },
  cardPressed: { backgroundColor: '#e0e7ff', borderColor: '#1d4ed8' },
  title: { fontSize: 18, fontWeight: '600' },
  meta: { fontSize: 14, color: '#4b5563' },
  saved: { fontSize: 14, color: '#1d4ed8', fontWeight: '600' },
  action: { minHeight: 44, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, backgroundColor: '#1d4ed8', borderRadius: 8 },
  actionText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});