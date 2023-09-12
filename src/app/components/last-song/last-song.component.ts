import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-last-song',
  templateUrl: './last-song.component.html',
  styleUrls: ['./last-song.component.scss']
})
export class LastSongComponent {
  @Input() albumPic: string;
  @Input() artistName: string;
  @Input() songName: string;
  @Input() songLink: string;

  @Input() prevPic: string;
  @Input() prevArtist: string;
  @Input() prevSong: string;
  @Input() prevLink: string;

}
