import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from '../../components/Avatar/index';
import {useFeatureToggle} from '../../lib/featureProvider/useFeature';

import {IconSvg} from '../../components/IconSVG/IconSVG';
import {chatsKeys} from '../../lib/keys';
import {getRecentChats} from '../../queries/chats';
import {theme} from '../../utils/theme';
import {Loader} from '../../components/Loader/Loader';
import Chat from '../../models/Chat';

export const ChatsList = () => {
  const navigation = useNavigation();
  const showChatListActionIcons = useFeatureToggle('chat-list-action-icons');

  const {
    data: recentChats,
    error: recentChatsError,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: chatsKeys.recent,
    queryFn: getRecentChats,
  });

  const [sortedChats, setSortedChats] = useState<Chat[]>([]);

  const sortChats = (chats: Chat[]) => {
    const vipChats = chats
      .sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      })
      .filter(chat => chat.is_vip);

    const otherChats = chats
      .sort((a, b) => {
        return a.last_message_time > b.last_message_time ? -1 : 1;
      })
      .filter(chat => !chat.is_vip);

    return [...vipChats, ...otherChats];
  };

  useEffect(() => {
    if (recentChats) {
      setSortedChats(sortChats(recentChats ?? []));
    }
  }, [recentChats]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>{`Failed to load chats\n\n${recentChatsError}`}</Text>;
  }

  return (
    <FlatList
      refreshing={isRefetching}
      onRefresh={refetch}
      data={sortedChats}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.item,
            {
              backgroundColor: item.is_vip
                ? theme.colors.surface
                : 'transparent',
            },
          ]}
          // @ts-ignore
          onPress={() => navigation.navigate('Chat', {chatId: item.id})}>
          <View>
            <View style={styles.row}>
              <Avatar
                size="small"
                initials={parseEmail(item.last_message_author.email)}
                style={styles.avatar}
                featureToggleName={'chat-list-avatar'}
              />
              <View style={styles.infoWrapper}>
                <Text style={styles.chatName}>
                  {item.title} {item.is_vip ? '(VIP)' : ''}
                </Text>
                <Text style={styles.email}>
                  {item.last_message_author.email}
                </Text>
                <Text style={styles.text}>{item.last_message}</Text>
              </View>

              {showChatListActionIcons && (
                <View style={styles.options}>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Quote option pressed')}>
                    <IconSvg name="quote-right" width={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Remove option pressed')}>
                    <IconSvg name="recycle-bin" width={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Reply option pressed')}>
                    <IconSvg name="reply-arrow" width={20} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const parseEmail = (email: string | undefined) => {
  const initials = (email ?? 'UN')
    .replace(/^(\S{2})\S*$|(?:^|\s*)(\S)\S*\s*/g, '$1$2')
    .toUpperCase();
  return initials;
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    padding: theme.getGap(2),
    borderBottomColor: theme.colors.surface,
    borderBottomWidth: 1,
  },
  chatName: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  email: {
    fontSize: theme.fontSize.smaller,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginVertical: theme.getGap(0.5),
  },
  text: {
    fontSize: theme.fontSize.regular,
    color: theme.colors.text,
    flexWrap: 'wrap',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoWrapper: {
    flex: 1,
  },
  avatar: {
    marginRight: theme.gap,
    marginTop: theme.getGap(2),
  },
  options: {
    marginLeft: 'auto',
    flexDirection: 'row-reverse',
    marginTop: 10,
    gap: theme.getGap(2),
  },
});
