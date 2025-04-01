import {
  Component,
  resource,
  afterNextRender,
  signal,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LocationService } from '@shared/services/location/location.service';

@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LocationComponent {
  locationService = inject(LocationService);
  $origin = signal<string>('');

  constructor() {
    afterNextRender(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        this.$origin.set(origin);
      });
    });
  }

  locationResources = resource({
    request: () => ({
      origin: this.$origin(),
    }),
    loader: async ({ request }) => {
      const locations = await this.locationService.getLocations(request.origin);
      return locations;
    },
  });
}
