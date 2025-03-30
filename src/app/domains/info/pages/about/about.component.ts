import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { CounterComponent } from '@shared/components/counter/counter.component';

import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, delay, Subject } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [CommonModule, CounterComponent, WaveAudioComponent, FormsModule],
  templateUrl: './about.component.html',
})
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hola');

  obsWithInit$ = new BehaviorSubject<string>('Init Value');
  $withInit = toSignal(this.obsWithInit$, {
    requireSync: true,
  });

  obsWithoutInit$ = new Subject<string>();
  $withoutInit = toSignal(this.obsWithoutInit$.pipe(delay(3000)), {
    initialValue: '-----',
  });

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  emitWithInit() {
    this.obsWithInit$.next('new Value');
  }

  emitWithoutInit() {
    this.obsWithoutInit$.next('*****');
  }
}
