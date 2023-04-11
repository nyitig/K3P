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

/*loading kdbx into main*/ 
/*
Mit is kellene csinálni?
- groups a #leftPanelben jelennének meg => ez készen van
- entries a #centerPanelben jelennének meg
- entries összes tulajdonsága pedig a #rightPanelben
*/

let kdbxObject=JSON.parse(sessionStorage.kdbx)
let idsTree=[["leftPanel"]]
let elemidsArray=[["leftPanel"]]
let groupsTree=[]
let groupsNameTree=[]
let iconIdsTree=[]
let liIndexArr=[]

// entries array
let entriesTree=[]
let entriesTreeIdsArr=[]

// keys
const iconIdsSrcObj={
  0:"/assets/pic/key-outline.svg",
  1:"/assets/pic/cloud-outline.svg",
  2:"/assets/pic/globe-outline.svg",
  3:"/assets/pic/mail-outline.svg",
  4:"/assets/pic/terminal-outline.svg",
  5:"/assets/pic/storefront-outline.svg",
  6:"/assets/pic/logo-python.svg",
  49:"/assets/pic/folder-outline.svg",
}
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
const entriesKeys={
  iconData:"iconData",
  notes:"notes",
  iconId:"iconId",
  title:"title",
  password:"password",
  url:"url",
  username:"username",
}
let level=0
let indexKdbx=0
groupsTree[level]=[]
liIndexArr[0]=[1]
groupsTree[level][indexKdbx]=kdbxObject

startDisplay()

function startDisplay() {
  for (let i = 0; i < groupsTree[level].length; i++) { 
    let actObj=groupsTree[level]
    let actIndex=i 
    displayKdbxObj(actObj, actIndex)  
  }  
  if (groupsTree[level+1]!=undefined) {
    level++

    startDisplay()
  }else {
    // debugger
     loadLeftPanel()
    loadCenterPanel()
    loadRightPanel()
    showHideFullPageSect()
   return
  }

}

function displayKdbxObj(actObj,actIndex) {
    //  debugger
    
    // itt mindig az aktuális objektum van
  if (actObj[actIndex].uuid!=undefined) {
    // leftPanelTemplate+=`<li id="" class="" data-target="level${level}Index${actIndex}">`
     sorterKdbx(actObj,actIndex)
    return
  }
  if (actObj[actIndex].uuid==undefined) {
   return
  }
}

function sorterKdbx(actObj,actIndex) {
    // debugger
  let objBox=Object.entries(actObj[actIndex])
  for (let i = 0; i < objBox.length; i++) {
    // objBox[i][0]==name
    // objBox[i][1]== value (example:array)
    
    switch (objBox[i][0]) {
      case kdbxKeys.uuid:
        //  console.log(objBox[i][1])
        break;
      case kdbxKeys.name:
        // debugger
        groupKeysToArray(objBox[i][1], groupsNameTree)
        break;
      case kdbxKeys.iconId:
        groupKeysToArray(objBox[i][1], iconIdsTree)
        break;
      case kdbxKeys.iconData:
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.times:
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.entries:
           entriesSorter(objBox[i][1],actIndex)
               
        break;
      case kdbxKeys.groups:
          groupsSorter(objBox[i][1],actIndex)

        break;
      case kdbxKeys.expanded:
        // console.log(objBox[i][1])
        break;
      case kdbxKeys.customIconUuid:
        // console.log(objBox[i][1])
        break;
      default:
        console.log(objBox[i][1]+"Wrong param")
        break;
    }    
  }
  return
}

// names
function groupKeysToArray(obj,array) {
  if (array[level]!=undefined) {
    let arrayIndex=array[level].length
  array[level][arrayIndex]=obj
  return    
  }
  if (array[level]==undefined) {
    array[level]=[]
    array[level][0]=obj 
    return   
  }
return
}

// entries sorter

function entriesSorter(obj,actIndex) {
  //  debugger
// itt az aktuális entries-eket kapom meg. 
if (obj.length==0) {
  if (entriesTree[level]!=undefined) {
    let actObjLenght=entriesTree[level].length
    let text="none"
    entriesTree[level][actObjLenght]={text}
    return
  }
  if (entriesTree[level]==undefined) {
    entriesTree[level]=[]
    let text="none"
    entriesTree[level][0]={text}
    return
  }
  return
}
if (obj.length!=0) {
  if (entriesTree[level]!=undefined) {
    let actObjLenght=entriesTree[level].length
    entriesTree[level][actObjLenght]=obj
    return
  }
  if (entriesTree[level]==undefined) {
    entriesTree[level]=[]
    entriesTree[level][0]=obj
    return
  }
  return
}
return
}

// groups sorter

function groupsSorter(obj,actIndex) {
  let newlevel=level+1
  if (obj.length==0) {
    if (groupsTree[newlevel]!=undefined) {
      let actObjLenght=groupsTree[newlevel].length
      let text="none"
      groupsTree[newlevel][actObjLenght]={text}
      idsTree[newlevel][actObjLenght]=text
    }
    if (groupsTree[newlevel]==undefined) {
      groupsTree[newlevel]=[]
      let text="none"
      groupsTree[newlevel][0]={text}
      idsTree[newlevel]=[]
      
      idsTree[newlevel][0]=text
    }
    if (liIndexArr[newlevel]==undefined) {
      liIndexArr[newlevel]=[]
    }
    return
  }
  if (groupsTree[newlevel]!=undefined) {
    let actObjLenght=groupsTree[newlevel].length
    let actLiIndex=liIndexArr[newlevel].length
    liIndexArr[newlevel][actLiIndex]=obj.length
    if (obj.length!=0) {
      for (let i = 0; i < obj.length; i++) {
        groupsTree[newlevel][actObjLenght]=obj[i]
        let text="lev"+level+"ind"+actIndex
        idsTree[newlevel][actObjLenght]=text
        actObjLenght++
    }
    }else  {
      groupsTree[newlevel][actObjLenght]=obj     
    }
  }
  if (groupsTree[newlevel]==undefined) {
    groupsTree[newlevel]=[]
    groupsTree[newlevel]=obj
    idsTree[newlevel]=[]
    liIndexArr[newlevel]=[obj.length]
    for (let i=0; i< obj.length; i++) {
      let text=`lev${level}ind${actIndex}`
      idsTree[newlevel][i]=text
    }
    return
  }
  return
}

/* LEFT PANEL CREATE FUNCTIONS */ 

// create elemIdsArray

function createElemIdsArray() {
  for (let a = 1; a < idsTree.length; a++) {
    if (elemidsArray[a]==undefined) {
      elemidsArray[a]=[]
    }
    for (let it of idsTree[a]) {
      if (elemidsArray[a].indexOf(it)===-1) {
        elemidsArray[a].push(it)
      }
    }
  }
}

// left panel load

function loadLeftPanel() {
 createElemIdsArray()
  createLeftPanelDom()
  return
}

// left panel DOM create 

function createLeftPanelDom() {
   let olBeginTag=`<ol class="column olbox" `
   let imgBegin=`<img class="imgLeftPanel svgImgBrown" src=`
   let imgCenter=` alt="" width="30" height="30"`
   let dataTarget=` data-target=`
   let liBeginTag=`<li class="liLeftPanel" id=`
   let tagEnd=`>`
   let liEndTag=`</li>`
   let olEndTag=`</ol>`
   let spanBegin=`<span>`
   let spanEnd=`</span>`
   let divBegin=`<div class="row alItCent"`
   let divEnd=`</div>`
   let gropNameTreeIndex=0
 for (let asd = 0; asd < elemidsArray.length; asd++) {
  gropNameTreeIndex=0
  for (let i = 0; i < elemidsArray[asd].length; i++) {
    let tagId=elemidsArray[asd][i]
    if (tagId!="none") {
          let elem=document.getElementById(tagId)
    let leftPanelTemplate=``
    leftPanelTemplate+=olBeginTag+tagEnd
    for (let y = 0; y < idsTree[asd].length; y++) {
      if (elemidsArray[asd][i]==idsTree[asd][y] && elemidsArray[asd][i]!="none") {
        let iconIdsNumber=iconIdsTree[asd][gropNameTreeIndex]
        let imgSrc=iconIdsSrcObj[iconIdsNumber]
        let liIds=`lev${asd}ind${y}`
        if (entriesTreeIdsArr[asd]!=undefined) {
          let index2=entriesTreeIdsArr[asd].length
          entriesTreeIdsArr[asd][index2]=liIds
        }
        if (entriesTreeIdsArr[asd]==undefined) {
          entriesTreeIdsArr[asd]=[]
          entriesTreeIdsArr[asd][0]=liIds
        }
        leftPanelTemplate+=liBeginTag+liIds+tagEnd+divBegin+dataTarget+liIds+tagEnd+imgBegin+imgSrc+imgCenter+tagEnd+spanBegin+groupsNameTree[asd][gropNameTreeIndex]+spanEnd+divEnd
        gropNameTreeIndex++
      }
    }
    leftPanelTemplate+=liEndTag+olEndTag
    elem.innerHTML+=leftPanelTemplate
    }
  }
 } 
 }

/* CENTER PANEL CREATE FUNCTIONS*/  

function loadCenterPanel() {
  createCenterPanelDom()
  return
}

function createCenterPanelDom() {
  const centerPanel=document.getElementById('centerPanel')
  let centerPanelTemplate=``
  let divIds=`<div id="" class="centerPanelDiv" data-groupIds=`
  let tagEnd=`>`
  let olBeginTag=`<ol class="column" >`
  let divBeginTag=`<div class="column centerPanmarginBottom cursorPoint" data-entries=`
  let divRowTag=`<div class="row alItCent">`
  let imgBegin=`<img class="" src=`
  let imgCenter=` alt="" width="20" height="20"`
  let spanBegin=`<span class="centerPanelSpan">`
  let spanBoldBegin=`<span class="centerPanelSpanBold">`
  let spanEnd=`</span>`
  let liSec=`<li>`
  let liEndTag=`</li>`
  let olEndTag=`</ol>`
  let divEndTag=`</div>`

  for (let i = 0; i < entriesTreeIdsArr.length; i++) {
    for (let y = 0; y < entriesTreeIdsArr[i].length; y++) {
      let groupIds=entriesTreeIdsArr[i][y]
      centerPanelTemplate+=divIds+groupIds+tagEnd //div
      // centerPanelTemplate+=olBeginTag // ol
      for (let z = 0; z < entriesTree[i][y].length; z++) {
        let entriesId=`lev${i}ind${y}ind${z}`
        centerPanelTemplate+=divBeginTag+entriesId+tagEnd // div tag
        let imgSrcNum=entriesTree[i][y][z].iconId
        centerPanelTemplate+=divRowTag+imgBegin+iconIdsSrcObj[imgSrcNum]+imgCenter+tagEnd //img tag
        centerPanelTemplate+=spanBoldBegin+entriesTree[i][y][z].title+spanEnd //span+title
        centerPanelTemplate+=divEndTag //</div>
        centerPanelTemplate+=spanBegin+entriesTree[i][y][z].username+spanEnd //username
        centerPanelTemplate+=divEndTag
        
      }
      centerPanelTemplate+=olEndTag+divEndTag
    }
    
  }
  centerPanel.innerHTML+=centerPanelTemplate

  return
}

//  group  & this entries active

function activatedGroupEntries() {
  const dataTarget=document.querySelectorAll('[data-target]')
  const dataGroupIds=document.querySelectorAll('[data-groupIds]')
  const dataEntries=document.querySelectorAll('[data-entries]')
  const dataEntriesId=document.querySelectorAll('[data-entriesId]')
  for (let i = 0; i < dataTarget.length; i++) {
    dataTarget[i].addEventListener('click',()=>{
      // debugger
      // classlist 
      for (let y = 0; y < dataTarget.length; y++) {
        // add clicked div active class, remove other div class
        if (i==y) {
          if (!dataTarget[y].classList.contains('active')) {
            dataTarget[y].classList.add('active')
          }
        }
        if (i!=y) {
          dataTarget[y].classList.remove('active')
        }
        // show, hide entries
        let dataTargetValue=dataTarget[i].attributes[1].value
        let groupIdsValue=dataGroupIds[y].attributes[2].value
        if (dataTargetValue==groupIdsValue) {
          dataGroupIds[y].classList.add('active')
        }
        if (dataTargetValue!=groupIdsValue) {
          dataGroupIds[y].classList.remove('active')

        }
      }
      // remove all entries marked & active class
      for (let a = 0; a < dataEntries.length; a++) {
        dataEntries[a].classList.remove('marked')

        
      }
      for (let i = 0; i < dataEntriesId.length; i++) {
        dataEntriesId[i].classList.remove('active')
      }
    })    
  }
}


/* CREATE RIGHT PANEL*/ 



function loadRightPanel() {
  createRightPanelDOM()
  activatedGroupEntries()
  showHideEntries()
  return
}

function createRightPanelDOM() {
  const rightPanel=document.getElementById('rightPanel')
  let rightPanelTemplate=``
  let divIds=`<div id="" class="column rightPanelDiv" data-entriesId="`
  let tagEnd=`">`
  let divEndTag=`</div>`
  let spanBegin=`<span class="entriesTitle fontBold">`
  let spanEnd=`</span>`
  let tableBegin=`<div class="rightPanelTableTag">`
  let tableEnd=`</div>`
  let trBegin=`<div class="rightPanelTr row">`
  let trEnd=`</div>`
  let tdBegin=`<div class="rightPanelTd">`
  let tdEnd=`</div>`
  let aBegin=` <a href="http://`
  let aCenter=`" target="_blank" rel="noopener noreferrer">`
  let aEnd=`</a>`
  for (let i = 0; i < entriesTree.length; i++) {
    for (let y = 0; y < entriesTree[i].length; y++) {
      for (let z = 0; z < entriesTree[i][y].length; z++) {
        rightPanelTemplate=``
        let entriesData=entriesTree[i][y][z]
        let dataEntriesId=`lev${i}ind${y}ind${z}`
        rightPanelTemplate+=divIds+dataEntriesId+tagEnd //div
        rightPanelTemplate+=spanBegin+entriesData.title+spanEnd //title span
        rightPanelTemplate+=tableBegin+trBegin //
        rightPanelTemplate+=tdBegin+"Username: "+tdEnd
        rightPanelTemplate+=tdBegin+entriesData.username+tdEnd
        rightPanelTemplate+=trEnd
        rightPanelTemplate+=trBegin
        rightPanelTemplate+=tdBegin+"Password: "+tdEnd
        rightPanelTemplate+=tdBegin+entriesData.password+tdEnd
        rightPanelTemplate+=trEnd
        rightPanelTemplate+=trBegin
        rightPanelTemplate+=tdBegin+"Website "+tdEnd
        rightPanelTemplate+=tdBegin+aBegin+entriesData.url+aCenter+entriesData.url+aEnd+tdEnd
        rightPanelTemplate+=trEnd
        rightPanelTemplate+=trBegin
        rightPanelTemplate+=tdBegin+"Notes: "+tdEnd
        rightPanelTemplate+=tdBegin+entriesData.notes+tdEnd
        rightPanelTemplate+=trEnd
        rightPanelTemplate+=tableEnd+divEndTag
        rightPanel.innerHTML+=rightPanelTemplate
      }
    }
  }
//  TODO Innen folytasd!
  return
}

function showHideEntries() {
  const dataEntries=document.querySelectorAll('[data-entries]')
  const dataEntriesId=document.querySelectorAll('[data-entriesId]')
  for (let i = 0; i < dataEntries.length; i++) {
    dataEntries[i].addEventListener("click",()=> {
      for (let a = 0; a < dataEntries.length; a++) {
        if (a==i) {
          dataEntries[a].classList.add('marked')
        }
        if (a!=i) {
          dataEntries[a].classList.remove('marked')

        }
      }
      let dataEntriesValue=dataEntries[i].attributes[1].value
      for (let y = 0; y < dataEntriesId.length; y++) {
        let dataEntriesIdValue=dataEntriesId[y].attributes[2].value
        if (dataEntriesValue==dataEntriesIdValue) {
          dataEntriesId[y].classList.add('active')
        }
        if (dataEntriesValue!=dataEntriesIdValue) {
          dataEntriesId[y].classList.remove('active')
        }
      }
    })    
  }
  return
}