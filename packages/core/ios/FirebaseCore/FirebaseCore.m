//
//  FirebaseCore.m
//  FirebaseCore
//
//  Created by Nisheeth Kashyap on 10/02/2017.
//  Copyright © 2017 Nisheeth Kashyap. All rights reserved.
//

#import <React/RCTConvert.h>
#import "FirebaseCore.h"

@implementation FirebaseCore

NSString *DEFAULT_APP = @"__FIRAPP_DEFAULT";

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
    return dispatch_queue_create("co.happywallet.firebase.core", DISPATCH_QUEUE_SERIAL);
}


- (NSDictionary *)constantsToExport
{
    return @{@"DEFAULT_APP_NAME" : DEFAULT_APP};
};


- (FIRApp *)getApp: (nullable NSString *)name
{
    if (name == nil || [name isEqualToString:DEFAULT_APP]) {
        return [FIRApp defaultApp];
    } else {
        return [FIRApp appNamed:name];
    }
}



- (NSDictionary *)toJSON: (nullable FIROptions *)options
{
    return @{
             @"apiKey":options.APIKey,
             @"applicationId":options.googleAppID,
             @"databaseUrl":options.databaseURL,
             @"gcmSenderId":options.GCMSenderID,
             @"storageBucket":options.storageBucket,
             @"clientId":options.clientID,
             @"trackingId":options.trackingID,
             @"androidClientId":options.androidClientID,
             @"deepLinkURLScheme":options.deepLinkURLScheme
             };
}


- (FIROptions *)getFIROptions: (nullable NSDictionary *)options
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
    resolve(apps);
}



RCT_EXPORT_METHOD(getInstance: (nullable NSString *)name
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



RCT_EXPORT_METHOD(initializeApp: (nullable NSDictionary *)options
                  name: (nullable NSString *)name
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    if (name == nil || [name isEqualToString:DEFAULT_APP]) {
        if (options == nil) {
            [FIRApp configure];
        } else {
            FIROptions *opts = [self getFIROptions:options];
            [FIRApp configureWithOptions:opts];
        }
    } else {
        if (options == nil) {
            [FIRApp configureWithName:name options:nil];
        } else {
            FIROptions *opts = [self getFIROptions:options];
            [FIRApp configureWithName:name options:opts];
        }
    }

    FIRApp *app = [self getApp:name];
    resolve([self toJSON:app.options]);
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
        resolve([self toJSON:app.options]);
    } else {
        resolve(@(NO));
    }
}

@end
