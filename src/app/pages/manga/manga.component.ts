import { PictureService } from './../../services/picture.service';
import { CommentService } from '../../services/comment.service';
import { MangaService } from './../../services/manga.service';
import { Component, OnInit } from '@angular/core';
import { Comment, Manga, Picture } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { faBookBookmark, faMessage, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `

<div class="flex justify-center mb-5 mt-5">
<div class="block max-w-[20rem] rounded-lg bg-secondary text-white shadow-secondary-1">
    <div class="banner-1 background-color-black-c16a25 px-6 py-3">{{manga?.title}}</div>
    <div class="banner-2 background-color-black-c60a10 px-6 py-3 flex justify-between">
        <div class="img"><img src="/assets/svg/star-white.svg" alt="star-white.svg"><span>12</span></div>
        <div class="img"><img src="/assets/svg/comment-white-fill.svg" alt="comment-white-fill.svg"><span>12</span></div>
        <div class="img"><img src="/assets/svg/heart-white-outline.svg" alt="heart-white-outline.svg"><span>12</span></div>
    </div>
    <div class="banner-3 background-color-black-c37a50 px-6 py-3 flex justify-center">
        <!--<div><img src="/assets/svg/star-yellow.svg" alt="star-yellow"></div>-->
        <div class="opinions-stars-one">
            <div class="opinions-stars-one-empty"></div>
            <div class="opinions-stars-one-full" style="width:{{calculSatisfactionRate()}}%"></div>
        </div>
        <div class="ml-4 content-center">
            <div>{{calculAverageVote()}}/5</div>
            <div class="text-xs">{{nbComments()}} vote</div>
        </div>
    </div>
    <div class="background-color-black-c16a50">
        <div class="flex justify-center mt-4 mb-5 h-30">
            <img class="poster" src="{{poster}}" alt="">
        </div>
        <div class="px-5 pb-44 mb-5  rounded-e-3xl  background-color-black">
            <p>Titre original : <span>{{manga?.title}}</span></p>
            <p>Origine : </p>
            <p>Année VF : <span>{{manga?.releaseDate}}</span></p>
            <p>Categorie : <span>{{manga?.category?.name}}</span></p>
            <p class="flex flex-wrap">
                Genre : 
                @for (genre of manga?.genres; track genre.id) {
                    <span class="ml-4">{{genre.label}}</span>
                }
            </p>
            <p>Thèmes : </p>
            <p class="flex flex-wrap">
                Auteur : 
                @for (author of manga?.authors; track author.id) {
                    <span class="ml-4">{{author?.lastname}}</span>
                }
            </p>
            <p>Éditeur VO : </p>
            <p>Éditeur VF : </p>
            <p>Prépublié dans : </p>
            <p>Nb volume VO : 10 (Terminé)</p>
            <p>Nb volume VF : 0 (À paraître)</p>
            <p>Prix : <span>{{manga?.price}} €</span></p>
            <p>Âge conseillé : </p>
            <p>Pour public averti : </p>
            <p>Se trouve dans le commerce en France : </p>
        </div>
    </div>
    <div class="opinions mb-4 h-56">
        <ul class="opinions-stars list-unstyled flex align-center">
            <div class="opinions-stars-empty"></div>
            <div class="opinions-stars-full" style="width:{{calculSatisfactionRate()}}%"></div>
            <!--<div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>-->
        </ul>
        <div>
            <div class="flex justify-around mt-4">
                <div class="faHeart"><fa-icon [icon]="faHeart" size="2x"></fa-icon><span class="nbOpinions">12</span></div>
                <div class="faMessage"><fa-icon [icon]="faMessage" size="2x"></fa-icon><span class="nbOpinions">{{nbComments()}}</span></div>
            </div>
            <div class="faBookBookmark flex justify-center"><fa-icon [icon]="faBookBookmark" size="2x"></fa-icon></div>
        </div>
    </div>
    
    <div class="synopsis mb-72">
        <p class="title-synopsis pl-4 pt-8 background-color-black-c16a50 uppercase">synopsis</p>
        <p class="summary pt-8 px-8 pb-8 background-color-black-c16a25">{{manga?.summary}}</p>
    </div>

    <div class="commentaries mb-28">
        <div class="commentaries-box">
            <div class="mb-12"><p class="comments-title h-20  pl-4 pt-8 background-color-black-c16a25">COMMENTAIRES ({{nbComments()}})</p></div>
            <ul class="mb-12">
                @for (comment of manga?.comments; track comment.id;) {
                    <li class="">
                    <div>
                        <div class="comment-user items-center h-24 background-color-black-c16a25 flex">
                            <img class="img-user ml-8 mr-8" src="{{base64+comment.user.img}}" alt="{{comment.user.username}}">
                            <p class="pr-4">#{{counter()}}. Par <span class="">{{comment.user.username}}</span> le {{truncatDate(comment.createdAt)}}</p></div>
                        </div>
                    </li>
                    <li><p class="comment-body px-4 py-8 mb-8 background-color-black-c37a50">{{comment.comment}}</p></li>
                }
            </ul>
            <div class="comment-end h-20 pl-4 pt-8 background-color-black-c16a25 uppercase"></div>
        </div>
    </div>
</div>
</div>
  `,
  styles: [`
    .opinions-stars-one{
        position: relative;
        margin-left: 0px;
        vertical-align: middle;
        display: inline-block;
        color: #b1b1b1;
        overflow: hidden;

    }

    .opinions-stars, .opinions-stars-one{
        position: relative;
        vertical-align: middle;
        display: inline-block;
        color: #b1b1b1;
        overflow: hidden;
    }

    .opinions-stars-full, .opinions-stars-one-full{
        position: absolute;
        left: 0;
        top: 0;
        white-space: nowrap;
        overflow: hidden;
        color: rgba(254, 203, 4, 1);
    }

    .opinions-stars-one{
        
    }

    .opinions-stars-one-empty:before,
    .opinions-stars-one-full:before {
        content: "\u2605";
        font-size: 2.5rem;
    }

    .opinions-stars-empty:before,
    .opinions-stars-full:before {
        content: "\u2605\u2605\u2605\u2605\u2605";
        font-size: 2.5rem;
    }

    .img-user{
        width:70px;
        height:70px;
    }

    .comment-end{
        margin-top: -80px;
    }

    .comments-title{
        color: white;
    }

    .commentaries{
        border-radius: 30px 30px 0 0;
    }

    .summary{
        min-height: 14rem;
        word-wrap: break-word;
    }

    .opinions, .summary, .comment-body, .comment-end{
        border-radius: 0 0 30px 30px;
    }

    .nbOpinions{
        font-size: 2rem;
        margin-left: 0.5rem;
    }

    .poster{
        width:18rem;
    }

    .title-synopsis{
        height: 80px;
    }

    .banner-1, .title-synopsis, .comment-user, .comments-title{
        border-radius: 30px 30px 0 0;
    }
    .banner-1, .banner-2, .banner-3{
        height: 80px;
        align-content: center;
        text-align: center;
    }

    span{
        color: rgba(231, 224, 139, 1);
        font-weight: inherit;
    }

    .faStar{
        color: rgba(254, 203, 4, 1);
    }

    .faBookBookmark, .faHeart, .faMessage{
        color: rgba(231, 224, 139, 1);
    }
  `]
})

export class MangaComponent implements OnInit{

    manga!: Manga | null;
    posterUser!:string[];
    pictures!:Picture[];
    picture!:Picture;
    comments!:Comment[];
    idUrl!:string;
    base64:string="data:image/webp;base64,";
    poster!:string;
    count:number=1;

    //Icon list
    faStar=faStar;
    faHeart=faHeart;
    faMessage=faMessage;
    faBookBookmark=faBookBookmark;
    
    constructor(
        private mangaService: MangaService,
        private activatedRoute: ActivatedRoute,
    ){}
    
    ngOnInit(): void {
        this.idUrl=this.activatedRoute.snapshot.paramMap.get('id')!;
        this.mangaService.getManga(this.idUrl)
        
        this.mangaService.currentManga.subscribe(manga=>{
            this.manga=manga
            this.strToLowerCaseAndFirstLetter();
            this.searchPicturesIsPoster();
            this.sortCommentByDate();
            this.nbComments();
        });
    }

    calculAverageVote(){
        if(this.manga){
            const sum=this.manga?.comments?.reduce((a, b)=>a+b?.rating, 0);
            const total=sum/this.manga?.comments.length;
            return Math.floor(total*100)/100;
        }
        return 0;
    }

    calculSatisfactionRate(){
         return (this.calculAverageVote()/5)*100;
    }

    nbComments(){
        return this.manga?.comments.length;
    }

    truncatDate(date: Date){
        return date.toString().substring(0, date.toString().indexOf('T'))
    }

    counter(){
        return this.count++;
    }

    strToLowerCaseAndFirstLetter(){
        if(this.manga){
            for (let genre of this.manga?.genres) {
                let tmp=genre.label.toLocaleLowerCase();
                genre.label=tmp.charAt(0).toUpperCase()+tmp.slice(1);
            }
        }
    }

    searchPicturesIsPoster(){
        if(this.manga){
            for (const picture of this.manga.pictures) {
                if(picture.isPoster) {
                    this.picture=picture;
                    break;
                };
            }
            
            this.poster=this.base64+this?.picture?.img;
        }
    }

    sortCommentByDate(){
        if(this.manga){
            console.log(this.manga.createdAt);
            console.log(this.manga.createdAt);
            
            this.manga.comments.sort((a, b)=>{
                
                return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
            })
        }
    }

    log(val: Object){
        console.log(val);
    }
    
}