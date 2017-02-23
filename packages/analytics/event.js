import {NativeModules} from 'react-native';

const NativeFirebaseAnalytics = NativeModules.FirebaseAnalytics;

export default class FirebaseAnalyticsEvent {
  static get ADD_PAYMENT_INFO() {
    return NativeFirebaseAnalytics.EVENT_ADD_PAYMENT_INFO;
  }

  static get ADD_TO_CART() {
    return NativeFirebaseAnalytics.EVENT_ADD_TO_CART;
  }

  static get ADD_TO_WISHLIST() {
    return NativeFirebaseAnalytics.EVENT_ADD_TO_WISHLIST;
  }

  static get APP_OPEN() {
    return NativeFirebaseAnalytics.EVENT_APP_OPEN;
  }

  static get BEGIN_CHECKOUT() {
    return NativeFirebaseAnalytics.EVENT_BEGIN_CHECKOUT;
  }

  // static get CAMPAIGN_DETAILS() {
  //   return NativeFirebaseAnalytics.EVENT_CAMPAIGN_DETAILS;
  // }

  static get EARN_VIRTUAL_CURRENCY() {
    return NativeFirebaseAnalytics.EVENT_EARN_VIRTUAL_CURRENCY;
  }

  static get ECOMMERCE_PURCHASE() {
    return NativeFirebaseAnalytics.EVENT_ECOMMERCE_PURCHASE;
  }

  static get GENERATE_LEAD() {
    return NativeFirebaseAnalytics.EVENT_GENERATE_LEAD;
  }

  static get JOIN_GROUP() {
    return NativeFirebaseAnalytics.EVENT_JOIN_GROUP;
  }

  static get LEVEL_UP() {
    return NativeFirebaseAnalytics.EVENT_LEVEL_UP;
  }

  static get LOGIN() {
    return NativeFirebaseAnalytics.EVENT_LOGIN;
  }

  static get POST_SCORE() {
    return NativeFirebaseAnalytics.EVENT_POST_SCORE;
  }

  static get PRESENT_OFFER() {
    return NativeFirebaseAnalytics.EVENT_PRESENT_OFFER;
  }

  static get PURCHASE_REFUND() {
    return NativeFirebaseAnalytics.EVENT_PURCHASE_REFUND;
  }

  static get SEARCH() {
    return NativeFirebaseAnalytics.EVENT_SEARCH;
  }

  static get SELECT_CONTENT() {
    return NativeFirebaseAnalytics.EVENT_SELECT_CONTENT;
  }

  static get SHARE() {
    return NativeFirebaseAnalytics.EVENT_SHARE;
  }

  static get SIGN_UP() {
    return NativeFirebaseAnalytics.EVENT_SIGN_UP;
  }

  static get SPEND_VIRTUAL_CURRENCY() {
    return NativeFirebaseAnalytics.EVENT_SPEND_VIRTUAL_CURRENCY;
  }

  static get TUTORIAL_BEGIN() {
    return NativeFirebaseAnalytics.EVENT_TUTORIAL_BEGIN;
  }

  static get TUTORIAL_COMPLETE() {
    return NativeFirebaseAnalytics.EVENT_TUTORIAL_COMPLETE;
  }

  static get UNLOCK_ACHIEVEMENT() {
    return NativeFirebaseAnalytics.EVENT_UNLOCK_ACHIEVEMENT;
  }

  static get VIEW_ITEM() {
    return NativeFirebaseAnalytics.EVENT_VIEW_ITEM;
  }

  static get VIEW_ITEM_LIST() {
    return NativeFirebaseAnalytics.EVENT_VIEW_ITEM_LIST;
  }

  static get VIEW_SEARCH_RESULTS() {
    return NativeFirebaseAnalytics.EVENT_VIEW_SEARCH_RESULTS;
  }
}
