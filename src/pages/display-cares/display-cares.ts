import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

// Providers
import { UserProvider } from '../../providers/user/user';

// Library
import * as moment from 'moment';
import Chart from 'chart.js';

// Utility const
const careList = {
  milk: {
    title: 'Tétées / biberons de lait',
    legend: "lait en ml (estimation)",
    chartType: 'bar'
  },
  water: {
    title: "Biberons d'eau",
    legend: "eau en ml",
    chartType: 'bar'
  },
  bath: {
    title: 'Bains / toilettes',
    legend: 'Bains / toilettes',
    chartType: 'bar'
  },
  nappy: {
    title: 'Changes / couches',
    legend: 'Changes / couches',
    chartType: 'bar'
  },
  sleep: {
    title: 'Sommeil / siestes',
    legend: "sommeil - durée en heure",
    chartType: 'bar'
  },
  comment: {
    title: 'Commentaires et remarques',
    legend: 'Commentaires et remarques',
    chartType: 'bar'
  },
  weight: {
    title: 'Pesée',
    legend: 'Poids en kg',
    chartType: 'line'
  },
  size: {
    title: 'Taille',
    legend: 'taille en cm',
    chartType: 'line'
  },
  temperature: {
    title: 'Température',
    legend: '°C',
    chartType: 'line'
  },
  meal: {
    title: 'Repas solides',
    legend: 'Repas solides',
    chartType: 'bar'
  },
}


@IonicPage()
@Component({
  selector: 'page-display-cares',
  templateUrl: 'display-cares.html',
})
export class DisplayCaresPage {

  @ViewChild('myChart') myChart;

  careType: string;
  displayDate: number;
  timeScale: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private alertCtrl: AlertController
  ) {
    this.careType = navParams.get('careType');
    this.timeScale = 'week';
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad DisplayCaresPage');
    this.prepareData();
  }


  /********************************************************************************** */
  /* Nav and utilities */
  /********************************************************************************** */

  switchCare(careType: string) {
    this.careType = careType;
    this.prepareData();
  }

  editCare(care) {
    this.navCtrl.push('EditCarePage', { care: care, careType: this.careType })
  }


  /********************************************************************************** */
  /* Getters and setters */
  /********************************************************************************** */

  getTitle() {
    return careList[this.careType].title;
  }

  setTimeScale(timeScale) {
    this.timeScale = timeScale;
    this.prepareData();
  }

  getDateinText(date) {
    return moment(date).locale('fr').format("DD/MM à HH:mm")
  }

  getDurationInText(duration) {
    return moment.duration(duration).hours() + ':' + moment.duration(duration).minutes();
  }

  getDateLimit() {
    let now = moment(Date.now());
    let dateLimit;
    switch (this.timeScale) {
      case 'day':
        dateLimit = parseInt(now.subtract(24, 'hours').format('x'));
        break;
      case 'week':
        dateLimit = parseInt(now.subtract(7, 'days').format('x'));
        break;
      case 'month':
        dateLimit = parseInt(now.subtract(1, 'M').format('x'));
        break;
      default:
        dateLimit = 0
        break;
    };
    return dateLimit
  }

  /********************************************************************************** */
  /* Manage Graph */
  /********************************************************************************** */

  prepareData() {
    let axisX: Array<any> = [];
    let axisY: Array<any> = [];
    for (let index = 0; index < this.user.currentBaby[this.careType].length; index++) {
      const element = this.user.currentBaby[this.careType][index];
      if (element.createDate > this.getDateLimit()) {
        axisX.push(moment(element.createDate).locale('fr').format('DD/MM hh:mm'));
        switch (this.careType) {
          case 'milk':
            axisY.push(element.qte);
            break;
          case 'water':
            axisY.push(element.qte);
            break;
          case 'weight':
            axisY.push(element.qte);
            break;
          case 'size':
            axisY.push(element.qte);
            break;
          case 'temperature':
            axisY.push(element.qte);
            break;
          case 'nappy':
            let value = 1;
            if (element.urine) {
              value += 1;
            }
            if (element.stool) {
              value += 1;
            }
            if (element.diarrhoea) {
              value += 1;
            }
            axisY.push(value);
            break;
          case 'comment':
            axisY.push(true);
            break;
          case 'meal':
            axisY.push(true);
            break;
          case 'bath':
            axisY.push(true);
            break;
          case 'sleep':
            let duration: number = moment.duration(element.duration).asHours();
            axisY.push(duration);
            break;
          default:
            axisY.push(true);
            break;
        }
      }
    }
    axisX = axisX.reverse();
    axisY = axisY.reverse();
    this.displayData(axisX, axisY)
  }

  displayData(axisX, axisY) {
    let myChart = new Chart(this.myChart.nativeElement, {
      type: careList[this.careType].chartType,
      data: {
        labels: axisX,
        datasets: [
          {
            label: careList[this.careType].legend,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgb(255, 99, 132)',
            data: axisY
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
            }
          }],
        },
        events: []
      }

    });
  }

  /********************************************************************************** */
  /* Manage New Cares */
  /********************************************************************************** */

  newCare() {
    switch (this.careType) {
      case 'milk':
        this.newMilk();
        break;

      case 'water':
        this.newWater();
        break;

      case 'bath':
        this.newBath();
        break;

      case 'nappy':
        this.newNappy();
        break;

      case 'sleep':
        this.newSleep();
        break;

      case 'comment':
        this.newComment();
        break;

      case 'meal':
        this.newMeal();
        break;

      case 'weight':
        this.newWeight();
        break;

      case 'size':
        this.newSize();
        break;

      case 'temperature':
        this.newTemperature();
        break;

      default:
        console.log('error careType')
        break;
    }
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
              this.user.newCare('milk', data).then(()=>{
                setTimeout(() => {
                  this.prepareData();
                }, 1000);
              });
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
              this.user.newCare('water', data).then(()=>{
                setTimeout(() => {
                  this.prepareData();
                }, 1000);
              });
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
            this.user.newCare('bath', data).then(()=>{
              setTimeout(() => {
                this.prepareData();
              }, 1000);
            });
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
        this.user.newCare('nappy', newNappy).then(()=>{
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
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
            this.user.newCare('sleep', newSleep).then(()=>{
              setTimeout(() => {
                this.prepareData();
              }, 1000);
            });
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
              this.user.newCare('comment', data).then(()=>{
                setTimeout(() => {
                  this.prepareData();
                }, 1000);
              });
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
              this.user.newCare('meal', data).then(()=>{
                setTimeout(() => {
                  this.prepareData();
                }, 1000);
              });
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
              this.user.newCare('weight', data).then(()=>{
                setTimeout(() => {
                  this.prepareData();
                }, 1000);
              });
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
              this.user.newCare('size', data).then(()=>{
                setTimeout(() => {
                  this.prepareData();
                }, 1000);
              });
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
              this.user.newCare('temperature', data).then(()=>{
                setTimeout(() => {
                  this.prepareData();
                }, 1000);
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
