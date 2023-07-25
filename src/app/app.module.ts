import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/components/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceInterceptor } from './core/interceptors/service.interceptor';
import { LoadingModule } from './shared/components/loading/loading.module';
import { PersonalInformationComponent } from './shared/components/personal-information/personal-information.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PersonalInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
