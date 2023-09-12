import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() uPicture: string;
  @Input() uName: string;
  @Input() uFollowers: number;
  @Input() uFollowing: number;
  @Input() uPlaylists: number;
  constructor() {}

  ngOnInit(): void{

  }
}
