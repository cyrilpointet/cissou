import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

import { CalendarPage } from '../calendar/calendar';


import * as moment from 'moment';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-baby-home',
  templateUrl: 'baby-home.html',
})
export class BabyHomePage {

  careList = ['milk', 'water', 'bath', 'nappy', 'sleep', 'comment', 'size', 'meal', 'temperature', 'weight'];
  loadedCare:number = 0;
  motherName:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private user: UserProvider,
    private actionSheetCtrl: ActionSheetController
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BabyHomePage');
  }

  ionViewWillEnter() {
    this.getAllCares(this.careList);
    this.user.getMumName().then(resp=>{
      console.log(resp.data());
      this.motherName = resp.data().nickName;
    })
  }

  /******************** Utilities *********************************************/
  getDateFromNow(date) {
    let displayDate = moment(date).locale('fr').fromNow();
    return displayDate
  }

  getDuration(duration) {
    let minutes = moment.duration(duration).locale('fr').minutes();
    let hours = moment.duration(duration).locale('fr').hours();
    return ` ${hours}h${minutes}m`
  }

  getAvatar(){
    if (this.user.currentBaby.avatar == "default") {
      return "assets/imgs/default.jpg";
    } else {
      return this.user.currentBaby.avatar;
    }
  }

  accordion(){
    $('.accordion').toggle(300);
    $('.turning').toggle();
  }

  /******************** Cares management *********************************************/

  getAllCares(careList){
    this.user.loadedCares = 0;
    careList.forEach(element => {
      this.user.getCares(element);
    });
  }


  newCare() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Nouveau soin',
      buttons: [
        {
          text: 'Téte / Biberon de lait',
          handler: () => {
            this.newMilk();
          }
        },
        {
          text: "Biberon d'eau",
          handler: () => {
            this.newWater();
          }
        },
        {
          text: 'Repas solide',
          handler: () => {
            this.newMeal();
          }
        },
        {
          text: 'Change',
          handler: () => {
            this.newNappy();
          }
        },
        {
          text: 'Bain',
          handler: () => {
            this.newBath();
          }
        },
        {
          text: 'Sommeil',
          handler: () => {
            this.newSleep();
          }
        },
        {
          text: 'Pesée',
          handler: () => {
            this.newWeight();
          }
        },
        {
          text: 'Taille',
          handler: () => {
            this.newSize();
          }
        },
        {
          text: 'Température',
          handler: () => {
            this.newTemperature();
          }
        },
        {
          text: 'Commentaire',
          handler: () => {
            this.newComment();
          }
        },
        {
          text: 'Annuler',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }

  newMilk() {
    const prompt = this.alertCtrl.create({
      title: 'Biberon de lait',
      message: "Quantité en ml",
      inputs: [
        {
          name: 'qte',
          placeholder: 'Quantité en ml',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.qte != "") {
              data.qte = parseInt(data.qte);
              this.user.newCare('milk', data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  newWater() {
    const prompt = this.alertCtrl.create({
      title: "Biberon d'eau",
      message: "Quantité en ml",
      inputs: [
        {
          name: 'qte',
          placeholder: 'Quantité en ml',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.qte != "") {
              data.qte = parseInt(data.qte);
              this.user.newCare('water', data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  newBath() {
    const prompt = this.alertCtrl.create({
      title: "Nouveau bain",
      inputs: [],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            data = {}
            this.user.newCare('bath', data);
          }
        }
      ]
    });
    prompt.present();
  }

  newNappy() {
    let newNappy = {
      urine: false,
      stool: false,
      diarrhoea: false
    }
    const prompt = this.alertCtrl.create();
    prompt.setTitle('Présence dans le change:');
    prompt.addInput({
      type: 'checkbox',
      label: 'urine',
      value: 'urine',
      checked: false
    });
    prompt.addInput({
      type: 'checkbox',
      label: 'selles',
      value: 'stool',
      checked: false
    });
    prompt.addInput({
      type: 'checkbox',
      label: 'diarrhée',
      value: 'diarrhoea',
      checked: false
    });
    prompt.addButton('Annuler');
    prompt.addButton({
      text: 'Ok',
      handler: data => {
        if (data.indexOf('urine') > -1) {
          newNappy.urine = true
        };
        if (data.indexOf('stool') > -1) {
          newNappy.stool = true
        };
        if (data.indexOf('diarrhoea') > -1) {
          newNappy.diarrhoea = true
        };
        this.user.newCare('nappy', newNappy);
      }
    });
    prompt.present();
  }

  newSleep() {
    const prompt = this.alertCtrl.create({
      title: 'Sommeil',
      message: "Durée",
      inputs: [
        {
          name: 'hour',
          placeholder: 'heure(s)',
          type: 'number'
        },
        {
          name: 'minute',
          placeholder: 'minute(s)',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            data.hour = parseInt(data.hour);
            data.minute = parseInt(data.minute);
            let duration = moment.duration(data.hour, 'hours');
            duration.add(data.minute, 'minutes');
            let newSleep = { duration: moment.duration(duration).asMilliseconds() };
            console.log(newSleep);
            this.user.newCare('sleep', newSleep);
          }
        }
      ]
    });
    prompt.present();
  }

  newComment() {
    const prompt = this.alertCtrl.create({
      title: "Commentaire",
      message: "Remarques diverses",
      inputs: [
        {
          name: 'content',
          placeholder: 'Commentaire',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.content != "") {
              this.user.newCare('comment', data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  newMeal() {
    const prompt = this.alertCtrl.create({
      title: "Repas solide",
      message: "Contenu du repas",
      inputs: [
        {
          name: 'content',
          placeholder: 'Contenu',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.content != "") {
              this.user.newCare('meal', data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  newWeight() {
    const prompt = this.alertCtrl.create({
      title: 'Pesée',
      message: "Poids en kg",
      inputs: [
        {
          name: 'qte',
          placeholder: 'kg',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.qte != "") {
              console.log(data.qte);
              data.qte = parseFloat(data.qte);
              console.log(data.qte);
              this.user.newCare('weight', data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  newSize() {
    const prompt = this.alertCtrl.create({
      title: 'Taille',
      message: "Taille en cm",
      inputs: [
        {
          name: 'qte',
          placeholder: 'cm',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.qte != "") {
              data.qte = parseInt(data.qte);
              this.user.newCare('size', data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  newTemperature() {
    const prompt = this.alertCtrl.create({
      title: 'Température',
      message: "en °C",
      inputs: [
        {
          name: 'qte',
          placeholder: '°C',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.qte != "") {
              data.qte = parseFloat(data.qte);
              this.user.newCare('temperature', data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  /******************** Navigation *********************************************/

  goDisplayCares(careType) {
    this.navCtrl.push('DisplayCaresPage', { careType: careType });
  }

  goEditBaby() {
    this.navCtrl.push('EditBabyPage');
  }

  goCalendar(){
    console.log(this.user.currentBaby);
    this.navCtrl.push(CalendarPage);
  }
}
