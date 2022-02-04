import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { add, multiply } from 'react-native-reusable-custom-components';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const [response, setResponse] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
    add(3, 7).then(setResponse);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Multiply Result: {result}</Text>
      <Text>Addition Result: {response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
