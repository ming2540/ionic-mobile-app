import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserObject, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import { Subscription } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OpenPageService {

  private browser: InAppBrowserObject;
  private loading: HTMLIonAlertElement;
  private subscription: Subscription;

  constructor(private inAppBrowser: InAppBrowser,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  open(url: string) {
    this.cancel().then(() => {
      console.log('in open with ', url);
      this.browser = this.inAppBrowser.create(url, '_blank', 'location=no,hidden=yes');
      console.log('this browser is', this.inAppBrowser.create(url, '_blank', 'location=no,hidden=yes'))
      this.subscription = this.browser.on('loadstart').subscribe(() => this.showLoading());
      this.subscription.add(this.browser.on('loadstop').subscribe(() => {
        this.hideLoading().then(() => this.browser.show());
      }));

      this.subscription.add(this.browser.on('loaderror').subscribe(event => this.handleError(event)));
      
      this.subscription.add(this.browser.on('exit').subscribe(() => this.cleanUp()));
    });
  }

  private showLoading(): Promise<void> {
    return this.alertCtrl.create({
      header: 'Opening...',
      message: 'The page is loading. You can press the Cancel button to stop it.',
      backdropDismiss: false,
      buttons: [
        {
        text: 'Cancel',
        handler: this.cancel.bind(this)
        }
      ]
    }).then(loading => {
      this.loading = loading;
      return loading.present();
    });
  }

  private hideLoading(): Promise<boolean> {
    if (this.loading){
      return this.loading.dismiss();
    } else {
      return Promise.resolve(true);
    }
  }

  private cancel(): Promise<boolean> {
    console.log(this.hideLoading)
    return this.hideLoading().then(this.cleanUp.bind(this));
  }

  private handleError(event: InAppBrowserEvent): Promise<void> {
    return this.showError(event).then(this.cleanUp.bind(this));
  }

  private showError(event: InAppBrowserEvent): Promise<void> {
    return this.hideLoading().then(() => {
      return this.toastCtrl.create({
        message: `Failed to load to page. Code: ${event.code}, Message: ${event.message}`,
        duration: 3000,
        showCloseButton: true,
      }).then(toast => toast.present());
    });
  }

  private cleanUp() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    if (this.browser) {
      this.browser.close();
      this.browser = null;
    }
  }

}
