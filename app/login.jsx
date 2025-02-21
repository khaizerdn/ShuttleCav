import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { config } from './config';
import globalStyles from './globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch(`${config.API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('userToken', data.token); // Save the token
      router.push('/home'); // Redirect to home or profile
    } else {
      alert('Login failed');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Image source={require('../assets/images/logo.png')} style={{ width: 220, height: 220, marginBottom: 20 }} />
      <Text style={globalStyles.mainTitle}>SHUTTLECAV</Text>
      <TextInput style={globalStyles.listItem} placeholder="Username" placeholderTextColor="#A9A9A9" value={username} onChangeText={setUsername} />
      <TextInput style={globalStyles.listItem} placeholder="Password" placeholderTextColor="#A9A9A9" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={globalStyles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={globalStyles.linkText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
