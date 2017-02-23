package co.happywallet.firebase.analytics;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.NativeModule;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.google.android.gms.tasks.Task;

import com.google.firebase.analytics.FirebaseAnalytics;

import java.util.HashMap;
import java.util.Map;

public class FirebaseAnalyticsModule extends ReactContextBaseJavaModule {
    private static final String TAG = "FirebaseAnalytics";

    public FirebaseAnalyticsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * @return
     */
    @Override
    public String getName() {
        return TAG;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("EVENT_ADD_PAYMENT_INFO", FirebaseAnalytics.Event.ADD_PAYMENT_INFO);
        constants.put("EVENT_ADD_TO_CART", FirebaseAnalytics.Event.ADD_TO_CART);
        constants.put("EVENT_ADD_TO_WISHLIST", FirebaseAnalytics.Event.ADD_TO_WISHLIST);
        constants.put("EVENT_APP_OPEN", FirebaseAnalytics.Event.APP_OPEN);
        constants.put("EVENT_BEGIN_CHECKOUT", FirebaseAnalytics.Event.BEGIN_CHECKOUT);
//        constants.put("EVENT_CAMPAIGN_DETAILS", FirebaseAnalytics.Event.CAMPAIGN_DETAILS);
        constants.put("EVENT_EARN_VIRTUAL_CURRENCY", FirebaseAnalytics.Event.EARN_VIRTUAL_CURRENCY);
        constants.put("EVENT_ECOMMERCE_PURCHASE", FirebaseAnalytics.Event.ECOMMERCE_PURCHASE);
        constants.put("EVENT_GENERATE_LEAD", FirebaseAnalytics.Event.GENERATE_LEAD);
        constants.put("EVENT_JOIN_GROUP", FirebaseAnalytics.Event.JOIN_GROUP);
        constants.put("EVENT_LEVEL_UP", FirebaseAnalytics.Event.LEVEL_UP);
        constants.put("EVENT_LOGIN", FirebaseAnalytics.Event.LOGIN);
        constants.put("EVENT_POST_SCORE", FirebaseAnalytics.Event.POST_SCORE);
        constants.put("EVENT_PRESENT_OFFER", FirebaseAnalytics.Event.PRESENT_OFFER);
        constants.put("EVENT_PURCHASE_REFUND", FirebaseAnalytics.Event.PURCHASE_REFUND);
        constants.put("EVENT_SEARCH", FirebaseAnalytics.Event.SEARCH);
        constants.put("EVENT_SELECT_CONTENT", FirebaseAnalytics.Event.SELECT_CONTENT);
        constants.put("EVENT_SHARE", FirebaseAnalytics.Event.SHARE);
        constants.put("EVENT_SIGN_UP", FirebaseAnalytics.Event.SIGN_UP);
        constants.put("EVENT_SPEND_VIRTUAL_CURRENCY", FirebaseAnalytics.Event.SPEND_VIRTUAL_CURRENCY);
        constants.put("EVENT_TUTORIAL_BEGIN", FirebaseAnalytics.Event.TUTORIAL_BEGIN);
        constants.put("EVENT_TUTORIAL_COMPLETE", FirebaseAnalytics.Event.TUTORIAL_COMPLETE);
        constants.put("EVENT_UNLOCK_ACHIEVEMENT", FirebaseAnalytics.Event.UNLOCK_ACHIEVEMENT);
        constants.put("EVENT_VIEW_ITEM", FirebaseAnalytics.Event.VIEW_ITEM);
        constants.put("EVENT_VIEW_ITEM_LIST", FirebaseAnalytics.Event.VIEW_ITEM_LIST);
        constants.put("EVENT_VIEW_SEARCH_RESULTS", FirebaseAnalytics.Event.VIEW_SEARCH_RESULTS);


        constants.put("PARAM_ACHIEVEMENT_ID", FirebaseAnalytics.Param.ACHIEVEMENT_ID);
//        constants.put("PARAM_ACLID", FirebaseAnalytics.Param.ACLID);
//        constants.put("PARAM_CAMPAIGN", FirebaseAnalytics.Param.CAMPAIGN);
        constants.put("PARAM_CHARACTER", FirebaseAnalytics.Param.CHARACTER);
//        constants.put("PARAM_CONTENT", FirebaseAnalytics.Param.CONTENT);
        constants.put("PARAM_CONTENT_TYPE", FirebaseAnalytics.Param.CONTENT_TYPE);
        constants.put("PARAM_COUPON", FirebaseAnalytics.Param.COUPON);
//        constants.put("PARAM_CP1", FirebaseAnalytics.Param.CP1);
        constants.put("PARAM_CURRENCY", FirebaseAnalytics.Param.CURRENCY);
        constants.put("PARAM_DESTINATION", FirebaseAnalytics.Param.DESTINATION);
        constants.put("PARAM_END_DATE", FirebaseAnalytics.Param.END_DATE);
        constants.put("PARAM_FLIGHT_NUMBER", FirebaseAnalytics.Param.FLIGHT_NUMBER);
        constants.put("PARAM_GROUP_ID", FirebaseAnalytics.Param.GROUP_ID);
        constants.put("PARAM_ITEM_CATEGORY", FirebaseAnalytics.Param.ITEM_CATEGORY);
        constants.put("PARAM_ITEM_ID", FirebaseAnalytics.Param.ITEM_ID);
        constants.put("PARAM_ITEM_LOCATION_ID", FirebaseAnalytics.Param.ITEM_LOCATION_ID);
        constants.put("PARAM_ITEM_NAME", FirebaseAnalytics.Param.ITEM_NAME);
        constants.put("PARAM_LEVEL", FirebaseAnalytics.Param.LEVEL);
        constants.put("PARAM_LOCATION", FirebaseAnalytics.Param.LOCATION);
//        constants.put("PARAM_MEDIUM", FirebaseAnalytics.Param.MEDIUM);
        constants.put("PARAM_NUMBER_OF_NIGHTS", FirebaseAnalytics.Param.NUMBER_OF_NIGHTS);
        constants.put("PARAM_NUMBER_OF_PASSENGERS", FirebaseAnalytics.Param.NUMBER_OF_PASSENGERS);
        constants.put("PARAM_NUMBER_OF_ROOMS", FirebaseAnalytics.Param.NUMBER_OF_ROOMS);
        constants.put("PARAM_ORIGIN", FirebaseAnalytics.Param.ORIGIN);
        constants.put("PARAM_PRICE", FirebaseAnalytics.Param.PRICE);
        constants.put("PARAM_QUANTITY", FirebaseAnalytics.Param.QUANTITY);
        constants.put("PARAM_SCORE", FirebaseAnalytics.Param.SCORE);
        constants.put("PARAM_SEARCH_TERM", FirebaseAnalytics.Param.SEARCH_TERM);
        constants.put("PARAM_SHIPPING", FirebaseAnalytics.Param.SHIPPING);
        constants.put("PARAM_SIGN_UP_METHOD", FirebaseAnalytics.Param.SIGN_UP_METHOD);
//        constants.put("PARAM_SOURCE", FirebaseAnalytics.Param.SOURCE);
        constants.put("PARAM_START_DATE", FirebaseAnalytics.Param.START_DATE);
        constants.put("PARAM_TAX", FirebaseAnalytics.Param.TAX);
//        constants.put("PARAM_TERM", FirebaseAnalytics.Param.TERM);
        constants.put("PARAM_TRANSACTION_ID", FirebaseAnalytics.Param.TRANSACTION_ID);
        constants.put("PARAM_TRAVEL_CLASS", FirebaseAnalytics.Param.TRAVEL_CLASS);
        constants.put("PARAM_VALUE", FirebaseAnalytics.Param.VALUE);
        constants.put("PARAM_VIRTUAL_CURRENCY_NAME", FirebaseAnalytics.Param.VIRTUAL_CURRENCY_NAME);


        constants.put("USER_PROPERTY_SIGN_UP_METHOD", FirebaseAnalytics.UserProperty.SIGN_UP_METHOD);

        return constants;
    }


    private FirebaseAnalytics getInstance() {
        return FirebaseAnalytics.getInstance(this.getReactApplicationContext().getBaseContext());
    }

    @ReactMethod
    public void logEvent(final String name, final ReadableMap params) {
        this.getInstance().logEvent(name, Arguments.toBundle(params));
    }

    @ReactMethod
    public void setAnalyticsCollectionEnabled(final boolean enabled) {
        this.getInstance().setAnalyticsCollectionEnabled(enabled);
    }

    @ReactMethod
    public void setCurrentScreen(final String name, final String override) {
        Activity current = this.getReactApplicationContext().getCurrentActivity();
        this.getInstance().setCurrentScreen(current, name, override);
    }

    @ReactMethod
    public void setMinimumSessionDuration(final Integer milliseconds) {
        this.getInstance().setMinimumSessionDuration(milliseconds.longValue());
    }

    @ReactMethod
    public void setSessionTimeoutDuration(final Integer milliseconds) {
        this.getInstance().setSessionTimeoutDuration(milliseconds.longValue());
    }

    @ReactMethod
    public void setUserId(final String id) {
        this.getInstance().setUserId(id);
    }

    @ReactMethod
    public void setUserProperty(final String name, final String value) {
        this.getInstance().setUserProperty(name, value);
    }

//    @ReactMethod
//    public void getAppInstanceId(Promise promise) {
//        Task<String> value = this.getInstance().getAppInstanceId();
//        promise.resolve(true);
//    }
}
