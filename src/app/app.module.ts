import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TipPageComponent, NanoDialog, DonateDialog } from './tip-page/tip-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AlertsComponent } from './alerts/alerts.component';
import { DataShareService } from './data-share.service';
import { AngularFireModule } from '@angular/fire/compat';
import { ActivityComponent } from './activity/activity.component';

const firebaseConfig = {
  apiKey: "AIzaSyDm3qAnw0QgBUlnDOk1xz9sPxko6kGo7qE",
  authDomain: "nanotip-96ab2.firebaseapp.com",
  databaseURL: "https://nanotip-96ab2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nanotip-96ab2",
  storageBucket: "nanotip-96ab2.appspot.com",
  messagingSenderId: "751257621602",
  appId: "1:751257621602:web:fd75b7c7a2ff3a08a1ed3b",
  measurementId: "G-CVKFE4QY0S"
};

@NgModule({
  declarations: [
    AppComponent,
    TipPageComponent,
    NanoDialog,
    DonateDialog,
    HomeComponent,
    AlertsComponent,
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    MatInputModule,
    NgxQRCodeModule
  ],
  providers: [DataShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
