import { Component, Input, OnInit } from '@angular/core';
import { BreweryService } from '../services/brewery.service';
import { Brewery } from '../interfaces/brewery';

@Component({
  selector: 'app-brewery-detail',
  standalone: true,
  imports: [],
  templateUrl: './brewery-detail.component.html',
  styleUrl: './brewery-detail.component.scss'
})
export class BreweryDetailComponent implements OnInit {

  @Input() brewery_id!: string;
  breweryDetail: Partial<Brewery> = {}

  constructor(private readonly brewery: BreweryService) { }

  ngOnInit(): void {
    this.brewery.getBreweryById(this.brewery_id)
      .subscribe((res) => {
        this.breweryDetail = res
      })
  }

  openGoogleMaps(lat: string | undefined, lng: string | undefined): void {
    if (lat != undefined && lng != undefined) {
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, '_blank');
    }
  }
}
