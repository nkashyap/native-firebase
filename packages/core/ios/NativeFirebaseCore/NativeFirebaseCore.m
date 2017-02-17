//
//  NativeFirebaseCore.m
//  NativeFirebaseCore
//
//  Created by Nisheeth Kashyap on 10/02/2017.
//  Copyright © 2017 Nisheeth Kashyap. All rights reserved.
//

#import "NativeFirebaseCore.h"

@implementation NativeFirebaseCore

NSString *DEFAULT_APP = @"__FIRAPP_DEFAULT";

RCT_EXPORT_MODULE(FirebaseCore);

- (dispatch_queue_t)methodQueue
{
    return dispatch_queue_create("co.happywallet.firebase.core", DISPATCH_QUEUE_SERIAL);
}


- (NSDictionary *)constantsToExport
{
    return @{@"DEFAULT_APP_NAME" : DEFAULT_APP};
};


- (NSString *)getValue: (nullable NSString *)value
{
    if (value == nil){
        return @"";
    }

    return value;
}


- (FIRApp *)getApp: (nullable NSString *)name
{
    if (name == nil || [name isEqualToString:DEFAULT_APP]) {
        return [FIRApp defaultApp];
    } else {
        return [FIRApp appNamed:name];
    }
}


- (NSDictionary *)toJSON: (nullable NSString *)name
                 options: (nullable FIROptions *)options
{
    NSString *APIKey = [self getValue:options.APIKey];
    NSString *googleAppID = [self getValue:options.googleAppID];
    NSString *databaseURL = [self getValue:options.databaseURL];
    NSString *GCMSenderID = [self getValue:options.GCMSenderID];
    NSString *storageBucket = [self getValue:options.storageBucket];
    NSString *clientID = [self getValue:options.clientID];
    NSString *trackingID = [self getValue:options.trackingID];
    NSString *androidClientID = [self getValue:options.androidClientID];
    NSString *deepLinkURLScheme = [self getValue:options.deepLinkURLScheme];

    NSMutableDictionary *json = [NSMutableDictionary dictionary];

    [json setValue:APIKey forKey:@"apiKey"];
    [json setValue:googleAppID forKey:@"applicationId"];
    [json setValue:databaseURL forKey:@"databaseUrl"];
    [json setValue:GCMSenderID forKey:@"gcmSenderId"];
    [json setValue:storageBucket forKey:@"storageBucket"];
    [json setValue:clientID forKey:@"clientId"];
    [json setValue:trackingID forKey:@"trackingId"];
    [json setValue:androidClientID forKey:@"androidClientId"];
    [json setValue:deepLinkURLScheme forKey:@"deepLinkURLScheme"];

    if (name != nil) {
        [json setValue:name forKey:@"name"];
    }

    return json;
}


- (FIROptions *)getOptions: (nullable NSDictionary *)options
{
    NSDictionary *keyMapping = @{
                                 @"API_KEY": @"apiKey",
                                 @"GOOGLE_APP_ID": @"applicationId",
                                 @"DATABASE_URL": @"databaseUrl",
                                 @"GCM_SENDER_ID": @"gcmSenderId",
                                 @"STORAGE_BUCKET": @"storageBucket",

                                 @"BUNDLE_ID": @"bundleId",
                                 @"CLIENT_ID": @"clientId",

                                 @"TRACKING_ID": @"trackingId",
                                 @"ANDROID_CLIENT_ID": @"androidClientId",
                                 @"DEEP_LINK_SCHEME": @"deepLinkURLScheme"
                                 };

    NSArray *optionKeys = [keyMapping allKeys];
    NSMutableDictionary *props;
    NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist"];

    if ([[NSFileManager defaultManager] fileExistsAtPath:plistPath]) {
        props = [NSMutableDictionary dictionaryWithContentsOfFile:plistPath];
    } else {
        props = [[NSMutableDictionary alloc] initWithCapacity:[optionKeys count]];
    }

    // Prefer the user configuration options over the default options
    for (int i=0; i < [optionKeys count]; i++) {
        NSString *key = [optionKeys objectAtIndex:i];
        NSString *name = [keyMapping objectForKey:key];
        NSString *value = [options valueForKey:name];

        if (value != nil) {
            [props setValue:value forKey:key];
        }
    }

    // Bundle ID either from options OR from the main bundle
    NSString *bundleId = [options valueForKey:@"bundleId"];
    if (bundleId == nil) {
        bundleId = [[NSBundle mainBundle] bundleIdentifier];
        [props setValue:bundleId forKey:@"BUNDLE_ID"];
    }

    return [[FIROptions alloc]
            initWithGoogleAppID:[props valueForKey:@"GOOGLE_APP_ID"]
            bundleID:[props valueForKey:@"BUNDLE_ID"]
            GCMSenderID:[props valueForKey:@"GCM_SENDER_ID"]
            APIKey:[props valueForKey:@"API_KEY"]
            clientID:[props valueForKey:@"CLIENT_ID"]
            trackingID:[props valueForKey:@"TRACKING_ID"]
            androidClientID:[props valueForKey:@"ANDROID_CLIENT_ID"]
            databaseURL:[props valueForKey:@"DATABASE_URL"]
            storageBucket:[props valueForKey:@"STORAGE_BUCKET"]
            deepLinkURLScheme:[props valueForKey:@"DEEP_LINK_SCHEME"]];
}


RCT_EXPORT_METHOD(getApps: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    NSDictionary *apps = [FIRApp allApps];
    NSArray *values = [apps allValues];
    NSMutableArray *props = [[NSMutableArray alloc] initWithCapacity:[values count]];

    for (int i=0; i < [values count]; i++) {
        FIRApp *value = [values objectAtIndex:i];

        if (value != nil) {
            [props addObject:value.name];
        }
    }

    resolve(props);
}


RCT_EXPORT_METHOD(getInstance: (nullable NSString *)name
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRApp *app = [self getApp:name];

    if (app != nil) {
        resolve([self toJSON:app.name options:app.options]);
    } else {
        resolve(@(NO));
    }
}


RCT_EXPORT_METHOD(initializeApp: (nullable NSDictionary *)options
                  name: (nullable NSString *)name
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    @try{
        if (name == nil || [name isEqualToString:DEFAULT_APP]) {
            if ([FIRApp defaultApp] == nil){
                if (options == nil) {
                    [FIRApp configure];
                } else {
                    FIROptions *opts = [self getOptions:options];
                    [FIRApp configureWithOptions:opts];
                }
            }
        } else {
            if (options == nil) {
                [FIRApp configureWithName:name options:nil];
            } else {
                FIROptions *opts = [self getOptions:options];
                [FIRApp configureWithName:name options:opts];
            }
        }

        FIRApp *app = [self getApp:name];
        resolve([self toJSON:nil options:app.options]);
    }
    @catch(NSException *exception) {
        reject([exception name], [exception debugDescription], exception);
    }
}


RCT_EXPORT_METHOD(getName: (nullable NSString *)name
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRApp *app = [self getApp:name];

    if (app != nil) {
        resolve(app.name);
    } else {
        resolve(@(NO));
    }
}


RCT_EXPORT_METHOD(getOptions: (nullable NSString *)name
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRApp *app = [self getApp:name];

    if (app != nil) {
        resolve([self toJSON:nil options:app.options]);
    } else {
        resolve(@(NO));
    }
}

// TODO Not implemented
RCT_EXPORT_METHOD(deleteApp: (nullable NSString *)name
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    FIRApp *app = [self getApp:name];

    if (app != nil) {
        resolve(@(YES));
    } else {
        resolve(@(NO));
    }
}
@end
