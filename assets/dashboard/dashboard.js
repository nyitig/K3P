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
return
}
// show hide fullPageSect

function showHideFullPageSect() {
  const fullPageSect=document.getElementById('fullPageSect')
  fullPageSect.classList.toggle('active')
  return
}

// clear main panels

function clearMainPanels() {
  const leftPanel=document.getElementById('leftPanel')
  const centerPanel=document.getElementById('centerPanel')
  const rightPanel=document.getElementById('rightPanel')
  leftPanel.innerHTML=""
  centerPanel.innerHTML=""
  rightPanel.innerHTML=""
  return
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
let kdbxObject=JSON.parse(sessionStorage.kdbx)
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
groupsTree[level]=[]
groupsTree[level][indexKdbx]=kdbxObject
// az a gond, h a 0-s level nem egyezik meg  a1-es level struktúráját tekintve

startDisplay()

function startDisplay() {
  //  debugger
  // if (groupsTree[level].length==0) {
  //   return
  // }
  for (let i = 0; i < groupsTree[level].length; i++) { 
    let actObj=groupsTree[level]
    let actIndex=i
    displayKdbxObj(actObj, actIndex)  
  }  

  if (groupsTree[level+1]!=undefined) {
    level++
    startDisplay()
  }else {
    debugger
    showHideFullPageSect()
   return
  }

}


function displayKdbxObj(actObj,actIndex) {
  // debugger
  if (actObj[actIndex].uuid!=undefined) {
     sorterKdbx(actObj,level,actIndex)
  }
  if (actObj[actIndex].uuid==undefined) {
   return
  }
}

function sorterKdbx(actObj,level,actIndex) {
  // debugger
  let objBox=Object.entries(actObj[actIndex])
  for (let i = 0; i < objBox.length; i++) {
    // objBox[i][0]==name
    // objBox[i][1]== value (example:array)
    indexKdbx=i
    switch (objBox[i][0]) {
      case kdbxKeys.uuid:
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.name:
        // groupName(objBox[i][1],level,indexKdbx)
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.iconId:
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.iconData:
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.times:
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.entries:
        // if (objBox[i][1].length==0) {
        //   entriesTree[level]=[]
        // }
        // if (objBox[i][1].length>0) {
           entriesSorter(objBox[i][1],level,actIndex)
        // }        
        break;
      case kdbxKeys.groups:
        groupsSorter(objBox[i][1])

        break;
      case kdbxKeys.expanded:
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.customIconUuid:
        // console.log(objBox[i][1])
        console.log("level: "+level)
        break;
      default:
        console.log(objBox[i][1]+"Wrong param")
        break;
    }    
  }
  return
}

// names
function groupName(obj,level,index) {
return
}

// entries sorter

function entriesSorter(obj) {
  console.log("entriessorter ok")
  // debugger
// itt az aktuális entries-eket kapom meg. 
if (obj.length==0) {
  if (entriesTree[level]!=undefined) {
    let actObjLenght=entriesTree[level].length
    let text="!=undefined"
    entriesTree[level][actObjLenght]={text}
  }
  if (entriesTree[level]==undefined) {
    entriesTree[level]=[]
    let text="undefined"
    entriesTree[level][0]={text}
  }

  console.log("0 az obj.lenght")
  return
}
if (entriesTree[level]!=undefined) {
  let actObjLenght=entriesTree[level].length
  if (obj.length!=0) {
    for (let i = 0; i < obj.length; i++) {
      entriesTree[level][actObjLenght]=obj[i]
      actObjLenght++      
    }
  }else {
    entriesTree[level][actObjLenght]=obj
  }
  console.log("entriesTree != undefined")
  
}
if (entriesTree[level]==undefined) {
  entriesTree[level]=[]
  entriesTree[level]=obj
}


}

// groups sorter

function groupsSorter(obj) {
  // 
  console.log("groupssorter ok")
  // debugger
  let newlevel=level+1
  if (obj.length==0) {
    if (groupsTree[newlevel]!=undefined) {
      let actObjLenght=groupsTree[newlevel].length
      let text="!=undefined"
       groupsTree[newlevel][actObjLenght]={text}

    }
    if (groupsTree[newlevel]==undefined) {
      groupsTree[newlevel]=[]
      let text="undefined"
      groupsTree[newlevel][0]={text}
    }
    return
  }
  if (groupsTree[newlevel]!=undefined) {
    let actObjLenght=groupsTree[newlevel].length
    if (obj.length!=0) {
      for (let i = 0; i < obj.length; i++) {
        groupsTree[newlevel][actObjLenght]=obj[i]
        actObjLenght++

    }
    }else  {
      
      groupsTree[newlevel][actObjLenght]=obj
    }


  }
  if (groupsTree[newlevel]==undefined) {
    groupsTree[newlevel]=[]
    groupsTree[newlevel]=obj
  }
}