import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.scss']
})
export class TopsComponent {
  @Input() topFive = []
  @Input() topFiveSongs = []
  @Input() text: string = "tops works"
  @Input() color: string = "blue"
  //[ngStyle]="{background-color: color}" Put this in the app-tops element
}
