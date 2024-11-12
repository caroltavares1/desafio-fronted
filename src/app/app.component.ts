import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
/* import { RouterOutlet } from '@angular/router'; */
import { BreweryService } from './services/brewery.service';
import { Brewery } from './interfaces/brewery';
import { CommonModule } from '@angular/common';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BreweryDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  @ViewChild('button_1') button_1!: ElementRef;
  breweryList: Brewery[] = [];
  breweryTypeList: string[] = [
    'micro', 'large', 'regional',
    'contract', 'nano', 'brewpub', 'planning',
    'bar', 'proprietor', 'closed'
  ]
  page_1: string = '1';
  page_2: string = '2';
  page_3: string = '3';
  activePage: number = 0;
  selectedFilter: string = ''
  brewery_id: string = ''
  showBreweryDetail: boolean = false


  constructor(private readonly brewery: BreweryService) { }

  ngOnInit(): void {
    this.activePage = 1;
    this.getBreweryList('1')
  }

  getBreweryList(page: string) {
    return this.brewery.getBreweriesListByPage(page)
      .subscribe((res) => {
        this.breweryList = res
        this.setColorTag()
      })
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFilter = selectElement.value;
    this.selectByType('1', +this.selectedFilter)//inicia na pagina 1
    this.activePage = 1
  }

  selectByType(page: string, indice: number) {
    this.brewery.getBreweriesByType(page, this.breweryTypeList[indice])
      .subscribe((res) => {
        this.breweryList = res
        this.setColorTag()

      })

  }

  changePage(page: string) {
    this.activePage = +page; //define qual pagina esta ativa
    if (this.selectedFilter == '') {
      this.getBreweryList(page)

    } else {
      this.selectByType(page, +this.selectedFilter)
    }
  }

  setColorTag() {
    this.breweryList.forEach((x) => {
      if (x.brewery_type == "micro") {
        x.color_tag = '#00B7B1' //green
      } else if (x.brewery_type == "brewpub") {
        x.color_tag = '#F2CB30' //yellow
      } else if (x.brewery_type == "contract") {
        x.color_tag = '#000000' //black
      } else if (x.brewery_type == "regional") {
        x.color_tag = '#4985EC' //blue
      } else if (x.brewery_type == "closed") {
        x.color_tag = '#F39' //pink
      } else if (x.brewery_type == "proprietor") {
        x.color_tag = '#F33' //red
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

  breweryDetail(brewery: Brewery) {
    this.brewery_id = brewery.id
    this.showBreweryDetail = true
  }

  backToHome() {
    this.showBreweryDetail = false
  }




}
