const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector("#time-list")
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#EEEBD0', '#7371FC', '#E87EA1', '#861657', '#169873', '#FE5E41']
let playTime = 0
let score = 0

startButton.addEventListener('click', handleStartButton)
timeList.addEventListener('click', handleTimeList)
board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandomCircle()
  }
})

function handleStartButton(e) {
  e.preventDefault();
  screens[0].classList.add('up')
}

function handleTimeList(e) {
  if (e.target.classList.contains('time-btn')) {
    playTime = parseInt(e.target.innerText)
    screens[1].classList.add('up')
    startGame()
  }
}

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(playTime)
}

function decreaseTime() {
  if (playTime === 0) {
    finishGame()
  } else {
    let current = --playTime
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(timeValue) {
  timeElement.innerHTML = `00:${timeValue}`
}

function finishGame() {
  board.innerHTML = `<h1>счёт: <span class="primary">${score}</span></h1>`
  timeElement.parentNode.classList.add('hide')
}

function createRandomCircle() {
  const circle = document.createElement('div')
  let circleSize = getRandomNumber(15, 50)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - circleSize)
  const y = getRandomNumber(0, height - circleSize)
  const color = colors[getRandomNumber(0, 5)]

  circle.classList.add('circle')
  circle.style.width = `${circleSize}px`
  circle.style.height = `${circleSize}px`
  circle.style.left = `${x}px`
  circle.style.top = `${y}px`
  circle.style.background = color
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}