import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreweryService } from './services/brewery.service';
import { Brewery } from './interfaces/breweries';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
        console.log(this.breweryList)
      })
  }



}
