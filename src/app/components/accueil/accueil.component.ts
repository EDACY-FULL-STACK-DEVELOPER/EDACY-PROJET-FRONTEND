import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateitemComponent } from '../../items/createitem/createitem.component';
import { ItemService } from '../../services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../../services/item.service'; 
import { EdititemComponent } from '../../items/edititem/edititem.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-accueil',
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    CommonModule, 
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule
    
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  items: Item[] = [];
  isLoading = false;
  constructor(
    public authService: AuthService, 
    private router: Router, 
    private dialog: MatDialog, 
    public itemService: ItemService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadItems();
    console.log('Items chargés:', this.items);
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Erreur lors du chargement des items', 'Fermer', { duration: 3000 });
      }
    });
  }

  deleteItem(id: string): void {
    if (!id) {
      this.snackBar.open('ID invalide', 'Fermer', { duration: 3000 });
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer cet item ?')) {
      this.itemService.deleteItem(id).subscribe({
        next: () => {
          this.snackBar.open('Item supprimé avec succès', 'Fermer', { duration: 3000 });
          this.loadItems();
        },
        error: (err) => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  editItem(item: any): void {
    const dialogRef = this.dialog.open(EdititemComponent, {
      width: '500px',
      data: { id: item._id, item } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadItems(); // Recharger les items après modification
      }
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateitemComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Rafraîchir la liste des items si nécessaire
        console.log('Item créé avec succès');
      }
    });
  }

}
