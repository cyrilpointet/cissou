import { Injectable } from '@angular/core';
import { FirestoreProvider } from '../firestore/firestore';
import {
  Loading,
  LoadingController,
  AlertController
} from 'ionic-angular';

import * as moment from 'moment';

import { Baby } from '../../classes/baby';


import { Observable } from 'rxjs';

@Injectable()
export class UserProvider {

  nickName: string = "";
  firstName: string = "";
  lastName: string = "";
  phone: number = null;
  uid: string = "";
  email: string;
  signupDate: number;

  loading;
  loadedCares: number = 0;
  babies: Array<Baby> = [];
  trustedBabies: Array<Baby> = [];
  currentBaby: Baby;


  constructor(
    private fireStore: FirestoreProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController

  ) {
    console.log('UserProvider');
  }

  // Getter **********************************************

  getSignupDate() {
    let date = moment(this.signupDate);
    return date.format('DD MM YYYY')
  }

  /*******************************************************************/
  /*           USER PROFILE                                          */
  /*******************************************************************/

  saveNewUser() {
    let date = Date.now();
    let newUser = {
      nickName: this.nickName,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      signupDate: date
    };
    this.fireStore.createUser(newUser, this.uid)
      .then(resp => {
        console.log(resp);
      });
  }

  updateUser(): Promise<any> {
    let newUser = {
      nickName: this.nickName,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email
    };
    return this.fireStore.updateUser(newUser, this.uid);
  }


  loadUser(): Promise<any> {
    return this.fireStore.loadUser(this.uid)
      .then(user => {
        if (!user) {
          console.log('error: bad uid')
        } else {
          this.nickName = user.data().nickName;
          this.firstName = user.data().firstName;
          this.lastName = user.data().lastName;
          this.phone = user.data().phone;
          this.email = user.data().email;
          this.signupDate = user.data().signupDate;
          this.getBabies();
        }
      });
  }

  resetUser() {
    this.nickName = "";
    this.firstName = "";
    this.lastName = "";
    this.phone = null;
    this.uid = "";
    this.email = "";
    this.signupDate = 0;
    this.babies = [];
    this.currentBaby = null;
  }

  getUserByEmail(email) {
    let that = this;
    return new Observable(observer => {
      this.fireStore.getCarerByEmail(email).then(resp => {
        let responce: Array<any> = [];
        if (!resp.empty) {
          resp.forEach(element => {
            let user = element.data();
            user.id = element.id;
            responce.push(user);
          });
        }
        observer.next(responce);
        observer.complete();
      })
    })
  }

  /*******************************************************************/
  /*           BABIES MANAGEMENT                                     */
  /*******************************************************************/

  createBaby(newBaby): Promise<any> {
    let createDate = Date.now();
    newBaby.motherId = this.uid;
    newBaby.createDate = createDate;
    newBaby.trustedPeople.forEach(element => {
      newBaby[element.id] = true;
    });
    return this.fireStore.createBaby(newBaby).then(resp => {
      this.getBabies();
    })
  }

  getBabies() {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.babies = [];
    this.fireStore.getBabies(this.uid).then(resp => {
      loading.dismiss();
      if (!resp.empty) {
        resp.forEach(element => {
          let newBabyData = element.data();
          newBabyData.id = element.id;

          newBabyData.calendar.forEach(element => {
            element.startTime = new Date(element.startTime);
            element.endTime = new Date(element.endTime);
          });

          let newBaby = new Baby(newBabyData);
          this.babies.push(newBaby);
        });
      } else {
        console.log('pas de bébé')
      }
      console.log(this.babies);
      this.getTrustedBabies();
    })
  }

  getTrustedBabies() {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.fireStore.getTrustedBabies(this.uid).then(resp => {
      loading.dismiss();
      if (!resp.empty) {
        resp.forEach(element => {
          let newBabyData = element.data();
          newBabyData.id = element.id;
          let newBaby = new Baby(newBabyData);
          this.babies.push(newBaby);
        });
      } else {
        console.log('pas de bébé')
      }
    })
  }

  updateBaby(babyId, baby): Promise<any> {
    baby.trustedPeople.forEach(element => {
      baby[element.id] = true;
    });
    return this.fireStore.updateBaby(babyId, baby)
  }

  getMumName(): Promise<any> {
    return this.fireStore.getCarer(this.currentBaby.motherId)
  }

  /*******************************************************************/
  /*            CARES MANAGEMENT                                     */
  /*******************************************************************/

  getCarerName(id): Promise<any> {
    return this.fireStore.getCarer(id)
  }

  newCare(type, content) {
    return new Observable(observer => {
    let createDate = parseInt(moment().locale('fr').format('x'));
    content.createDate = createDate;
    content.carerId = this.uid;
    this.fireStore.newCare(type, this.currentBaby.id, content).then(resp => {
      this.getCares(type).subscribe(data => {
        observer.complete();
      });
    });
  }
)}

  editCare(careId, type, content): Promise<any> {
    return this.fireStore.updateCare(type, careId, this.currentBaby.id, content).then(resp => {
      this.getCares(type).subscribe();
    });
  }

  deleteCare(careId, type): Promise<any> {
    return this.fireStore.deleteCare(type, careId, this.currentBaby.id).then(resp => {
      this.getCares(type).subscribe();
    });
  }

  getCares(type) {
    return new Observable(observer => {
      this.fireStore.getCares(type, this.currentBaby.id).then(resp => {
        this.currentBaby[type] = [];
        if (!resp.empty) {
          resp.forEach(element => {
            let newCare: any = element.data();
            newCare.id = element.id;
            newCare.carerName = "";
            this.currentBaby[type].push(newCare);
            this.currentBaby[type].sort((a, b) => {
              return b.createDate - a.createDate;
            });
          });
          // get carer name and add it to object        
          this.currentBaby[type].forEach(element => {
            this.getCarerName(element.carerId).then(resp => {
              element.carerName = resp.data().nickName;
            })
          });
          console.log(type + ' loaded')
          observer.complete();
        } else {
          console.log('no ' + type + ' today...')
          observer.complete();
        }
        this.loadedCares += 1;
      })
    }
    )
  }

  /************************ New Cares ****************************** */
  newMilk() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Biberon de lait",
        message: "Quantité en ml",
        inputs: [
          {
            name: "qte",
            placeholder: "Quantité en ml",
            type: "number"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              if (data.qte != "") {
                data.qte = parseInt(data.qte);
                this.newCare("milk", data).subscribe(resp => {
                  observer.complete();
                });
              }
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  newWater() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Biberon d'eau",
        message: "Quantité en ml",
        inputs: [
          {
            name: "qte",
            placeholder: "Quantité en ml",
            type: "number"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              if (data.qte != "") {
                data.qte = parseInt(data.qte);
                this.newCare("water", data).subscribe(resp => {
                  observer.complete();
                });
              }
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  newBath() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Nouveau bain",
        inputs: [],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              data = {};
              this.newCare("bath", data).subscribe(resp => {
                observer.complete();
              });
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  newNappy() {
    return new Observable(observer => {
      let newNappy = {
        urine: false,
        stool: false,
        diarrhoea: false
      };
      const prompt = this.alertCtrl.create();
      prompt.setTitle("Présence dans le change:");
      prompt.addInput({
        type: "checkbox",
        label: "urine",
        value: "urine",
        checked: false
      });
      prompt.addInput({
        type: "checkbox",
        label: "selles",
        value: "stool",
        checked: false
      });
      prompt.addInput({
        type: "checkbox",
        label: "diarrhée",
        value: "diarrhoea",
        checked: false
      });
      prompt.addButton({
        text: "Annuler",
        handler: data => {
          observer.complete();
        }
      });
      prompt.addButton({
        text: "Ok",
        handler: data => {
          if (data.indexOf("urine") > -1) {
            newNappy.urine = true;
          }
          if (data.indexOf("stool") > -1) {
            newNappy.stool = true;
          }
          if (data.indexOf("diarrhoea") > -1) {
            newNappy.diarrhoea = true;
          }
          this.newCare("nappy", newNappy).subscribe(resp => {
            observer.complete();
          });
        }
      });
      prompt.present();
    }
    )
  }

  newSleep() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Sommeil",
        message: "Durée",
        inputs: [
          {
            name: "hour",
            placeholder: "heure(s)",
            type: "number"
          },
          {
            name: "minute",
            placeholder: "minute(s)",
            type: "number"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              data.hour = parseInt(data.hour);
              data.minute = parseInt(data.minute);
              let duration = moment.duration(data.hour, "hours");
              duration.add(data.minute, "minutes");
              let newSleep = {
                duration: moment.duration(duration).asMilliseconds()
              };
              console.log(newSleep);
              this.newCare("sleep", newSleep).subscribe(resp => {
                observer.complete();
              });
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  newComment() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Commentaire",
        message: "Remarques diverses",
        inputs: [
          {
            name: "content",
            placeholder: "Commentaire",
            type: "text"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              if (data.content != "") {
                this.newCare("comment", data).subscribe(resp => {
                  observer.complete();
                });
              }
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  newMeal() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Repas solide",
        message: "Contenu du repas",
        inputs: [
          {
            name: "content",
            placeholder: "Contenu",
            type: "text"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              if (data.content != "") {
                this.newCare("meal", data).subscribe(resp => {
                  observer.complete();
                });
              }
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  newWeight() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Pesée",
        message: "Poids en kg",
        inputs: [
          {
            name: "qte",
            placeholder: "kg",
            type: "number"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              if (data.qte != "") {
                console.log(data.qte);
                data.qte = parseFloat(data.qte);
                console.log(data.qte);
                this.newCare("weight", data).subscribe(resp => {
                  observer.complete();
                });
              }
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  newSize() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Taille",
        message: "Taille en cm",
        inputs: [
          {
            name: "qte",
            placeholder: "cm",
            type: "number"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              if (data.qte != "") {
                data.qte = parseInt(data.qte);
                this.newCare("size", data).subscribe(resp => {
                  observer.complete();
                });
              }
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  newTemperature() {
    return new Observable(observer => {
      const prompt = this.alertCtrl.create({
        title: "Température",
        message: "en °C",
        inputs: [
          {
            name: "qte",
            placeholder: "°C",
            type: "number"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            handler: data => {
              console.log("Cancel clicked");
              observer.complete();
            }
          },
          {
            text: "Ok",
            handler: data => {
              if (data.qte != "") {
                data.qte = parseFloat(data.qte);
                this.newCare("temperature", data).subscribe(resp => {
                  observer.complete();
                });
              }
            }
          }
        ]
      });
      prompt.present();
    }
    )
  }

  /*******************************************************************/
  /*            CALENDAR MANAGEMENT                                  */
  /*******************************************************************/

  saveCalendar(): Promise<any> {
    console.log(this.currentBaby.calendar);
    return this.fireStore.saveCalendar(this.currentBaby.id, this.currentBaby.calendar);
  }

}
