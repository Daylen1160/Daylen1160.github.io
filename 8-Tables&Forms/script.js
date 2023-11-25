let score = 0;

//Let me know if I need to describe the code here, this took me too long :(

//Question 1
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', cellClicked, { once: true });
});

function cellClicked(e) {
    const cell = e.target;
    cell.textContent = 'O';
    checkIfAllFilled();
}

function checkIfAllFilled() {
    const cells = document.querySelectorAll('.cell');
    const allFilled = Array.from(cells).every(cell => cell.textContent.trim() !== '');
    if (allFilled) {
        score++;
        console.log('All squares filled. Correct:', score);
    }
}

//Question 2
let boxes_correct = 0;
let boxes_incorrect = 0;
let complete = false;
const correctAnswers = new Set(['muffin1.png', 'muffin2.png', 'muffin3.png', 'muffin4.png', 'muffin5.png']);


document.querySelectorAll('.image').forEach(imageCell => {
    imageCell.addEventListener('click', imageClicked);
});


function imageClicked(e) {
    const cell = e.currentTarget;
    const img = cell.querySelector('img');
    const imageName = img.getAttribute('src');

    if (cell.classList.contains('selected')) {
        cell.classList.toggle('unselected');
        console.log('unselected');
    }

    else {
        cell.classList.toggle('selected');
        console.log('selected');
    }

    if (correctAnswers.has(imageName)) {
        if (cell.classList.contains('unselected')) {
            if (complete == true && boxes_correct == 5) {
                score--;
                console.log('Correct answer was unselected. Correct:', score)
                complete = false;
            }
            boxes_correct--;
        }
        else
            boxes_correct++;
        console.log("Boxes correct: ", boxes_correct);
    }

    else {
        if (cell.classList.contains('unselected'))
            boxes_incorrect--;
        else
            boxes_incorrect++;
        console.log("Boxes incorrect: ", boxes_incorrect)
    }

    if (boxes_correct == 5 && boxes_incorrect == 0) {
        score++;
        complete = true;
        console.log('Captcha images are correct. Correct:', score);
    }
}

//Question 3

tiles_correct = 0;
tiles_incorrect = 0;

document.querySelectorAll('.option').forEach(optionCell => {
    optionCell.addEventListener('click', optionClicked);
});

function optionClicked(e) {
    const cell = e.currentTarget;
    const x = parseInt(cell.getAttribute('data-x'), 10);
    const y = parseInt(cell.getAttribute('data-y'), 10);
    const sum = x + y;


    if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
        cell.classList.toggle('unselected');
    }

    else {
        cell.classList.remove('unselected');
        cell.classList.toggle('selected');
    }


    if (isPrime(sum) && cell.classList.contains('selected')) {
        tiles_correct++;
    }


    else if (isPrime(sum) && cell.classList.contains('unselected')) {
        tiles_correct--;
        if (tiles_correct == 14) {
            score--;
            console.log('Correct tiles was unselected. Correct:', score)
        }
    }

    if (!isPrime(sum) && cell.classList.contains('selected')) {
        tiles_incorrect++;
        if (tiles_incorrect > 0 && tiles_correct == 15) {
            score--;
            console.log('Correct tiles was unselected. Correct:', score)
        }

    }

    else if (!isPrime(sum) && cell.classList.contains('unselected')) {
        tiles_incorrect--;
    }

    console.log('Tiles correct: ', tiles_correct);
    console.log('Tiles incorrect: ', tiles_incorrect);


    if (tiles_correct == 15 && tiles_incorrect == 0) {
        score++;
        console.log('Prime number selection correct. Correct: ', score)
    }
}

function isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}



function calculateScore() {
    //Question 4
    let binaryAnswer = document.getElementById('binaryInput').value;
    if (binaryAnswer === '22') {
        score++;
    }

    //Question 5
    if (document.getElementById('silicon').checked && document.getElementById('neon').checked) {
        score++;
    }

    //Question 6
    let eulersNumber = document.getElementById('eulersNumber').value;
    if (eulersNumber === '3') {
        score++;
    }

    //Question 7
    let independenceYear = document.getElementById('independenceYear').value;
    if (independenceYear === '1776') {
        score++;
    }

    if (score == 7)
        alert('PERFECT SCORE! Your final score is: ' + score + '/7');
    else
        alert('Nice try, you\'re still smart. Your final score is: ' + score + '/7');
    score = 0;
}


