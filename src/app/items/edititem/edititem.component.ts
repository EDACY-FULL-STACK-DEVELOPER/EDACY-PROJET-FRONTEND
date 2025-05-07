import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../../services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../../services/item.service'; // Importez depuis le service
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edititem',
  imports: [
    MatDialogModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    CommonModule, 
    MatButtonModule, 
    MatInputModule, 
    MatProgressSpinnerModule],
  templateUrl: './edititem.component.html',
  styleUrl: './edititem.component.css'
})
export class EdititemComponent {
  itemForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EdititemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // data = l'item à modifier
  ) {
    console.log('Données reçues dans EdititemComponent:', this.data);
    
    this.itemForm = this.fb.group({
      titre: [this.data.item.titre],
      description: [this.data.item.description],
      auteur: [this.data.item.auteur]
    });
  }
 
  onSubmit(): void {
    // Vérification que l'ID est disponible
    if (!this.data || !this.data.id) {
      console.error('Erreur: ID de l\'item manquant');
      this.snackBar.open('Erreur: Impossible de mettre à jour l\'item (ID manquant)', 'Fermer', { duration: 3000 });
      return;
    }
    if (this.itemForm.dirty) {
      this.isLoading = true;
      const modifiedFields: any = {};
  
      for (const key in this.itemForm.controls) {
        if (this.itemForm.controls[key].dirty) {
          modifiedFields[key] = this.itemForm.controls[key].value;
        }
      }
  
      if (Object.keys(modifiedFields).length === 0) {
        this.isLoading = false;
        this.snackBar.open('Aucune modification détectée.', 'Fermer', { duration: 3000 });
        this.dialogRef.close(true);
        return;
      }
  
      this.itemService.updateItem(this.data.id, modifiedFields).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Item mis à jour avec succès !', 'Fermer', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Erreur lors de la mise à jour.', 'Fermer', { duration: 3000 });
        }
      });
    }else {
      this.dialogRef.close(false);
    }
  }

}
