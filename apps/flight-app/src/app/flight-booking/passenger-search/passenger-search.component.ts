import {Component, Injectable, OnDestroy, ViewEncapsulation} from '@angular/core';
import { fromEvent, merge, Observable, auditTime, debounceTime, distinctUntilChanged, map, share, throttleTime, PartialObserver, Subscription } from 'rxjs';


function firstLastTime<T>(
  time: number,
  config: { debounceTime?: number; log?: 'index' | 'type' | 'full' } = {}
) {
  interface State<S> {
    index: number;
    value: S;
    type: string;
  }
  return (stream$: Observable<T>) => {
    const shared$ = stream$.pipe(share());
    return merge(
      shared$.pipe(
        map((value, index) => ({ value, index, type: 'throttle' })),
        throttleTime(time)
      ),
      shared$.pipe(
        map((value, index) => ({ value, index, type: 'audit' })),
        auditTime(time)
      )
    ).pipe(
      distinctUntilChanged((p: State<T>, c: State<T>) => p.index === c.index),
      config.debounceTime === undefined
        ? (o) => o
        : debounceTime(config.debounceTime),
      map((state) =>
        config.log
          ? config.log === 'full'
            ? state
            : state[config.log]
          : state.value
      )
    );
  };
}


@Injectable()
export class RxConnector implements OnDestroy {
  private subscription = new Subscription();

  connect<T>(stream$: Observable<T>, observer?: PartialObserver<T>): Subscription {
    const subscription = stream$.subscribe(observer);
    this.subscription.add(subscription);
    return subscription;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


@Component({
  selector: 'app-passenger-search',
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RxConnector]
})
export class PassengerSearchComponent {
  stream$ = fromEvent(document, 'click').pipe(
    firstLastTime(3_000, { log: 'full', debounceTime: 300 })
  );

  constructor(private rx: RxConnector) {
    this.rx.connect(
      this.stream$,
      { next: console.log }
    );
  }
}
