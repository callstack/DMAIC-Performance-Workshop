import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {format, formatRelative, isToday} from 'date-fns';
import {useQuery} from '@tanstack/react-query';
import {getChatMessages} from '../../queries/messages';
import {messagesKeys} from '../../lib/keys';
import {theme} from '../../utils/theme';

interface Props {
  chatId: number;
}

export const MessagesList = ({chatId}: Props) => {
  const {
    data: messages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: messagesKeys.chat(chatId),
    queryFn: () => getChatMessages(chatId),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Failed to load messages</Text>;
  }

  return (
    <FlatList
      inverted
      data={messages}
      renderItem={({item}) => (
        <TouchableOpacity key={item.id} style={styles.item}>
          <Text style={styles.author}>
            {item.author_id === 1 ? 'You' : 'Someone'},{' '}
            <Text style={styles.time}>
              {isToday(new Date(item.created_at))
                ? format(new Date(item.created_at), 'h:mm a')
                : formatRelative(new Date(item.created_at), new Date())}
            </Text>
          </Text>
          <Text style={styles.content}>{item.content}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  author: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.getGap(0.25),
  },
  time: {
    fontSize: theme.fontSize.smaller,
    color: theme.colors.text,
    fontWeight: 'normal',
  },
  content: {
    fontSize: theme.fontSize.regular,
    color: theme.colors.text,
  },
  item: {
    paddingVertical: theme.getGap(1),
    paddingHorizontal: theme.getGap(2),
  },
});
