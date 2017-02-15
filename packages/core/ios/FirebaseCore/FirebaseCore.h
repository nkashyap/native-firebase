//
//  FirebaseCore.h
//  FirebaseCore
//
//  Created by Nisheeth Kashyap on 10/02/2017.
//  Copyright © 2017 Nisheeth Kashyap. All rights reserved.
//

#ifndef FirebaseCore_h
#define FirebaseCore_h

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <Firebase.h>

@interface FirebaseCore : NSObject <RCTBridgeModule>
{

}

- (NSString *) getValue: (nullable NSString *)value;

- (FIRApp *) getApp: (nullable NSString *)name;

- (NSDictionary *) toJSON: (nullable NSString *)name
                  options: (nullable FIROptions *)options;

- (FIROptions *) getOptions: (nullable NSDictionary *)options;


- (void) getApps: (RCTPromiseResolveBlock)resolve
        rejecter: (RCTPromiseRejectBlock)reject;


- (void) getInstance: (nullable NSString *)name
            resolver: (RCTPromiseResolveBlock)resolve
            rejecter: (RCTPromiseRejectBlock)reject;


- (void) initializeApp: (nullable NSDictionary *)options
                  name: (nullable NSString *)name
              resolver: (RCTPromiseResolveBlock)resolve
              rejecter: (RCTPromiseRejectBlock)reject;


- (void) getName: (nullable NSString *)name
        resolver: (RCTPromiseResolveBlock)resolve
        rejecter: (RCTPromiseRejectBlock)reject;


- (void) getOptions: (nullable NSString *)name
           resolver: (RCTPromiseResolveBlock)resolve
           rejecter: (RCTPromiseRejectBlock)reject;


- (void) deleteApp: (nullable NSString *)name
           resolver: (RCTPromiseResolveBlock)resolve
           rejecter: (RCTPromiseRejectBlock)reject;

@end

#endif
