import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, switchMap, take } from 'rxjs';

export interface Item {
  _id: string;  // Optionnel pour la création
  titre: string;
  description: string;
  auteur: string;
  createdBy: {
    id: string;
    prenom: string;
    nom: string;
    email?: string;
  };
  createdAt?: Date;   
  updatedAt?: Date;   
}
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private apiUrl = 'http://localhost:3000/api/item'; // URL vers monAPI

  constructor( private http: HttpClient, private authService: AuthService) { }

   // Créer un item
   createItem(item: Omit<Item, 'id' | 'createdBy'>): Observable<Item> {
    return this.authService.currentUser$.pipe(
      take(1),
      switchMap(currentUser => {
        const completeItem = {
          titre: item.titre,
          description: item.description,
          auteur: item.auteur,
          createdBy: currentUser?.id 
        };
        return this.http.post<Item>(`${this.apiUrl}/ajouter`, completeItem, { headers: this.getHeaders() });
        
      })
    );
    
  }

  // Récupérer tous les items
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/list`);
  }

  // Récupérer un item par ID
  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un item
  updateItem(id: string, item: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/update${id}`, item);
  }

  // Supprimer un item
  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete${id}`);
  }

  // Récupérer les items d'un utilisateur spécifique
  getItemsByUser(userId: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/list?createdBy=${userId}`);
  }
}
