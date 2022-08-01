import { Component,} from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage{
  handlerMessage = '';
  roleMessage = '';

  constructor(private alertController: AlertController) {}
  async resetpassword(){
    const alert = await this.alertController.create({
      header: 'RESET LINK SENT',
      message: 'Open your email and click the link sent to you to reset ypur passsword',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler:() => {this.handlerMessage = 'Alert canceled';}
        }
      ]
    });
    await alert.present();
  }
}
