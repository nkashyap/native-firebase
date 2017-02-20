import {NativeModules, Platform} from 'react-native';

const NativeFirebaseRemoteConfig = NativeModules.FirebaseRemoteConfig;
const CACHE_EXPIRATION_SECONDS = 86400; // one day


class FirebaseRemoteConfigSettings {
  constructor(enabled) {
    this.enabled = enabled;
  }

  isDeveloperModeEnabled() {
    return this.enabled;
  }
}


class FirebaseRemoteConfigInfo {
  constructor(info) {
    this.info = info;
  }

  getConfigSettings() {
    return new FirebaseRemoteConfigSettings(this.info.isDeveloperModeEnabled);
  }

  getFetchTimeMillis() {
    // In Android value comes back as String
    return Number(this.info.lastFetchTime);
  }

  getLastFetchStatus() {
    return this.info.lastFetchStatus;
  }

  toJSON() {
    return this.info;
  }

  toString() {
    return JSON.stringify(this.info);
  }
}


class FirebaseRemoteConfigValue {
  constructor(value) {
    this.value = value;
  }

  asBoolean() {
    return this.value.boolean;
  }

  asByteArray() {
    const value = [];

    if (this.value.byteArray) {
      const length = this.value.byteArray.length;

      for (let i = 0; i < length; i++) {
        value.push(this.value.byteArray.charCodeAt(i));
      }
    }

    return value;
  }

  asDouble() {
    return this.value.double;
  }

  asLong() {
    // In Android value comes back as String
    return Number(this.value.long);
  }

  asString() {
    return this.value.string;
  }

  getSource() {
    return this.value.source;
  }

  toJSON() {
    return this.value;
  }

  toString() {
    return JSON.stringify(this.value);
  }
}


export default class FirebaseRemoteConfig {
  static get DEFAULT_VALUE_FOR_BOOLEAN() {
    return NativeFirebaseRemoteConfig.DEFAULT_VALUE_FOR_BOOLEAN;
  }

  static get DEFAULT_VALUE_FOR_DOUBLE() {
    return NativeFirebaseRemoteConfig.DEFAULT_VALUE_FOR_DOUBLE;
  }

  static get DEFAULT_VALUE_FOR_LONG() {
    return NativeFirebaseRemoteConfig.DEFAULT_VALUE_FOR_LONG;
  }

  static get DEFAULT_VALUE_FOR_STRING() {
    return NativeFirebaseRemoteConfig.DEFAULT_VALUE_FOR_STRING;
  }

  static get LAST_FETCH_STATUS_SUCCESS() {
    return NativeFirebaseRemoteConfig.LAST_FETCH_STATUS_SUCCESS;
  }

  static get LAST_FETCH_STATUS_FAILURE() {
    return NativeFirebaseRemoteConfig.LAST_FETCH_STATUS_FAILURE;
  }

  static get LAST_FETCH_STATUS_THROTTLED() {
    return NativeFirebaseRemoteConfig.LAST_FETCH_STATUS_THROTTLED;
  }

  static get LAST_FETCH_STATUS_NO_FETCH_YET() {
    return NativeFirebaseRemoteConfig.LAST_FETCH_STATUS_NO_FETCH_YET;
  }

  static get VALUE_SOURCE_DEFAULT() {
    return NativeFirebaseRemoteConfig.VALUE_SOURCE_DEFAULT;
  }

  static get VALUE_SOURCE_REMOTE() {
    return NativeFirebaseRemoteConfig.VALUE_SOURCE_REMOTE;
  }

  static get VALUE_SOURCE_STATIC() {
    return NativeFirebaseRemoteConfig.VALUE_SOURCE_STATIC;
  }


  static async fetch(cacheExpirationSeconds = CACHE_EXPIRATION_SECONDS) {
    return await NativeFirebaseRemoteConfig.fetch(cacheExpirationSeconds);
  }

  static async getBoolean(key, namespace = null) {
    const boolean = await NativeFirebaseRemoteConfig.getBoolean(key, namespace);
    return new FirebaseRemoteConfigValue({ boolean }).asBoolean();
  }

  static async getByteArray(key, namespace = null) {
    const byteArray = await NativeFirebaseRemoteConfig.getByteArray(key, namespace);
    return new FirebaseRemoteConfigValue({ byteArray }).asByteArray();
  }

  static async getDouble(key, namespace = null) {
    const double = await NativeFirebaseRemoteConfig.getDouble(key, namespace);
    return new FirebaseRemoteConfigValue({ double }).asDouble();
  }

  static async getInfo() {
    const value = await NativeFirebaseRemoteConfig.getInfo();
    return new FirebaseRemoteConfigInfo(value);
  }

  static async getKeysByPrefix(prefix = null, namespace = null) {
    return await NativeFirebaseRemoteConfig.getKeysByPrefix(prefix, namespace);
  }

  static async getLong(key, namespace = null) {
    const long = await NativeFirebaseRemoteConfig.getLong(key, namespace);
    return new FirebaseRemoteConfigValue({ long }).asLong();
  }

  static async getString(key, namespace = null) {
    const string = await NativeFirebaseRemoteConfig.getString(key, namespace);
    return new FirebaseRemoteConfigValue({ string }).asString();
  }

  static async getValue(key, namespace = null) {
    const value = await NativeFirebaseRemoteConfig.getValue(key, namespace);
    return new FirebaseRemoteConfigValue(value);
  }

  static async setConfigSettings(developmentModeEnabled = false) {
    return await NativeFirebaseRemoteConfig.setConfigSettings(developmentModeEnabled);
  }

  static async setDefaults(settings = {}, namespace = null) {
    return await NativeFirebaseRemoteConfig.setDefaults(settings, namespace);
  }

  // In Android native-modules calls setDefaults(resourceId, setDefaultsFromFile)
  // And in IOS native-modules calls setDefaultsFromPlistFileName(filename, setDefaultsFromFile)
  static async setDefaultsFromFile(filename = null, namespace = null) {
    return await NativeFirebaseRemoteConfig.setDefaultsFromFile(filename, namespace);
  }

  // IOS Only
  static async getByKey(key) {
    if (Platform.OS === 'ios') {
      const value = await NativeFirebaseRemoteConfig.getByKey(key);
      return new FirebaseRemoteConfigValue(value);
    } else {
      return `Not supported on ${Platform.OS} platform`;
    }
  }

  static async getAllKeys(source, namespace = null) {
    if (Platform.OS === 'ios') {
      return await NativeFirebaseRemoteConfig.getAllKeys(source, namespace);
    } else {
      return `Not supported on ${Platform.OS} platform`;
    }
  }

  static async getDefaultValue(key = null, namespace = null) {
    if (Platform.OS === 'ios') {
      const value = await NativeFirebaseRemoteConfig.getDefaultValue(key, namespace);
      return new FirebaseRemoteConfigValue(value);
    } else {
      return `Not supported on ${Platform.OS} platform`;
    }
  }
}
