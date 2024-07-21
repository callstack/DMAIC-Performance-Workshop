# Overview

This is the dedicated app for the React Native Performance Optimization Course.

# Goal

The goal during this workshop is to perform a performance audit on this app using DMAIC methodology, find as many performance issue as possible and prepare a repair plan on how to make the app usable for users.

# Description

This is a sample React Native chat application that uses SQLite as a local database.
It was bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

In the app, there are few screens. Each screen might contain some performance issues. Performance issues might also occur on root app level.

The app contains a backend directory with a simple HTTP server in Node.js. The server main purpose is to serve a DB data to the client (app).

## Important note

Size of the DB that's sent to the client from the server can be changed through `DB_SIZE` in `src/App.tsx`.
This can prove useful if you want to test against larger datasets or the default dataset takes too long to load in your setup.

You can choose from `xsmall`, `small`, `medium`, `large` - by default it's `medium`

# Getting Started

This project uses `npm` as a package manager.

## Installation

In order to install the dependencies, run the following command:

```bash
npm install
```

## Step 1: Start the Metro Server (along with backend)

```bash
npm run start
```

## Step 2: Start your Application

### For Android

```bash
npm run android
```

You can also create and run a production build:

```bash
npm run android:prod
```

### For iOS

Start by isntalling pods:

```bash
npm run pods
```

Then run the app:

```bash
npm run ios
```

You can also create and run a production build:

```bash
npm run ios:prod
```

#### If you run into issues with iOS Simulator

If you encounter the following error:

```bash
error Failed to build ios project. "xcodebuild" exited with error code '70'. To debug build logs further, consider building your app with Xcode.app, by opening 'WorkshopApp.xcworkspace'.
error: script "ios" exited with code 1
```

It is likely that you need to download iOS 17.5 simulator. Open the workshop app in Xcode and download the simulator.
If you encounter issues with the download, you may need to free up space on your machine. Please refer to the following [StackOverflow answer](https://stackoverflow.com/questions/64669058/xcode-12-2-ios-14-2-simulator-download-failed).
