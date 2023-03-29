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
/*
Mit is kellene csinálni?
- groups a #leftPanelben jelennének meg
- entries a #centerPanelben jelennének meg
- entries összes tulajdonsága pedig a #rightPanelben

Elsőnek foglalkozzunk azzal, h a tree szerkezetet hogyan jeleníthetném meg
 - szintenént nézzük meg, h a groupban mennyi group van
    - tehát kell egy level index (azaz az az index, amelyik szinten vagyok)
    - 

Azaz 3 template kellene, h legyen

*/ 
let entriesTree=[]
let groupsTree=[]
let groupsTreeTemp=[]
const kdbxKeys={
  uuid:"uuid",
  name:"name",
  iconId:"iconId",
  iconData:"iconData",
  times:"times",
  entries: "entries",
  groups:"groups",
  expanded:"expanded",
  customIconUuid:"customIconUuid",
}
let level=0
let indexKdbx=0
displayKdbxObj()

function displayKdbxObj() {
  loadKdbx()
  sorterKdbx(kdbxObj,level,indexKdbx)
}

function loadKdbx() {
  const kdbxOBj=JSON.parse(sessionStorage.kdbx)
  return kdbxOBj
}

function sorterKdbx(kdbxOBj,level,indexKdbx) {
  let objBox=Object.entries(kdbxOBj)
  for (let i = 0; i < objBox.length; i++) {
    // objBox[i][0]==name
    // objBox[i][1]== value (example:array)
    switch (objBox[i][0]) {
      case kdbxKeys.uuid:
        console.log(objBox[i][1])
        break;
      case kdbxKeys.name:
        groupName(objBox[i][1],level,indexKdbx)
        console.log(objBox[i][1])
        break;
      case kdbxKeys.iconId:
        console.log(objBox[i][1])
        break;
      case kdbxKeys.iconData:
        console.log(objBox[i][1])
        break;
      case kdbxKeys.times:
        console.log(objBox[i][1])
        break;
      case kdbxKeys.entries:
        if (objBox[i][1].length==0) {
          entriesTree[level]=[]
        }
        if (objBox[i][1].length>0) {
          entriesSorter(objBox[i][1])
        }        
        break;
      case kdbxKeys.groups:
        if (objBox[i][1].length==0) {
          groupsTree[level]==[]
          groupsTreeTemp[level]=[]
        }
        if (objBox[i][1].length>0) {
          groupsSorter(objBox[i][1])
        }
        break;
      case kdbxKeys.expanded:
        console.log(objBox[i][1])
        break;
      case kdbxKeys.customIconUuid:
        console.log(objBox[i][1])
        break;
      default:
        console.log(objBox[i][1]+"Wrong param")
        break;
    }    
  }
  // Innen folytasd! Ide kell csinálj egy záró feltételt, h mikor legyen vége a rekurziónak!
}

// names
function groupName(obj,level,index) {
  if (groupsTreeTemp[level]!=undefined) {
    
  }

  if (groupsTreeTemp[level]==undefined) {
    groupsTreeTemp[level]=[]
    groupsTreeTemp[level][index]=obj
  }
}

// entries sorter

function entriesSorter(obj) {
  console.log("entriessorter ok")
  console.log(obj)
  if (entriesTree[level]!=undefined) {
    let entriesTreeIndex=entriesTree[level].length
    for (let i = 0; i < obj.length; i++) {
      entriesTree[level][entriesTreeIndex]=(obj[i])
      entriesTreeIndex++
      }
  }
  if (entriesTree[level]==undefined) {
    entriesTree[level]=obj
  }


}

// groups sorter

function groupsSorter(obj) {
  console.log("groupssorter ok")
  console.log(obj)
  if (groupsTree[level]!=undefined) {
    let groupsTreeIndex=groupsTree[level].length
    for (let i = 0; i < obj.length; i++) {
      gruopsTree[level][groupsTreeIndex]=(obj[i])
      groupsTreeIndex++
      
    }
  }
  if (groupsTree[level]==undefined) {
    groupsTree[level]=obj
  }

}