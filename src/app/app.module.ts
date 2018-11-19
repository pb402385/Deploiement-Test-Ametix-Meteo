import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiMeteoService } from './service/api-meteo.service';
import { ErrorServiceService } from './service/error-service.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './pages/detail/detail.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { QuatreCentQuatreComponent } from './pages/quatre-cent-quatre/quatre-cent-quatre.component';
import { FooterResponsiveComponent } from './pages/includes/footer-responsive/footer-responsive.component';
import { HeaderResponsiveComponent } from './pages/includes/header-responsive/header-responsive.component';
import { PrincipalDialogBoxComponent } from './pages/principal-dialog-box/principal-dialog-box.component';

import { 
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatCardModule,
  MatProgressBarModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatGridListModule
 } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    PrincipalComponent,
    QuatreCentQuatreComponent,
    FooterResponsiveComponent,
    HeaderResponsiveComponent,
    PrincipalDialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatGridListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  entryComponents: [PrincipalDialogBoxComponent],
  providers: [ApiMeteoService,
    ErrorServiceService,
    { provide: MatDialogRef, useValue: {} }, 
    { provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule {}
  
enableProdMode();

