/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { PokeApiService } from './../services/poke-api.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {


  constructor(private pokeService : PokeApiService) { }

  ngOnInit(): void {
    this.getPokemons(this.limit,0);
  }

  pokemons : Array<any>=[];
  paginateNext :any;
  paginatePrev :any;
  cantidad : number;
  limit:number=24;

  getPokemons(limit:number,offset:number){
    this.pokemons=[];
    this.pokeService.getPokemons(limit,offset).subscribe((r:any)=>{
      //console.log(r);
     this.cantidad=r['count'];
      this.paginateNext = r['next']
      this.paginatePrev =r['previous'];
      this.fillPokemons(r['results']);
    })
  }
  dataPokedex:any;
  fillPokemons(array:Array<any>){
    array.forEach((element:any) => {
      const id = element.url.split('pokemon/')[1].replace('/','');

      this.pokeService.getPokemonForSpecies(id).subscribe((x:any)=>{
       // console.log(x);
        this.pokeService.getPokemonsForId(id).subscribe((r: any) => {
          //console.log('datos pokemon', r);
          this.dataPokedex = r;
          const newObj = {
            ...element,
            ...x,
            ...r
          }
          this.pokemons.push(newObj);
        })
      });
    });

    console.log(this.pokemons);
  }
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // Load Your Data Here

      console.log('cargar data',this.paginateNext);
      this.pokeService.paginarPokemons(this.paginateNext).subscribe((r:any)=>{
        this.paginateNext = r['next'];
        r['results'].forEach((element:any) => {
          const id = element.url.split('pokemon/')[1].replace('/','');

          this.pokeService.getPokemonForSpecies(id).subscribe((x:any)=>{
           // console.log(x);
            this.pokeService.getPokemonsForId(id).subscribe((r: any) => {
              //console.log('datos pokemon', r);
              this.dataPokedex = r;
              const newObj = {
                ...element,
                ...x,
                ...r
              }
              this.pokemons.push(newObj);
            })



          });
        });
      })
    }
  }

  paginator(href:string){

    console.log('url',href);
    this.pokeService.paginarPokemons(href).subscribe((r:any)=>{
      //console.log('response paginate',r);
      this.paginateNext = r['next']
      this.paginatePrev =r['previous'];
      this.fillPokemons(r['results']);
      const limit= r['next'].split('offset=')[1];
      const format= limit.split('limit=')[0];
      //console.log(limit,format);
      this.limit = format.replace('&','');
    })
  }





}
