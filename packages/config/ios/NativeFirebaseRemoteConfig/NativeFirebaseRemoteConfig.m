//
//  NativeFirebaseRemoteConfig.m
//  NativeFirebaseRemoteConfig
//
//  Created by Nisheeth Kashyap on 11/02/2017.
//  Copyright © 2017 UI Guru Ltd. All rights reserved.
//

#import "NativeFirebaseRemoteConfig.h"

@implementation RCTConvert (NativeFirebaseRemoteConfigSource)
RCT_ENUM_CONVERTER(
                   FIRRemoteConfigSource,
                   (@{
                      @"VALUE_SOURCE_REMOTE" : @(FIRRemoteConfigSourceRemote),
                      @"VALUE_SOURCE_DEFAULT" : @(FIRRemoteConfigSourceDefault),
                      @"VALUE_SOURCE_STATIC" : @(FIRRemoteConfigSourceStatic)
                      }),
                   FIRRemoteConfigSourceDefault,
                   stringValue
                   )
@end

@implementation RCTConvert (NativeFirebaseRemoteConfigFetchStatus)
RCT_ENUM_CONVERTER(
                   FIRRemoteConfigFetchStatus,
                   (@{
                      @"LAST_FETCH_STATUS_SUCCESS" : @(FIRRemoteConfigFetchStatusSuccess),
                      @"LAST_FETCH_STATUS_FAILURE" : @(FIRRemoteConfigFetchStatusFailure),
                      @"LAST_FETCH_STATUS_THROTTLED" : @(FIRRemoteConfigFetchStatusThrottled),
                      @"LAST_FETCH_STATUS_NO_FETCH_YET" : @(FIRRemoteConfigFetchStatusNoFetchYet)
                      }),
                   FIRRemoteConfigFetchStatusNoFetchYet,
                   integerValue
                   )
@end



@implementation NativeFirebaseRemoteConfig


RCT_EXPORT_MODULE(FirebaseRemoteConfig);


// Run on a different thread
- (dispatch_queue_t)methodQueue
{
    return dispatch_queue_create("co.happywallet.firebase.config", DISPATCH_QUEUE_SERIAL);
}


- (NSDictionary *)constantsToExport
{
    return @{
             @"DEFAULT_VALUE_FOR_BOOLEAN" : @(NO),
             @"DEFAULT_VALUE_FOR_DOUBLE" : @(0.0),
             @"DEFAULT_VALUE_FOR_LONG" : @(0),
             @"DEFAULT_VALUE_FOR_STRING" : @(""),
             @"VALUE_SOURCE_REMOTE" : @(FIRRemoteConfigSourceRemote),
             @"VALUE_SOURCE_DEFAULT" : @(FIRRemoteConfigSourceDefault),
             @"VALUE_SOURCE_STATIC" : @(FIRRemoteConfigSourceStatic),
             @"LAST_FETCH_STATUS_SUCCESS" : @(FIRRemoteConfigFetchStatusSuccess),
             @"LAST_FETCH_STATUS_FAILURE" : @(FIRRemoteConfigFetchStatusFailure),
             @"LAST_FETCH_STATUS_THROTTLED" : @(FIRRemoteConfigFetchStatusThrottled),
             @"LAST_FETCH_STATUS_NO_FETCH_YET" : @(FIRRemoteConfigFetchStatusNoFetchYet)
             };
};


- (id)init
{
    self = [super init];
    
    if (self) {
        self.remoteConfig = [FIRRemoteConfig remoteConfig];
    }
    
    return self;
}


- (NSDictionary *)toJSON: (nullable FIRRemoteConfigValue *)options
{
    BOOL boolValue = false;
    double doubleValue = 0.0;
    long longValue = 0;
    NSString *stringValue = @"";
    NSString *dataValue = @"";
    NSNumber *source;
    switch(options.source) {
        case FIRRemoteConfigSourceDefault:
            source = @(1);
            break;
        case FIRRemoteConfigSourceStatic:
            source = @(2);
            break;
        default:
            // FIRRemoteConfigSourceRemote
            source = @(0);
            break;
    }
    
    if (options.dataValue.length > 0) {
        dataValue = [NSString stringWithUTF8String:[options.dataValue bytes]];
    }
    
    if (options.stringValue != nil) {
        stringValue = options.stringValue;
    }

    if (options.numberValue != nil) {
        doubleValue = options.numberValue.doubleValue;
        longValue = options.numberValue.longValue;
    }
    
    if (options.boolValue != nil) {
        boolValue = options.boolValue;
    }
    
    NSDictionary *json = @{
                           @"byteArray": dataValue,
                           @"long": @(longValue),
                           @"string": stringValue,
                           @"source": source,
                           @"boolean": @(boolValue),
                           @"double": @(doubleValue)
                           };
    
    return json;
}


- (FIRRemoteConfigValue *)getConfig: (nullable NSString *)key
                          namespace: (nullable NSString *)namespace
{
    if (namespace != nil) {
        return [self.remoteConfig configValueForKey:key namespace:namespace];
    } else {
        return [self.remoteConfig configValueForKey:key];
    }
}


RCT_EXPORT_METHOD(fetch: (nonnull NSNumber *)cacheExpirationSeconds
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    NSTimeInterval expirationDuration = [cacheExpirationSeconds doubleValue];
    
    [self.remoteConfig fetchWithExpirationDuration:expirationDuration completionHandler:^(FIRRemoteConfigFetchStatus status, NSError *error) {
        if (status == FIRRemoteConfigFetchStatusSuccess) {
            resolve(@([self.remoteConfig activateFetched]));
        } else {
            NSDictionary *err = @{
                                  @"error": @"FetchError",
                                  @"msg": [error localizedDescription]
                                  };
            reject(@"FetchError", @"Failed to complete fetch task successfully", err);
        }
    }];
    
}


RCT_EXPORT_METHOD(getBoolean: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    resolve(@(config.boolValue));
}


RCT_EXPORT_METHOD(getByteArray: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    NSString* value = @"";
    if (config.dataValue.length > 0) {
        value = [NSString stringWithUTF8String:[config.dataValue bytes]];
    }
    resolve(value);
}


RCT_EXPORT_METHOD(getDouble: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    resolve(@(config.numberValue.doubleValue));
}


RCT_EXPORT_METHOD(getInfo: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    NSNumber *lastFetchStatus;
    NSNumber *lastFetchTime = 0;
    BOOL isDeveloperModeEnabled = self.remoteConfig.configSettings.isDeveloperModeEnabled;
    
    switch(self.remoteConfig.lastFetchStatus) {
        case FIRRemoteConfigFetchStatusSuccess:
            lastFetchStatus = @(1);
            break;
        case FIRRemoteConfigFetchStatusFailure:
            lastFetchStatus = @(2);
            break;
        case FIRRemoteConfigFetchStatusThrottled:
            lastFetchStatus = @(3);
            break;
        default:
            // FIRRemoteConfigFetchStatusNoFetchYet
            lastFetchStatus = @(0);
            break;
    }
    
    if (self.remoteConfig.lastFetchTime != nil){
        lastFetchTime = [NSNumber numberWithDouble:self.remoteConfig.lastFetchTime.timeIntervalSince1970];
    }
    
    NSDictionary *value = @{
                            @"isDeveloperModeEnabled": @(isDeveloperModeEnabled),
                            @"lastFetchStatus": lastFetchStatus,
                            @"lastFetchTime": lastFetchTime
                            };
    
    resolve(value);
}


RCT_EXPORT_METHOD(getKeysByPrefix: (nullable NSString *)prefix
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    NSSet *data;
    if (namespace == nil) {
        data = [self.remoteConfig keysWithPrefix:prefix];
    } else {
        data = [self.remoteConfig keysWithPrefix:prefix namespace:namespace];
    }
    resolve([[data allObjects] mutableCopy]);
}


RCT_EXPORT_METHOD(getLong: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    resolve(@(config.numberValue.longValue));
}


RCT_EXPORT_METHOD(getString: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    resolve(config.stringValue);
}


RCT_EXPORT_METHOD(getValue: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    resolve([self toJSON:config]);
}


RCT_EXPORT_METHOD(setConfigSettings:(BOOL *)developerModeEnabled
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigSettings *remoteConfigSettings = [[FIRRemoteConfigSettings alloc] initWithDeveloperModeEnabled:developerModeEnabled];
    self.remoteConfig.configSettings = remoteConfigSettings;
    resolve(@(self.remoteConfig.configSettings.isDeveloperModeEnabled));
}


RCT_EXPORT_METHOD(setDefaults: (nullable NSDictionary *)defaults
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    if (namespace == nil) {
        [self.remoteConfig setDefaults:defaults];
    } else {
        [self.remoteConfig setDefaults:defaults namespace:namespace];
    }
    
    resolve(@YES);
}


RCT_EXPORT_METHOD(setDefaultsFromFile: (nullable NSString *)fileName
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    if (namespace == nil) {
        [self.remoteConfig setDefaultsFromPlistFileName:fileName];
    } else {
        [self.remoteConfig setDefaultsFromPlistFileName:fileName namespace:namespace];
    }
    
    resolve(@YES);
}




// IOS only
RCT_EXPORT_METHOD(getByKey: (nonnull NSString *)key
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = self.remoteConfig[key];
    resolve([self toJSON:config]);
}


RCT_EXPORT_METHOD(getAllKeys: (nonnull FIRRemoteConfigSource *)source
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    NSArray<NSString *> *config = [self.remoteConfig allKeysFromSource:source namespace:namespace];
    resolve(config);
}


RCT_EXPORT_METHOD(getDefaultValue: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self.remoteConfig defaultValueForKey:key namespace:namespace];
    resolve([self toJSON:config]);
}

@end
