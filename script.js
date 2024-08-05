let answer = document.getElementById('answer');
let taskItem = document.getElementById('hello');
let form = document.getElementById('taskForm');
let results = document.getElementById('results');
let taskButton = document.getElementById('taskButton');
let clearButton = document.getElementById('clearButton');

function getnum(digits) {
    if (digits === 1) {
        return Math.floor(Math.random() * 10); // 0-9
    } else if (digits === 2) {
        return Math.floor(Math.random() * 90) + 10; // 10-99
    } else {
        throw new Error("Only 1 or 2 digits are allowed");
    }
}

function getOp() {
    const operators = ['+', '-', '*'];
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
}

function generateQuestion() {
    const num1 = getnum(2);
    const num2 = getnum(1);
    const operator = getOp();
    taskItem.textContent = `${num1} ${operator} ${num2}`;
    answer.value = '';
    answer.focus();
}

function verifyAnswer(question, userAnswer) {
    const [num1, operator, num2] = question.split(' ');
    const correctAnswer = eval(`${num1} ${operator} ${num2}`);
    return correctAnswer === parseFloat(userAnswer);
}

function saveResult(question, userAnswer, correct) {
    const result = { question, userAnswer, correct };
    let results = JSON.parse(localStorage.getItem('results')) || [];
    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));
    displayResults();
}

function displayResults() {
    let resultsData = JSON.parse(localStorage.getItem('results')) || [];
    results.textContent = resultsData.map(result => 
        `Q: ${result.question}, A: ${result.userAnswer}, ${result.correct ? 'Correct' : 'Incorrect'}`).join('\n');
}

function clearResults() {
    localStorage.removeItem('results');
    displayResults();
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const userAnswer = answer.value;
    const question = taskItem.textContent;
    const isCorrect = verifyAnswer(question, userAnswer);
    saveResult(question, userAnswer, isCorrect);
    generateQuestion();
});

clearButton.addEventListener('click', clearResults);

window.onload = function() {
    displayResults();
    generateQuestion();
};
