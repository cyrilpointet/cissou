import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

// Providers
import { UserProvider } from "../../providers/user/user";
import { PdfProvider } from "../../providers/pdf/pdf";

// Library
import * as moment from "moment";
import Chart from "chart.js";

// Constantes
import { careList } from "../../const/cares"


@IonicPage()
@Component({
  selector: "page-display-cares",
  templateUrl: "display-cares.html"
})
export class DisplayCaresPage {
  @ViewChild("myChart") myChart;

  careType: string;
  displayDate: number;
  timeScale: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private alertCtrl: AlertController,
    private pdf: PdfProvider
  ) {
    this.careType = navParams.get("careType");
    this.timeScale = "week";
  }

  ionViewDidEnter() {
    console.log("ionViewDidLoad DisplayCaresPage");
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
    this.navCtrl.push("EditCarePage", { care: care, careType: this.careType });
  }

  /********************************************************************************** */
  /* Getters and setters */
  /********************************************************************************** */

  getTitle() {
    return careList[this.careType].title;
  }

  setTimeScale(timeScale: string) {
    this.timeScale = timeScale;
    this.prepareData();
  }

  getDateinText(date) {
    return moment(date)
      .locale("fr")
      .format("DD/MM à HH:mm");
  }

  getDurationInText(duration) {
    return (
      moment.duration(duration).hours() +
      ":" +
      moment.duration(duration).minutes()
    );
  }

  getDateLimit() {
    let now = moment(Date.now());
    let dateLimit;
    switch (this.timeScale) {
      case "day":
        dateLimit = parseInt(now.subtract(24, "hours").format("x"));
        break;
      case "week":
        dateLimit = parseInt(now.subtract(7, "days").format("x"));
        break;
      case "month":
        dateLimit = parseInt(now.subtract(1, "M").format("x"));
        break;
      case "birth":
        dateLimit = parseInt(now.subtract(this.user.currentBaby.birthDate).format("x"));
        break;
      default:
        dateLimit = 0;
        break;
    }
    return dateLimit;
  }

  /********************************************************************************** */
  /* Manage Graph */
  /********************************************************************************** */

  prepareData() {
    let axisX: Array<any> = [];
    let axisY: Array<any> = [];
    for (
      let index = 0;
      index < this.user.currentBaby[this.careType].length;
      index++
    ) {
      const element = this.user.currentBaby[this.careType][index];
      if (element.createDate > this.getDateLimit()) {
        axisX.push(
          moment(element.createDate)
            .locale("fr")
            .format("DD/MM hh:mm")
        );
        switch (careList[this.careType].type) {
          case "qte":
            axisY.push(element.qte);
            break;
          case "nappy":
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
          case "text":
            axisY.push(true);
            break;
          case "none":
            axisY.push(true);
            break;
          case "duration":
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
    this.displayData(axisX, axisY);
  }

  displayData(axisX, axisY) {
    let myChart = new Chart(this.myChart.nativeElement, {
      type: careList[this.careType].chartType,
      data: {
        labels: axisX,
        datasets: [
          {
            label: careList[this.careType].legend,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgb(255, 99, 132)",
            data: axisY
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
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
      case "milk":
        this.user.newMilk().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "water":
        this.user.newWater().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "bath":
        this.user.newBath().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "nappy":
        this.user.newNappy().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "sleep":
        this.user.newSleep().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "comment":
        this.user.newComment().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "meal":
        this.user.newMeal().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "weight":
        this.user.newWeight().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "size":
        this.user.newSize().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      case "temperature":
        this.user.newTemperature().subscribe(data => {
          setTimeout(() => {
            this.prepareData();
          }, 1000);
        });
        break;

      default:
        console.log("error careType");
        break;
    }
  }
  
  /******************** Pdf *********************************************/

  createPdf() {
    this.pdf.createPdf(this.careType, this.timeScale);
  }
}
