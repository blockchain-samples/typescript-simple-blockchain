const name = 'Nicolas',
    age = '24',
    gender = 'male';
const sayHi = (name: string, age: number, gender: string): string => {
    return `Hello ${name}, yau are age ${age}, you are a ${gender}`;
};
console.log(sayHi('Nicolas', 444, 'male'));
export {};
