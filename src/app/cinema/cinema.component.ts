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
  private currentProjection;
  private selectedTickets: any;

  constructor(public cinemaService: CinemaService) { }

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
    this.salles=undefined;
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
        this.salles._embedded.salles.forEach(salle=>{
          this.cinemaService.getProjections(salle)
            .subscribe(data=>{
              salle.projections=data;
            },err=>{
              console.log(err);
            })
        })

      },err=>{
        console.log(err);
      })
  }

  onGetTicketPlaces(p){
    this.currentProjection=p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe(data=>{
        this.currentProjection.tickets = data;
        this.selectedTickets=[];
      },err=>{
        console.log(err);
      })
  }

  onGetSelectTicket(t){
   // console.log("dans la methode onGetSelectTicket");
 //   console.log("t.selected "+t.selected);
  if(!t.selected){
    t.selected=true;
    this.selectedTickets.push(t);
  }else{
    t.selected=false;
    this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
  }
//  console.log(this.selectedTickets);

  }

  getTicketClass(t){
   // console.log("t "+t);
   // console.log("t.reserve "+t.reserve);
   // console.log("t.selected "+t.selected);
  let str = "btn ticket ";
  if(t.reserve==true){
    str+="btn-danger";
  }else if(t.selected==true){
    str+="btn-warning";
  }else{
    str+="btn-success";
  }
 // console.log("str "+str);
  return str;
  }
  onPayTickets(dataForm){
    let tickets=[];
    this.selectedTickets.forEach(t=>{
    tickets.push(t.id);
    });
    dataForm.tickets=tickets;
    this.cinemaService.payerTickets(dataForm)
      .subscribe(data=>{
        alert("Ticket reservé avec success !");
        this.onGetTicketPlaces(this.currentProjection);
      },err=>{
        console.log(err);
      })
  }

}
