import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) {

  }

  url = `${environment.pokeapi}pokemon/`
  getPokemons(limit=15,offset=0){
    return this.http.get(`${this.url}?offset=${offset}&limit=${limit}`);
  }

  getPokemonsForId(id:number){
    return this.http.get(`${this.url}${id}`);
  }

  getPokemonForEvolution(id:number){
    return this.http.get(`${this.url}evolution-chain/${id}`);
  }
  getPokemonForSpecies(id:number){
    return this.http.get(`${environment.pokeapi}pokemon-species/${id}`);
  }



  getAbility(id:number){
    return this.http.get(`${environment.pokeapi}ability/${id}`);
  }

  paginarPokemons(href:string){
    return this.http.get(`${href}`);
  }

  getLocations(id:number){
    return this.http.get(`${environment.pokeapi}location/${id}`);
  }

  detailMove(url:string){
    return this.http.get(`${url}`);
  }
}
