var gImgs = [
    { 
        id: 1, 
        url: 'img/1.jpg', 
        keywords: ['pixar', 'woody', 'buz', 'confused', 'different', 'show', 'movie', 'movies'] 
    },
    { 
        id: 2, 
        url: 'img/2.jpg', 
        keywords: ['happy', 'dancing', 'excited', 'nature', 'view', 'flowers'] 
    },
    { 
        id: 3, 
        url: 'img/3.jpg', 
        keywords: ['funny', 'scary', 'weird', 'trump', 'president', 'no', 'angry', 'against', 'disagree', 'scold', 'finger', 'mad'] 
    },
    { 
        id: 4, 
        url: 'img/4.jpg', 
        keywords: ['dog', 'puppy', 'kiss', 'love', 'cute', 'sweet', 'animals', 'animal', 'couple'] 
    },
    { 
        id: 5, 
        url: 'img/5.jpg', 
        keywords: ['funny', 'yes', 'fist', 'satisfied', 'ok', 'impressed', 'baby', 'child', 'sea', 'beach'] 
    },
    { 
        id: 6, 
        url: 'img/6.jpg', 
        keywords: ['baby', 'dog', 'puppy', 'cute', 'sweet', 'child', 'bed', 'blanket', 'love', 'calm', 'relax', 'relaxing', 'chill', 'sleep', 'yoga'] 
    },
    { 
        id: 7, 
        url: 'img/7.jpg', 
        keywords: ['work', 'working', 'laptop', 'computer', 'kitty', 'cat', 'kitten', 'warm', 'asleep', 'sleeping', 'cute', 'calm', 'relax', 'chill', 'sweet', 'sleep'] 
    },
    { 
        id: 8, 
        url: 'img/8.jpg', 
        keywords: ['chocolate', 'willy', 'wonka', 'gene', 'wilder', 'crazy', 'funny', 'weird', 'movie', 'satisfied', 'happy'] 
    },
    { 
        id: 9, 
        url: 'img/9.jpg', 
        keywords: ['sly', 'weird', 'gnome', 'dwarf', 'little', 'man', 'cunning', 'devious', 'scary', 'baby'] 
    },
    { 
        id: 10, 
        url: 'img/10.jpg', 
        keywords: ['you', 'choose', 'point', 'israel', 'israeli', 'calm', 'finger'] 
    },
    { 
        id: 11, 
        url: 'img/11.jpg', 
        keywords: ['why', 'how', 'pissed', 'angry', 'no', 'you', 'funny', 'crazy', 'man'] 
    }, 
    { 
        id: 12, 
        url: 'img/12.jpg', 
        keywords: ['ancient', 'aliens', 'alien', 'history', 'channel', 'scientist', 'hands', 'gesture', 'calm', 'satisfied', 'happy'] 
    },
    { 
        id: 13, 
        url: 'img/13.jpg', 
        keywords: ['mike', 'myers', 'doctor', 'evil', 'dr.evil', 'dr', 'fat', 'bald', 'funny', 'gesture', 'peace', 'face', 'finger', 'man'] 
    },
    { 
        id: 14, 
        url: 'img/14.jpg', 
        keywords: ['african', 'africa', 'kids', 'children', 'silly', 'fun', 'naked', 'funny', 'dance', 'child'] 
    },
    { 
        id: 15, 
        url: 'img/15.jpg', 
        keywords: ['funny', 'trump', 'finger', 'point', 'face', 'silly', 'weird'] 
    },
    { 
        id: 16, 
        url: 'img/16.jpg', 
        keywords: ['african', 'baby', 'face', 'funny', 'wide', 'eyes', 'cute'] 
    },
    { 
        id: 17, 
        url: 'img/17.jpg', 
        keywords: ['dog', 'yoga', 'funny', 'chill', 'puppy', 'cute', 'sweet', 'strech'] 
    },
    { 
        id: 18, 
        url: 'img/18.jpg', 
        keywords: ['obama', 'laugh', 'african', 'happy', 'satisfied'] 
    },
    { 
        id: 19, 
        url: 'img/19.jpg', 
        keywords: ['african', 'men', 'gay', 'lgbtq', 'sport', 'sports', 'kiss', 'love'] 
    },
    { 
        id: 20, 
        url: 'img/20.jpg', 
        keywords: ['leonardo', 'glass', 'suit', 'hot', 'drink', 'satisfied', 'happy', 'actor', 'sly']  
    },
    { 
        id: 21, 
        url: 'img/21.jpg', 
        keywords: ['glasses', 'serious', 'mad', 'annoyed', 'shock', 'shocked', 'what', 'african', 'why', 'how'] 
    }, 
    { 
        id: 22, 
        url: 'img/22.jpg', 
        keywords: ['man', 'actor', 'serious', 'gesture', 'hand', 'movie']
    },
    { 
        id: 23, 
        url: 'img/23.jpg', 
        keywords: ['oprah', 'excitement', 'show', 'tv', 'singer', 'sing', 'mic', 'hand', 'gesture', 'happy', 'excited'] 
    },
    { 
        id: 24, 
        url: 'img/24.jpg', 
        keywords: ['patrick', 'stewart', 'laugh', 'funny', 'movie', 'actor'] 
    },
    { 
        id: 25, 
        url: 'img/25.jpg', 
        keywords: ['putin', 'hand', 'gesture', 'serious', 'funny', 'suit', 'face', 'yes', 'cool'] 
    }
]

var gKeywordSearchCountMap = {
    'cool': 0, 
    'putin': 0, 
    'oprah': 0, 
    'excitement': 0, 
    'show': 0, 
    'tv': 0, 
    'singer': 0, 
    'sing': 0, 
    'mic': 0, 
    'glasses': 0, 
    'serious': 0, 
    'mad': 0, 
    'annoyed': 0, 
    'shock': 0, 
    'shocked': 0, 
    'what': 0, 
    'leonardo': 0, 
    'glass': 0, 
    'suit': 0, 
    'hot': 0, 
    'drink': 0, 
    'sport': 0, 
    'sports': 0, 
    'lgbtq': 0, 
    'men': 0, 
    'gay': 0, 
    'ancient': 0, 
    'aliens': 0, 
    'alien': 0, 
    'obama': 0, 
    'laugh': 0, 
    'strech': 0, 
    'wide': 0, 
    'eyes': 0, 
    'african': 0, 
    'africa': 0, 
    'kids': 0, 
    'children': 0, 
    'silly': 0, 
    'fun': 0, 
    'naked': 0, 
    'mike': 0, 
    'myers': 0, 
    'doctor': 0, 
    'evil': 0, 
    'dr.evil': 0, 
    'dr': 0, 
    'fat': 0, 
    'bald': 0, 
    'funny': 0, 
    'gesture': 0, 
    'peace': 0, 
    'face': 0, 
    'history': 0, 
    'channel': 0, 
    'scientist': 0, 
    'hands': 0, 
    'gesture': 0, 
    'why': 0, 
    'how': 0, 
    'pissed': 0, 
    'you': 0, 
    'choose': 0, 
    'point': 0, 
    'israel': 0, 
    'israeli': 0, 
    'sly': 0, 
    'weird': 0, 
    'gnome': 0, 
    'dwarf': 0, 
    'little': 0, 
    'man': 0, 
    'cunning': 0, 
    'devious': 0, 
    'chocolate': 0, 
    'willy': 0, 
    'wonka': 0, 
    'gene': 0, 
    'wilder': 0, 
    'crazy': 0, 
    'work': 0, 
    'working': 0, 
    'laptop': 0, 
    'computer': 0, 
    'kitty': 0, 
    'cat': 0, 
    'kitten': 0, 
    'warm': 0, 
    'asleep': 0, 
    'sleeping': 0, 
    'funny': 0, 
    'scary': 0, 
    'weird': 0, 
    'pixar': 0, 
    'woody': 0, 
    'buz': 0, 
    'confused': 0, 
    'different': 0, 
    'show': 0, 
    'happy': 0, 
    'dancing': 0, 
    'excited': 0, 
    'nature': 0, 
    'view': 0, 
    'flowers': 0, 
    'trump': 0, 
    'president': 0, 
    'no': 0, 
    'angry': 0, 
    'against': 0, 
    'disagree': 0, 
    'scold': 0, 
    'finger': 0, 
    'mad': 0, 
    'movie': 0, 
    'movies': 0, 
    'dog': 0, 
    'puppy': 0, 
    'kiss': 0, 
    'love': 0, 
    'cute': 0, 
    'sweet': 0, 
    'animals': 0, 
    'animal': 0, 
    'couple': 0, 
    'yes': 0, 
    'fist': 0, 
    'satisfied': 0, 
    'ok': 0, 
    'impressed': 0, 
    'baby': 0, 
    'child': 0, 
    'sea': 0, 
    'beach': 0, 
    'bed': 0, 
    'blanket': 0, 
    'love': 0, 
    'calm': 0, 
    'relax': 0, 
    'relaxing': 0, 
    'chill': 0, 
    'sleep': 0, 
    'yoga': 0
}

function getImgs() {
    return gImgs
}

