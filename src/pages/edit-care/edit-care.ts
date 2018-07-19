import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Loading,
  LoadingController
} from 'ionic-angular';

// Providers
import { UserProvider } from '../../providers/user/user';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-edit-care',
  templateUrl: 'edit-care.html',
})
export class EditCarePage {
  public loading: Loading;
  private careType: string = "";
  private careContent: any = {};
  private careId: string = "";
  private careDate;
  private duration;
  private legends: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    let careData = this.navParams.get('care');
    for (const key in careData) {
      if (careData.hasOwnProperty(key) && key != 'id') {
        this.careContent[key] = careData[key];
      }
    }
    this.careId = careData['id'];
    this.careType = this.navParams.get('careType');
    this.careDate = moment(this.careContent.createDate).locale('fr').format('YYYY-MM-DDTHH:mmZ');
    if (this.careContent.duration) {
      let hour = moment.duration(this.careContent.duration).hours();
      let minute = moment.duration(this.careContent.duration).minutes();
      this.duration = { hour: hour, minute: minute };
    }
    this.legends = this.getCareLegends();
    console.log(this.careContent);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCarePage');
  }

  getCareLegends() {
    let legends;
    switch (this.careType) {
      case 'milk':
        legends = {
          title: 'Tétées / biberons de lait',
          legend: "lait en ml (estimation)",
          type : "qte",
        }
        break;

      case 'water':
        legends = {
          title: "Biberons d'eau",
          legend: "eau en ml",
          type : "qte",
        }
        break;

      case 'meal':
        legends = {
          title: 'Repas',
          legend: 'Repas solides',
          type : "text",
        }
        break;

      case 'nappy':
        legends = {
          title: 'Changes / couches',
          legend: 'Changes / couches',
          type : "nappy",
        }
        break;

      case 'bath':
        legends = {
          title: 'Bain / toilette',
          legend: 'Bain / toilette',
          type : "none",
        }
        break;

      case 'sleep':
        legends = {
          title: 'Sommeil / sieste',
          legend: "sommeil - durée en heure",
          type : "duration",
        }
        break;

      case 'weight':
        legends = {
          title: 'Pesée',
          legend: 'Poids en kg',
          type : "qte",
        }
        break;

      case 'size':
        legends = {
          title: 'Taille',
          legend: 'Taille en cm',
          type : "qte",
        }
        break;

      case 'temperature':
        legends = {
          title: 'Température',
          legend: '°C',
          type : "qte",
        }
        break;

      case 'comment':
        legends = {
          title: 'Commentaires et remarques',
          legend: 'Commentaires et remarques',
          type : "text",
        }
        break;

      default:
        console.log('careType error');
        break;
    }
    return legends
  }

  apply() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let date = moment(this.careDate).locale('fr').format('DD MM YYYY HH:mm');

    // set date
    this.careContent.createDate = parseInt(moment(this.careDate).format('x'));

    // Set duration
    if (this.careContent.duration) {
      let durationCalc = moment.duration(parseInt(this.duration.hour), 'hours');
      durationCalc.add(parseInt(this.duration.minute), 'minutes');
      console.log(durationCalc.asMilliseconds());
      this.careContent.duration = durationCalc.asMilliseconds();
    }
    console.log(this.careContent);

    // update care
    this.user.editCare(this.careId, this.careType, this.careContent).then(resp => {
      loading.dismiss()
      this.navCtrl.pop();
    })
  }

  cancel() {
    this.navCtrl.pop();
  }

  deleteCare() {
    const prompt = this.alertCtrl.create({
      title: "Supprimer le soin",
      message: "Cette action est irréversible",
      inputs: [],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('canceled');
          }
        },
        {
          text: 'Supprimer',
          handler: data => {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.user.deleteCare(this.careId, this.careType).then(resp => {
              loading.dismiss();
              this.navCtrl.pop();
            })
          }
        }
      ]
    });
    prompt.present();
  }

}
