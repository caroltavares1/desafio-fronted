import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreweryService } from './services/brewery.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  constructor(private readonly brewery: BreweryService) { }

  ngOnInit(): void {

    this.getBreweryList()
  }

  getBreweryList() {
    return this.brewery.getBreweriesList()
      .subscribe((res) => console.log(res))
  }



}
