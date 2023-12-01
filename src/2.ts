// --- Part Two ---
// Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters:
// one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
//
// Equipped with this new information, you now need to find the real first and last digit on each line. For example:
//
// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
//
// In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
//
// What is the sum of all of the calibration values?

import {readFileSync} from 'fs';

const validWords = {
    // like this to include overlapping letters
    'one': 'on1e',
    'two': 'tw2o',
    'three': 'thr3ee',
    'four': '4',
    'five': 'fiv5e',
    'six': '6',
    'seven': 'sev7en',
    'eight': 'eig8ht',
    'nine': 'nin9e'
};

const file = readFileSync('./src/1.txt', {encoding: 'utf-8'});
const ans = file
    .split('\n')
    .map(l => {
        // Convert words to numbers
        for (const word of Object.keys(validWords)) {
            l = l.replace(new RegExp(word, 'g'), validWords[word as keyof typeof validWords])
        }
        // Remove other letters
        l = l.replace(/[^0-9.]+/g, '')
        return l
    })
    .map(l => {
        // Convert into a two-digit number
        if (l.length <= 1) return Number(l[0] + l[0]) ?? 0
        if (l.length === 2) return Number(l)
        return Number(l[0] + l[l.length - 1]);
    })
    .reduce((prev, curr) => prev + curr, 0)

console.log(ans) // 55093