// Reusable header component with theme support

import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

const AppHeader = ({ navigation, route, options, back }) => {
  const theme = useTheme();
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header elevated style={{ backgroundColor: theme.colors.primary }}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} color="#fff" /> : null}
      <Appbar.Content title={title} titleStyle={{ color: '#fff', fontWeight: 'bold' }} />
      {options.headerRight && options.headerRight({ tintColor: '#fff' })}
    </Appbar.Header>
  );
};

export default AppHeader;
