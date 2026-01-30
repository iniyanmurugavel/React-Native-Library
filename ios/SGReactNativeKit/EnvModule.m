#import <React/RCTBridgeModule.h>

@interface EnvModule : NSObject <RCTBridgeModule>
@end

@implementation EnvModule

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSDictionary *)constantsToExport
{
  NSString *envName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"ENV_NAME"];
  if (envName == nil) {
    envName = @"PRODUCTION";
  }
  return @{ @"ENV_NAME": envName };
}

@end
