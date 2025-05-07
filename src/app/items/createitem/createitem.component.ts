import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../../services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-createitem',
  imports: [ 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './createitem.component.html',
  styleUrl: './createitem.component.css'
})
export class CreateitemComponent {
  itemForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateitemComponent>,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      auteur: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.isLoading = true;
      this.itemService.createItem(this.itemForm.value).subscribe({
        next: () => {
          this.snackBar.open('Item créé avec succès', 'Fermer', {
            duration: 3000
          });
          this.dialogRef.close(true); // Ferme le dialog et retourne true
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 401 || err.status === 403) {
            this.snackBar.open('Session expirée - Veuillez vous reconnecter', 'Fermer', { duration: 5000 });
            this.authService.logout();
            this.router.navigate(['/login']);
          }else {
            this.snackBar.open('Erreur lors de la création', 'Fermer', { duration: 3000 });
          }
          console.error(err);
        }
      });
    }
  }

}
