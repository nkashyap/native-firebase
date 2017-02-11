//
//  FirebaseCore.m
//  FirebaseCore
//
//  Created by Nisheeth Kashyap on 10/02/2017.
//  Copyright © 2017 UI Guru Ltd. All rights reserved.
//

#import <React/RCTConvert.h>
#import "FirebaseCore.h"

@implementation FirebaseCore

RCT_EXPORT_MODULE();

// Run on a different thread
- (dispatch_queue_t)methodQueue
{
    return dispatch_queue_create("co.happywallet.firebase.core", DISPATCH_QUEUE_SERIAL);
}

- (NSDictionary *)constantsToExport
{
    return @{@"DEFAULT_APP_NAME" : @"__FIRAPP_DEFAULT"};
};


- (id)init
{
    self = [super init];

    if (self) {
    }

    return self;
}


RCT_EXPORT_METHOD(initializeApp: (nullable NSDictionary *)options
                  name: (nullable NSString *)name
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
    if (options == nil) {
        [FIRApp configure];
    }
    else if (name == nil) {
        [FIRApp configureWithOptions:options];
    } else {
        [FIRApp configureWithName:name options:options];
    }
    
    resolve(@YES);
}

@end
