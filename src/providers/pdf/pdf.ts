import { Injectable } from "@angular/core";

import { UserProvider } from "../user/user";
import { AlertController } from "ionic-angular";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as moment from "moment";
import { Baby } from "../../classes/baby";

// Utility const
const careList = {
  milk: {
    title: "Tétées / biberons de lait",
    legend: "lait en ml (estimation)",
    type: "qte"
  },
  water: {
    title: "Biberons d'eau",
    legend: "eau en ml",
    type: "qte"
  },
  bath: {
    title: "Bains / toilettes",
    legend: "Bains / toilettes",
    type: "none"
  },
  nappy: {
    title: "Changes / couches",
    legend: "Changes / couches",
    type: "nappy"
  },
  sleep: {
    title: "Sommeil / siestes",
    legend: "sommeil - durée en heure",
    type: "duration"
  },
  comment: {
    title: "Commentaires et remarques",
    legend: "Commentaires et remarques",
    type: "text"
  },
  weight: {
    title: "Pesée",
    legend: "Poids en kg",
    type: "qte"
  },
  size: {
    title: "Taille",
    legend: "taille en cm",
    type: "qte"
  },
  temperature: {
    title: "Température",
    legend: "°C",
    type: "qte"
  },
  meal: {
    title: "Repas solides",
    legend: "Repas solides",
    type: "text"
  }
};

@Injectable()
export class PdfProvider {
  pdfObj = null;
  dateLimt: number = null;

  constructor(
    private file: File,
    private fileOpener: FileOpener,
    private alertCtrl: AlertController,
    private user: UserProvider
  ) {
    console.log("Hello PdfProvider Provider");
  }

  // Create and manage pdf obj and style ---------------------------------------------
  // ---------------------------------------------------------------------------------
  createPdf(careType: string, timeScale: string) {
    this.dateLimt = this.getDateLimit(timeScale);
    let docDef = {
      pageSize: "A4",
      pageMargins: 50,
      styles: {
        title: {
          fontSize: 22,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        subTitle: {
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 5]
        },
        italic: {
          italics: true
        },
        toRight: {
          alignment: "right",
          margin: [0, 0, 0, 10]
        }
      },
      content: this.getContent(careType, this.dateLimt)
    };

    this.pdfObj = pdfMake.createPdf(docDef);

    this.pdfObj.getBuffer(buffer => {
      var blob = new Blob([buffer], { type: "application/pdf" });

      // Save the PDF to the data Directory of our App
      this.file
        .writeFile(this.file.dataDirectory, "myletter.pdf", blob, {
          replace: true
        })
        .then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(
            this.file.dataDirectory + "myletter.pdf",
            "application/pdf"
          );
        });
    });
    /*
   pdfMake.createPdf(docDef).getBlob(buffer => {
    this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
      .then(dirEntry => {
        this.file.getFile(dirEntry, 'test1.pdf', { create: true })
          .then(fileEntry => {
            fileEntry.createWriter(writer => {
              writer.onwrite = () => {
                this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
                  .then(res => { })
                  .catch(err => {
                    const alert = this.alertCtrl.create({ message: "fileOpener: "+err.message, buttons: ['Ok'] });
                    alert.present();
                  });
              }
              writer.write(buffer);
            })
          })
          .catch(err => {
            const alert = this.alertCtrl.create({ message: "getFile" + err, buttons: ['Ok'] });
            alert.present();
          });
      })
      .catch(err => {
        const alert = this.alertCtrl.create({ message: "resolveDirectoryUrl" + err, buttons: ['Ok'] });
        alert.present();
      });
      

  });
  */
  }

  // Manage pdf template ---------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  getContent(careType: string, displayDate: number) {
    let content = [
      { text: "Liste de soins", style: "subTitle" },
      { text: this.user.currentBaby.name, style: "title" },
      {
        text: [
          { text: "Né(e) :", style: "italic" },
          moment(this.user.currentBaby.birthDate)
            .locale("fr")
            .format("DD/MM/YYYY")
        ]
      },
      {
        text: [
          { text: "Allergie(s) connue(s): ", style: "italic" },
          { text: this.getAllergy() }
        ]
      },
      {
        text: [{ text: "Note: ", style: "italic" }, this.user.currentBaby.note]
      },
      {
        text: `Du ${moment(this.dateLimt)
          .locale("fr")
          .format("DD/MM/YYYY")} au ${moment()
          .locale("fr")
          .format("DD/MM/YYYY")}`,
        style: "toRight"
      },
      { text: careList[careType].title, style: "subTitle" },
      {
        table: this.getTable(careType, displayDate)
      }
    ];
    return content;
  }

  // Manage care lists and table style -------------------------------------------------
  // -----------------------------------------------------------------------------------
  getTable(careType: string, displayDate: number) {
    let caresToPrint: Array<any> = [];
    this.user.currentBaby[careType].forEach(element => {
      if (element.createDate > this.dateLimt) {
        caresToPrint.push(element);
      }
    });

    let table = {
      headerRows: 1,
      widths: ["25%", "25%", "*"],

      body: this.getTableBody(caresToPrint, careType)
    };
    return table;
  }

  // Manage table content with cares list ----------------------------------------------
  // -----------------------------------------------------------------------------------
  getTableBody(caresToPrint: Array<any>, careType: string) {
    let body: Array<any> = [
      [
        { text: "Date", bold: true },
        { text: "Heure", bold: true },
        { text: careList[careType].legend, bold: true }
      ]
    ];
    switch (careList[careType].type) {
      case "qte":
        caresToPrint.forEach(element => {
          let care = [
            moment(element.createDate)
              .locale("fr")
              .format("DD/MM/YYYY"),
            moment(element.createDate)
              .locale("fr")
              .format("HH:mm"),
            element.qte
          ];
          body.push(care);
        });
        break;
      case "none":
        caresToPrint.forEach(element => {
          let care = [
            moment(element.createDate)
              .locale("fr")
              .format("DD/MM/YYYY"),
            moment(element.createDate)
              .locale("fr")
              .format("HH:mm"),
            "Bain, toilette"
          ];
          body.push(care);
        });
        break;
      case "nappy":
        caresToPrint.forEach(element => {
          let nappy: string = "";
          if (element.urine) {
            nappy += "urine ";
          }
          if (element.stool) {
            nappy += "selles ";
          }
          if (element.diarrhoea) {
            nappy += "diarrhée ";
          }
          let care = [
            moment(element.createDate)
              .locale("fr")
              .format("DD/MM/YYYY"),
            moment(element.createDate)
              .locale("fr")
              .format("HH:mm"),
            nappy
          ];
          body.push(care);
        });
        break;
      case "duration":
        caresToPrint.forEach(element => {
          let care = [
            moment(element.createDate)
              .locale("fr")
              .format("DD/MM/YYYY"),
            moment(element.createDate)
              .locale("fr")
              .format("HH:mm"),
            moment.duration(element.duration).hours() +
              ":" +
              moment.duration(element.duration).minutes()
          ];
          body.push(care);
        });
        break;
      case "text":
        caresToPrint.forEach(element => {
          let care = [
            moment(element.createDate)
              .locale("fr")
              .format("DD/MM/YYYY"),
            moment(element.createDate)
              .locale("fr")
              .format("HH:mm"),
            element.content
          ];
          body.push(care);
        });
        break;
      default:
        console.log("error caretype");
        break;
    }

    return body;
  }

  // Utilities -----------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  getDateLimit(timeScale: string) {
    let now = moment(Date.now());
    let dateLimit;
    switch (timeScale) {
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
        dateLimit = parseInt(
          moment(this.user.currentBaby.birthDate).format("x")
        );
        break;
      default:
        dateLimit = 0;
        break;
    }
    return dateLimit;
  }

  getAllergy() {
    let allergyList: string = "";
    this.user.currentBaby.allergy.forEach(element => {
      allergyList += element + " ";
    });
    return allergyList;
  }
}
