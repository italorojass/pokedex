/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private pokeSv: PokeApiService) {

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        //console.log(event);
        const id=event.url.split('detail')[1];
        if(id){
        //  console.log(event,id.replace('/',''));
        this.idPokemon = Number(id.replace('/',''));
        this.initFx();
        }

      }

    });
   }
  idPokemon: number;

  ngOnInit(): void {
    this.initFx();
  }

  dictEstadisticas=[{
    stat: 'hp',
    trad : 'Vida'
  },
  {
    stat: 'attack',
    trad : 'Ataque'
  },
  {
    stat: 'defense',
    trad : 'Defensa'
  },
  {
    stat: 'special-attack',
    trad : 'Ataque especial'
  },
  {
    stat: 'special-defense',
    trad : 'Defensa especial'
  },
  {
    stat: 'speed',
    trad : 'Velocidad'
  }]
  statSpanish(stat:string){
    const findDict = this.dictEstadisticas.find(x=>x.stat==stat);
    return findDict?.trad;
  }

  initFx(){
    this.route.params.subscribe(params => {

      this.idPokemon=params['id'];
      this.getData(this.idPokemon);
    this.getSpecies(this.idPokemon);
    this.getLocation(this.idPokemon);
    });

  }

  dataPokedex: any;

  getData(id: number) {
    this.pokeSv.getPokemonsForId(id).subscribe((r: any) => {
      console.log('datos pokemon', r);
      this.dataPokedex = r;

    })
  }
  dataSpecies: any;
  getSpecies(id: number) {
    this.pokeSv.getPokemonForSpecies(id).subscribe(r => {
      console.log('species', r);
      this.dataSpecies = r;
    })
  }

  locations: any;
  getLocation(id: number) {
    this.pokeSv.getLocations(id).subscribe(r => {
      //console.log('DONDE ENCONTRAR', r);
      this.locations = r;

    })
  }

  abilitys: any;
  getAbilitys(id: number) {
    this.pokeSv.getAbility(id).subscribe(r => {
      //console.log('HABILIDADES', r);


    })
  }

  getImagenCarrousel(url:string){
    const format = url.split('pokemon/');
    //console.log(url,format);
    return `${format[0]}pokemon/other/official-artwork/${format[1]}`;
  }

  setMove:any;
  detailMovement :any;
  detailMove(item:any){
    this.setMove=item.move.name;
    console.log(item.move);
    this.pokeSv.detailMove(item.move.url).subscribe(r=>{
      console.log('DETALLE MOVIMIENTO',r);
      this.detailMovement=r;

    })

  }

}
