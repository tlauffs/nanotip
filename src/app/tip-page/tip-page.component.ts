import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { tools } from 'nanocurrency-web'
import { interval, Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-tip-page',
  templateUrl: './tip-page.component.html',
  styleUrls: ['./tip-page.component.css'],
})
export class TipPageComponent implements OnInit {
  
  name = "";
  key = "";
  amount = "";
  message: any;

  constructor(public dialog: MatDialog,
              private route:ActivatedRoute,
              private db: AngularFireDatabase,
              ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    this.key = this.route.snapshot.params['key'];
    this.amount = this.route.snapshot.params['amount'];
  }


  alertAddr(){
    const dialogRef = this.dialog.open(NanoDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDonateSubmit(data: any) {
    if(data.name !== "" && data.nanoKey !== "" && data.message !== "" && data.amount !== "" && data.amount >= this.amount){

     /* this.message = {'name': data.name, 'message': data.message, 'amount': data.amount, 'uid': (new Date).getTime()+Math.random()};
      localStorage.setItem('alert',JSON.stringify(this.message));
      localStorage.removeItem('alert'); */

      const dialogRef = this.dialog.open(DonateDialog, {
        data: {
        recieveAddress: this.key,
        payAddress: data.nanoKey,
        amount: data.amount,
        msg: data.message,
        name: data.name
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
 }

}

@Component({
  selector: 'nanoDialog',
  templateUrl: 'nanoDialog.html',
})
export class NanoDialog {}

@Component({
  selector: 'donateDialog',
  templateUrl: 'donateDialog.html',
})
export class DonateDialog implements OnInit, OnDestroy {

  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  colorDark = '#1c283b';
  value = "";
  payAddress = "";
  amount = 0;
  name = "";
  raw = "";
  msg = "";
  recieveAddress = "";
  checkpaySub: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: AngularFireDatabase,
    private httpClient: HttpClient,
 ) { }

 ngOnInit(){
  this.payAddress = this.data.payAddress;
  this.amount = this.data.amount;
  this.recieveAddress = this.data.recieveAddress;
  this.name = this.data.name;
  this.msg = this.data.msg;
  this.raw = tools.convert(this.amount.toString(), 'NANO', 'RAW');
  console.log(this.name, this.msg,this.amount);
  this.value = "nano:" + this.recieveAddress + "?amount=" + this.raw;

}

  ngOnDestroy(){
    this.checkpaySub?.unsubscribe;
  }

confirm() {
  let params = new HttpParams();
  params = params.append('action', 'account_history');
  params = params.append('account', this.payAddress);
  params = params.append('count', '2');
  this.checkpaySub = this.httpClient.get<any>('https://proxy.nanos.cc/proxy/', {
    params: params
  }).subscribe(data => {
     for (let payment of data.history){
       if(payment.type == "send" && payment.account == this.payAddress && this.amount.toString() == Number(tools.convert(payment.amount.toString(), 'RAW', 'NANO')).toString()){
        let alertList = this.db.list('alerts/'+ this.recieveAddress);
        let alertShow = {'name': this.name, 'message': this.msg , 'amount': this.amount};
        alertList.push(alertShow);
        return;
       }
     }
  })
}

}