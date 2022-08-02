import { Component, OnInit} from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit{
  credentials: FormGroup;
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private fb: FormBuilder,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService
    ) {}

  get email() {
    return this.credentials.get('email');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async resetpassword(){
    const loading = await this.loadingController.create();
    await loading.present();
    await this.authService.reset(this.credentials.value);
    loading.dismiss();

    const alert = await this.alertController.create({
      header: 'RESET LINK SENT',
      message: 'Open your email and click the link sent to you to reset your passsword',
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


 // async reset(){
  //  const auth = getAuth();
    //sendPasswordResetEmail(auth,this.email)
    //.then(() => {})
    //.catch((error) => {
      //const errorCode = error.code;
      //const errorMessage = error.message;
  //  });
  //}

  }

