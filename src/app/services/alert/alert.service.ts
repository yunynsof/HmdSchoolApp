import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      mode: 'ios',
      color: 'medium'
    });
    toast.present();
  }

  async errorLogin(error) {
    if (error.status == 404) {
      const alert = await this.alertController.create({
        header: 'Error de autenticación',
        subHeader: 'Usuario no registrado',
        message: 'Verifique',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    } else if (error.status == 0) {
      const alert = await this.alertController.create({
        header: 'Error de conexión a internet',
        message: 'Intente nuevamente',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    } else if (error.status == 401) {
      const alert = await this.alertController.create({
        header: 'Error de autenticación',
        subHeader: 'Usuario no valido',
        message: 'Verifique',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    }  else if (error.status == 400) {
      const alert = await this.alertController.create({
        header: 'Error de autenticación',
        subHeader: 'Contraseña no valida',
        message: 'Verifique',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'No se proceso peticion',
        message: 'Intente nuevamente',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    }
  }


  async errorAlert(error) {

    const alert = await this.alertController.create({
      header: 'Lo sentimos',
      subHeader: 'Verifique',
      mode: 'ios',
      message: error,
      buttons: [{
        text: 'Ok',
        handler: () => {
          localStorage.clear();
        }
      }]
    });
  
    await alert.present();
  }

  async errorHomework(error) {

    const alert = await this.alertController.create({
      header: 'Lo sentimos no hay tarea para esta semana',
      mode: 'ios',
      message: error,
      buttons: [{
        text: 'Ok'
      }]
    });
  
    await alert.present();
  }

  async errorCalendar(error) {

    const alert = await this.alertController.create({
      header: 'Lo sentimos',
      subHeader: 'No hay notificaciones para esta semana',
      mode: 'ios',
      message: error,
      buttons: [{
        text: 'Ok'
      }]
    });
  
    await alert.present();
  }

   async errorSchedule(error) {

    const alert = await this.alertController.create({
      header: 'Lo sentimos ',
      subHeader: 'No hay fechas agendadas para esta semana',
      mode: 'ios',
      message: error,
      buttons: [{
        text: 'Ok'
      }]
    });
  
    await alert.present();
  }

  async errorSupport(error) {

    const alert = await this.alertController.create({
      header: 'Lo sentimos no hay preguntas en este momento',
      mode: 'ios',
      message: error,
      buttons: [{
        text: 'Ok'
      }]
    });
  
    await alert.present();
  }


  async errorConnection(error) {
    
    if (error.status == 0) {
      const alert = await this.alertController.create({
        header: 'Error de conexión a internet',
        message: 'Intente nuevamente',
        mode: 'ios',
        buttons: ['OK']
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: 'Lo sentimos ah occurrido un problema',
        mode: 'ios',
        message: 'Intente nuevamente',
        buttons: ['OK']
      });
    
      await alert.present();
    }
  }

  isLoading = false;
  async present() {

    this.isLoading = true;
    return await this.loadingController.create({
      spinner: "crescent",
      message: 'Por favor espere...',
      translucent: true,
      mode: 'ios',
      cssClass: 'custom-class custom-loading'

    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async presentDebt() {

    this.isLoading = true;
    return await this.loadingController.create({
      spinner: "circles",
      message: 'Comprobando estado de cuenta',
      translucent: true,
      mode: 'ios',
      cssClass: 'custom-class custom-loading'

    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async alert(error) {

    const alert = await this.alertController.create({
      header: error,
      mode: 'ios',
      message: 'Agregue correo vinculado a Academics',
      buttons: [{
        text: 'Ok'
      }]
    });
  
    await alert.present();
  }

  async alertSuccess(message) {

    const alert = await this.alertController.create({
      header: message,
      mode: 'ios',
      message: 'Verifique bandeja de su correo',
      buttons: [{
        text: 'Ok'
      }]
    });
  
    await alert.present();
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
