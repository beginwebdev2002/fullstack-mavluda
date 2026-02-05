import { signal, computed, WritableSignal, Signal } from '@angular/core';

export class SignalStore<T> {
  protected state: WritableSignal<T>;
  public readonly value: Signal<T>;

  constructor(initialState: T) {
    this.state = signal(initialState);
    this.value = computed(() => this.state());
  }

  protected setState(partialState: Partial<T>): void {
    this.state.update((current) => ({ ...current, ...partialState }));
  }

  protected select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key]);
  }
}
