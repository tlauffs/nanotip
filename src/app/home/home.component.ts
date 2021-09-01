import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = "";
  key = "";
  amount = "";
  obsSource = "in Development";
  ready = false;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('name') !== null){
      this.name = (localStorage.getItem('name')!);
    }
    if (localStorage.getItem('key') !== null){
      this.key = (localStorage.getItem('key')!);
    }
    if (localStorage.getItem('amount') !== null){
      this.amount = (localStorage.getItem('amount')!);
    }
    if (localStorage.getItem('name') !== null && localStorage.getItem('key') !== null && localStorage.getItem('amount') !== null){
      this.ready = true;
    }
  }

  createPage(data: any){
    if(data.name !== "" && data.nanoKey !== "" && data.amount !== ""){
      this.name = data.name;
      this.key = data.nanoKey;
      this.amount = data.amount;
      localStorage.setItem('name', data.name);
      localStorage.setItem('key', data.nanoKey);
      localStorage.setItem('amount', data.amount);
      this.ready = true;
    }
  }

  openActivity(){
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;
    open('/activity/'+this.key, 'test', params);
  }

  openTip(){
    open('/'+this.name+'/'+this.amount+'/'+this.key);
  }

  openPreview(){
    open('/alerts/source/'+this.key +'/true');
  }

}
