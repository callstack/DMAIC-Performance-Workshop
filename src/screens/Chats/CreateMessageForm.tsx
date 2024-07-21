import React, {useCallback} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {createMessage} from '../../mutations/messages';
import {chatsKeys, messagesKeys} from '../../lib/keys';
import {queryClient} from '../../lib/queryClient';
import {theme} from '../../utils/theme';

interface Props {
  chatId: number;
  message: string;
  setMessage: (message: string) => void;
}

export const CreateMessageForm = ({chatId, message, setMessage}: Props) => {
  const create = useMutation({
    mutationKey: messagesKeys.create(chatId),
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: messagesKeys.chat(chatId)});
      queryClient.invalidateQueries({queryKey: chatsKeys.recent});
      setMessage('');
    },
  });
  const isSendingDisabled = message.length === 0;

  const onChange = useCallback(
    (text: string) => {
      setMessage(text);
    },
    [setMessage],
  );

  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      <TextInput
        value={message}
        onChangeText={onChange}
        placeholder="Type a message..."
        style={[
          styles.input,
          {
            backgroundColor:
              message === '/vip' ? theme.colors.surface : 'white',
          },
        ]}
        multiline
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          isSendingDisabled && styles.submitButtonDisabled,
        ]}
        disabled={isSendingDisabled}
        onPress={() => create.mutate({chatId, content: message})}>
        <Text style={styles.submitIcon}>🚀</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingVertical: theme.getGap(2),
    alignItems: 'center',
  },
  input: {
    paddingVertical: theme.getGap(1),
    paddingHorizontal: theme.getGap(2),
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    flex: 1,
  },
  submitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.getGap(2),
    marginLeft: theme.getGap(1),
  },
  submitButtonDisabled: {opacity: 0.6},
  submitIcon: {
    fontSize: 20,
    color: theme.colors.onPrimary,
  },
});
