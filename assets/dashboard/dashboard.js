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