/**
 * A single 'coin stack' / 'resource pool' to spend
 */
export class Luck {
  constructor(name: string, def: number) {
    this.name = name;
    this.default = def;
    this.current = def;
  }
  readonly name: string;

  // DEFAULT
  private _default!: number;
  public get default(): number {
    return this._default;
  }
  public set default(v: number) {
    if (v < FM.min || v > FM.max) {
      throw new RangeError("Luck value out of range: " + this.default);
    }
    this._default = v;
  }
  // CURRENT
  private _current!: number;
  public get current(): number {
    return this._current;
  }
  public set current(v) {
    if (v < FM.min || v > FM.max) {
      throw new Error(`Luck value out of range (${this.current})`);
      return;
    } else {
      this.UpdateHTML()
    }
    this._current = v;
  }

  public UpdateHTML() {
    document.getElementById(this.name)!.innerText =
      this.current.toString();
    this.current === 0
      ? document.getElementById(this.name)!.setAttribute("disabled", "")
      : document.getElementById(this.name)!.removeAttribute("disabled");
  }

  Reset(): void {
    this._current = this._default;
  }
}

/**
 * Fortune & Misfortune
 */
export class FM {
  constructor(fortune: number = FM.max, misfortune: number = FM.min) {
    (this.fortune.current = fortune), (this.misfortune.current = misfortune);
  }

  public static min: number = 0;
  public static max: number = 10;
  public fortune = new Luck("fortune", FM.max);
  public misfortune = new Luck("misfortune", FM.min);

  public Spend(coin: Luck, amount: number = 1) {
    let m = coin === this.fortune ? 1 : -1;
    this.fortune.current -= amount * m;
    this.misfortune.current += amount * m;
    this.UpdateHTML();
    console.log(
      `(was ${coin.current + amount}, is ${coin.current}) ${amount} ${coin.name
      } spent at ${Date()}`
    );
  }

  public UpdateHTML() {
    this.fortune.UpdateHTML()
    this.misfortune.UpdateHTML()
  }
}
