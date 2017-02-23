import {NativeModules} from 'react-native';
import {isIOS, notSupported} from './util';

const FirebaseCore = NativeModules.FirebaseCore;

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
    const {
      apiKey,
      applicationId,
      databaseUrl,
      gcmSenderId,
      storageBucket,
      clientId,
      trackingId,
      androidClientId,
      deepLinkURLScheme,
    } = this;

    return new FirebaseOptions({
      apiKey,
      applicationId,
      databaseUrl,
      gcmSenderId,
      storageBucket,
      clientId,
      trackingId,
      androidClientId,
      deepLinkURLScheme,
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
    if (isIOS) {
      this.clientId = clientId;
      return this;
    }

    throw notSupported;
  }

  setTrackingId(trackingId) {
    if (isIOS) {
      this.trackingId = trackingId;
      return this;
    }

    throw notSupported;
  }

  setAndroidClientId(androidClientId) {
    if (isIOS) {
      this.androidClientId = androidClientId;
      return this;
    }

    throw notSupported;
  }

  setDeepLinkURLScheme(deepLinkURLScheme) {
    if (isIOS) {
      this.deepLinkURLScheme = deepLinkURLScheme;
      return this;
    }

    throw notSupported;
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
    this.options = options || {};
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

  getClientId() {
    if (isIOS) {
      return this.options.clientId;
    }

    throw notSupported;
  }

  getTrackingId() {
    if (isIOS) {
      return this.options.trackingId;
    }

    throw notSupported;
  }

  getAndroidClientId() {
    if (isIOS) {
      return this.options.androidClientId;
    }

    throw notSupported;
  }

  getDeepLinkURLScheme() {
    if (isIOS) {
      return this.options.deepLinkURLScheme;
    }

    throw notSupported;
  }

  get settings() {
    return this.options;
  }

  toString() {
    return JSON.stringify(this.options);
  }
}

// IOS
// initWithGoogleAppID
// initWithContentsOfFile
// defaultOptions
