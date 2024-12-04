import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Genre, Manga, Picture} from "../../types";
import {MangaService} from "../../services/manga.service";
import {PictureService} from "../../services/picture.service";
import {ActivatedRoute} from "@angular/router";
import {GenreService} from "../../services/genre.service";
import {CardComponent} from "../card/card.component";
import {PicturesPipe} from "../../pipes/pictures.pipe";

@Component({
  selector: 'ui-carousel-genre',
  standalone: true,
  imports: [CommonModule, CardComponent, PicturesPipe],
  template: `
    <div class="carousel-container" *ngIf="genres.length > 0">
      <div class="carousel-wrapper" [style.transform]="'translateX(' + offset + 'px)'">
        <ui-card
            *ngFor="let genre of genres"
            [title]="genre.label"
            class="carousel-item"
        >
          <p>{{genre.label}}</p>
        </ui-card>
      </div>
      <button class="carousel-button left" (click)="prevSlide()">❮</button>
      <button class="carousel-button right" (click)="nextSlide()">❯</button>
    </div>
  `,
  styles: [`
    .carousel-container {
      position: relative;
      width: 300px;
      margin: auto;
      overflow: hidden;
    }
    .carousel-wrapper {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }
    .carousel-item {
      flex: 0 0 100%; 
      display: flex; 
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .carousel-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 10px;
      z-index: 1;
    }
    .carousel-button.left {
      left: 10px;
    }
    .carousel-button.right {
      right: 10px;
    }
    
  `]
})
export class CarouselGenreComponent  implements OnInit{
  mangas!: Manga[] ;
  pictures!: Picture[];
  picture!:Picture;
  loading = true;
  idUrl!: string;
  base64:string="data:image/webp;base64,";
  base64G:string="data:image/webp;base64,";
  poster!:string;
  genres!: Genre[];
  nineMangas! : Manga[];
  offset = 0;
  cardWidth = 300;
  constructor(
      private mangaService: MangaService,
      private genreService: GenreService
  ){}

  ngOnInit(): void {
    this.genreService.getSixgenre();
    this.genreService.currentGenresSix.subscribe(genres =>{
      this.genres = genres;
    })

    this.mangaService.getTenManga()
    this.mangaService.currentTenMangas.subscribe(nineMangas =>{
      this.nineMangas = nineMangas;
    })
  }

  prevSlide() {
    if (this.offset < 0) {
      this.offset += this.cardWidth;
    }
  }

  nextSlide() {
    const maxOffset = -(this.cardWidth * (this.nineMangas.length - 1));
    if (this.offset > maxOffset) {
      this.offset -= this.cardWidth;
      console.log(`Next Slide - Offset: ${this.offset}, Max Offset: ${maxOffset}`);
    }
  }


}
