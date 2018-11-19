import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { ApiMeteoService } from '../../service/api-meteo.service';

import { ErrorServiceService } from '../../service/error-service.service';

import { PrincipalDialogBoxComponent } from '../principal-dialog-box/principal-dialog-box.component';

export interface MeteoData {
  id: any;
  ville: any;
  location: any;
  heure: any;
  temperature: any;
  image: any;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public displayedColumns: string[] = ['heure', 'temperature', 'image', 'ville'];
  public dataSource: MatTableDataSource<MeteoData> = new MatTableDataSource();

  public errorLog: any = null;
  public waitForSendVille: boolean = false;

  public currentLat: any = null;
  public currentLong: any = null;

  public id = 0; 
  public maxLength = 0;

  public totalElements: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public apiMeteo: ApiMeteoService,
              public dialogBox: PrincipalDialogBoxComponent,
              public errorService: ErrorServiceService) {

    this.findMe();

  }

  saveItem(responseJSON:any,id:string){

    this.dataSource = new MatTableDataSource();
    
    const entryData: MeteoData[] = [];

    localStorage.setItem(id, JSON.stringify(responseJSON));
    let item = JSON.parse(localStorage.getItem(id)); 

    let lon = item.coord.lon;
    let lat = item.coord.lat;

    let temperature = item.main.temp;
    let temperatureMin = item.main.temp_min;
    let temperatureMax = item.main.temp_max;

    let pression = item.main.pressure;
    let humidite = item.main.humidity;

    let windSpeed = item.wind.speed;

    let ville = item.name;
    let pays = item.sys.country;

    let date = item.dt;
    //let leveeSoleil = responseJSON.sys.sunset;
    //let coucheSoleil = responseJSON.sys.sunrise;

    //let temps = responseJSON.weather[0].main;
    let icone = item.weather[0].icon;
    //let description = responseJSON.weather[0].description;


    let infoComplementaire = "";
    if(id == "0"){
      infoComplementaire = " [Ma Position]";

      let elem = {
        id: id,
        ville: ville+" ("+pays+")"+infoComplementaire,
        location: "lat:"+lat+" lon:"+lon,
        //heure: this.formatDate(date,"date")+this.formatDate(leveeSoleil,"leveeSoleil")+this.formatDate(coucheSoleil,"coucheSoleil"),
        heure: this.formatDate(date,"date"),
        temperature: temperature,
        //image: temps+" ("+description+")"
        image: "https://openweathermap.org/img/w/"+icone+".png"
      };

      //On l'ajoute à l'entryData
      entryData.push(elem);

      this.id = 1;

      this.maxLength = localStorage.length;

      for(let i = this.id; i < localStorage.length; i++){
        if(localStorage.getItem(""+i) !== null){
          let item = JSON.parse(localStorage.getItem(""+i));

          let lon = item.coord.lon;
          let lat = item.coord.lat;
          let temperature = item.main.temp;
          let ville = item.name;
          let pays = item.sys.country;
          let date = item.dt;
          let icone = item.weather[0].icon;

          let elem = {
            id: ""+i,
            ville: ville+" ("+pays+")",
            location: "lat:"+lat+" lon:"+lon,
            //heure: this.formatDate(date,"date")+this.formatDate(leveeSoleil,"leveeSoleil")+this.formatDate(coucheSoleil,"coucheSoleil"),
            heure: this.formatDate(date,"date"),
            temperature: temperature,
            //image: temps+" ("+description+")"
            image: "http://openweathermap.org/img/w/"+icone+".png"
          };
      
          //On l'ajoute à l'entryData
          entryData.push(elem);
        }
      }
    }else{

      this.id = localStorage.length;

      for(let i = 0; i < localStorage.length; i++){
        if(localStorage.getItem(""+i) !== null){
          let item = JSON.parse(localStorage.getItem(""+i));

          let lon = item.coord.lon;
          let lat = item.coord.lat;
          let temperature = item.main.temp;
          let ville = item.name;
          let pays = item.sys.country;
          let date = item.dt;
          let icone = item.weather[0].icon;

          let elem = {
            id: ""+i,
            ville: ville+" ("+pays+")",
            location: "lat:"+lat+" lon:"+lon,
            //heure: this.formatDate(date,"date")+this.formatDate(leveeSoleil,"leveeSoleil")+this.formatDate(coucheSoleil,"coucheSoleil"),
            heure: this.formatDate(date,"date"),
            temperature: temperature,
            //image: temps+" ("+description+")"
            image: "http://openweathermap.org/img/w/"+icone+".png"
          };
      
          //On l'ajoute à l'entryData
          entryData.push(elem);
        }
      }

    }

    

    //Enfin on l'ajoute à notre tableau angular responsive material
    this.dataSource.data.push.apply(this.dataSource.data,entryData);
    this.dataSource._updateChangeSubscription();

    this.totalElements = localStorage.length;

        /**
         * On met à jour por la pagination
         */
        setTimeout(
          () => { 

            let nbTotal = this.totalElements;
            //TODO
            this.paginator.pageSize = this.pageSize;
            this.paginator.length = this.totalElements;
            this.paginator.pageIndex = this.pageIndex;

            let pIndex = this.pageIndex;
            let pSize = this.pageSize;
            

            /** Redefinition des paramètres car ils sont en anglais par défault **/
            this.paginator._intl.getRangeLabel = function (page, pageSize, length) {
              if (length === 0 || pageSize === 0) {
                return '0 sur ' + length;
              }
              if(length < pSize) return pIndex*pSize + 1 + ' - ' + length + ' sur ' + nbTotal;
              return pIndex*pSize + 1 + ' - ' + (pIndex+1)*pSize + ' sur ' + nbTotal; 
            };

            this.paginator._intl.nextPageLabel  = "Page suivante";
            this.paginator._intl.previousPageLabel = "Page précédante";
            this.paginator._intl.itemsPerPageLabel = "Nombre d'éléments par page";
            //Init du tableau angular material
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          }, 500);
  }


  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;

        //Puis on contruit notre élément pour le tableau angular responsive material   
        this.apiMeteo.getWeatherFromCoordinates(this.currentLat,this.currentLong).subscribe(
          response => {

            //Objet pour insérer nos données une à unes dans le tableau angular material design
            let responseJSON = response.body;
            this.saveItem(responseJSON,""+this.id);

          },
          error =>{
            //En cas d'ereur on affiche le message d'erreur
            if(error) this.errorService.errorManagement("Erreur lors de la récupération par géolocalisation","erreurGeolocalisation",this);
          } 
        );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  formatDate(n:number,type: string){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(n*1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    //console.log(type+": "+formattedTime)

    return formattedTime;
  }

  KelvinToCelcius(n:number){
    return n-273.15;
  }

  openDialogBox(){
    this.dialogBox.openDialog(this);
  }


  /** Raffraichissement des données si changement de page **/
  changePage(event){

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    //On raffraichit le texte car c'est en anglais par défault
    this.paginator._intl.getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 sur ' + length;
      }

      if((event.pageIndex+1)*event.pageSize < length){
        return event.pageIndex*event.pageSize + 1 + ' - ' + (event.pageIndex+1)*event.pageSize + ' sur ' + length;
      }else{
        let diff = (event.pageIndex+1)*event.pageSize + (length -(event.pageIndex+1)*event.pageSize);
        return event.pageIndex*event.pageSize + 1 + ' - ' + diff + ' sur ' + length;
      }
    };

  }

}
