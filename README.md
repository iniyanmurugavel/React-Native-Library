# SG React Native Kit

[![CI](https://github.com/iniyanmurugavel/React-Native-Library/actions/workflows/ci.yml/badge.svg)](https://github.com/iniyanmurugavel/React-Native-Library/actions/workflows/ci.yml)

A React Native CLI project (no Expo) that demonstrates a feature-based structure, a small design system, and native build variants for staging vs production. The Home screen shows a badge so you always know which build variant is running.

## What's inside

- React Native 0.82.x (CLI)
- TypeScript
- React Navigation (native stack)
- Feature-based folder structure
- Minimal design system (tokens + UI primitives)
- Android flavors: `staging` and `production`
- iOS build config env (`ENV_NAME`) and shared badge
- AAR publishing setup for the RN library module (`apps/demo/android/rnlib`)

## Requirements (first-time setup)

You only do these once per machine.

- Node.js >= 20
- Java JDK 17 (or the version recommended by React Native docs)
- Android Studio + SDK + emulator
- Xcode (for iOS) + Command Line Tools
- Ruby >= 2.6.10 (for CocoaPods)
- CocoaPods
- Watchman (macOS recommended)

## Install dependencies

From repo root:

```sh
npm install

# iOS only (from repo root)
cd apps/demo/ios
LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle install
LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle exec pod install
cd ../..
```

## Run the app (dev)

Start Metro:

```sh
npm run demo:start
```

Android (staging debug):

```sh
npm run demo:android -- --mode stagingDebug
```

Android (production debug):

```sh
npm run demo:android -- --mode productionDebug
```

iOS (debug uses STAGING):

```sh
npm run demo:ios -- --scheme SGReactNativeKit
```

iOS (release uses PRODUCTION):

```sh
npm run demo:ios -- --scheme SGReactNativeKit --configuration Release
```

## Build variants and environment badge

The Home screen shows a badge that reads `STAGING` or `PRODUCTION`.

- Android value comes from `BuildConfig.ENV_NAME` (product flavors).
- iOS value comes from `Info.plist` via `ENV_NAME` build setting.
- If no native value is set, we fall back to `__DEV__`.

### Where it is configured

- Android flavors: `apps/demo/android/app/build.gradle`
- Android native module: `apps/demo/android/app/src/main/java/com/sg/reactnativekit/EnvModule.kt`
- iOS Info.plist key: `apps/demo/ios/SGReactNativeKit/Info.plist`
- iOS native module: `apps/demo/ios/SGReactNativeKit/EnvModule.m`
- JS helper: `packages/sg-react-native-kit/src/shared/native/env.ts`

## Project structure

```text
apps/demo/
  src/
  android/
  ios/

packages/sg-react-native-kit/
  src/
```

## Design system

The design system is intentionally small and easy to extend:

- `tokens.ts`: palette, spacing, radii, shadows
- Components: `Badge`, `Button`, `Card`, `Screen`

## App icons

- iOS: `apps/demo/ios/SGReactNativeKit/Images.xcassets/AppIcon.appiconset`
- Android: `apps/demo/android/app/src/main/res/mipmap-*`

## Publishing the Android library (AAR / Maven)

This repo includes a library module at `apps/demo/android/rnlib`.

Local Maven publish (default path: `maven-repo` in the repo root):

```sh
cd apps/demo/android
./gradlew :rnlib:publishReleasePublicationToLocalRepoRepository
```

Artifacts:
- Group: `com.circles.reactnative`
- Artifact: `sg-react-native-kit`
- Version: `1.0.0` (change in `apps/demo/android/rnlib/build.gradle`)

If you need to publish the bundled RN native dependencies too (optional):

```sh
cd apps/demo/android
./gradlew \
  :react-native-gesture-handler:publishReleasePublicationToLocalRepoRepository \
  :react-native-screens:publishReleasePublicationToLocalRepoRepository \
  :react-native-safe-area-context:publishReleasePublicationToLocalRepoRepository \
  -PrnDepsVersion=1.0.0
```

## Common troubleshooting

- **CocoaPods UTF-8 error**:
  ```sh
  LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle exec pod install
  ```
- **Gradle lock issues**: Try again or stop any stuck Gradle daemons.
- **Android build flavors not found**: use `--mode stagingDebug` or `--mode productionDebug`.
- **Metro not connected**: ensure `npm run demo:start` is running on port 8081.

## Scripts

```sh
npm run demo:start
npm run android
npm run ios
npm test
npm run lint
```

## Notes for new React Native devs

- Debug builds load JS from Metro and support Fast Refresh.
- Release builds bundle JS and disable the developer menu.
- The dev menu appears on device/emulator (shake on device, Cmd+M / Ctrl+M on simulator/emulator).

---

If you’re new to RN, start with `packages/sg-react-native-kit/src/app/App.tsx` and `packages/sg-react-native-kit/src/features/home/HomeScreen.tsx`.

## CI (GitHub Actions)

Create `.github/workflows/ci.yml` with:

```yaml
name: CI
on:
  push:
    branches: [ master, main ]
    paths-ignore:
      - "docs/**"
      - "**/*.md"
  pull_request:
    paths-ignore:
      - "docs/**"
      - "**/*.md"

concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install JS deps
        run: npm install
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
          cache: gradle
      - name: Build Android Debug
        run: cd apps/demo/android && ./gradlew assembleStagingDebug

  ios:
    runs-on: macos-15
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install JS deps
        run: npm install
      - name: Cache Ruby gems
        uses: actions/cache@v4
        with:
          path: |
            apps/demo/vendor/bundle
          key: ${{ runner.os }}-gems-${{ hashFiles('apps/demo/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gems-
      - name: Install CocoaPods
        run: |
          gem install bundler -v 4.0.4
          cd apps/demo/ios
          LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle _4.0.4_ install
          bundle _4.0.4_ exec pod install
      - name: Select iOS simulator
        id: sim
        run: |
          SIM_NAME=$(xcrun simctl list devices available | awk -F ' \(' '/iPhone/ {print $1; exit}')
          if [ -z "$SIM_NAME" ]; then
            echo "No available iPhone simulator found."
            xcrun simctl list devices
            exit 1
          fi
          echo "name=$SIM_NAME" >> "$GITHUB_OUTPUT"
      - name: Build iOS
        run: xcodebuild -workspace apps/demo/ios/SGReactNativeKit.xcworkspace -scheme SGReactNativeKit -configuration Debug -sdk iphonesimulator -destination "platform=iOS Simulator,name=${{ steps.sim.outputs.name }}"
```

## Release checklist

Android:
- Bump versionName/versionCode in `apps/demo/android/app/build.gradle`
- Use a release keystore and update signing config
- Build AAB: `cd apps/demo/android && ./gradlew bundleProductionRelease`
- Test on a real device before store upload

iOS:
- Bump `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` in Xcode
- Use a distribution signing profile
- Archive in Xcode and upload to App Store Connect

JS:
- Update changelog / release notes
- Tag release in git

## Screenshots

Add screenshots to `docs/screenshots/` and list them here:

```text
- docs/screenshots/home.png
- docs/screenshots/screen-a.png
- docs/screenshots/screen-b.png
```

## Contributing

- Create a feature branch: `git checkout -b feature/your-change`
- Keep changes scoped and include tests where possible
- Run `npm test` and `npm run lint` before opening a PR
- Open a PR against `master` with a short summary and screenshots if UI changed

## Troubleshooting FAQ

- **Android build fails with SDK errors**: Open Android Studio once to accept licenses.
- **Pods install fails**: Ensure Ruby + bundler match `Gemfile` and run `bundle exec pod install`.
- **Metro not found**: Run `npm run demo:start` in a separate terminal.
- **App launches to blank screen**: Clear Metro cache: `npx react-native start --reset-cache`.
- **Cannot see Dev Menu**: Only available on debug builds.

## JitPack (production AAR)

This repo is ready for JitPack. Tag a release like `v1.0.0` and JitPack will build the AAR from `apps/demo/android/rnlib`.

Add JitPack to your consuming app:

```gradle
repositories {
  maven { url 'https://jitpack.io' }
}
```

Then depend on the tag:

```gradle
dependencies {
  implementation 'com.github.iniyanmurugavel:React-Native-Library:v1.0.0'
}
```

Notes:
- JitPack uses the Git tag as the version.
- The AAR is built by `./gradlew :rnlib:assembleRelease` from `apps/demo/android` (see `jitpack.yml`).
- Make sure the tag is pushed to GitHub.

## iOS artifact (CocoaPods + bundle)

This repo includes a simple podspec that packages the JS bundle and the native EnvModule bridge.

Build the iOS bundle before tagging a release:

```sh
./packages/sg-react-native-kit/scripts/bundle-ios.sh
```

Then tag and push:

```sh
git tag v1.0.0
git push origin v1.0.0
```

Consume via CocoaPods:

```ruby
pod 'SGReactNativeKit', :git => 'https://github.com/iniyanmurugavel/React-Native-Library.git', :tag => 'v1.0.0'
```

Notes:
- The pod includes `apps/demo/ios/SGReactNativeKit/Resources/main.jsbundle`.
- The host iOS app still needs React Native set up to load the JS bundle.

