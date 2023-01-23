/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {


  constructor(private pokeService : PokeApiService, private router : Router, private fb : FormBuilder) { }

  cars: any = [];
  showSearches = false;
  isSearching = false;
  searchedCars: any = [];
  keyword = 'name';
  name = '';

  searchForm = this.fb.group({
    inputSearch : ['']
  });

  ngOnInit(): void {
    this.getPokemons();

  }


  getPokemons(){
    this.cars=[];
    this.pokeService.getPokemons(151,0).subscribe((r:any)=>{

     // this.cantidad=r['count'];
    r['results'].forEach((e:any,i:number) => {
      const newObj = {
        id : i+1,
        name : e.name
      };
      this.cars.push(newObj)
    });
    //console.log('data for buscador',this.cars);
    })
  }

  selectEvent(item:any) {
    // do something with selected item
    //console.log(item);
    this.router.navigate(['/pokemon/detail',item.id]);

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    //console.log(val)
  }

  /* onFocused(e:any){
    // do something when input is focused
  } */


}
