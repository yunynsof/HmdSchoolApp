import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() generalStudent;

  userDetails;

  constructor() {

    this.userDetails = { profileUrl: localStorage.getItem('img') };
  }

  ngOnInit() { }

}
