import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environment'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'spot-stats';
  userLoggedIn: boolean = false;
  CLIENT_ID: string = environment.CLIENT_ID;
  REDIRECT_URI: string = environment.REDIRECT_URI
  AUTH_ENDPOINT: string = environment.AUTH_ENDPOINT
  SCOPES: string = environment.SCOPES
  RESPONSE_TYPE: string = environment.RESPONSE_TYPE

  urlParams = new URLSearchParams(window.location.hash.replace("#","?"))
  token = this.urlParams.get('access_token')

  expiration = Number(window.localStorage.getItem("expiration"));

  onlyURL = "";
  userPicture: string = ""
  userName: string = ""
  userFollowers: number = 0
  userPlaylists: number = 0

  userCurrentSong: string = ""
  userCurrentSongArtist: string = ""
  userCurrentSongPic: string = ""
  userCurrentSongLink: string = ""

  userPrevSong: string = ""
  userPrevArtist: string = ""
  userPrevPic: string = ""
  userPrevLink: string = ""

  userTop5 = [];
  userTop5Songs = [];

  userRecSongs = [];

  logout(){
    this.token = null;
    this.expiration = 0;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expiration");
    window.location.href.replace(window.location.search,'');
    window.location.href = '';
  }

  async getProfileName(){
    const response = await fetch(`https://api.spotify.com/v1/me`,{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    const data = await response.json();
    // console.log(data);
    this.userPicture = data.images[1].url;
    this.userName = data.display_name;
    this.userFollowers = data.followers.total;
  }
  async getPlaylists(){
    const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=30`,{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    const data = await response.json();
    this.userPlaylists = data.total;
  }

  async getCurrentSong(){//currentSong
    const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`,{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    const data = await response.json();
    this.userCurrentSong = data.item.name;
    this.userCurrentSongArtist = data.item.artists[0].name;
    this.userCurrentSongPic = data.item.album.images[1].url;
    this.userCurrentSongLink = data.item.external_urls.spotify;
    console.log(data.item.external_urls.spotify)
  }

  async getPreviousSong(){
    const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=1`,{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    const data = await response.json();
    console.log(data.items[0])
    this.userPrevSong = data.items[0].track.name;
    this.userPrevArtist = data.items[0].track.artists[0].name;
    this.userPrevPic = data.items[0].track.album.images[0].url;
    this.userPrevLink = data.items[0].track.external_urls.spotify;
  }



  async getTops(){
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5`,{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    const data = await response.json();
    this.userTop5 = data.items;
    console.log(this.userTop5);
  }

  async getTopSongs(){
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5`,{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    const data = await response.json();
    this.userTop5Songs = data.items;
    console.log(this.userTop5Songs);
  }

  async getRecSongs(){
    const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=5`,{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    const data = await response.json();
    this.userRecSongs = data.items;
    console.log(data.items);
  }



  constructor(){}//private route: ActivatedRoute

  ngOnInit(): void{
    // this.route.queryParams.subscribe((queryParam) => {
    //   console.log(queryParam)
    // })

    if(this.token != null){
      window.localStorage.setItem("token", this.token)
      // console.log(this.token)
      this.getProfileName();
      this.getPlaylists();
      this.getCurrentSong();
      this.getTops();
      this.getTopSongs();
      this.getRecSongs();
      this.getPreviousSong();
    }else{
      this.token = window.localStorage.getItem("token");
    }

    if(window.localStorage.getItem("expiration") != null){
      this.expiration = Number(window.localStorage.getItem("expiration"));
      //there is an expiration in the local host
      //so check how long its been since then
      var d = new Date();
      if((d.getTime() - this.expiration) >= 3600000){
        //if its been longer than 1 hour
        this.logout();
      }
      console.log("current time: " + d.getTime())
      console.log("expiration time: " + this.expiration)
      console.log("time since: " + (d.getTime() - this.expiration))
    }else{
      if(this.token != null){
        const date = new Date();
        this.expiration = Math.floor(date.getTime());
        window.localStorage.setItem("expiration", this.expiration.toString())
        console.log(this.expiration);
      }
    }

    // if (this.isTokenExpired(this.token)) {
    //   console.log("expired")
    // } else {
    //   console.log("not expired")
    // }

  }
}
