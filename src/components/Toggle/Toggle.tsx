import React from 'react';
import {StyleSheet, Switch, SwitchProps, Text, View} from 'react-native';
import {theme} from '../../utils/theme.ts';

export type ToggleProps = SwitchProps & {label: string};

export const Toggle = ({label, ...props}: ToggleProps) => {
  return (
    <View style={styles.wrapper}>
      <Switch
        trackColor={{
          false: theme.colors.surface,
          true: theme.colors.surfaceStrong,
        }}
        thumbColor={theme.colors.primary}
        ios_backgroundColor={theme.colors.surface}
        {...props}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.getGap(2),
  },
  label: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    marginLeft: theme.gap,
  },
});
