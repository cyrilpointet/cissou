import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

import { Camera } from "@ionic-native/camera";

import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-baby',
  templateUrl: 'add-baby.html',
})
export class AddBabyPage {
  private birthdate: any;

  private newBaby: any = {
    name: "",
    motherId: "",
    createDate: 0,
    birthDate: parseInt(moment().locale('fr').format('x')),
    allergy: [],
    note: "",
    avatar: 'default',
    trustedPeople: [],
    calendar: [],
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private alertCtrl: AlertController,
    public cameraPlugin: Camera,
    public loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBabyPage');
  }
  ionViewWillEnter() {
    this.newBaby = {
      name: "",
      motherId: "",
      createDate: 0,
      birthDate: parseInt(moment().locale('fr').format('x')),
      allergy: [],
      note: "",
      avatar: 'default',
      trustedPeople: [],
      calendar: []
    };
    this.birthdate = moment(this.newBaby.birthDate).locale('fr').format('YYYY-MM-DDTHH:mmZ');
  }

  /*************************************************************
  Manage Image
  **************************************************************/
  getAvatar() {
    if (this.newBaby.avatar == "default") {
      return "assets/imgs/default.jpg";
    } else {
      return this.newBaby.avatar;
    }
  }

  takePicture() {
    this.cameraPlugin
      .getPicture({
        quality: 10,
        destinationType: this.cameraPlugin.DestinationType.FILE_URI,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: this.cameraPlugin.EncodingType.JPEG,
        saveToPhotoAlbum: false,
        correctOrientation: true
      })
      .then(
        imageData => {
          this.generateFromImage(imageData, data => {
            this.newBaby.avatar = data;
          });
        },
        error => {
          console.log("ERROR -> " + JSON.stringify(error));
        }
      );
  }

  generateFromImage(img, callback) {
    let canvas: any = document.createElement("canvas");
    let image = new Image();

    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width < height) {
        if (width > 200) {
          height *= 200 / width;
          width = 200;
        }
      } else {
        if (height > 200) {
          width *= 200 / height;
          height = 200;
        }
      }
      canvas.width = 200;
      canvas.height = 200;
      let displayX = (200-width)/2 ;
      let displayY = (200-height)/2 ;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(image, displayX, displayY, width, height);

      // IMPORTANT: 'jpeg' NOT 'jpg'
      let dataUrl = canvas.toDataURL("image/jpeg", 1);

      callback(dataUrl);
    };
    image.src = img;
  }

  /*************************************************************
  Validators
  **************************************************************/
  isNameValid() {
    if (this.newBaby.name.length < 3) {
      return false
    } else {
      return true
    }
  }

  validateEmail(email:string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  /*************************************************************
  UI
  **************************************************************/

  showMsg(msg: string) {
    const prompt = this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'ok',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  /*************************************************************
  Add / Remove datas
  **************************************************************/
  addAllergy() {
    const prompt = this.alertCtrl.create({
      title: "Ajouter une allergie",
      inputs: [
        {
          name: 'allergy',
          placeholder: 'texte',
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
            if (data.allergy != "") {
              this.newBaby.allergy.push(data.allergy);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  removeAllergy(i:number) {
    this.newBaby.allergy.splice(i, 1);
  }

  addNewPeople() {
    const prompt = this.alertCtrl.create({
      title: "Ajouter une personne de confiance",
      message: "Entrez son email",
      inputs: [
        {
          name: 'email',
          placeholder: 'texte',
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
            if (this.validateEmail(data.email)) {
              this.addTrustedPeople(data.email);
            } else {
              this.showMsg("Adresse mail invalide")
            }
          }
        }
      ]
    });
    prompt.present();
  }

  addTrustedPeople(email: string) {
    let loadin = this.loadingCtrl.create();
    loadin.present();
    this.user.getUserByEmail(email).subscribe(data => {
      loadin.dismiss();
      let people: Array<any> = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          people.push(data[key]);
        }
      }
      if (people.length < 1) {
        this.showMsg("Cette personne ne possede pas l'application");
        return
      }
      if (this.newBaby.trustedPeople.includes(people[0].id)) {
        this.showMsg("Cette personne est déjà dans la liste");
      } else if (people[0].id == this.user.uid) {
        this.showMsg("vous êtes déjà responsable de ce bébé");
      }
      else {
        let newPeople = {
          id: people[0].id,
          nickName: people[0].nickName,
          email: people[0].email
        }
        this.newBaby.trustedPeople.push(newPeople);
        console.log(this.newBaby.trustedPeople);
      }
    });
  }

  removeTrustedPeople(i:number) {
    this.newBaby.trustedPeople.splice(i, 1);
  }

  /*************************************************************
  Add and cancel functions
  **************************************************************/
  addBaby() {
    if (this.newBaby.name.length < 4) {
      console.log('invalid form');
    } else {
      let birthDate = parseInt(moment(this.birthdate).format('x'));
      let dateNow = parseInt(moment(Date.now()).format('x'));
      if (birthDate > dateNow) {
        this.showMsg("Votre bébé n'est pas encore né !")
      } else {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.newBaby.birthDate = birthDate;
        this.user.createBaby(this.newBaby).then(resp => {
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        });
      }
    }
  }

  cancel() {
    this.navCtrl.pop();
  }

}
