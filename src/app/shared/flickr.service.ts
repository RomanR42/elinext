import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import {throwError } from 'rxjs';
import {Images} from './images';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  imagesList: Images [] = [];
  currentPage:number =0;
  pages:number=0;

  constructor(private http: HttpClient) { }
  getData (searchValue:string, page:number = 1) {
    
    let URL:string = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7fc67d713c931c246fae577846ad8e43&text=${searchValue}&page=${page}&format=json&nojsoncallback=1`;
    return this.http.get(URL)
    .pipe (
      tap (item => {
        let photoArray = item['photos']['photo'];
        this.currentPage = item['photos']['page'];
        this.pages = item['photos']['pages'];
                
        this.imagesList.length =0;
        photoArray.forEach(element => {          
          let urlImg = `https://live.staticflickr.com/${element['server']}/${element['id']}_${element['secret']}_m.jpg`;
          let title = element['title'];
          this.imagesList.push (new Images(urlImg, title))
        });
      }),
      retry(2),
      catchError(this.handleError) 
    );
    
  }

  handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred.', error.error.message);
      
    } else {
        console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    
    return throwError(
      'Something bad happened; please try again later.');
  }
}
