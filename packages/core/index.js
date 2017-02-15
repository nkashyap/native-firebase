import {NativeModules, Platform} from 'react-native';

const FirebaseCore = NativeModules.FirebaseCore;

export default class Firebase {
  static get DEFAULT_APP_NAME() {
    return FirebaseCore.DEFAULT_APP_NAME;
  }

  constructor(name = null, options = {}) {
    this.name = name || FirebaseCore.DEFAULT_APP_NAME;
    this.options = options;

    Firebase
      .initializeApp(options, this.name)
      .then((response) => {
        if (response) {
          this.options = Object.assign({}, this.options, response);
        }
      });
  }

  static async getApps() {
    return await FirebaseCore.getApps();
  }

  static async getInstance(name = null) {
    return await FirebaseCore.getInstance(name);
  }

  static async initializeApp(settings = {}, name = null) {
    return await FirebaseCore.initializeApp(settings, name);
  }

  async getName() {
    return await FirebaseCore.getName(this.name);
  }

  async getOptions() {
    return await FirebaseCore.getOptions(this.name);
  }

  // Android Only
  async hashCode() {
    if (Platform.OS === 'android') {
      return await FirebaseCore.hashCode(this.name);
    } else {
      return `Not supported on ${Platform.OS} platform`;
    }
  }

  // Android Only
  async setAutomaticResourceManagementEnabled(enabled = false) {
    if (Platform.OS === 'android') {
      return await FirebaseCore.setAutomaticResourceManagementEnabled(enabled, this.name);
    } else {
      return `Not supported on ${Platform.OS} platform`;
    }
  }

  // IOS only
  // deleteApp() {
  //   if (Platform.OS === 'ios') {
  //     return await FirebaseCore.deleteApp(this.name);
  //   } else {
  //     return `Not supported on ${Platform.OS} platform`;
  //   }
  // }
};
