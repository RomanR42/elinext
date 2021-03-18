import { Component, OnInit } from '@angular/core';
import {Images} from '../shared/images';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  favoriteFotoToDisplay: Images []=[];
  constructor() { }

  ngOnInit(): void {

    if (localStorage.getItem('myPhoto')) {
      this.favoriteFotoToDisplay = JSON.parse(localStorage.getItem('myPhoto'));
      
    }
    
  }

  remove(index:number) {console.log(this.favoriteFotoToDisplay);
  
    this.favoriteFotoToDisplay.splice(index,1);
    localStorage.setItem('myPhoto', JSON.stringify(this.favoriteFotoToDisplay));
  }

}
