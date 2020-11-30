import React, {Component} from 'react';
import {StyleSheet, View, TextInput, onChangeText} from 'react-native';
import RNHMSAccount from '@hmscore/react-native-hms-account';
import Button from './Button';

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
      console.log(JSON.stringify(response));
      return true;
    })
    .catch((err) => {
      console.log(err);
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
        <TextInput
          style={{
            height: 40,
            borderColor: 'grey',
            borderWidth: 0.4,
            borderRadius: 25,
            margin: 8,
          }}
          returnKeyType={'next'}
          placeholder="Username"
          color="grey"
          autoCapitilaze="none"
          onChangeText={(text) => onChangeText('bla')}
          onSubmitEditing={() => this.passwordInput.focus()}
          value={'bla'}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'grey',
            borderWidth: 0.4,
            borderRadius: 25,
            margin: 8,
          }}
          returnKeyType={'go'}
          color="grey"
          secureTextEntry={true}
          onSubmitEditing={() => this.passwordInput.focus()}
          placeholder="Password"
          inputRef={(input) => (this.passwordInput = input)}
          value={'bla'}
        />
        <Button
          style={{alignItems: 'center', alignContent: 'center', margin: 16}}
          title={'Sign In'}
          variant={'primary'}
          {...{}}
        />
        <Button
          style={{alignItems: 'center', alignContent: 'center', margin: 16}}
          title={'Sign out'}
          variant={'default'}
          {...{Logout}}
        />
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
    borderRadius: 50,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  textSignIn: {
    textAlign: 'left',
    fontSize: 20,
    marginVertical: 12,
  },
  btnSignIn: {
    alignItems: 'center',
    alignContent: 'center',
    margin: 16,
  },
});
