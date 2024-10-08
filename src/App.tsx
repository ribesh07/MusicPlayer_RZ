/* eslint-disable react/react-in-jsx-scope */
import { StatusBar, StyleSheet, View } from 'react-native';
import MusicPlay from './screens/MusicPlay';


export default function App() {
  return (
    <>
      <View style={styles.container}>
      <StatusBar barStyle={'default'}/>
        <MusicPlay />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
