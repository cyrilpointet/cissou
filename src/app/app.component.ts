import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import firebase from 'firebase';

import { UserProvider } from '../providers/user/user';
import { FirestoreProvider } from '../providers/firestore/firestore';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private fireStore: FirestoreProvider,
    private user:UserProvider,
    private screenOrientation: ScreenOrientation
  ) {
    // Init Firebase *********************************************
    let config = this.fireStore.getConfig();
    firebase.initializeApp(config);
    
    // Listen auth changes
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        // Load user and set homepage
        let that = this;
        this.user.uid = user.uid;
        this.user.loadUser().then(function(){
          that.rootPage = HomePage;
        })
        unsubscribe();
      }
    });
    //*************************************************************
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }
}

