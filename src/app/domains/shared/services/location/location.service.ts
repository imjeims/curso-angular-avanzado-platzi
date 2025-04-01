import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  async getLocations(origin: string) {
    const url = new URL(`${environment.apiUrl}/api/v1/locations`);
    if (origin) {
      url.searchParams.set('origin', origin);
    }
    const response = await fetch(url);
    return response.json();
  }
}
