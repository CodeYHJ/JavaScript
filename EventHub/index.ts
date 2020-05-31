class EventHub {
  private eventContain: Map<string, Array<(data: unknown) => void>>;

  on(eventname: string, fn: (data: unknown) => void) {
    if (!this.eventContain) this.eventContain = new Map();
    this.eventContain.has(eventname)
      ? this.eventContain.get(eventname).push(fn)
      : this.eventContain.set(eventname, [fn]);
  }

  emit(eventname, data?: unknown) {
    this.eventContain.has(eventname)
      ? this.eventContain.get(eventname).forEach((element) => element(data))
      : "";
  }

  off(eventname) {
    this.eventContain.delete(eventname);
  }
}

export default EventHub;
