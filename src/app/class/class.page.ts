import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
})
export class ClassPage implements OnInit {

  class = [];

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private alertService: AlertService
  ) {
    this.alertService.present();
      this.class.push(
        {
          idClass: '1',
          name: 'Español',
          timetable:'Lu Ma Mi Ju Vi',
          professorName: 'Ismael Torres',
          img: '/assets/icon/test-10.png',
        },
        {
          idClass: '2',
          name: 'Matematicas',
          timetable:'Lu, Ma, Mi, Ju, Vi',
          professorName: 'Carlos Estrada',
          img: '/assets/icon/test-15.png',
        },
        {
          idClass: '4',
          name: 'Ingles',
          timetable:'Lu, Mi, Ju',
          professorName: 'Ismael Torres',
          img: '/assets/icon/test-3.png',
        },
        {
          idClass: '3',
          name: 'Ciencias Naturales',
          timetable:'Lu, Ma, Mi, Ju, Vi',
          professorName: 'Carlos Estrada',
          img: '/assets/icon/test-13.png',
        },
        {
          idClass: '7',
          name: 'Ciencias Sociales',
          timetable:'Lu, Ma, Mi, Ju, Vi',
          professorName: 'Carlos Estrada',
          img: '/assets/icon/test-14.png',
        },
        {
          idClass: '6',
          name: 'Musica',
          timetable:'Mi',
          professorName: 'Sandra Espinal',
          img: '/assets/icon/test-6.png',
        },
        {
          idClass: '8',
          name: 'Educacion Fisica',
          timetable:'Ma, Vi',
          professorName: 'Nadia Villatoro',
          img: '/assets/icon/test-12.png',
        },
        {
          idClass: '9',
          name: 'Computación',
          timetable:'Lu, Mi, Vi',
          professorName: 'Marina Perez',
          img: '/assets/icon/test-11.png',
        }
        );
        this.alertService.dismiss();
  }

  ngOnInit() {
    
  }

list;
  transfomList(list){
    this.list= [{
      "day": "Lu"
    },{
      "day": "Ma"
    },{
      "day": "Mi"
    },{
      "day": "Ju"
    },{
      "day": "Vi"
    }]
    
     var timetable;
     for(let i=0; i<list.length; i++){
       if(timetable==null){
        timetable= list[i].day+' '
       }else{
        timetable+= list[i].day+' '
       }
     }
   return timetable;
  }

  detailPage(data) {

    let navigationExtras: NavigationExtras = {
      state: data
    };
    this.router.navigate(['classdetail'], navigationExtras);
  }

  iconStudent() {
    this.appComponent.iconStudent();
  }

}

