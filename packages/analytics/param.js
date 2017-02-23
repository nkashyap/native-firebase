import {NativeModules} from 'react-native';

const NativeFirebaseAnalytics = NativeModules.FirebaseAnalytics;

export default class FirebaseAnalyticsParam {
  static get ACHIEVEMENT_ID() {
    return NativeFirebaseAnalytics.PARAM_ACHIEVEMENT_ID;
  }

  // static get ACLID() {
  //   return NativeFirebaseAnalytics.PARAM_ACLID;
  // }
  //
  // static get CAMPAIGN() {
  //   return NativeFirebaseAnalytics.PARAM_CAMPAIGN;
  // }

  static get CHARACTER() {
    return NativeFirebaseAnalytics.PARAM_CHARACTER;
  }

  // static get CONTENT() {
  //   return NativeFirebaseAnalytics.PARAM_CONTENT;
  // }

  static get CONTENT_TYPE() {
    return NativeFirebaseAnalytics.PARAM_CONTENT_TYPE;
  }

  static get COUPON() {
    return NativeFirebaseAnalytics.PARAM_COUPON;
  }

  // static get CP1() {
  //   return NativeFirebaseAnalytics.PARAM_CP1;
  // }

  static get CURRENCY() {
    return NativeFirebaseAnalytics.PARAM_CURRENCY;
  }

  static get DESTINATION() {
    return NativeFirebaseAnalytics.PARAM_DESTINATION;
  }

  static get END_DATE() {
    return NativeFirebaseAnalytics.PARAM_END_DATE;
  }

  static get FLIGHT_NUMBER() {
    return NativeFirebaseAnalytics.PARAM_FLIGHT_NUMBER;
  }

  static get GROUP_ID() {
    return NativeFirebaseAnalytics.PARAM_GROUP_ID;
  }

  static get ITEM_CATEGORY() {
    return NativeFirebaseAnalytics.PARAM_ITEM_CATEGORY;
  }

  static get ITEM_ID() {
    return NativeFirebaseAnalytics.PARAM_ITEM_ID;
  }

  static get ITEM_LOCATION_ID() {
    return NativeFirebaseAnalytics.PARAM_ITEM_LOCATION_ID;
  }

  static get ITEM_NAME() {
    return NativeFirebaseAnalytics.PARAM_ITEM_NAME;
  }

  static get LEVEL() {
    return NativeFirebaseAnalytics.PARAM_LEVEL;
  }

  static get LOCATION() {
    return NativeFirebaseAnalytics.PARAM_LOCATION;
  }

  // static get MEDIUM() {
  //   return NativeFirebaseAnalytics.PARAM_MEDIUM;
  // }

  static get NUMBER_OF_NIGHTS() {
    return NativeFirebaseAnalytics.PARAM_NUMBER_OF_NIGHTS;
  }

  static get NUMBER_OF_PASSENGERS() {
    return NativeFirebaseAnalytics.PARAM_NUMBER_OF_PASSENGERS;
  }

  static get NUMBER_OF_ROOMS() {
    return NativeFirebaseAnalytics.PARAM_NUMBER_OF_ROOMS;
  }

  static get ORIGIN() {
    return NativeFirebaseAnalytics.PARAM_ORIGIN;
  }

  static get PRICE() {
    return NativeFirebaseAnalytics.PARAM_PRICE;
  }

  static get QUANTITY() {
    return NativeFirebaseAnalytics.PARAM_QUANTITY;
  }

  static get SCORE() {
    return NativeFirebaseAnalytics.PARAM_SCORE;
  }

  static get SEARCH_TERM() {
    return NativeFirebaseAnalytics.PARAM_SEARCH_TERM;
  }

  static get SHIPPING() {
    return NativeFirebaseAnalytics.PARAM_SHIPPING;
  }

  static get SIGN_UP_METHOD() {
    return NativeFirebaseAnalytics.PARAM_SIGN_UP_METHOD;
  }

  // static get SOURCE() {
  //   return NativeFirebaseAnalytics.PARAM_SOURCE;
  // }

  static get START_DATE() {
    return NativeFirebaseAnalytics.PARAM_START_DATE;
  }

  static get TAX() {
    return NativeFirebaseAnalytics.PARAM_TAX;
  }

  // static get TERM() {
  //   return NativeFirebaseAnalytics.PARAM_TERM;
  // }

  static get TRANSACTION_ID() {
    return NativeFirebaseAnalytics.PARAM_TRANSACTION_ID;
  }

  static get TRAVEL_CLASS() {
    return NativeFirebaseAnalytics.PARAM_TRAVEL_CLASS;
  }

  static get VALUE() {
    return NativeFirebaseAnalytics.PARAM_VALUE;
  }

  static get VIRTUAL_CURRENCY_NAME() {
    return NativeFirebaseAnalytics.PARAM_VIRTUAL_CURRENCY_NAME;
  }
}
