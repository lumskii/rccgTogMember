const num = document.getElementById('number');
const btn = document.getElementById('generate');

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

btn.addEventListener('click', () => {
  num.innerHTML = randomNum(10000, 99999);
});
