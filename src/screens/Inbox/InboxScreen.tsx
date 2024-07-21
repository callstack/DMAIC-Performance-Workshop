import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Suspense, useEffect, useState} from 'react';
import {View} from 'react-native';
import {inboxKeys} from '../../lib/keys';
import {queryClient} from '../../lib/queryClient';
import {InboxMessage} from '../../lib/types';
import {InboxMessagesList} from './InboxMessagesList';

import React from 'react';
import {Loader} from '../../components/Loader/Loader';
import {getInboxMessages} from '../../queries/inbox';

export const InboxScreen = () => {
  const [inboxMessages, setInboxMessages] = useState<
    InboxMessage[] | undefined
  >(undefined);
  const [autoRefetch, setAutoRefetch] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const inboxMessagesData = useQuery({
    queryKey: inboxKeys.all,
    queryFn: getInboxMessages,
  });

  const refetch = (isAuto = false) => {
    if (!isAuto) {
      setIsRefreshing(true);
    }
    queryClient.invalidateQueries({queryKey: inboxKeys.all});
    inboxMessagesData.refetch();
    if (!isAuto) {
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (autoRefetch) {
        refetch(true);
        setAutoRefetch(false);
      }
      return () => setAutoRefetch(true);
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (inboxMessagesData.isSuccess) {
      setInboxMessages(inboxMessagesData.data);
      setIsRefreshing(false);
    }
  }, [inboxMessagesData.isSuccess, inboxMessagesData.data]);

  useEffect(() => {
    setInterval(() => {
      refetch(true);
    }, 10000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={{flex: 1}}>
      <Suspense fallback={<Loader />}>
        <InboxMessagesList
          inboxMessages={inboxMessages}
          refetch={refetch}
          isLoading={isRefreshing}
        />
      </Suspense>
    </View>
  );
};
