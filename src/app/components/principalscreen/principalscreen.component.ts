import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
const USER_NAME = '';

@Component({
  selector: 'app-principalscreen',
  templateUrl: './principalscreen.component.html',
  styleUrls: ['./principalscreen.component.scss'],
})
export class PrincipalscreenComponent implements OnInit {
  @Input() generalStudent;
 
  @ViewChild(DataTableDirective, { static: false })
  dtOptions: DataTables.Settings = {
    "paging": false,
    "ordering": false,
    "info": false,
    "searching": false,
    "language": {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "zeroRecords": "",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
      "infoFiltered": "(Filtrado de _MAX_  registros totales)",
      "emptyTable": "",
      "search": "Buscar:",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Atras"
      },
    }
  };
  selectSegment;
  userDetails;
 
  constructor() {

    this.userDetails = { profileUrl: localStorage.getItem('img') };
    this.selectSegment = 'profile';
  }
  

  ngOnInit() {}

}
