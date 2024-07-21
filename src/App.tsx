import React, {useEffect, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {
  ANDROID_DATABASE_PATH,
  IOS_LIBRARY_PATH,
} from '@op-engineering/op-sqlite';
import {Loader} from './components/Loader/Loader';
import {RootStack} from './navigation/RootStack';
import {FeatureProvider} from './lib/featureProvider/FeatureProvider';
import {queryClient} from './lib/queryClient';
import {navTheme} from './utils/theme';
import {db, DBSize} from './lib/db';

const DB_NAME = 'workshop.db';
const DB_SIZE: DBSize = DBSize.medium;
const SIZES = ['xsmall', 'small', 'medium', 'large'] as const;

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchServerData = async () => {
      await ReactNativeBlobUtil.config({
        path:
          Platform.OS === 'ios'
            ? `${IOS_LIBRARY_PATH}/${DB_NAME}`
            : `${ANDROID_DATABASE_PATH}${DB_NAME}`,
        overwrite: true,
      }).fetch('GET', `http://localhost:8090/db?size=${SIZES[DB_SIZE]}`);
      db.init(DB_NAME);

      console.log(`DB [${SIZES[DB_SIZE]}] loaded`);
      setReady(true);
    };

    fetchServerData();
  }, []);

  if (!ready) {
    return <Loader />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <QueryClientProvider client={queryClient}>
        <FeatureProvider>
          <React.Suspense fallback={<Loader />}>
            <RootStack />
          </React.Suspense>
        </FeatureProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
