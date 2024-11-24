let replacements = [
    ["1001", "❤"],
    ["111", "잠깐"],
    ["110", "안돼"],
    ["10", "아"],
];

console.log(h("If You Read This, Send Dm Febell For Reward"))

function h(text) {
    let binaryString = textToBinaryString(text);
    binaryString = replacePatterns(binaryString, replacements);
    let result = countConsecutiveBits(binaryString);
    return replaceBinary(binaryString, result);
}

function d(text) {
    let reversedRepl = getReversedReplacements(replacements);
    let binaryString = replacePatterns(text, reversedRepl);
    binaryString = restoreBinary(binaryString);
    return binaryToText(binaryString);
}


function restoreBinary(text) {
    return text.split('').map(c => {
        if ("엑응오옥".includes(c)) return "0";
        if ("핫하으읏".includes(c)) return "1";
        return c; // Other characters remain unchanged
    }).join('');
}

function getReversedReplacements(replacements) {
    return replacements.map(([binary, text]) => [text, binary]);
}

function replaceBinary(binaryString, result) {
    result.forEach(item => {
        if (item.bit == '1') {
            let str = "핫"
            if (item.length == 1) {} else {
                str = "하"
                for (let i = 0; i < item.length - 2; i++) {
                    str += "으"
                }
                str += "읏"
            }
            binaryString = overwriteStringAt(binaryString, item.startIndex, item.length, str);
        }
        if (item.bit == '0') {
            let str = "엑"
            if (item.length == 1) {} else {
                str = "응"
                for (let i = 0; i < item.length - 2; i++) {
                    str += "오"
                }
                str += "옥"
            }
            binaryString = overwriteStringAt(binaryString, item.startIndex, item.length, str);
        }
    });
    return binaryString;
}

function replaceOgogock(text) {
    modifiedText = ""
    for (let i = 0; i < text.length; i++) {
        if (text[i] == "옥" || text[i] == "오" || text[i] == "고" || text[i] == "곡") {
            modifiedText += "0"; // 예: 'l'을 'L'로 바꿈
        } else if (text[i] == "핫" || text[i] == "하" || text[i] == "아" || text[i] == "앙") {
            modifiedText += "1"; // 예: 'l'을 'L'로 바꿈
        } else {
            modifiedText += text[i];
        }
    }
    return modifiedText
}

function replacePatterns(binaryString, replacements) {
    replacements.forEach(([pattern, replacement]) => {
        let regex = new RegExp(pattern, 'g');
        binaryString = binaryString.replace(regex, replacement);
    });
    return binaryString;
}

function overwriteStringAt(str, index, length, replaceStr) {
    return str.slice(0, index) + replaceStr + str.slice(index + length);
}

function countConsecutiveBits(binaryString) {
    let counts = [];
    let count = 1;
    let startIndex = 0;

    for (let i = 1; i < binaryString.length; i++) {
        if (binaryString[i] === binaryString[i - 1]) {
            count++;
        } else {
            counts.push({ bit: binaryString[i - 1], length: count, startIndex });
            count = 1;
            startIndex = i;
        }
    }
    counts.push({ bit: binaryString[binaryString.length - 1], length: count, startIndex });
    return counts;
}

function textToBinaryString(text) {
    return text.split('').map(c => {
        let binary = c.charCodeAt(0).toString(2);
        return binary.padStart(8, '0');
    }).join('');
}

function binaryToText(binaryString) {
    return binaryString.match(/.{8}/g).map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
}