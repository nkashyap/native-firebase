package co.happywallet.firebase.config;

import co.happywallet.firebase.helpers.StringHelper;
import co.happywallet.firebase.helpers.ReactNativeHelper;

import android.support.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.NativeModule;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.google.firebase.remoteconfig.FirebaseRemoteConfig;
import com.google.firebase.remoteconfig.FirebaseRemoteConfigSettings;
import com.google.firebase.remoteconfig.FirebaseRemoteConfigValue;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class FirebaseRemoteConfigModule extends ReactContextBaseJavaModule {
    private static final String TAG = "FirebaseRemoteConfig";

    public FirebaseRemoteConfigModule(ReactApplicationContext reactContext) {
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

        constants.put("LAST_FETCH_STATUS_SUCCESS", FirebaseRemoteConfig.LAST_FETCH_STATUS_SUCCESS);
        constants.put("LAST_FETCH_STATUS_FAILURE", FirebaseRemoteConfig.LAST_FETCH_STATUS_FAILURE);
        constants.put("LAST_FETCH_STATUS_THROTTLED", FirebaseRemoteConfig.LAST_FETCH_STATUS_THROTTLED);
        constants.put("LAST_FETCH_STATUS_NO_FETCH_YET", FirebaseRemoteConfig.LAST_FETCH_STATUS_NO_FETCH_YET);

        constants.put("VALUE_SOURCE_DEFAULT", FirebaseRemoteConfig.VALUE_SOURCE_DEFAULT);
        constants.put("VALUE_SOURCE_REMOTE", FirebaseRemoteConfig.VALUE_SOURCE_REMOTE);
        constants.put("VALUE_SOURCE_STATIC", FirebaseRemoteConfig.VALUE_SOURCE_STATIC);

        return constants;
    }

    private FirebaseRemoteConfigValue getConfig(String key, String namespace) {
        if (StringHelper.isEmpty(namespace)) {
            return FirebaseRemoteConfig.getInstance().getValue(key);
        } else {
            return FirebaseRemoteConfig.getInstance().getValue(key, namespace);
        }
    }

    @ReactMethod
    public void fetch(final Integer cacheExpirationSeconds, final Promise promise) {
        Task fetchTask = FirebaseRemoteConfig.getInstance().fetch(cacheExpirationSeconds.longValue());
        fetchTask.addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                if (task.isSuccessful()) {
                    promise.resolve(FirebaseRemoteConfig.getInstance().activateFetched());
                } else {
                    promise.reject("FetchError", "Failed to complete fetch task successfully");
                }
            }
        });
    }

    @ReactMethod
    public void isDeveloperModeEnabled(Promise promise) {
        promise.resolve(FirebaseRemoteConfig.getInstance().getInfo().getConfigSettings().isDeveloperModeEnabled());
    }

    @ReactMethod
    public void getFetchTimeMillis(Promise promise) {
        // Promise.resolve throw exception when Long value is passed in
        // convert it to string in java and back to number in javascript
        promise.resolve(String.valueOf(FirebaseRemoteConfig.getInstance().getInfo().getFetchTimeMillis()));
    }

    @ReactMethod
    public void getLastFetchStatus(Promise promise) {
        promise.resolve(FirebaseRemoteConfig.getInstance().getInfo().getLastFetchStatus());
    }

    @ReactMethod
    public void getString(String key, String namespace, Promise promise) {
        promise.resolve(this.getConfig(key, namespace).asString());
    }

    @ReactMethod
    public void getBoolean(String key, String namespace, Promise promise) {
        promise.resolve(this.getConfig(key, namespace).asBoolean());
    }

    @ReactMethod
    public void getDouble(String key, String namespace, Promise promise) {
        promise.resolve(this.getConfig(key, namespace).asDouble());
    }

    @ReactMethod
    public void getLong(String key, String namespace, Promise promise) {
        // Promise.resolve throw exception when Long value is passed in
        // convert it to string in java and back to number in javascript
        promise.resolve(this.getConfig(key, namespace).asString());
    }

    @ReactMethod
    public void getSource(String key, String namespace, Promise promise) {
        promise.resolve(this.getConfig(key, namespace).getSource());
    }

    @ReactMethod
    public void getKeysByPrefix(String prefix, String namespace, Promise promise) {
        try {
            Set<String> value;

            if (StringHelper.isEmpty(namespace)) {
                value = FirebaseRemoteConfig.getInstance().getKeysByPrefix(prefix);
            } else {
                value = FirebaseRemoteConfig.getInstance().getKeysByPrefix(prefix, namespace);
            }

            String[] string = value.toArray(new String[value.size()]);
            promise.resolve(Arguments.fromArray(string));
        } catch (Exception e) {
            Log.d(TAG, "getKeysByPrefix: " + e);
            promise.reject("Exception", e.getLocalizedMessage(), e);
        }
    }

    @ReactMethod
    public void setDefaults(ReadableMap defaults, String namespace, Promise promise) {
        try {
            Map<String, Object> defaultSettings = ReactNativeHelper.recursivelyDeconstructReadableMap(defaults);

            if (StringHelper.isEmpty(namespace)) {
                FirebaseRemoteConfig.getInstance().setDefaults(defaultSettings);
            } else {
                FirebaseRemoteConfig.getInstance().setDefaults(defaultSettings, namespace);
            }

            promise.resolve(true);
        } catch (Exception e) {
            Log.d(TAG, "setDefaults: " + e);
            promise.reject("Exception", e.getLocalizedMessage(), e);
        }
    }

    @ReactMethod
    public void setDefaultsFromFile(String filename, String namespace, Promise promise) {
        try {
            String packageName = this.getReactApplicationContext().getPackageName();
            int resourceId = this
                    .getReactApplicationContext()
                    .getResources()
                    .getIdentifier(filename, "xml", packageName);

            if (StringHelper.isEmpty(namespace)) {
                FirebaseRemoteConfig.getInstance().setDefaults(resourceId);
            } else {
                FirebaseRemoteConfig.getInstance().setDefaults(resourceId, namespace);
            }

            promise.resolve(true);
        } catch (Exception e) {
            Log.d(TAG, "setDefaultsFromFile: " + e);
            promise.reject("Exception", e.getLocalizedMessage(), e);
        }
    }

    @ReactMethod
    public void setDeveloperModeEnabled(Boolean developerModeEnabled) {
        FirebaseRemoteConfigSettings configSettings = new FirebaseRemoteConfigSettings.Builder()
                .setDeveloperModeEnabled(developerModeEnabled)
                .build();
        FirebaseRemoteConfig.getInstance().setConfigSettings(configSettings);
    }
}
