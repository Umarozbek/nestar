// //** TASK ZJ:

// Shunday function yozing, u berilgan array ichidagi
// raqamlarni qiymatini hisoblab qaytarsin.

// MASALAN: reduceNestedArray([1, [1, 2, [4]]]); return 8;

// Yuqoridagi misolda, array nested bo'lgan holdatda ham,
// bizning function ularning yig'indisini hisoblab qaytarmoqda.  



// function reduceNestedArray(arr: any[]): number {
//     return arr.reduce((sum, item) => {
//         if (Array.isArray(item)) {
//             return sum + reduceNestedArray(item);
//         } else if (typeof item === 'number') {
//             return sum + item;
//         }
//         return sum;
//     }, 0);
// }

// // Test
// console.log(reduceNestedArray([1, [1, 2, [4]]])); // Output: 8


// function printNumbers(): void {
//     let num = 1;
//     const interval = setInterval(() => {
//         console.log(num);
//         if (num === 5) {
//             clearInterval(interval);
//         }
//         num++;
//     }, 1000);
// }

// printNumbers();

function stringToKebab(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Bo'sh joy va maxsus belgilarni '-' bilan almashtiramiz
        .replace(/^-+|-+$/g, ''); // Boshida yoki oxirida '-' bo'lsa olib tashlaymiz
}

// Test
console.log(stringToKebab("I love Kebab")); // "i-love-kebab"



function reverseInteger(num) {
    // Raqamni stringga aylantiramiz, orqasiga o'giramiz va yana son holatiga qaytaramiz
    return parseInt(num.toString().split('').reverse().join(''), 10);
}

// Test
console.log(reverseInteger(123456789)); // 987654321