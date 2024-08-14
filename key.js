document.addEventListener('DOMContentLoaded', () => {

    const keys = document.querySelectorAll('.key');  
    const mouseClick = document.querySelector('.click');
    const emailText = document.getElementById('textarea');
    const toInput=document.getElementById("to-input")
    let lastIndex = 0; 
    let intervalId = null; 
    let isCapsLockOn = false; 
    let currentKeyContent = ""; 
    let isIterating = false; 

    function displayKeys(key) {
        if (key === "Backspace") {
            emailText.value = emailText.value.slice(0, -1);
        } 
        else if (key === " ") {
            emailText.value += ' ';
        } 
        else if (key === "CapsLk") {
            isCapsLockOn = !isCapsLockOn; 
        } 
        else if (key === "Tab") {
            emailText.value += '\t';  
        } 
        else if (key === "Enter") { 
            emailText.value += '\n'; 
            
        }
        else {
            emailText.value += isCapsLockOn ? key.toUpperCase() : key.toLowerCase();
        }
    }

    function iterateKeys() {
        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(() => {
            if (lastIndex > 0) {
                keys[lastIndex - 1].style.backgroundColor = '';
            } else if (lastIndex === 0 && keys.length > 0) {
                keys[keys.length - 1].style.backgroundColor = '';
            }

            keys[lastIndex].style.backgroundColor = 'lightblue';

            currentKeyContent = keys[lastIndex].textContent;

            lastIndex++;

            if (lastIndex >= keys.length) {
                lastIndex = 0; 
            }
        }, 500); 

        isIterating = true;
    }

    mouseClick.addEventListener('dblclick', () => {
        if (!isIterating) {
            iterateKeys();
        }
    });

    mouseClick.addEventListener('click', () => {
        if (isIterating) {
            if (currentKeyContent) {
                displayKeys(currentKeyContent);
                
                clearInterval(intervalId);
                isIterating = false; 

                setTimeout(() => {
                    iterateKeys(); 
                }, 5000); 
            }
        }
    });

});

