package co.happywallet.firebase;

import co.happywallet.firebase.helpers.StringHelper;

import java.util.Map;
import java.util.HashMap;

import android.content.Context;

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

//@SuppressWarnings("WeakerAccess")
public class FirebaseCoreModule extends ReactContextBaseJavaModule implements
  LifecycleEventListener {
  private static final String TAG = "FirebaseCore";
  private FirebaseApp app;

  public FirebaseCoreModule(ReactApplicationContext reactContext) {
    super(reactContext);
    app = FirebaseApp.getInstance();
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
  public void initializeApp(final ReadableMap params, String name, final Promise promise) {
    Context context = getReactApplicationContext().getBaseContext();
    FirebaseOptions.Builder builder = new FirebaseOptions.Builder();
    FirebaseOptions options = FirebaseOptions.fromResource(context);

    if (options == null) {
      options = new FirebaseOptions.Builder().build();
    }

    String applicationId = this.getValue(params, "applicationId", options.getApplicationId());
    String apiKey = this.getValue(params, "apiKey", options.getApiKey());
    String gcmSenderID = this.getValue(params, "gcmSenderID", options.getGcmSenderId());
    String storageBucket = this.getValue(params, "storageBucket", options.getStorageBucket());
    String databaseUrl = this.getValue(params, "databaseUrl", options.getDatabaseUrl());

    builder.setApplicationId(applicationId);
    builder.setApiKey(apiKey);
    builder.setGcmSenderId(gcmSenderID);
    builder.setStorageBucket(storageBucket);
    builder.setDatabaseUrl(databaseUrl);

    try {
      FirebaseOptions newOptions = builder.build();

      if (!options.equals(newOptions)) {
        if (StringHelper.isEmpty(name)) {
          app = FirebaseApp.initializeApp(context, newOptions);
        } else {
          app = FirebaseApp.initializeApp(context, newOptions, name);
        }
      }

      WritableMap response = Arguments.createMap();
      response.putString("applicationId", applicationId);
      response.putString("apiKey", apiKey);
      response.putString("gcmSenderID", gcmSenderID);
      response.putString("storageBucket", storageBucket);
      response.putString("databaseUrl", databaseUrl);

      promise.resolve(response);
    } catch (IllegalStateException ex) {
      promise.reject("IllegalStateException", ex.getMessage(), ex);
    }
  }

  @ReactMethod
  public void setAutomaticResourceManagementEnabled(Boolean enabled) {
    app.setAutomaticResourceManagementEnabled(enabled);
  }
}
