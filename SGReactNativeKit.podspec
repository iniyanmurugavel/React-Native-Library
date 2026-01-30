Pod::Spec.new do |s|
  s.name             = 'SGReactNativeKit'
  s.version          = '1.0.0'
  s.summary          = 'React Native Kit (JS bundle + native bridge module)'
  s.description      = 'React Native Kit packaged for iOS consumption with a prebuilt JS bundle and EnvModule.'
  s.homepage         = 'https://github.com/iniyanmurugavel/React-Native-Library'
  s.license          = { :type => 'MIT' }
  s.author           = { 'iniyanmurugavel' => 'iniyan455@gmail.com' }
  s.source           = { :git => 'https://github.com/iniyanmurugavel/React-Native-Library.git', :tag => s.version.to_s }

  s.platform         = :ios, '15.1'
  s.requires_arc     = true

  s.source_files     = 'apps/demo/ios/SGReactNativeKit/EnvModule.m'
  s.resources        = 'apps/demo/ios/SGReactNativeKit/Resources/**/*'

  s.dependency 'React-Core'
end
