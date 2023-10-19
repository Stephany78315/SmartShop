import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Introduction from './src/views/introduction.jsx';

export default function App() {
  /*
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:3900/api/articles");
    const data = await response.json();
    setTodos(data);
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(todos, null, 2)}</Text>
      <Introduction />
    </View>
  );
    */

    return (
      <Introduction/>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
