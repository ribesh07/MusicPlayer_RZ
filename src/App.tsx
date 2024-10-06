import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.AppText}>App</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AppText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
