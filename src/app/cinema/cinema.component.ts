import { Component, OnInit } from '@angular/core';
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes;
  public salles;
  public cinemas;
  public currentCinema;
  public currentVille;

  constructor(private cinemaService: CinemaService) { }

  ngOnInit() {
    this.cinemaService.getVilles()
      .subscribe(data=>{
      this.villes = data;
    },err=>{
      console.log(err);
    })
  }

  onGetCinemas(v){
    this.currentVille = v;
    this.cinemaService.getCinemas(v)
      .subscribe(data=>{
        this.cinemas = data;
      },err=>{
        console.log(err);
      })
  }

  onGetSalles(c){
    this.currentCinema = c;
    this.cinemaService.getSalles(c)
      .subscribe(data=>{
        this.salles = data;
      },err=>{
        console.log(err);
      })
  }

}
