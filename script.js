const messageContainer = document.getElementById('messageContainer');
const guessGameContainer = document.getElementById('guessGameContainer')
const cardsBox = document.getElementById('cardsBox');
const endingMessage = document.getElementById('endingMessage');
const audioMessage = document.getElementById('audioMessage');
const audioMessage2 = document.getElementById('audioMessage2');
const shuffleBtn = document.getElementById('shuffleBtn');
const laugh = document.querySelector('#laugh');
const whoosh = document.querySelector('#whoosh');

var currentOrder;
var messages = [];
var indexes = [];
const middleNums1 = [3];
const middleNums2 = [6,4];
const middleNums3 = [12, 2];

var openCount = FetchLocalStorageData();

const loveMessages = [
    'I love you more every second',
    'You are always in my Heart',
    'You bring me to Life',
    'You make me Smile',
    'No one else compares to you',
    'Loving you is my favorite thing',
    'You are my soulmate',
    'I love you',
    'I  adore you',
    'I want you',
    'You are my one and only',
    'I want to make you my woman',
    'You bring peace',
    'There are no words I could use to describe the love we share',
    'I’m so lucky I get to do life with you.',
    'I can’t remember what life was like without you, and I never want to.',
    'The day I met you, God fulfilled my prayers.',
    'My love for you is indescribable.',
    'You are one in a million, baby.',
    'I wanna bury my face in between your legs',
    'Every second away from you feels like a lifetime',
    'I’ve only got eyes for you.',
    'I will love you even when we are old and gray.',
    'I love that you are my biggest cheerleader',
    'In a sea of people, my eyes will always be searching for you',
    'The best thing to hold onto in life is each other'
]

const cardTitles = [
    'Open me', 'No, Open me', 'Neither said please, open me please'
]

function createP (sentence) {
    const p = document.createElement('p');
    p.innerText = sentence;
    p.classList.add('messageOpen');
    return p;
}
const processMessage = (e) => {
    const targetElement = e.target;
    if (targetElement.classList.contains('messageBox')) {
        targetElement.classList.add('animate');
        targetElement.classList.add('inactive');
        openCount++;
        console.log(openCount);
        SaveToLocalStorage(JSON.stringify(openCount));
        setTimeout( ()=> {
            targetElement.firstElementChild.style.fontSize = '.9rem';
            const id = +targetElement.attributes.id.value;
            switch(id){
                case 1: {
                         let text = createP("“If you're struggling today, remember that life is worth living and believe that the best is yet to come. You matter”");
                         targetElement.firstElementChild.innerText = '';
                         targetElement.appendChild(text);
                         break;
                        }
                case 2: {
                        let text = createP('“You are amazing simply for hanging in there and holding on, no matter how hard things get! And for always moving forward”');
                        targetElement.firstElementChild.innerText = '';
                        targetElement.appendChild(text);
                        break;
                        }
                case 3: {
                        let text = createP('“You are powerful and resilient not because you are not scared but because you go on so strongly, despite the fear and tough times.“');
                       targetElement.firstElementChild.innerText = '';
                        targetElement.appendChild(text);
                        break;
                        }
                case 4: { 
                        let text = createP('“Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go“');
                        targetElement.firstElementChild.innerText = '';
                        targetElement.appendChild(text);
                        break;
                        }
                case 5: {
                        let text = createP('“The trials of life will always test your faith, but when you remain unshaken, you will overcome.”');
                        targetElement.firstElementChild.innerText = '';
                        targetElement.appendChild(text);
                        break;
                        }
                case 6: { 
                        let text = createP('No beauty shines brighter than that of a good heart and you have the most beautiful heart');
                        targetElement.firstElementChild.innerText = '';
                        targetElement.appendChild(text);
                        break;
                        }
                case 7: {
                        let text = createP('“You have the power to inspire others through your beautiful, kind and loving heart. You are my inspiration”');
                        targetElement.firstElementChild.innerText = '';
                        targetElement.appendChild(text);
                        break;
                        }
                case 8: {
                        let text = createP("“Keep taking time for yourself until you're you again.\nKeep watering yourself. You're growing.”");
                        targetElement.firstElementChild.innerText = '';
                        targetElement.appendChild(text);
                        break;
                        }
            }

            if (openCount >= 8) {
                openCount = 0;
                SaveToLocalStorage(openCount);
                setTimeout(()=> {
                    messageContainer.remove();
                    guessGameContainer.remove();
                    endingMessage.classList.remove('hidden');
                    audioMessage2.play();
                    setInterval( () => {
                        audioMessage.play();
                    }, 2000)
                }, 3000); 
            }
        }, 1000);
    }
}

function FetchLocalStorageData() {
    const openCount = localStorage.getItem('openCount');
    if (openCount) {
        return JSON.parse(openCount);
    }
    return 0;
}

function SaveToLocalStorage(data) {
    localStorage.setItem("openCount", data);
}

function createCard(title) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerText = title;
    p.classList.add('message');
    div.classList.add('card');
    div.appendChild(p);
    div.classList.add('messageBox');
    div.classList.add('shakeCard');
    return div;
}

function createRandMessageP(message) {
    const p = document.createElement('p');
    p.innerText = message;
    p.classList.add('messageOpen');
    p.classList.add('bigMessage');
    return p;
}

function renderGame() {
    indexes = [];
    messages = [];
    var messageIndex;

    for (let i = 0;i < 3; i++) {
        do {
            messageIndex = Math.floor(Math.random() * (14-0 + 1)) + 0;
        }while(indexes.includes(messageIndex));

        indexes.push(messageIndex)
    }

    indexes.forEach( (index) => {
        messages.push(loveMessages[index]);
    })

    console.log(indexes);


    cardsBox.innerHTML = '';
    const randomOne = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
    const order = Math.floor(Math.random() * (5-0 + 1)) + 0;
    const chosen = randomOne[order];
    currentOrder = order;
    let idValue = 1;

    whoosh.play();
    for (let index of chosen) {
        let title = cardTitles[index];
        let div = createCard(title);
        div.setAttribute('id', idValue++)
        cardsBox.appendChild(div);
    }
}

function processGame(e) {
    const targetElement = e.target;

    if (targetElement.classList.contains('messageBox')) {
        targetElement.classList.remove('shakeCard')
        targetElement.classList.add('animate');
        targetElement.classList.add('inactive');

        setTimeout( ()=> {
            targetElement.firstElementChild.style.fontSize = '1rem';
            const id = +targetElement.attributes.id.value;
            const img = document.createElement('img');
            img.src = './imgs/middlef.jpg';
            switch(id){
                case 1: {
                         let text = createRandMessageP(messages[0]);
                         targetElement.firstElementChild.innerText = '';
                         let found = isFound(middleNums1);
                         (found) 
                         ? targetElement.appendChild(img) 
                         :   targetElement.appendChild(text);
                         
                         break;
                        }
                case 2: {
                         let text = createRandMessageP(messages[1]);
                         targetElement.firstElementChild.innerText = '';
                         let found = isFound(middleNums2);
                         (found) 
                         ? targetElement.appendChild(img) 
                         :   targetElement.appendChild(text);
                         break;
                        }
                case 3: {
                         let text = createRandMessageP(messages[2]);
                         targetElement.firstElementChild.innerText = '';
                         let found = isFound(middleNums3);
                         (found) 
                         ? targetElement.appendChild(img) 
                         :   targetElement.appendChild(text);
                         break;
                }
            }
        },1000);

    }
}

function isFound(indexArrray) {
    for (let num of indexArrray) {
        if (indexes.includes(num)) {
            laugh.play();
            return true;
        }
    }

    return false;
}

const init = () => {
    messageContainer.addEventListener('click', processMessage);
    cardsBox.addEventListener('click', processGame);
    renderGame();
    shuffleBtn.addEventListener('click', renderGame);
}

document.addEventListener('DOMContentLoaded', init);