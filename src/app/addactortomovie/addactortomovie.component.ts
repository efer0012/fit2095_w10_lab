import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {

  actorsDB: any[] = [];
  moviesDB: any[] = [];

  selectedMovie = null;
  selectedActor = null;

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

  //Get all Actors
  onGetActors() {
    console.log("From on GetActors");

    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  //Get all Movies
  onGetMovies() {
    console.log("From on GetMovies");

    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSelectActor(item) {
    this.selectedActor = item;
  }
  onSelectMovie(item) {
    this.selectedMovie = item;
  }

  onAddActor() {
    let actorID = { id: this.selectedActor._id };
    this.dbService.addActor(this.selectedMovie._id, actorID).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();
    });
  }
  
}
