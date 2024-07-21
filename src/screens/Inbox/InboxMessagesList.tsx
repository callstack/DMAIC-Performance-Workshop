import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFeatureToggle} from '../../lib/featureProvider/useFeature';
import {InboxMessage} from '../../lib/types';

import {Avatar} from '../../components/Avatar';
import {IconSvg} from '../../components/IconSVG/IconSVG';
import {theme} from '../../utils/theme';

interface Props {
  inboxMessages: InboxMessage[] | undefined;
  isLoading: boolean;
  refetch: () => void;
}

export const InboxMessagesList = ({
  inboxMessages,
  refetch,
  isLoading,
}: Props) => {
  const showInboxListActionIcons = useFeatureToggle('inbox-list-action-icons');

  return (
    <FlatList
      data={inboxMessages}
      refreshing={isLoading}
      onRefresh={refetch}
      ListEmptyComponent={
        <View>
          <Text>List is empty</Text>
        </View>
      }
      renderItem={({item}) => (
        <TouchableOpacity key={item.title} style={styles.item}>
          <View style={styles.row}>
            <Avatar
              size="small"
              initials={parseEmail(item.sender)}
              style={styles.avatar}
              featureToggleName={'inbox-list-avatar'}
            />
            <View style={styles.infoWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.email}>{item.sender}</Text>
              <Text style={styles.text}>{item.content}</Text>
            </View>

            {showInboxListActionIcons && (
              <View style={styles.options}>
                <TouchableOpacity
                  onPress={() => Alert.alert('Mark Read option pressed')}>
                  <IconSvg name="mark-read" width={20} />
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
  title: {
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
