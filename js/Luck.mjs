/**
 * A single 'coin stack' / 'resource pool' to spend
 */
export class Luck {
    constructor(name, def) {
        this.name = name;
        this.default = def;
        this.current = def;
    }
    name;
    // DEFAULT
    _default;
    get default() {
        return this._default;
    }
    set default(v) {
        if (v < FM.min || v > FM.max) {
            throw new RangeError("Luck value out of range: " + this.default);
        }
        this._default = v;
    }
    // CURRENT
    _current;
    get current() {
        return this._current;
    }
    set current(v) {
        if (v < FM.min || v > FM.max) {
            throw new Error(`Luck value out of range (${this.current})`);
            return;
        }
        else {
            this.UpdateHTML();
        }
        this._current = v;
    }
    UpdateHTML() {
        document.getElementById(this.name).innerText =
            this.current.toString();
        this.current === 0
            ? document.getElementById(this.name).setAttribute("disabled", "")
            : document.getElementById(this.name).removeAttribute("disabled");
    }
    Reset() {
        this._current = this._default;
    }
}
/**
 * Fortune & Misfortune
 */
export class FM {
    constructor(fortune = FM.max, misfortune = FM.min) {
        (this.fortune.current = fortune), (this.misfortune.current = misfortune);
    }
    static min = 0;
    static max = 10;
    fortune = new Luck("fortune", FM.max);
    misfortune = new Luck("misfortune", FM.min);
    Spend(coin, amount = 1) {
        let m = coin === this.fortune ? 1 : -1;
        this.fortune.current -= amount * m;
        this.misfortune.current += amount * m;
        this.UpdateHTML();
        console.log(`(was ${coin.current + amount}, is ${coin.current}) ${amount} ${coin.name} spent at ${Date()}`);
    }
    UpdateHTML() {
        this.fortune.UpdateHTML();
        this.misfortune.UpdateHTML();
    }
}
//# sourceMappingURL=Luck.mjs.map