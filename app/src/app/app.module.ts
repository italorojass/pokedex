import { LoaderService } from './shared/services/loader.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { allIcons } from 'ngx-bootstrap-icons';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokeApiService } from './services/poke-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { DetailComponent } from './pokedex/detail/detail.component';
import { LoaderInterceptorService } from './shared/interceptors/loader-interceptor.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { AutocompleteComponent } from './pokedex/autocomplete/autocomplete.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { LoadDataComponent } from './load-data/load-data.component';
import { NgChartsModule } from 'ng2-charts';
import { DetailMoveComponent } from './pokedex/detail/detail-move/detail-move.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    LoaderComponent,
    DetailComponent,
    FooterComponent,
    HeaderComponent,
    PaginatorComponent,
    AutocompleteComponent,
    LoadDataComponent,
    DetailMoveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgChartsModule,
    NgxBootstrapIconsModule.pick(allIcons)

  ],
  providers: [
    PokeApiService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
   },],
  bootstrap: [AppComponent]
})
export class AppModule { }
