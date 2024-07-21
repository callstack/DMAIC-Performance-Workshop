import React, {Suspense} from 'react';
import {ChatsList} from './ChatsList';
import {Loader} from '../../components/Loader/Loader';

export const ChatsScreen = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ChatsList />
    </Suspense>
  );
};
