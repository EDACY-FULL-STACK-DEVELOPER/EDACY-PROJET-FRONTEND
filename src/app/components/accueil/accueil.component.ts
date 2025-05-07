import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateitemComponent } from '../../items/createitem/createitem.component';
@Component({
  selector: 'app-accueil',
  imports: [MatToolbarModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  constructor(public authService: AuthService, private router: Router, private dialog: MatDialog) {}
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
