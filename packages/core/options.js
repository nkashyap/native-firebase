import {NativeModules, Platform} from 'react-native';

const FirebaseCore = NativeModules.FirebaseCore;

const is = (os) => {
  if (Platform.OS !== os) {
    throw new Error(`Not supported on ${Platform.OS} platform`);
  }

  return true;
};

class Builder {
  constructor(options) {
    if (options && typeof options === 'object') {
      this.apiKey = options.apiKey;
      this.applicationId = options.applicationId;
      this.databaseUrl = options.databaseUrl;
      this.gcmSenderId = options.gcmSenderId;
      this.storageBucket = options.storageBucket;

      // IOS
      // this.bundleId = options.bundleId;
      this.clientId = options.clientId;
      this.trackingId = options.trackingId;
      this.androidClientId = options.androidClientId;
      this.deepLinkURLScheme = options.deepLinkURLScheme;
    }
  }

  build() {
    return new FirebaseOptions({
      apiKey: this.apiKey,
      applicationId: this.applicationId,
      databaseUrl: this.databaseUrl,
      gcmSenderId: this.gcmSenderId,
      storageBucket: this.storageBucket,

      // IOS
      clientId: this.clientId,
      trackingId: this.trackingId,
      androidClientId: this.androidClientId,
      deepLinkURLScheme: this.deepLinkURLScheme,
    });
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
    return this;
  }

  setApplicationId(applicationId) {
    this.applicationId = applicationId;
    return this;
  }

  setDatabaseUrl(databaseUrl) {
    this.databaseUrl = databaseUrl;
    return this;
  }

  setGcmSenderId(gcmSenderId) {
    this.gcmSenderId = gcmSenderId;
    return this;
  }

  setStorageBucket(storageBucket) {
    this.storageBucket = storageBucket;
    return this;
  }

  setClientId(clientId) {
    if (is('ios')) {
      this.clientId = clientId;
    }
    return this;
  }

  setTrackingId(trackingId) {
    if (is('ios')) {
      this.trackingId = trackingId;
    }
    return this;
  }

  setAndroidClientId(androidClientId) {
    if (is('ios')) {
      this.androidClientId = androidClientId;
    }
    return this;
  }

  setDeepLinkURLScheme(deepLinkURLScheme) {
    if (is('ios')) {
      this.deepLinkURLScheme = deepLinkURLScheme;
    }
    return this;
  }
}

export default class FirebaseOptions {
  static get Builder() {
    return Builder;
  }

  static async fromResource() {
    if (is('android')) {
      const options = await FirebaseCore.fromResource();

      return FirebaseOptions.Builder(options).build();
    }
  }

  constructor(options) {
    this.options = options;
  }

  getApiKey() {
    return this.options.apiKey;
  }

  getApplicationId() {
    return this.options.applicationId;
  }

  getDatabaseUrl() {
    return this.options.databaseUrl;
  }

  getGcmSenderId() {
    return this.options.gcmSenderId;
  }

  getStorageBucket() {
    return this.options.storageBucket;
  }

  hashCode() {
  }

  toString() {
    return JSON.stringify(this.options);
  }

  getClientId() {
    if (is('ios')) {
      return this.options.clientId;
    }
  }

  getTrackingId() {
    if (is('ios')) {
      return this.options.trackingId;
    }
  }

  getAndroidClientId() {
    if (is('ios')) {
      return this.options.androidClientId;
    }
  }

  getDeepLinkURLScheme() {
    if (is('ios')) {
      return this.options.deepLinkURLScheme;
    }
  }
}

// IOS
// initWithGoogleAppID
// initWithContentsOfFile
// defaultOptions
