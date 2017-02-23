import {NativeModules} from 'react-native';

export default class FirebaseRemoteConfigValue {
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
