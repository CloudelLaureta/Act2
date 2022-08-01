import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router) {}

    get email() {
      return this.credentials.get('email');
    }
    get password() {
      return this.credentials.get('password');
    }

    ngOnInit() {
      this.credentials = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
    }

    async login(){
      const loading = await this.loadingController.create();
      await loading.present();
      const user = await this.authService.login(this.credentials.value);
      loading.dismiss();

      if (user) {
        this.router.navigateByUrl('/success', {replaceUrl: true});
      } else {
        this.showAlert('Login failed', 'Please try again');
      }
    }

    async showAlert(header, message) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK']
      });
      await alert.present();
    }

    async already(){
      const toast = await this.toastController.create({
        message: 'You are already at sign-in page',
        duration: 3000
      });
      toast.present();
    }

}
