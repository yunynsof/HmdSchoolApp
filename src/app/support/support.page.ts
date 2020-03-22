import { Component, OnInit } from '@angular/core';
import {AppComponent} from 'src/app/app.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  public items: any = [];

  constructor( private appComponent:AppComponent) {
    this.items = [
      { question: " No puedo ver las notas de mi hijo",
        detail: "Si usted no puede ver las notas en la aplicación es debido a que el servidor de HMD SCHOOLS esta apagado lo recomendable es que se comunique con el administrador.",
        expanded: false },
      { question: " Como hago para cambiar a otro perfil",
        detail: "Si usted no puede ver las notas en la aplicación es debido a que el servidor de HMD SCHOOLS esta apagado lo recomendable es que se comunique con el administrador.",
        expanded: false },
      { question: " Como contacto a la maestra guia",
        detail: "Si usted no puede ver las notas en la aplicación es debido a que el servidor de HMD SCHOOLS esta apagado lo recomendable es que se comunique con el administrador.",
        expanded: false },
      { question: " Como actualizo la información de mi hijo",
        detail: "Si usted no puede ver las notas en la aplicación es debido a que el servidor de HMD SCHOOLS esta apagado lo recomendable es que se comunique con el administrador.",
        expanded: false },
      { question: " No me llegan las notificaciones",
        detail: "Si usted no puede ver las notas en la aplicación es debido a que el servidor de HMD SCHOOLS esta apagado lo recomendable es que se comunique con el administrador.",
        expanded: false }
    ];
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  ngOnInit() {
  }

  iconStudent(){
    this.appComponent.iconStudent();
  }

}
