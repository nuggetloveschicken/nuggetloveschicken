const messageContainer = document.getElementById('messageContainer');
const endingMessage = document.getElementById('endingMessage');
const audioMessage = document.getElementById('audioMessage');
const audioMessage2 = document.getElementById('audioMessage2');
var openCount = FetchLocalStorageData();

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

            if (openCount > 8) {
                openCount = 0;
                SaveToLocalStorage(openCount);
                messageContainer.remove();
                endingMessage.classList.remove('hidden');
                audioMessage2.play();
                setInterval( () => {
                    audioMessage.play();
                }, 2000)
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

const init = () => {
    messageContainer.addEventListener('click', processMessage);

}

document.addEventListener('DOMContentLoaded', init);