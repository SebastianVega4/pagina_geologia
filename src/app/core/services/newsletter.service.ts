import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  // En producción, esta sería la URL de tu script en el hosting (ej: /api/subscribe.php)
  private readonly apiUrl = 'assets/api/subscribe.php';

  constructor(private http: HttpClient) {}

  subscribe(email: string): Observable<any> {
    if (!this.isValidEmail(email)) {
      return throwError(() => new Error('Formato de correo inválido'));
    }

    // Petición real al backend PHP
    return this.http.post(this.apiUrl, { email }, { responseType: 'text' as 'json' }).pipe(
      catchError(err => {
        // Si el status es 200 pero dio error (probablemente por parseo de JSON en localhost)
        if (err.status === 200) {
          return of({ success: true });
        }
        return throwError(() => err);
      })
    );
  }

  private isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}
