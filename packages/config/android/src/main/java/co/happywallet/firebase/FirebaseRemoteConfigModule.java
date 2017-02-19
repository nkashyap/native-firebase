package co.happywallet.firebase.config;

import co.happywallet.firebase.helpers.StringHelper;
import co.happywallet.firebase.helpers.ReactNativeHelper;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.NativeModule;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.facebook.react.bridge.WritableMap;
import com.google.firebase.remoteconfig.FirebaseRemoteConfig;
import com.google.firebase.remoteconfig.FirebaseRemoteConfigInfo;
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

        constants.put("DEFAULT_VALUE_FOR_BOOLEAN", FirebaseRemoteConfig.DEFAULT_VALUE_FOR_BOOLEAN);
        constants.put("DEFAULT_VALUE_FOR_DOUBLE", FirebaseRemoteConfig.DEFAULT_VALUE_FOR_DOUBLE);
        constants.put("DEFAULT_VALUE_FOR_LONG", FirebaseRemoteConfig.DEFAULT_VALUE_FOR_LONG);
        constants.put("DEFAULT_VALUE_FOR_STRING", FirebaseRemoteConfig.DEFAULT_VALUE_FOR_STRING);

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
        FirebaseRemoteConfig instance = FirebaseRemoteConfig.getInstance();
        if (StringHelper.isEmpty(namespace)) {
            return instance.getValue(key);
        } else {
            return instance.getValue(key, namespace);
        }
    }

    @ReactMethod
    public void fetch(final Integer cacheExpirationSeconds, final Promise promise) {
        try {
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
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void getBoolean(String key, String namespace, Promise promise) {
        try {
            promise.resolve(this.getConfig(key, namespace).asBoolean());
        } catch (IllegalArgumentException ex) {
            promise.resolve(FirebaseRemoteConfig.DEFAULT_VALUE_FOR_BOOLEAN);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void getByteArray(String key, String namespace, Promise promise) {
        try {
            String value = new String(this.getConfig(key, namespace).asByteArray());
            promise.resolve(value);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void getDouble(String key, String namespace, Promise promise) {
        try {
            promise.resolve(this.getConfig(key, namespace).asDouble());
        } catch (IllegalArgumentException ex) {
            promise.resolve(FirebaseRemoteConfig.DEFAULT_VALUE_FOR_DOUBLE);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void getInfo(Promise promise) {
        try {
            FirebaseRemoteConfigInfo info = FirebaseRemoteConfig.getInstance().getInfo();

            WritableMap response = Arguments.createMap();
            response.putBoolean("isDeveloperModeEnabled", info.getConfigSettings().isDeveloperModeEnabled());
            response.putInt("lastFetchStatus", info.getLastFetchStatus());

            // Promise.resolve throw exception when Long value is passed in
            // convert it to string in java and back to number in javascript
            response.putString("lastFetchTime", String.valueOf(info.getFetchTimeMillis()));

            promise.resolve(response);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void getKeysByPrefix(String prefix, String namespace, Promise promise) {
        try {
            FirebaseRemoteConfig instance = FirebaseRemoteConfig.getInstance();
            Set<String> value;
            if (StringHelper.isEmpty(namespace)) {
                value = instance.getKeysByPrefix(prefix);
            } else {
                value = instance.getKeysByPrefix(prefix, namespace);
            }

            String[] string = value.toArray(new String[value.size()]);
            promise.resolve(Arguments.fromArray(string));
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void getLong(String key, String namespace, Promise promise) {
        try {
            // Promise.resolve throw exception when Long value is passed in
            // convert it to string in java and back to number in javascript
            promise.resolve(this.getConfig(key, namespace).asString());
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void getString(String key, String namespace, Promise promise) {
        try {
            promise.resolve(this.getConfig(key, namespace).asString());
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void getValue(String key, String namespace, Promise promise) {
        try {
            FirebaseRemoteConfigValue value = this.getConfig(key, namespace);

            WritableMap response = Arguments.createMap();
            response.putString("byteArray", new String(value.asByteArray()));
            response.putString("long", String.valueOf(value));
            response.putString("string", value.asString());
            response.putInt("source", value.getSource());

            try {
                response.putBoolean("boolean", value.asBoolean());
            } catch (IllegalArgumentException ex) {
                response.putBoolean("boolean", FirebaseRemoteConfig.DEFAULT_VALUE_FOR_BOOLEAN);
            }

            try {
                response.putDouble("double", value.asDouble());
            } catch (IllegalArgumentException ex) {
                response.putDouble("double", FirebaseRemoteConfig.DEFAULT_VALUE_FOR_DOUBLE);
            }

            promise.resolve(response);
        } catch (IllegalArgumentException ex) {
            promise.reject("IllegalArgumentException", ex.getLocalizedMessage(), ex);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void setConfigSettings(Boolean developerModeEnabled, Promise promise) {
        try {
            FirebaseRemoteConfig instance = FirebaseRemoteConfig.getInstance();
            FirebaseRemoteConfigSettings configSettings = new FirebaseRemoteConfigSettings.Builder()
                    .setDeveloperModeEnabled(developerModeEnabled)
                    .build();
            instance.setConfigSettings(configSettings);
            promise.resolve(instance.getInfo().getConfigSettings().isDeveloperModeEnabled());
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void setDefaults(ReadableMap defaults, String namespace, Promise promise) {
        try {
            FirebaseRemoteConfig instance = FirebaseRemoteConfig.getInstance();
            Map<String, Object> defaultSettings = ReactNativeHelper.recursivelyDeconstructReadableMap(defaults);

            if (StringHelper.isEmpty(namespace)) {
                instance.setDefaults(defaultSettings);
            } else {
                instance.setDefaults(defaultSettings, namespace);
            }

            promise.resolve(true);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }

    @ReactMethod
    public void setDefaultsFromFile(String filename, String namespace, Promise promise) {
        try {
            String packageName = this.getReactApplicationContext().getPackageName();
            FirebaseRemoteConfig instance = FirebaseRemoteConfig.getInstance();
            int resourceId = this
                    .getReactApplicationContext()
                    .getResources()
                    .getIdentifier(filename, "xml", packageName);

            if (StringHelper.isEmpty(namespace)) {
                instance.setDefaults(resourceId);
            } else {
                instance.setDefaults(resourceId, namespace);
            }

            promise.resolve(true);
        } catch (IllegalStateException ex) {
            promise.reject("IllegalStateException", ex.getLocalizedMessage(), ex);
        }
    }
}
