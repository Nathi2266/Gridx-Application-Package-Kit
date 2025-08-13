// components/ForumPost.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function ForumPost({ post, onLike }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{post.user}</Text>
      <Text style={{ marginTop: 6 }}>{post.content}</Text>
      <View style={[styles.row, { marginTop: 10 }]}>
        <Text style={styles.small}>{post.likes} likes</Text>
        <TouchableOpacity onPress={onLike} style={styles.iconButton}>
          <Text style={styles.iconButtonText}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
