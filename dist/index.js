"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const lynn = new Human('lynn', 18, 'female');
const sayHi = (person) => {
    return `Hello ${person.name}, yau are age ${person.age}, you are a ${person.gender}!`;
};
console.log(sayHi(lynn));
//# sourceMappingURL=index.js.map