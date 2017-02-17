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

    private FirebaseAnalytics getInstance() {
        return FirebaseAnalytics.getInstance(this.getReactApplicationContext().getBaseContext());
    }

    @ReactMethod
    public void logEvent(final String name, final ReadableMap params, Promise promise) {
        this.getInstance().logEvent(name, Arguments.toBundle(params));
        promise.resolve(true);
    }

    @ReactMethod
    public void setAnalyticsCollectionEnabled(final boolean enabled, Promise promise) {
        this.getInstance().setAnalyticsCollectionEnabled(enabled);
        promise.resolve(true);
    }

    @ReactMethod
    public void setCurrentScreen(final String name, final String override, Promise promise) {
        Activity current = this.getReactApplicationContext().getCurrentActivity();
        this.getInstance().setCurrentScreen(current, name, override);
        promise.resolve(true);
    }

    @ReactMethod
    public void setMinimumSessionDuration(final Integer milliseconds, Promise promise) {
        this.getInstance().setMinimumSessionDuration(milliseconds.longValue());
        promise.resolve(true);
    }

    @ReactMethod
    public void setSessionTimeoutDuration(final Integer milliseconds, Promise promise) {
        this.getInstance().setSessionTimeoutDuration(milliseconds.longValue());
        promise.resolve(true);
    }

    @ReactMethod
    public void setUserId(final String id, Promise promise) {
        this.getInstance().setUserId(id);
        promise.resolve(true);
    }

    @ReactMethod
    public void setUserProperty(final String name, final String value, Promise promise) {
        this.getInstance().setUserProperty(name, value);
        promise.resolve(true);
    }

    @ReactMethod
    public void getAppInstanceId(Promise promise) {
        Task<String> value = this.getInstance().getAppInstanceId();
        promise.resolve(true);
    }
}
