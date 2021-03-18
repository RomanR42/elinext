import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../shared/flickr.service';
import {Images} from '../shared/images';

@Component({
  selector: 'app-serch',
  templateUrl: './serch.component.html',
  styleUrls: ['./serch.component.scss']
})
export class SerchComponent implements OnInit {
  canSendRequest:boolean =true;
  isDataReady:boolean = false;
  showSpiner = false;
  searchValue:string;
  favoritesFoto: Images [] = []

  constructor(public flickrService:FlickrService) { }


  ngOnInit(): void {
    if (localStorage.getItem('myPhoto')) {
      this.favoritesFoto = JSON.parse(localStorage.getItem('myPhoto'));
    }
  }
  
  letsSearch() {
      if (this.searchValue.length==0) {
        this.flickrService.imagesList.length =0;
        this.isDataReady= false;
        return};
      if (!this.canSendRequest) { return}
      this.canSendRequest = false;

      setTimeout(() => {
        if (this.searchValue.length !=0) {
          this.showSpiner = true;
          this.flickrService.getData(this.searchValue).subscribe (response => {
            console.log(response);
            this.isDataReady = true;
            this.showSpiner = false;
           });
         
        }
        this.canSendRequest = true;
      }, 1000);
   
  }

  getNextPage (step:number){
    if (this.flickrService.currentPage  == 0) {return};
    if (this.flickrService.currentPage ==1 && step == -1) {return};
    if (this.flickrService.currentPage == this.flickrService.pages && step == 1 ) {return};

    let pageForDisplay = this.flickrService.currentPage + step;
    this.flickrService.getData(this.searchValue, pageForDisplay ).subscribe (response => {
      console.log(response);
      this.isDataReady = true; 
    
    });

  }

  addToBookmark(image:Images) {
    image.liked = true;
    this.favoritesFoto.push(image);
    localStorage.setItem ('myPhoto', JSON.stringify(this.favoritesFoto));
  }

    
}
