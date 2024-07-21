import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {theme} from '../../utils/theme';

const TermsOfServiceScreen = () => {
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{t('termsOfService')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.getGap(2),
  },
  text: {
    fontSize: theme.fontSize.regular,
    lineHeight: 1.5 * theme.fontSize.regular,
    color: theme.colors.text,
  },
});

export default TermsOfServiceScreen;
