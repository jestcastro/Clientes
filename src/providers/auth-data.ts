import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
/*import { Facebook, GooglePlus  } from 'ionic-native';
import firebase from 'firebase'
let facebook: any = Facebook;
let googleplus: any = GooglePlus*/

@Injectable()
export class AuthData {
  fireAuth: any;
  public uid: any;
  public googleWebClient: string = '364672897178-82l1aemkt8t5fj62asiecvrar53of94v.apps.googleusercontent.com';
  public googleScopes: string = 'profile email';
  public facebookScopes: any = ['public_profile', 'email'];
  constructor(public af: AngularFire) {
    af.auth.subscribe(user => {
      if (user) {
        this.fireAuth = user.auth;
        //console.log(user);
      }
    });
  }
  getUID() {
    this.af.auth.subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
    return this.uid;
  }
  getUser() {
    return this.af.auth;
  }
  

  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }
  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser(): any {
    return this.af.auth.logout();
  }
  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ email: newEmail, password: newPassword });
  }
  /*loginFacebook(Success, Error) {
    facebook.login(this.facebookScopes, (user) => {
      facebook.getAccessToken(Success, Error);
    },
      Error
    );
  }
  loginGoogle(Success, Error) {
    let options: any = {
      'scopes': this.googleScopes, // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': this.googleWebClient,
      'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    }
    console.debug('authWithGoogle options:');
    console.debug(options);
    // note for iOS the googleplus plugin requires ENABLE_BITCODE to be turned off in the Xcode
    googleplus.login(options, Success, Error);
  }*/

  loginCredential(token, social) {
    var credential = social == 0 ? firebase.auth.FacebookAuthProvider.credential(token) : firebase.auth.GoogleAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(credential);
  }

}
