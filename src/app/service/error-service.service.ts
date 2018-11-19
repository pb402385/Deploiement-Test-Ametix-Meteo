import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  constructor() { }

  errorManagement(error:any,urlWebService:string,classe:any):void{

    if(urlWebService == "erreurGeolocalisation"){
      //On affiche le log d'erreur
      classe.errorLog = error;
      classe.waitForSendVille = false;
      this.createLogAnimation("errorLogDiv",50);
  }

    if(urlWebService == "erreurVille"){
        //On affiche le log d'erreur
        classe.errorLog = error;
        classe.waitForSendVille = false;
        this.createLogAnimation("errorLogDiv",50);
    }

    if(urlWebService == "erreurDetail"){
      //On affiche le log d'erreur
      classe.errorLog = error;
      classe.waitForDetail = false;
      this.createLogAnimation("errorLogDiv",50);
  }

  }




  /**
   * Méthode générique d'animation des logs d'erreur, permet d'afficher l'erreur avec une transition sur l'opacité
   * @param id l'id de bloc contenant le message d'erreur
   * @param delay le delay avant de lancer l'animation (en millisecondes)
   */
  createLogAnimation(id:string,delayBeforeStartAnimation:number){

    var dureeAnimation = 500*2;

    setTimeout(function(){

      var elem = document.getElementById(id);

      var opacity = 0.0;

      var refreshIntervalId = setInterval(function(){ 
        if(opacity>=0.0 && opacity<=1.0){
          opacity = opacity + 0.025;
          elem.style.opacity = ""+opacity;
        }
      }, 10);

      setTimeout(function(){
        clearInterval(refreshIntervalId);
      }, dureeAnimation);

    }, delayBeforeStartAnimation);

  }


  /**
   * Méthode pour vérifier qu'une string json est valide
   * @param str la string à vérifier
   */
  isJsonString(str) {
    str = JSON.stringify(str);
    if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

      //json is ok
      return true;

    }else{

      //the json is not ok
      return false;

    }
  }
}
