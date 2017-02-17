package com.quickstart;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import co.happywallet.firebase.admob.FirebaseAdMobPackage;
import co.happywallet.firebase.analytics.FirebaseAnalyticsPackage;
import co.happywallet.firebase.appindexing.FirebaseAppIndexingPackage;
import co.happywallet.firebase.auth.FirebaseAuthPackage;
import co.happywallet.firebase.config.FirebaseRemoteConfigPackage;
import co.happywallet.firebase.FirebaseCorePackage;
import co.happywallet.firebase.crash.FirebaseCrashPackage;
import co.happywallet.firebase.database.FirebaseDatabasePackage;
import co.happywallet.firebase.dynamiclinks.FirebaseDynamicLinksPackage;
import co.happywallet.firebase.invites.FirebaseInvitesPackage;
import co.happywallet.firebase.messaging.FirebaseMessagingPackage;
import co.happywallet.firebase.storage.FirebaseStoragePackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new FirebaseAdMobPackage(),
                    new FirebaseAnalyticsPackage(),
                    new FirebaseAppIndexingPackage(),
                    new FirebaseAuthPackage(),
                    new FirebaseRemoteConfigPackage(),
                    new FirebaseCorePackage(),
                    new FirebaseCrashPackage(),
                    new FirebaseDatabasePackage(),
                    new FirebaseDynamicLinksPackage(),
                    new FirebaseInvitesPackage(),
                    new FirebaseMessagingPackage(),
                    new FirebaseStoragePackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
