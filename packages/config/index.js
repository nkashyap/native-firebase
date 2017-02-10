import { NativeModules } from 'react-native';

const FirebaseRemoteConfig = NativeModules.FirebaseRemoteConfig;
const CACHE_EXPIRATION_SECONDS = 86400; // one day

export default class RemoteConfig {
  static get LAST_FETCH_STATUS_SUCCESS() {
    return FirebaseRemoteConfig.LAST_FETCH_STATUS_SUCCESS;
  }

  static get LAST_FETCH_STATUS_FAILURE() {
    return FirebaseRemoteConfig.LAST_FETCH_STATUS_FAILURE;
  }

  static get LAST_FETCH_STATUS_THROTTLED() {
    return FirebaseRemoteConfig.LAST_FETCH_STATUS_THROTTLED;
  }

  static get LAST_FETCH_STATUS_NO_FETCH_YET() {
    return FirebaseRemoteConfig.LAST_FETCH_STATUS_NO_FETCH_YET;
  }

  static get VALUE_SOURCE_DEFAULT() {
    return FirebaseRemoteConfig.VALUE_SOURCE_DEFAULT;
  }

  static get VALUE_SOURCE_REMOTE() {
    return FirebaseRemoteConfig.VALUE_SOURCE_REMOTE;
  }

  static get VALUE_SOURCE_STATIC() {
    return FirebaseRemoteConfig.VALUE_SOURCE_STATIC;
  }

  constructor({ debug }) {
    if (debug) {
      this.setDeveloperModeEnabled(true);
    }
  }

  async fetch(cacheExpirationSeconds = CACHE_EXPIRATION_SECONDS) {
    return await FirebaseRemoteConfig.fetch(cacheExpirationSeconds);
  }

  async isDeveloperModeEnabled() {
    return await FirebaseRemoteConfig.isDeveloperModeEnabled();
  }

  async getFetchTimeMillis() {
    const value = await FirebaseRemoteConfig.getFetchTimeMillis();

    // In Android value comes back as String
    return Number(value);
  }

  async getLastFetchStatus() {
    return await FirebaseRemoteConfig.getLastFetchStatus();
  }

  async getString(key, namespace = null) {
    return await FirebaseRemoteConfig.getString(key, namespace);
  }

  async getBoolean(key, namespace = null) {
    return await FirebaseRemoteConfig.getBoolean(key, namespace);
  }

  async getDouble(key, namespace = null) {
    return await FirebaseRemoteConfig.getDouble(key, namespace);
  }

  async getLong(key, namespace = null) {
    const value = await FirebaseRemoteConfig.getLong(key, namespace);

    // In Android value comes back as String
    return Number(value);
  }

  async getSource(key, namespace = null) {
    return await FirebaseRemoteConfig.getSource(key, namespace);
  }

  async getKeysByPrefix(prefix = null, namespace = null) {
    return await FirebaseRemoteConfig.getKeysByPrefix(prefix, namespace);
  }

  async setDefaults(settings = {}, namespace = null) {
    return await FirebaseRemoteConfig.setDefaults(settings, namespace);
  }

  // In Android native-modules calls setDefaults(resourceId, setDefaultsFromFile)
  // And in IOS native-modules calls setDefaultsFromPlistFileName(filename, setDefaultsFromFile)
  async setDefaultsFromFile(filename = null, namespace = null) {
    return await FirebaseRemoteConfig.setDefaultsFromFile(filename, namespace);
  }

  setDeveloperModeEnabled(developmentModeEnabled = false) {
    FirebaseRemoteConfig.setDeveloperModeEnabled(developmentModeEnabled);
  }
}
