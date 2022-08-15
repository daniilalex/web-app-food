// console.log('pending')
// const myPromis = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('det data')
//         const person = {
//             name: 'alex',
//             age: 23,
//         }
//         resolve(person)
//     }, 2000);
//
// })
// myPromis.then((person) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             person.color = `black`;
//             resolve(person);
//         }, 2000);
//     })
//
// }).then((data) => {
//     console.log(data)
// })

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({name: 'alex'}),
//     headers: {'Content-type': 'application/json'}
// })
//     .then(response => response.json())
//     .then(json => console.log(json));

let row = "";
for (let i = 1; i < 7; i++) {
  for (let j = 0; j < i; j++) {
    for (let k = 0; k < j; k++) {
      row += "o";
    }
    row += "*";
  }
  row += "\n";
}
console.log(row);

//remove all vowels
/**
Для решения задачи используем регулярное выражение /[aeiou]/gi. Оно будет искать символы a, e, i, o, u в обоих регистрах и удалять (заменять на пустую строку). 
 */
function moweVowels(str) {
  return str.replace(/[aeiou]/gi, " ");
}
console.log(moweVowels("Hello world"));
