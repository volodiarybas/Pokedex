import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 pokemons: {};
 pokemonsTitles
  pokemonsTypes = [[]];
 resultsCE=[];
 types:[];
 count = 12;
 selectedPokemon;
 btnColors=['grey','red','blue','green','brown','#694266','#0F402F','#54CCA4','#7C8B86','orange','blue','green','#24CC94','grey','#313963','black','grey','#809199','#C517D2','#543736','#2D100F']
 isType = false;
 filteredTypes
 

 
   constructor() { }

  ngOnInit() {
    this.getTypes(); 
    this.getPokemons("https://pokeapi.co/api/v2/pokemon?limit=12"); 
  }

  getPokemons(link) {
    let i=0;
      fetch(link)
       .then(res => res.json())
       .then(res => this.pokemons = res)
       .then ( (res) => this.pokemonsTitles = res.results)
        .then( res => { for (const item of this.pokemonsTitles) {
        this.getPokemonTypes(item ,i)
        i= i+1;
       } })
       .then(() => this.filteredTypes = this.pokemonsTitles)

      
        
  }

  getTypes() {
      fetch("https://pokeapi.co/api/v2/type?limit=999")
      .then(res => res.json())
      .then(res =>{if(res.results){
        this.types = res.results.map(item => item.name);
      }})
  }

 loadMore(link){
   let array;
   let i=0;
  fetch(link)
  .then(res => res.json())
  .then(res => this.pokemons = res)
  .then ( (res) => res.results.forEach(element => {
    this.pokemonsTitles.push(element)
  }))
  .then( res => { for (const item of this.pokemonsTitles) {
    this.getPokemonTypes(item ,i)
    i= i+1;
   } })
   .then(() => this.filteredTypes= this.pokemonsTitles)
  
 }

 moreInfo(pokemon) {
   fetch(pokemon.url) 
   .then(res => res.json())
   .then(res => this.selectedPokemon = res)
 }
 
 getPokemonTypes(link,i) {
  let array = []
   fetch(link.url)
  .then(res => res.json())
  .then(res => { for (const element of res.types) {
    array.push(element.type.name)
  }})
  .then(() => this.pokemonsTitles[i].type = array)
  .then(() => this.pokemonsTitles[i].id = i+1)
   }

   typeFilter(type){ 
    this.filteredTypes =this.pokemonsTitles;
     console.log(type)
  this.filteredTypes = this.filteredTypes.filter(word => (word.type[1] == type)||(word.type[0] == type))
  console.log(this.filteredTypes)
  }
    
}
