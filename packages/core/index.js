import {NativeModules, Platform} from 'react-native';
import FirebaseOptions from './options';

const FirebaseCore = NativeModules.FirebaseCore;

const is = (os) => {
  if (Platform.OS !== os) {
    throw new Error(`Not supported on ${Platform.OS} platform`);
  }

  return true;
};

// export FirebaseOptions;
export default class FirebaseApp {
  static get DEFAULT_APP_NAME() {
    return FirebaseCore.DEFAULT_APP_NAME;
  }

  static async getApps() {
    const apps = await FirebaseCore.getApps();

    return apps.map((name) => new FirebaseApp(name));
  }

  static async getInstance(name = null) {
    await FirebaseCore.getInstance(name);
    return new FirebaseApp(name);
  }

  static async initializeApp(options = new FirebaseOptions(), name = null) {
    await FirebaseCore.initializeApp(options.toString(), name);
    return new FirebaseApp(name);
  }

  constructor(name = null) {
    this.name = name || FirebaseCore.DEFAULT_APP_NAME;
  }

  async getName() {
    return await FirebaseCore.getName(this.name);
  }

  async getOptions() {
    const options = await FirebaseCore.getOptions(this.name);

    return FirebaseOptions.Builder(options).build();
  }

  // Android Only
  async hashCode() {
    if (is('android')) {
      return await FirebaseCore.hashCode(this.name);
    }
  }

  // Android Only
  setAutomaticResourceManagementEnabled(enabled = false) {
    if (is('android')) {
      FirebaseCore.setAutomaticResourceManagementEnabled(enabled, this.name);
    }
  }


  // IOS only
  // deleteApp() {
  //   if (is('ios')) {
  //     return await FirebaseCore.deleteApp(this.name);
  //   }
  // }
};
