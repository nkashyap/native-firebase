package co.happywallet.firebase;

import co.happywallet.firebase.helpers.StringHelper;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

public class FirebaseCoreModule extends ReactContextBaseJavaModule implements
        LifecycleEventListener {
    private static final String TAG = "FirebaseCore";

    public FirebaseCoreModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private FirebaseApp getInstance(final String name) {
        if (!StringHelper.isEmpty(name) && !name.equals(FirebaseApp.DEFAULT_APP_NAME)) {
            return FirebaseApp.getInstance(name);
        } else {
            return FirebaseApp.getInstance();
        }
    }

    private String getValue(final ReadableMap params, final String key, final String defaultValue) {
        if (params.hasKey(key)) {
            final String value = params.getString(key);

            if (!StringHelper.isEmpty(value)) {
                return value;
            }
        }

        return defaultValue;
    }

    @Override
    public String getName() {
        return TAG;
    }

    // Internal helpers
    @Override
    public void onHostResume() {
//    WritableMap params = Arguments.createMap();
//    params.putBoolean("isForground", true);
//    Utils.sendEvent(getReactApplicationContext(), "AppState", params);
    }

    @Override
    public void onHostPause() {
//    WritableMap params = Arguments.createMap();
//    params.putBoolean("isForground", false);
//    Utils.sendEvent(getReactApplicationContext(), "AppState", params);
    }

    @Override
    public void onHostDestroy() {

    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("DEFAULT_APP_NAME", FirebaseApp.DEFAULT_APP_NAME);

        return constants;
    }

    @ReactMethod
    public void getApps(final Promise promise) {
        List<FirebaseApp> list = FirebaseApp.getApps(this.getReactApplicationContext());
        String[] apps = new String[list.size()];

        for (int i = 0; i < list.size(); i++) {
            apps[i] = list.get(i).getName();
        }

        promise.resolve(apps);
    }

    @ReactMethod
    public void getInstance(final String name, final Promise promise) {
        try {
            promise.resolve(this.getInstance(name).getName());
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getMessage(), ex);
        }
    }

    @ReactMethod
    public void initializeApp(final ReadableMap params, final String name, final Promise promise) {
        Context context = this.getReactApplicationContext().getBaseContext();
        FirebaseOptions.Builder builder = new FirebaseOptions.Builder();
        FirebaseOptions options = FirebaseOptions.fromResource(context);

        if (options == null) {
            options = new FirebaseOptions.Builder().build();
        }

        String apiKey = this.getValue(params, "apiKey", options.getApiKey());
        String applicationId = this.getValue(params, "applicationId", options.getApplicationId());
        String databaseUrl = this.getValue(params, "databaseUrl", options.getDatabaseUrl());
        String gcmSenderId = this.getValue(params, "gcmSenderId", options.getGcmSenderId());
        String storageBucket = this.getValue(params, "storageBucket", options.getStorageBucket());

        builder.setApiKey(apiKey);
        builder.setApplicationId(applicationId);
        builder.setDatabaseUrl(databaseUrl);
        builder.setGcmSenderId(gcmSenderId);
        builder.setStorageBucket(storageBucket);

        try {
            FirebaseOptions newOptions = builder.build();

            if (!options.equals(newOptions)) {
                if (!StringHelper.isEmpty(name) && !name.equals(FirebaseApp.DEFAULT_APP_NAME)) {
                    FirebaseApp.initializeApp(context, newOptions, name);
                } else {
                    FirebaseApp.initializeApp(context, newOptions);
                }
            } else {
                Log.d(TAG, "No config changes");
            }

            WritableMap response = Arguments.createMap();
            response.putString("apiKey", apiKey);
            response.putString("applicationId", applicationId);
            response.putString("databaseUrl", databaseUrl);
            response.putString("gcmSenderId", gcmSenderId);
            response.putString("storageBucket", storageBucket);

            promise.resolve(response);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getMessage(), ex);
        }
    }

    @ReactMethod
    public void getName(final String name, final Promise promise) {
        try {
            promise.resolve(this.getInstance(name).getName());
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getMessage(), ex);
        }
    }

    @ReactMethod
    public void getOptions(final String name, final Promise promise) {
        try {
            FirebaseOptions options = this.getInstance(name).getOptions();

            WritableMap response = Arguments.createMap();
            response.putString("apiKey", options.getApiKey());
            response.putString("applicationId", options.getApplicationId());
            response.putString("databaseUrl", options.getDatabaseUrl());
            response.putString("gcmSenderId", options.getGcmSenderId());
            response.putString("storageBucket", options.getStorageBucket());

            promise.resolve(response);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getMessage(), ex);
        }
    }

    @ReactMethod
    public void hashCode(final String name, final Promise promise) {
      try {
        promise.resolve(this.getInstance(name).hashCode());
      } catch (IllegalStateException ex) {
        promise.reject("IllegalStateException", ex.getMessage(), ex);
      }
    }

    @ReactMethod
    public void setAutomaticResourceManagementEnabled(Boolean enabled, final String name) {
        this.getInstance(name).setAutomaticResourceManagementEnabled(enabled);
    }
}
