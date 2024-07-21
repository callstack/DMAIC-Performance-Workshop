import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useMutation} from '@tanstack/react-query';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {useFeatureToggle} from '../../lib/featureProvider/useFeature';
import {featuresKeys} from '../../lib/keys';
import {queryClient} from '../../lib/queryClient';
import {updateFeature} from '../../mutations/features';
import {supportedLngs} from '../../i18n/init';
import {theme} from '../../utils/theme';
import {Toggle} from '../../components/Toggle/Toggle';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const {i18n} = useTranslation();
  const showChatListAvatar = useFeatureToggle('chat-list-avatar');
  const showChatListActionIcons = useFeatureToggle('chat-list-action-icons');
  const showInboxListAvatar = useFeatureToggle('inbox-list-avatar');
  const showInboxListActionIcons = useFeatureToggle('inbox-list-action-icons');
  const showSettingsNewFeature = useFeatureToggle('settings-new-feature');
  const showNewFeature = useFeatureToggle('new-feature');

  const [chatAvatarToggleValue, setChatAvatarToggleValue] = useState<
    undefined | boolean
  >();
  const [chatActionIconsToggleValue, setChatActionIconsToggleValue] = useState<
    undefined | boolean
  >();
  const [inboxAvatarToggleValue, setInboxAvatarToggleValue] = useState<
    undefined | boolean
  >();
  const [inboxActionIconsToggleValue, setInboxActionIconsToggleValue] =
    useState<undefined | boolean>();
  const [settingsNewFeatureToggleValue, setSettingsNewFeatureToggleValue] =
    useState<undefined | boolean>();
  const [newFeatureToggleValue, setNewFeatureToggleValue] = useState<
    undefined | boolean
  >();

  useEffect(() => {
    if (chatAvatarToggleValue !== showChatListAvatar) {
      setChatAvatarToggleValue(showChatListAvatar);
    }
  }, [showChatListAvatar, setChatAvatarToggleValue, chatAvatarToggleValue]);

  useEffect(() => {
    if (chatActionIconsToggleValue !== showChatListActionIcons) {
      setChatActionIconsToggleValue(showChatListActionIcons);
    }
  }, [
    showChatListActionIcons,
    setChatActionIconsToggleValue,
    chatActionIconsToggleValue,
  ]);

  useEffect(() => {
    if (inboxActionIconsToggleValue !== showInboxListActionIcons) {
      setInboxActionIconsToggleValue(showInboxListActionIcons);
    }
  }, [
    showInboxListActionIcons,
    setInboxActionIconsToggleValue,
    inboxActionIconsToggleValue,
  ]);

  useEffect(() => {
    if (inboxAvatarToggleValue !== showInboxListAvatar) {
      setInboxAvatarToggleValue(showInboxListAvatar);
    }
  }, [showInboxListAvatar, setInboxAvatarToggleValue, inboxAvatarToggleValue]);

  useEffect(() => {
    if (settingsNewFeatureToggleValue !== showSettingsNewFeature) {
      setSettingsNewFeatureToggleValue(showSettingsNewFeature);
    }
  }, [
    showSettingsNewFeature,
    setSettingsNewFeatureToggleValue,
    settingsNewFeatureToggleValue,
  ]);

  useEffect(() => {
    if (newFeatureToggleValue !== showNewFeature) {
      setNewFeatureToggleValue(showNewFeature);
    }
  }, [showNewFeature, setNewFeatureToggleValue, newFeatureToggleValue]);

  const switchToggle = useMutation({
    mutationKey: featuresKeys.update(),
    mutationFn: updateFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: featuresKeys.all});
    },
  });

  return (
    <View style={styles.wrapper}>
      <Toggle
        label="Show Avatar in Chats"
        onValueChange={() =>
          switchToggle.mutate({
            featureName: 'chat-list-avatar',
            isEnabled: Number(!chatAvatarToggleValue),
          })
        }
        value={chatAvatarToggleValue ?? false}
      />
      <Toggle
        label="Show Action Icons in Chats"
        onValueChange={() =>
          switchToggle.mutate({
            featureName: 'chat-list-action-icons',
            isEnabled: Number(!chatActionIconsToggleValue),
          })
        }
        value={chatActionIconsToggleValue ?? false}
      />
      <Toggle
        label="Show Avatar in Inbox"
        onValueChange={() =>
          switchToggle.mutate({
            featureName: 'inbox-list-avatar',
            isEnabled: Number(!inboxAvatarToggleValue),
          })
        }
        value={inboxAvatarToggleValue ?? false}
      />
      <Toggle
        label="Show Action Icons in Inbox"
        onValueChange={() =>
          switchToggle.mutate({
            featureName: 'inbox-list-action-icons',
            isEnabled: Number(!inboxActionIconsToggleValue),
          })
        }
        value={inboxActionIconsToggleValue ?? false}
      />
      <Toggle
        label="Show New Features Toggles"
        onValueChange={() =>
          switchToggle.mutate({
            featureName: 'settings-new-feature',
            isEnabled: Number(!settingsNewFeatureToggleValue),
          })
        }
        value={settingsNewFeatureToggleValue ?? false}
      />
      {showSettingsNewFeature && (
        <Toggle
          label="Show New Features"
          style={{marginLeft: theme.getGap(2)}}
          onValueChange={() =>
            switchToggle.mutate({
              featureName: 'new-feature',
              isEnabled: Number(!newFeatureToggleValue),
            })
          }
          value={newFeatureToggleValue ?? false}
        />
      )}
      <View style={styles.separator} />
      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>Select language</Text>
        <Picker
          style={styles.picker}
          numberOfLines={3}
          selectedValue={i18n.language}
          onValueChange={itemValue => i18n.changeLanguage(itemValue)}>
          {supportedLngs.map(language => (
            <Picker.Item key={language} label={language} value={language} />
          ))}
        </Picker>
      </View>
      <View style={styles.separator} />

      <Pressable
        style={styles.button}
        // @ts-ignore
        onPress={() => navigation.navigate('TermsOfService')}>
        <Text style={styles.buttonText}>Terms of service</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: theme.getGap(2),
    paddingTop: theme.getGap(3),
    paddingBottom: theme.getGap(1),
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
    marginVertical: theme.getGap(2),
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    fontSize: theme.fontSize.large,
    height: 48,
    justifyContent: 'center',
    overflow: 'hidden',
    maxWidth: 200,
  },
  label: {
    fontSize: theme.fontSize.regular,
    color: theme.colors.text,
  },
  button: {
    marginTop: 'auto',
    marginBottom: theme.getGap(2),
    alignSelf: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.getGap(4),
    paddingVertical: theme.getGap(1.5),
    borderRadius: 8,
  },
  buttonText: {color: theme.colors.onPrimary},
});
