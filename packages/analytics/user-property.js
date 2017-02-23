import {NativeModules} from 'react-native';

const NativeFirebaseAnalytics = NativeModules.FirebaseAnalytics;

export default class FirebaseAnalyticsUserProperty {
  static get SIGN_UP_METHOD() {
    return NativeFirebaseAnalytics.USER_PROPERTY_SIGN_UP_METHOD;
  }
}
