// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hackernews_db: {
    databaseURL: 'https://hacker-news.firebaseio.com'
  },
  app_db:{
    apiKey: "AIzaSyC4WYKuy8r1cWauAKvtCd7tdIK33GL4hbU",
    authDomain: "ionic-mobile-app-cdb01.firebaseapp.com",
    databaseURL: "https://ionic-mobile-app-cdb01.firebaseio.com",
    projectId: "ionic-mobile-app-cdb01",
    storageBucket: "ionic-mobile-app-cdb01.appspot.com",
    messagingSenderId: "737532337084",
    appId: "1:737532337084:web:ec4b8dd1406bff2a92a9b9"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
