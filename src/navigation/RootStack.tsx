import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import {ChatScreen} from '../screens/Chats/ChatScreen';
import {ChatsScreen} from '../screens/Chats/ChatsScreen';
import {InboxScreen} from '../screens/Inbox/InboxScreen';
import {SettingsScreen} from '../screens/Settings/SettingsScreen';
import {shouldPersistViews} from '../lib/navigationConfig';
import TermsOfServiceScreen from '../screens/Settings/TermsOfServiceScreen';
import {theme} from '../utils/theme';
import {IconSvg} from '../components/IconSVG/IconSVG';

export type RootStackParamList = {
  Chats: undefined;
  Chat: {chatId: number};
  GeneralSettings: undefined;
  TermsOfService: undefined;
  Inbox: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const renderBackButton = (navigation: NavigationProp<RootStackParamList>) =>
  navigation.canGoBack() && (
    <Pressable onPress={() => navigation.goBack()}>
      <IconSvg
        name="arrow-back"
        tintColor="#fff"
        secondaryTintColor="transparent"
        size="large"
        style={{borderWidth: 0}}
      />
    </Pressable>
  );
export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Chats"
    screenOptions={({navigation, route}) => ({
      headerTitleAlign: 'center',
      headerLeft: () => route.name !== 'Chats' && renderBackButton(navigation),
    })}>
    <Stack.Screen name="Chats" component={ChatsScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} options={{title: ''}} />
  </Stack.Navigator>
);

export const SettingsStack = () => (
  <Stack.Navigator
    initialRouteName="GeneralSettings"
    screenOptions={({navigation, route}) => ({
      headerTitleAlign: 'center',
      headerLeft: () =>
        route.name !== 'GeneralSettings' && renderBackButton(navigation),
    })}>
    <Stack.Screen
      name="GeneralSettings"
      component={SettingsScreen}
      options={{title: 'Settings'}}
    />
    <Stack.Screen
      name="TermsOfService"
      component={TermsOfServiceScreen}
      options={{title: 'Terms of service'}}
    />
  </Stack.Navigator>
);

export const RootStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    detachInactiveScreens={!shouldPersistViews}
    screenOptions={{
      tabBarActiveTintColor: theme.colors.primaryContainer,
      tabBarInactiveTintColor: theme.colors.onPrimary,
      tabBarActiveBackgroundColor: theme.colors.onPrimaryContainer,
      tabBarLabelStyle: {
        fontSize: theme.fontSize.regular,
      },
      tabBarItemStyle: {
        justifyContent: 'center',
        paddingVertical: theme.getGap(0.5),
      },
      headerTitleAlign: 'center',
    }}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        headerShown: false,
        tabBarIcon: () => <Text style={styles.icon}>🏠</Text>,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsStack}
      options={{
        headerShown: false,
        tabBarIcon: () => <Text style={styles.icon}>⚙️</Text>,
      }}
    />
    <Tab.Screen
      name="Inbox"
      component={InboxScreen}
      options={{tabBarIcon: () => <Text style={styles.icon}>📩</Text>}}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  icon: {fontSize: theme.fontSize.large},
});
