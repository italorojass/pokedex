/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent implements OnInit {

  constructor(private pokeService : PokeApiService) { }

  ngOnInit(): void {
   // this.getPokemons();
  }

  pokemons:any=[];
  getPokemons(){
    this.pokemons=[];
    this.pokeService.getPokemons(151,0).subscribe((r:any)=>{

     // this.cantidad=r['count'];
    r['results'].forEach((e:any,i:number) => {
      this.pokeService.getPokemonForSpecies(i+1).subscribe((x:any)=>{
        const newObj = {
          id : i+1,
          name : e.name,
          ...x
        }
        this.pokemons.push(newObj);

      })

    });
    localStorage.setItem('data',JSON.stringify(this.pokemons));
    console.log('data for buscador',this.pokemons);
    })
  }

}
