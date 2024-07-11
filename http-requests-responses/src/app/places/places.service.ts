import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  httpClient = inject(HttpClient);

  private userPlaces = signal<Place[]>([]);
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong! Please try again later!'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong! Please try again later!'
    ).pipe(
      tap({
        next: (userPlaces) => {
          this.userPlaces.set(userPlaces);
        },
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          this.userPlaces.set(prevPlaces);
          const errorMessage = 'Failed to store selected place.';
          this.errorService.showError(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.userPlaces.set(prevPlaces);
          const errorMessage = 'Failed to delete selected place.';
          this.errorService.showError(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return (
      this.httpClient
        .get<{ places: Place[] }>(url)
        // second argument => { observe: 'response' }
        .pipe(
          map((resData) => resData.places),
          catchError((error) => {
            console.error(error);

            return throwError(
              // () => new Error('Something went wrong! Please try again later!')
              () => new Error(errorMessage)
            );
          })
        )
    );
  }
}
