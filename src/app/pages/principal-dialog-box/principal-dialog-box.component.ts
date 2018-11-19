import { Component, Inject } from '@angular/core';

import { Injectable } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { ApiMeteoService } from '../../service/api-meteo.service';

import { ErrorServiceService } from '../../service/error-service.service';

export interface DialogData {
  ville:string;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-principal-dialog-box',
  templateUrl: './principal-dialog-box.component.html',
  styleUrls: ['./principal-dialog-box.component.css']
})
export class PrincipalDialogBoxComponent {

  //La ville à rechercher
  public ville: string = "";

  //Variable pour savoir si on affiche le loader ou pas (utile lorsque l'envoie est en cours et si il est long)
  public sendVilleActivated: boolean = false;
  
  //Variable pour savoir si la ville a une syntaxe correcte
  public villeIsValid: boolean = false;

  constructor(public dialog: MatDialog,
              private apiMeteo: ApiMeteoService,
              public errorService: ErrorServiceService,
              @Inject(MAT_DIALOG_DATA) public data?: DialogData) { }


  /**
   * Méthode pour ouvrir la boîte de dialogue
   * @param classe la classe appelante
   */
  openDialog(classe:any): void {

    /**
     * Ouverture de la boîte de dialogue
     */
    const dialogRef = this.dialog.open(PrincipalDialogBoxComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        ville: this.ville,
        classe: classe
      }
    });


    /**
     * Fermeture de la boîte de dialogue
     * On appelle le service de météo avec la ville choisie
     */
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.sendVilleToApi(result.ville,result.classe);
      }
    });

  }

  /**
   * Fermeture de la boîte de dialogue si on appuie sur la touche annuler
   */
  onCancel(): void {
    this.dialog.closeAll();
    //console.log('Fermeture de la boite de dialogue, pas d opération effectuée');
  }


  /**
   * Méthode pour récupérer la météo d'une ville par son nom
   * @param ville le nom de la ville
   * @param classe la classe appelante
   */
  sendVilleToApi(ville:string,classe:any){

    //On clean le message d'erreur au cas où
    classe.errorLog = null;

    //On spécifie que l'action a commencé afin d'afficher le loader
    classe.waitForSendVille = true;

    this.villeIsValid = true;
    for(let i = 0; i < localStorage.length; i++){
      let item = JSON.parse(localStorage.getItem(""+i)); 
      let villeToCompare = item.name;
      if(ville.toUpperCase() === villeToCompare.toUpperCase()){
        this.villeIsValid = false;
        break;
      }
    }

    if(this.villeIsValid){

      this.apiMeteo.getWeatherFromCityName(ville).subscribe(
        response => {

          let responseJSON = response.body;
          classe.id = localStorage.length;
          classe.saveItem(responseJSON,""+classe.id);

          //On masque le loader
          classe.waitForSendVille = false;
        },
        error =>{
          //En cas d'erreur on affiche le message d'erreur
          if(error) this.errorService.errorManagement("Erreur lors de la récupération de la ville!","erreurVille",classe);
        }
      );

    }else{
      this.errorService.errorManagement("Ville déjà dans la base de données!","erreurVille",classe);
    }
  }

  /**
   * Méthode de vérification de la ville
   */
  verifyVille():boolean{

     let str = this.ville;

     if(str.length > 3){
      this.villeIsValid = true;
      document.getElementById("villeToSend").style.border = "2px solid green";
      this.data.ville = this.ville;
      return true;
     }else{
      this.villeIsValid = false;
      document.getElementById("villeToSend").style.border = "2px solid red";
      return false;
     }

  }

}
