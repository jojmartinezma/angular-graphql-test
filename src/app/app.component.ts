import { Component, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GET_COUNTRY } from './graphql-querys';
import { Country } from './interface/demo.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
// import { RouterOutlet } from '@angular/router';

const countryFlagUrl: string = 'https://flagsapi.com/{country_code}/flat/64.png';
const imageRandom: string = 'https://rickandmortyapi.com/api/character/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ]
})
export class AppComponent implements OnDestroy {

  private querySubscription!: Subscription;
  public countryCode =  '';
  public countryData!: Country;
  public countryFlag: string = '';

  constructor(private readonly apollo: Apollo){
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  public getInfo(){

    // default country is Colombia
    if(!this.countryCode){
      this.countryCode = 'CO';
    } else {
      this.countryCode = this.countryCode.toUpperCase();
    }
    const query = gql `${GET_COUNTRY.toString().replace('{countryCode}',this.countryCode.toUpperCase())}`;


    this.querySubscription = this.apollo
    .watchQuery<any>({
      query: query,
    })
    .valueChanges.subscribe(( data: any ) => {
      this.countryData = data.data.country;
      this.countryFlag = countryFlagUrl.toString().replace('{country_code}', this.countryCode);
      console.log(this.countryFlag);
    });

    

  }
}
