import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CreateMessageForm} from './CreateMessageForm';
import {Loader} from '../../components/Loader/Loader';
import {MessagesList} from './MessagesList';
import type {RootStackParamList} from '../../navigation/RootStack';
import {chatsKeys} from '../../lib/keys';
import {getChat} from '../../queries/chats';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatScreen = ({route: {params}}: Props) => {
  const [message, setMessage] = useState('');
  const {
    data: chat,
    isLoading,
    isError,
  } = useQuery({
    queryKey: chatsKeys.one(params.chatId),
    queryFn: () => getChat(params.chatId),
  });
  const {setOptions} = useNavigation();

  useEffect(() => {
    if (chat?.title) {
      setOptions({title: chat.title});
    }
  }, [chat?.title, setOptions]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>Failed to load messages</Text>;
  }

  return (
    <View style={styles.wrapper}>
      {chat && (
        <>
          <MessagesList chatId={chat.id} />
          <CreateMessageForm
            chatId={chat.id}
            message={message}
            setMessage={setMessage}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({wrapper: {flex: 1}});
