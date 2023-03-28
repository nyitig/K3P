// open close menu
const liMenuOne=document.getElementById('liMenuOne')
const menuUl=document.getElementById('menuUl')
const menuArrow=document.getElementById('menuArrow')
liMenuOne.addEventListener("click",()=>{
  menuArrow.classList.toggle('active')
  menuUl.classList.toggle('active')})

// show hidden toolbars

const toolbarBtn=document.getElementById('toolbarBtn')
const header2Lev=document.getElementById('header2Lev')
const toolsArrow=document.getElementById('toolsArrow')
toolbarBtn.addEventListener("click", ()=>{
  toolsArrow.classList.toggle('active')
  header2Lev.classList.toggle('active')})

// exit dashboard

const quit=document.getElementById('quit')
quit.addEventListener("click", exitDashboard)

function exitDashboard() {
  sessionStorage.clear()
  window.location.assign("/index.html")

}

// clear main panels

function clearMainPanels() {
  const leftPanel=document.getElementById('leftPanel')
  const centerPanel=document.getElementById('centerPanel')
  const rightPanel=document.getElementById('rightPanel')
  leftPanel.innerHTML=""
  centerPanel.innerHTML=""
  rightPanel.innerHTML=""
}

// loading kdbx into main

function loadKdbx() {
  const kdbxOBj=JSON.parse(sessionStorage.kdbx)
}