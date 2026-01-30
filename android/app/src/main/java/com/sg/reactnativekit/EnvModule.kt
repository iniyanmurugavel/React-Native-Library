package com.sg.reactnativekit

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class EnvModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "EnvModule"

  override fun getConstants(): MutableMap<String, Any> =
    hashMapOf("ENV_NAME" to BuildConfig.ENV_NAME)
}
