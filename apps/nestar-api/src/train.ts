// //** TASK ZJ:

// Shunday function yozing, u berilgan array ichidagi
// raqamlarni qiymatini hisoblab qaytarsin.

// MASALAN: reduceNestedArray([1, [1, 2, [4]]]); return 8;

// Yuqoridagi misolda, array nested bo'lgan holdatda ham,
// bizning function ularning yig'indisini hisoblab qaytarmoqda.  



function reduceNestedArray(arr: any[]): number {
    return arr.reduce((sum, item) => {
        if (Array.isArray(item)) {
            return sum + reduceNestedArray(item);
        } else if (typeof item === 'number') {
            return sum + item;
        }
        return sum;
    }, 0);
}

// Test
console.log(reduceNestedArray([1, [1, 2, [4]]])); // Output: 8
