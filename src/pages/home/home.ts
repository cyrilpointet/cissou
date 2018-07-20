import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";

// Providers
import { UserProvider } from "../../providers/user/user";

// Pages
import { BabyHomePage } from "../baby-home/baby-home";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public authProvider: AuthProvider,
    public navCtrl: NavController,
    public user: UserProvider,
    private alertCtrl: AlertController
  ) {}

  getAvatar(i) {
    if (this.user.babies[i].avatar == "default") {
      return "assets/imgs/default.jpg";
    } else {
      return this.user.babies[i].avatar;
    }
  }

  logout() {
    const prompt = this.alertCtrl.create({
      title: "Déconnecter ?",
      buttons: [
        {
          text: "Annuler",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: data => {
            prompt.present();
            this.authProvider.logoutUser();
            this.user.resetUser();
            this.navCtrl.setRoot("LoginPage");
          }
        }
      ]
    });
    prompt.present();
  }

  goEditProfil() {
    this.navCtrl.push("EditProfilePage");
  }

  goAddBaby() {
    this.navCtrl.push("AddBabyPage");
  }

  goBabyHome(i) {
    this.user.currentBaby = this.user.babies[i];
    this.navCtrl.push(BabyHomePage);
  }

  goCgu() {
    this.navCtrl.push("CguPage");
  }
}
