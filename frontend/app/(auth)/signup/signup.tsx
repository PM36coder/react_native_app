import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const SignUp = () => {
  type RegisterData = {
    email: string;
    password: string;
    confirmPassword: string;
  };

  const router = useRouter();
  const [register, setRegister] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = async () => {
    try {
      if (!register.email || !register.password || !register.confirmPassword) {
        Alert.alert('Validation Error', 'All fields are required');
        return;
      }

      if (register.password !== register.confirmPassword) {
        Alert.alert(
          'Validation Error',
          'Password and Confirm Password do not match'
        );
        return;
      }

      const res = await fetch('http://192.168.31.254:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: register.email,
          password: register.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Sign Up Failed', data.message || 'Something went wrong');
        return;
      }

      Alert.alert('Success', 'Account created successfully!');
      router.push('/login/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
        <View style={{ backgroundColor: '#F7F7F7' }}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Sign Up
          </Text>

          {/* Email */}
          <TextInput
            style={styles.email}
            keyboardType="email-address"
            keyboardAppearance="default"
            placeholder="Enter Your Email"
            placeholderTextColor={'red'}
            autoCapitalize="none"
            autoCorrect={false}
            value={register.email}
            onChangeText={(text) => setRegister({ ...register, email: text })}
          />

          {/* Password */}
          <TextInput
            style={styles.email}
            keyboardAppearance="default"
            placeholder="Enter Your Password"
            secureTextEntry={true}
            textContentType="oneTimeCode" // 🚫 disables iOS autofill
            autoComplete="off"
            autoCorrect={false}
            placeholderTextColor={'gray'}
            autoCapitalize="none"
            value={register.password}
            onChangeText={(text) =>
              setRegister({ ...register, password: text })
            }
          />

          {/* Confirm Password */}
          <TextInput
            style={styles.email}
            keyboardAppearance="default"
            placeholder="Confirm Your Password"
            secureTextEntry={true}
            textContentType="oneTimeCode" // 🚫 disables iOS autofill
            autoComplete="off"
            autoCorrect={false}
            placeholderTextColor={'gray'}
            autoCapitalize="none"
            value={register.confirmPassword}
            onChangeText={(text) =>
              setRegister({ ...register, confirmPassword: text })
            }
          />

          {/* Sign Up Button */}
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.6 : 1 },
              styles.login,
            ]}
            onPress={handleSignUp}
          >
            <Text style={{ color: 'white', fontSize: 25, textAlign: 'center' }}>
              Sign Up
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20 }}>Already have an Account?</Text>
            <Pressable onPress={() => router.push('/login/login')}>
              <Text style={{ color: '#F7128F', fontSize: 20 }}> Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  email: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'justify',
    marginBottom: 10,
    marginTop: 10,
  },
  login: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 15,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#F7128F',
    color: 'white',
    fontSize: 25,
  },
});
