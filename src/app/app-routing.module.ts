import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipPageComponent } from  './tip-page/tip-page.component'
import { HomeComponent } from  './home/home.component'
import { AlertsComponent } from './alerts/alerts.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  {path: ':name/:amount/:key', component: TipPageComponent},
  {path: 'activity/:key', component: ActivityComponent},
  {path: '', component: HomeComponent},
  {path: 'alerts/source/:key/:tts', component: AlertsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
