import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface FrontendUser {
  firstName?: string;
  lastName?: string;
  email: string;
  id: string;
}

// Interface pour la réponse API
interface ApiUser {
  id: string;
  prenom: string;
  nom: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: FrontendUser;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL vers monAPI
  private currentUserSubject = new BehaviorSubject<FrontendUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (this.isBrowser()) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private mapApiToFrontendUser(apiUser: ApiUser): FrontendUser {
    return {
      firstName: apiUser.prenom,
      lastName: apiUser.nom,
      email: apiUser.email,
      id: apiUser.id
    };
  }

  register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    // Conversion pour l'API
    const apiData = {
      prenom: userData.firstName,  // Mapping vers les noms API
      nom: userData.lastName,
      email: userData.email,
      password: userData.password
    };
    return this.http.post<{ token: string; user: ApiUser }>(`${this.apiUrl}/register`, apiData).pipe(
      map(apiResponse => ({
        token: apiResponse.token,
        user: this.mapApiToFrontendUser(apiResponse.user)
      })),
      tap(response => this.handleAuthentication(response))
    );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<{ token: string; user: ApiUser }>(`${this.apiUrl}/login`, credentials).pipe(
      map(apiResponse => ({
        token: apiResponse.token,
        user: this.mapApiToFrontendUser(apiResponse.user)
      })),
      tap(response => this.handleAuthentication(response))
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      // Effacer le token et l'utilisateur du localStorage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('authToken') : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleAuthentication(response: AuthResponse): void {
    if (this.isBrowser()) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
    }
    this.currentUserSubject.next(response.user);
  }
}
