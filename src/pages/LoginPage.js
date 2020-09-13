import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import LoginForm from './LoginForm';
import LinearGradient from 'react-native-linear-gradient';

export default class LoginPage extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView>
        <KeyboardAvoidingView>
          <LinearGradient
            colors={['#BA5370', '#F4E2D8']}
            style={styles.linearGradient}>
            <Text style={styles.textHeader}>Welcome To</Text>
            <Text style={styles.textContainer}>Huawei Shopping 🛍️</Text>
            <View style={styles.loginArea}>
              <ScrollView>
                <View>
                  <Text style={styles.loginHeaderTitle}>Login Page</Text>
                  <Text style={styles.loginDescTitle}>
                    You can login this page
                  </Text>
                </View>
                <LoginForm />
                <View style={styles.signUpArea}>
                  <Text style={styles.signUpDescription}>
                    Don't have a account?
                  </Text>
                  <TouchableOpacity onPress={() => navigate('Map')}>
                    <Text style={styles.signUpText}>
                      See our stores near you
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  textHeader: {
    paddingTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 36,
    textAlign: 'center',
    color: '#fff',
  },
  loginArea: {
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#fff',
    width: '80%',
    padding: 32,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  loginHeaderTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginDescTitle: {
    fontSize: 12,
    color: 'grey',
    paddingVertical: 16,
    textAlign: 'center',
  },
  signUpArea: {
    alignItems: 'center',
  },
  signUpDescription: {
    paddingVertical: 16,
    color: '#999',
  },
  signUpText: {
    paddingVertical: 8,
    color: '#666',
  },
});
