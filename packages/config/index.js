import {NativeModules} from 'react-native';

const FirebaseRemoteConfig = NativeModules.FirebaseRemoteConfig;
const CACHE_EXPIRATION_SECONDS = 86400; // one day

export default {
  LAST_FETCH_STATUS_SUCCESS: FirebaseRemoteConfig.LAST_FETCH_STATUS_SUCCESS,
  LAST_FETCH_STATUS_FAILURE: FirebaseRemoteConfig.LAST_FETCH_STATUS_FAILURE,
  LAST_FETCH_STATUS_THROTTLED: FirebaseRemoteConfig.LAST_FETCH_STATUS_THROTTLED,
  LAST_FETCH_STATUS_NO_FETCH_YET: FirebaseRemoteConfig.LAST_FETCH_STATUS_NO_FETCH_YET,

  VALUE_SOURCE_DEFAULT: FirebaseRemoteConfig.VALUE_SOURCE_DEFAULT,
  VALUE_SOURCE_REMOTE: FirebaseRemoteConfig.VALUE_SOURCE_REMOTE,
  VALUE_SOURCE_STATIC: FirebaseRemoteConfig.VALUE_SOURCE_STATIC,

  fetch: async(cacheExpirationSeconds = CACHE_EXPIRATION_SECONDS) =>
    await FirebaseRemoteConfig.fetch(cacheExpirationSeconds),

  isDeveloperModeEnabled: async() =>
    await FirebaseRemoteConfig.isDeveloperModeEnabled(),

  getFetchTimeMillis: async() => {
    const value = await FirebaseRemoteConfig.getFetchTimeMillis();

    // In Android value comes back as String
    return Number(value);
  },

  getLastFetchStatus: async() => await FirebaseRemoteConfig.getLastFetchStatus(),

  getString: async(key, namespace = null) =>
    await FirebaseRemoteConfig.getString(key, namespace),

  getBoolean: async(key, namespace = null) =>
    await FirebaseRemoteConfig.getBoolean(key, namespace),

  getDouble: async(key, namespace = null) =>
    await FirebaseRemoteConfig.getDouble(key, namespace),

  getLong: async(key, namespace = null) => {
    const value = await FirebaseRemoteConfig.getLong(key, namespace);

    // In Android value comes back as String
    return Number(value);
  },

  getSource: async(key, namespace = null) =>
    await FirebaseRemoteConfig.getSource(key, namespace),

  getKeysByPrefix: async(prefix = null, namespace = null) =>
    await FirebaseRemoteConfig.getKeysByPrefix(prefix, namespace),

  setDefaults: async(settings = {}, namespace = null) =>
    await FirebaseRemoteConfig.setDefaults(settings, namespace),

  // In Android native-modules calls setDefaults(resourceId, setDefaultsFromFile)
  // And in IOS native-modules calls setDefaultsFromPlistFileName(filename, setDefaultsFromFile)
  setDefaultsFromFile: async(filename = null, namespace = null) =>
    await FirebaseRemoteConfig.setDefaultsFromFile(filename, namespace),

  setDeveloperModeEnabled: (developmentModeEnabled = false) => {
    FirebaseRemoteConfig.setDeveloperModeEnabled(developmentModeEnabled);
  }
}
