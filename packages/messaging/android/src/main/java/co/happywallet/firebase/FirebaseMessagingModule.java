package co.happywallet.firebase.messaging;

import co.happywallet.firebase.helpers.StringHelper;

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

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class FirebaseMessagingModule extends ReactContextBaseJavaModule {
    private static final String TAG = "FirebaseMessaging";

    public FirebaseMessagingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * @return
     */
    @Override
    public String getName() {
        return TAG;
    }
}
