export class Images {

    url:string;
    tag:string;
    liked:boolean = false;

    constructor (url:string, tag:string, liked?:boolean) {
        this.url = url;
        this.tag = tag;
        this.liked = liked;

    }
}