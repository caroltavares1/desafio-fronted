import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreweryService } from './services/brewery.service';
import { Brewery } from './interfaces/brewery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  breweryList: Brewery[] = []


  constructor(private readonly brewery: BreweryService) { }

  ngOnInit(): void {

    this.getBreweryList()
  }

  getBreweryList() {
    return this.brewery.getBreweriesList()
      .subscribe((res) => {
        this.breweryList = res
        this.setColorTag()
        console.log(this.breweryList)
      })
  }

  setColorTag() {
    this.breweryList.forEach((x) => {
      if (x.brewery_type == "micro") {
        x.color_tag = '#56DABF' //green
      } else if (x.brewery_type == "brewpub") {
        x.color_tag = '#F2CB30' //yellow
      } else if (x.brewery_type == "contract") {
        x.color_tag = '#000000' //black
      } else if (x.brewery_type == "regional") {
        x.color_tag = '#4985EC' //blue
      } else if (x.brewery_type == "closed") {
        x.color_tag = '#F39' //blue
      } else {
        x.color_tag = '#7F00FF'; //purple
      }
    })
  }

  getBreweryStyle(brewery: Brewery): { [key: string]: string } {
    const backgroundColor = brewery.color_tag;
    const color = this.getTextColor(backgroundColor);
    return { backgroundColor: brewery.color_tag, color: color };
  }


  // Converte a cor hexadecimal em RGB e calcula o brilho
  private getTextColor(backgroundColor: string): string {
    if (backgroundColor.startsWith('#')) {
      const hex = backgroundColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      // Calcula o brilho com a fórmula de luminosidade relativa
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? '#000000' : '#FFFFFF'; // Preto para cores claras, branco para cores escuras
    }
    return '#fff'; // Caso não consiga interpretar a cor
  }




}
