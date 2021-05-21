# Note: Paths used in command are respect to UNIX / bash.

## Project setup (Android)
#### Open terminal or CMD and clone the repository
```
git clone https://github.com/NayemTalukder/bupko-reader
```

#### Go inside the 'bupko-reader' folder and install dependencies
```
cd bupko-reader && yarn install
```

#### Delete Redundant Files
```
yarn rm
```

#### Build App for Development
```
yarn dev
```

#### Start App for Development
```
yarn start
```

### Release App for Production
#### Resolve assets
```
yarn asset
```

#### Generate an upload key and Setting up Gradle variables
```
https://reactnative.dev/docs/signed-apk-android
```

#### Generate APKs
```
yarn release
```
