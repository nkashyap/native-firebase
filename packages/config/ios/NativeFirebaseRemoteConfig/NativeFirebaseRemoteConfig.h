//
//  NativeFirebaseRemoteConfig.h
//  NativeFirebaseRemoteConfig
//
//  Created by Nisheeth Kashyap on 11/02/2017.
//  Copyright © 2017 UI Guru Ltd. All rights reserved.
//

#ifndef NativeFirebaseRemoteConfig_h
#define NativeFirebaseRemoteConfig_h

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <Firebase.h>

@interface NativeFirebaseRemoteConfig : NSObject <RCTBridgeModule>
{
    
}


@property FIRRemoteConfig *remoteConfig;


- (NSDictionary *)toJSON: (nullable FIRRemoteConfigValue *)options;


- (FIRRemoteConfigValue *) getConfig: (nullable NSString *)key
                           namespace: (nullable NSString *)namespace;


- (void) fetch: (nonnull NSNumber *)cacheExpirationSeconds
      resolver: (RCTPromiseResolveBlock)resolve
      rejecter: (RCTPromiseRejectBlock)reject;


- (void) getBoolean: (nullable NSString *)key
          namespace: (nullable NSString *)namespace
           resolver: (RCTPromiseResolveBlock)resolve
           rejecter: (RCTPromiseRejectBlock)reject;


- (void) getByteArray: (nullable NSString *)key
            namespace: (nullable NSString *)namespace
             resolver: (RCTPromiseResolveBlock)resolve
             rejecter: (RCTPromiseRejectBlock)reject;


- (void) getDouble: (nullable NSString *)key
         namespace: (nullable NSString *)namespace
          resolver: (RCTPromiseResolveBlock)resolve
          rejecter: (RCTPromiseRejectBlock)reject;


- (void) getInfo: (RCTPromiseResolveBlock)resolve
        rejecter: (RCTPromiseRejectBlock)reject;


- (void) getKeysByPrefix: (nullable NSString *)prefix
               namespace: (nullable NSString *)namespace
                resolver: (RCTPromiseResolveBlock)resolve
                rejecter: (RCTPromiseRejectBlock)reject;


- (void) getLong: (nullable NSString *)key
       namespace: (nullable NSString *)namespace
        resolver: (RCTPromiseResolveBlock)resolve
        rejecter: (RCTPromiseRejectBlock)reject;


- (void) getString: (nullable NSString *)key
         namespace: (nullable NSString *)namespace
          resolver: (RCTPromiseResolveBlock)resolve
          rejecter: (RCTPromiseRejectBlock)reject;


- (void) getValue: (nullable NSString *)key
        namespace: (nullable NSString *)namespace
         resolver: (RCTPromiseResolveBlock)resolve
         rejecter: (RCTPromiseRejectBlock)reject;


- (void) setConfigSettings: (BOOL *)developerModeEnabled
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject;


- (void) setDefaults: (nullable NSDictionary *)defaults
           namespace: (nullable NSString *)namespace
            resolver: (RCTPromiseResolveBlock)resolve
            rejecter: (RCTPromiseRejectBlock)reject;


- (void) setDefaultsFromFile: (nullable NSString *)fileName
                   namespace: (nullable NSString *)namespace
                    resolver: (RCTPromiseResolveBlock)resolve
                    rejecter: (RCTPromiseRejectBlock)reject;


// IOS only
- (void) getByKey: (nonnull NSString *)key
         resolver: (RCTPromiseResolveBlock)resolve
         rejecter: (RCTPromiseRejectBlock)reject;


- (void) getAllKeys: (nonnull FIRRemoteConfigSource *)source
          namespace: (nullable NSString *)namespace
           resolver: (RCTPromiseResolveBlock)resolve
           rejecter: (RCTPromiseRejectBlock)reject;


- (void) getDefaultValue: (nullable NSString *)key
               namespace: (nullable NSString *)namespace
                resolver: (RCTPromiseResolveBlock)resolve
                rejecter: (RCTPromiseRejectBlock)reject;

@end

#endif
