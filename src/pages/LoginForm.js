import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Input from '../components/Input';
import MyButton from '../components/MyButton';
import RNHMSAccount from '@hmscore/react-native-hms-account';
import {log} from 'react-native-reanimated';

const Logout = () => {
  RNHMSAccount.HmsAccount.signOut()
    .then((response) => {
      console.log(JSON.stringify(response) + 'logout success');
    })
    .catch((err) => {
      console.log(err + 'logout error');
    });
};

const onSignIn = () => {
  let signInData = {
    huaweiIdAuthParams:
      RNHMSAccount.HmsAccount
        .CONSTANT_HUAWEI_ID_AUTH_PARAMS_DEFAULT_AUTH_REQUEST_PARAM,
    scopes: [
      RNHMSAccount.HmsAccount.SCOPE_ID_TOKEN,
      RNHMSAccount.HmsAccount.SCOPE_EMAIL,
      RNHMSAccount.HmsAccount.SCOPE_ID,
      RNHMSAccount.HmsAccount.SCOPE_ACCESS_TOKEN,
      RNHMSAccount.HmsAccount.SCOPE_AUTHORIZATION_CODE,
      RNHMSAccount.HmsAccount.SCOPE_PROFILE,
    ],
  };
  RNHMSAccount.HmsAccount.signIn(signInData)
    .then((response) => {
      console.log(JSON.stringify(response) + 'login success');
      log(JSON.stringify(response));
      return true;
    })
    .catch((err) => {
      log(err);
      return false;
    });
};

const onGetAuthResult = () => {
  RNHMSAccount.HuaweiIdAuthManager.getAuthResult()
    .then((response) => {
      console.log(JSON.stringify(response) + 'onGetAuthResult');
    })
    .catch((err) => {
      console.log(err);
    });
};

const onStartReadSMSManager = () => {
  RNHMSAccount.SMSManager.startReadSMSManager()
    .then((response) => {
      console.log(JSON.stringify(response));
    })
    .catch((err) => {
      console.log(err);
    });
};

export default class LoginForm extends Component {
  render() {
    return (
      <View>
        {onGetAuthResult()}
        <Input
          returnKeyType={'next'}
          placeholder="Username"
          autoCapitilaze="none"
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <Input
          returnKeyType={'go'}
          secureTextEntry={true}
          placeholder="Password"
          inputRef={(input) => (this.passwordInput = input)}
        />
        <MyButton
          text={'Sign In'}
          backgroundColor={'#BA5370'}
          color={'#F4E2D8'}
        />
        <Button title="Sign out" onPress={() => Logout()} />
        <RNHMSAccount.HuaweiIdAuthButton
          style={styles.viewcontainer}
          colorPolicy={
            RNHMSAccount.HmsAccount
              .CONSTANT_HUAWEI_ID_AUTH_BUTTON_COLOR_POLICY_RED
          }
          enabled={true}
          theme={
            RNHMSAccount.HmsAccount
              .CONSTANT_HUAWEI_ID_AUTH_BUTTON_THEME_FULL_TITLE
          }
          cornerRadius={
            RNHMSAccount.HmsAccount
              .CONSTANT_HUAWEI_ID_AUTH_BUTTON_CORNER_RADIUS_SMALL
          }
          onPress={() => onSignIn()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewcontainer: {
    marginTop: 20,
    height: 38,
  },
  textSignIn: {
    textAlign: 'left',
    fontSize: 20,
    marginVertical: 12,
  },
});
