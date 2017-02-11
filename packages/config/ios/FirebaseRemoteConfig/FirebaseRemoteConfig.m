//
//  FirebaseRemoteConfig.m
//  FirebaseRemoteConfig
//
//  Created by Nisheeth Kashyap on 11/02/2017.
//  Copyright © 2017 UI Guru Ltd. All rights reserved.
//

#import <React/RCTConvert.h>
#import "FirebaseRemoteConfig.h"

@implementation RCTConvert (FirebaseRemoteConfigSource)
RCT_ENUM_CONVERTER(
                   FIRRemoteConfigSource,
                   (@{
                      @"VALUE_SOURCE_REMOTE" : @(FIRRemoteConfigSourceRemote),
                      @"VALUE_SOURCE_DEFAULT" : @(FIRRemoteConfigSourceDefault),
                      @"VALUE_SOURCE_STATIC" : @(FIRRemoteConfigSourceStatic)
                      }),
                   FIRRemoteConfigSourceDefault,
                   integerValue
                   )
@end

@implementation RCTConvert (FirebaseRemoteConfigFetchStatus)
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



@implementation FirebaseRemoteConfig

RCT_EXPORT_MODULE();

// Run on a different thread
- (dispatch_queue_t)methodQueue
{
    return dispatch_queue_create("co.happywallet.firebase.config", DISPATCH_QUEUE_SERIAL);
}

- (NSDictionary *)constantsToExport
{
    return @{
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
            [self.remoteConfig activateFetched];
            resolve(@YES);
        } else {
            NSDictionary *err = @{
                                  @"error": @"FetchError",
                                  @"msg": [error localizedDescription]
                                  };
            reject(@"FetchError", @"Failed to complete fetch task successfully", err);
        }
    }];
    
}

RCT_EXPORT_METHOD(isDeveloperModeEnabled: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    if (self.remoteConfig.configSettings.isDeveloperModeEnabled) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
}

RCT_EXPORT_METHOD(getFetchTimeMillis: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    if (self.remoteConfig.lastFetchTime != nil){
        NSNumber *value = [NSNumber numberWithDouble:self.remoteConfig.lastFetchTime.timeIntervalSince1970];
        resolve(value);
    } else {
        resolve(@(0));
    }
}

RCT_EXPORT_METHOD(getLastFetchStatus: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    NSNumber *value;
    switch(self.remoteConfig.lastFetchStatus) {
        case FIRRemoteConfigFetchStatusSuccess:
            value = @(1);
            break;
        case FIRRemoteConfigFetchStatusFailure:
            value = @(2);
            break;
        case FIRRemoteConfigFetchStatusThrottled:
            value = @(3);
            break;
        default:
            // FIRRemoteConfigFetchStatusNoFetchYet
            value = @(0);
            break;
    }
    resolve(value);
}

RCT_EXPORT_METHOD(getString: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    NSString *value = config.stringValue;
    resolve(value);
}

RCT_EXPORT_METHOD(getBoolean: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    if (config.boolValue) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
}

RCT_EXPORT_METHOD(getDouble: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    NSNumber *value = config.numberValue;
    resolve(value);
}

RCT_EXPORT_METHOD(getLong: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    NSNumber *value = config.numberValue;
    resolve(value);
}

RCT_EXPORT_METHOD(getSource: (nullable NSString *)key
                  namespace: (nullable NSString *)namespace
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRRemoteConfigValue *config = [self getConfig:key namespace:namespace];
    NSNumber *value;
    switch(config.source) {
        case FIRRemoteConfigSourceDefault:
            value = @(1);
            break;
        case FIRRemoteConfigSourceStatic:
            value = @(2);
            break;
        default:
            // FIRRemoteConfigSourceRemote
            value = @(0);
            break;
    }
    resolve(value);}

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
    NSMutableArray *value = [[data allObjects] mutableCopy];
    resolve(value);
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

RCT_EXPORT_METHOD(setDeveloperModeEnabled:(BOOL *)developerModeEnabled)
{
    FIRRemoteConfigSettings *remoteConfigSettings = [[FIRRemoteConfigSettings alloc] initWithDeveloperModeEnabled:developerModeEnabled];
    self.remoteConfig.configSettings = remoteConfigSettings;
}

@end
