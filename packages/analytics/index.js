import {NativeModules} from 'react-native';
import FirebaseAnalyticsEvent from './event';
import FirebaseAnalyticsParam from './param';
import FirebaseAnalyticsUserProperty from './user-property';

const NativeFirebaseAnalytics = NativeModules.FirebaseAnalytics;
const SESSION_DURATION = 10000;
const TIMEOUT_DURATION = 1800000;

export default class FirebaseAnalytics {
  static get Event() {
    return FirebaseAnalyticsEvent;
  }

  static get Param() {
    return FirebaseAnalyticsParam;
  }

  static get UserProperty() {
    return FirebaseAnalyticsUserProperty;
  }

  static logEvent(name, params = null) {
    NativeFirebaseAnalytics.logEvent(name, params);
  }

  static setAnalyticsCollectionEnabled(enabled = false) {
    NativeFirebaseAnalytics.setAnalyticsCollectionEnabled(enabled);
  }

  static setCurrentScreen(name = null, override = null) {
    NativeFirebaseAnalytics.setCurrentScreen(name, override);
  }

  static setMinimumSessionDuration(milliseconds = SESSION_DURATION) {
    NativeFirebaseAnalytics.setMinimumSessionDuration(milliseconds);
  }

  static setSessionTimeoutDuration(milliseconds = TIMEOUT_DURATION) {
    NativeFirebaseAnalytics.setSessionTimeoutDuration(milliseconds);
  }

  static setUserId(userId = null) {
    NativeFirebaseAnalytics.setUserId(userId);
  }

  static setUserProperty(name, value = null) {
    NativeFirebaseAnalytics.setUserProperty(name, value);
  }
}
