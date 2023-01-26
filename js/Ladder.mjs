export class Ladder {
    fighters = new Group();
    party = new Group();
    Load(jsonfile, group = this.fighters) {
        const reader = new FileReader();
        reader.readAsText(jsonfile);
        reader.onload = () => {
            return JSON.parse(reader.result);
        };
    }
    // Save(group: Array<Combatant>) {
    // 	var rex!: JSON;
    // 	return rex;
    // }
    FixDupes(g = this.fighters) {
        // https://stackoverflow.com/questions/18547354/c-sharp-linq-find-duplicates-in-list
        // https://gist.github.com/DanDiplo/30528387da41332ff22b
        // https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
        let groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };
        // turn object into array of objects via Object.values()
        let grouped = groupBy(g.members, "name");
        console.log("GROUPED", Object.keys(grouped));
        let unique = Object.values(grouped)
            .filter((e) => e.length <= 1)
            .flat(); // dissolve 1-member arrays
        console.log("UNIQUE", unique);
        let dupes = Object.values(grouped)
            .filter((e) => e.length > 1)
            .flat();
        console.log("DUPES", dupes);
        // https://stackoverflow.com/a/64083605
        // https://stackoverflow.com/a/71336466
        let index = {};
        let next = (name) => (index[name] = index[name] + 1 || 0);
        for (let dupe of dupes) {
            dupe.dupeSuffix = next(dupe.name);
        }
        let result = dupes;
        console.log("RESULT", result);
        result = result.concat(unique);
        g.members = result;
    }
    // https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
    RollAndSort(g = this.fighters) {
        g.members.forEach((member) => member.Roll());
        g.members
            .sort((a, b) => a.ladderInitiative - b.ladderInitiative || a.tieBreaker - b.tieBreaker)
            .reverse();
    }
}
export class Combatant {
    name;
    baseInitiative;
    tieBreaker;
    dupeSuffix;
    ladderInitiative;
    rollNum;
    constructor(name, baseInitiative, tieBreaker, dupeSuffix, ladderInitiative = 0, rollNum = 0) {
        this.name = name;
        this.baseInitiative = baseInitiative;
        this.tieBreaker = tieBreaker;
        this.dupeSuffix = dupeSuffix ?? "";
        this.ladderInitiative = ladderInitiative;
        this.rollNum = rollNum;
    }
    NameAndSuffix(truncLength = this.name.length) {
        return `${this.name.substring(0, truncLength)} ${this.dupeSuffix}`;
    }
    Roll(min = 1, max = 10) {
        this.rollNum = Math.floor(Math.random() * (max - min) + min);
        this.ladderInitiative = this.baseInitiative + this.rollNum;
    }
}
export class Group {
    min = 0;
    max = 256;
    _members = [];
    get members() {
        return this._members;
    }
    set members(v) {
        if (v.length > this.max) {
            throw new RangeError("Array<Combatant> full");
        }
        this._members = v;
    }
}
//# sourceMappingURL=Ladder.mjs.map