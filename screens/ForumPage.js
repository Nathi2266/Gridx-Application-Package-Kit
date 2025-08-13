// screens/ForumPage.js
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import ForumPost from '../components/ForumPost';

const initial = [
  { id: 'p1', user: 'Mpho', content: 'Does anyone recommend a reliable inverter for warm climates?', likes: 3 },
  { id: 'p2', user: 'Aisha', content: 'How do I schedule top-up auto-pay?', likes: 2 },
];

export default function ForumPage() {
  const [posts, setPosts] = useState(initial);
  const [text, setText] = useState('');

  const addPost = () => {
    if (!text.trim()) return;
    const newPost = { id: String(Date.now()), user: 'You', content: text.trim(), likes: 0 };
    setPosts([newPost, ...posts]);
    setText('');
  };

  const like = (id) => setPosts((s) => s.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));

  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Community Forum</Text>

      <View style={styles.row}>
        <TextInput value={text} onChangeText={setText} placeholder="Share something..." style={styles.inputSmall} />
        <TouchableOpacity style={styles.primaryButtonSmall} onPress={addPost}>
          <Text style={styles.primaryButtonTextSmall}>Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ForumPost post={item} onLike={() => like(item.id)} />}
      />
    </View>
  );
}
