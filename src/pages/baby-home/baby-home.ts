import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ActionSheetController
} from "ionic-angular";

// Provider
import { UserProvider } from "../../providers/user/user";

// Pages
import { CalendarPage } from "../calendar/calendar";

// Libraries
import * as moment from "moment";
import * as $ from "jquery";

// Constantes
import { careList } from "../../const/cares"

@IonicPage()
@Component({
  selector: "page-baby-home",
  templateUrl: "baby-home.html"
})
export class BabyHomePage {
  careList = [
    "milk",
    "water",
    "bath",
    "nappy",
    "sleep",
    "comment",
    "size",
    "meal",
    "temperature",
    "weight"
  ];
  loadedCare: number = 0;
  motherName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private user: UserProvider,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad BabyHomePage");
  }

  ionViewWillEnter() {
    this.getAllCares();
    this.user.getMumName().then(resp => {
      console.log(resp.data());
      this.motherName = resp.data().nickName;
    });
  }

  /******************** Utilities *********************************************/
  getDateFromNow(date:number) {
    let displayDate:string = moment(date)
      .locale("fr")
      .fromNow();
    return displayDate;
  }

  getDuration(duration:number) {
    let minutes = moment
      .duration(duration)
      .locale("fr")
      .minutes();
    let hours = moment
      .duration(duration)
      .locale("fr")
      .hours();
    return ` ${hours}h${minutes}m`;
  }

  getAvatar() {
    if (this.user.currentBaby.avatar == "default") {
      return "assets/imgs/default.jpg";
    } else {
      return this.user.currentBaby.avatar;
    }
  }

  accordion() {
    $(".accordion").toggle(300);
    $(".turning").toggle();
  }

  /******************** Cares management *********************************************/

  getAllCares() {
    this.user.loadedCares = 0;
    /*
    careList.forEach(element => {
      this.user.getCares(element).subscribe();
    });
    */
   for (const key in careList) {
     if (careList.hasOwnProperty(key)) {
       this.user.getCares(key).subscribe();
     }
   }
  }

  newCare() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Nouveau soin",
      buttons: [
        {
          text: "T??te / Biberon de lait",
          handler: () => {
            this.user.newMilk().subscribe();
          }
        },
        {
          text: "Biberon d'eau",
          handler: () => {
            this.user.newWater().subscribe();
          }
        },
        {
          text: "Repas solide",
          handler: () => {
            this.user.newMeal().subscribe();
          }
        },
        {
          text: "Change",
          handler: () => {
            this.user.newNappy().subscribe();
          }
        },
        {
          text: "Bain",
          handler: () => {
            this.user.newBath().subscribe();
          }
        },
        {
          text: "Sommeil",
          handler: () => {
            this.user.newSleep().subscribe();
          }
        },
        {
          text: "Pes??e",
          handler: () => {
            this.user.newWeight().subscribe();
          }
        },
        {
          text: "Taille",
          handler: () => {
            this.user.newSize().subscribe();
          }
        },
        {
          text: "Temp??rature",
          handler: () => {
            this.user.newTemperature().subscribe();
          }
        },
        {
          text: "Commentaire",
          handler: () => {
            this.user.newComment().subscribe();
          }
        },
        {
          text: "Annuler",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

  

  /******************** Navigation *********************************************/

  goDisplayCares(careType) {
    this.navCtrl.push("DisplayCaresPage", { careType: careType });
  }

  goEditBaby() {
    this.navCtrl.push("EditBabyPage");
  }

  goCalendar() {
    console.log(this.user.currentBaby);
    this.navCtrl.push(CalendarPage);
  }

}
