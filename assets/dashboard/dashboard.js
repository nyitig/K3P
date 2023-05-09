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
  fullPageSect.classList.add('active')
  return
}

// clear main panels

function clearMainPanels() {
  const leftPanel=document.getElementById('leftPanel')
  const centerPanel=document.getElementById('centerPanel')
  const rightPanel=document.getElementById('rightPanel')
  const inputPanel=document.getElementById('inputPanel')
  const wrongPanel=document.getElementById('wrongPanel')
  leftPanel.innerHTML=""
  centerPanel.innerHTML=""
  rightPanel.innerHTML=""
  inputPanel.innerHTML=""
  wrongPanel.innerHTML=""
  centerPanel.classList.add('active')
  rightPanel.classList.add('active')
  inputPanel.classList.remove('active')
  wrongPanel.classList.remove('active')
  return
}

function allParamDefault() {
  // new kdbx Json load
  kdbxObject=JSON.parse(sessionStorage.kdbx)
  // all array and object load default value
  idsTree=[["leftPanel"]]
  elemidsArray=[["leftPanel"]]
  groupsTree=[]
  groupsNameTree=[]
  iconIdsTree=[]
  liIndexArr=[]
  targetDRKeys={}
  targetNameKeys={}
  dataTargetArray=[]
  dRtargetIndexTree=[[""]]
  dRtargetTree=[[""]]
  dRarryaTree=[[""]]
  // entries array
  entriesTree=[]
  entriesTreeIdsArr=[]

  // all parameter load default value
  level=0
  indexKdbx=0
  groupsTree[level]=[]
  liIndexArr[0]=[1]
  groupsTree[level][indexKdbx]=kdbxObject
}

/*loading kdbx into main*/ 
/*
Mit is kellene csinálni?
- groups a #leftPanelben jelennének meg => ez készen van
- entries a #centerPanelben jelennének meg => ez is készen van
- entries összes tulajdonsága pedig a #rightPanelben => ez is készen van
*/

let kdbxObject=JSON.parse(sessionStorage.kdbx)
let idsTree=[["leftPanel"]]
let elemidsArray=[["leftPanel"]]
let groupsTree=[]
let groupsNameTree=[]
let iconIdsTree=[]
let liIndexArr=[]
let targetDRKeys={}
let targetNameKeys={}
let dataTargetArray=[]
let dRtargetIndexTree=[[""]]
let dRtargetTree=[[""]]
let dRarryaTree=[[""]]
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
// const dataTarget=document.querySelectorAll('[data-target]')
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
     loadLeftPanel()
    loadCenterPanel()
    loadRightPanel()
    createDRTargetTree()
    createDataTargerDataDrKeysPairs()
    createDatatargetGroupNameKeypairs()
    showHideFullPageSect()
    groupMenuToolsOpenClose()
    groupActionBtnActivated()
    // inputSectionShow()
   return
  }

}

function displayKdbxObj(actObj,actIndex) {
  if (actObj[actIndex].uuid!=undefined) {
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
      let text=`none${actIndex}`
      groupsTree[newlevel][actObjLenght]={text}
      idsTree[newlevel][actObjLenght]=text
      dRtargetIndexTree[newlevel][actObjLenght]=text
    }
    if (groupsTree[newlevel]==undefined) {
      groupsTree[newlevel]=[]
      let text=`none${actIndex}`
      groupsTree[newlevel][0]={text}
      idsTree[newlevel]=[]
      dRtargetIndexTree[newlevel]=[]
      idsTree[newlevel][0]=text
      dRtargetIndexTree[newlevel][0]=text
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
        dRtargetIndexTree[newlevel][actObjLenght]=actIndex
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
    dRtargetIndexTree[newlevel]=[]
    liIndexArr[newlevel]=[obj.length]
    for (let i=0; i< obj.length; i++) {
      let text=`lev${level}ind${actIndex}`
      idsTree[newlevel][i]=text
      dRtargetIndexTree[newlevel][i]=actIndex
    }
    return
  }
  return
}

/* LEFT PANEL CREATE FUNCTIONS */ 

// create elemIdsArray

function createElemIdsArray(treeArray,elemArray) {
  for (let a = 1; a < treeArray.length; a++) {
    if (elemArray[a]==undefined) {
      elemArray[a]=[]
    }
    for (let it of treeArray[a]) {
      if (elemArray[a].indexOf(it)===-1) {
        elemArray[a].push(it)
      }
    }
  }
}

// left panel load

function loadLeftPanel() {
 createElemIdsArray(idsTree,elemidsArray)
  createLeftPanelDom()
  return
}

// left panel DOM create 

function createLeftPanelDom() {
   let olBeginTag=`<ol class="column olbox" `
   let imgBegin=`<img class="imgLeftPanel svgImgBrown" src=`
   let imgCenter=` alt="" width="30" height="30"`
   let dataTarget=` data-target=`
   let liBeginTag=`<li class="liLeftPanel column" id=`
   let tagEnd=`>`
   let liEndTag=`</li>`
   let olEndTag=`</ol>`
   let spanBegin=`<span>`
   let spanEnd=`</span>`
   let divBegin=`<div class="row alItCent justySpBw"`
   let divBeginCent=`<div class="row alItCent"`
   let divBeginEnd=`<div class="row alItCent beginEnd"`
   let imgConstruct=`<img class="svgImgBrown imgConstruct" src="/assets/pic/construct-outline.svg" alt="" width="30" height="30">`
   let divEnd=`</div>`
   let toolsContainerBegin=`<div class="groupsTools row  justySpEv alItCent">`
  let dataDR=`data-dr="`
  let addBtnBegin=`<div class="groupsAdd groupToolsBtn" `
  let addEnd=`" >Add</div>`
  let editBtnBegin=` <div class="groupsEdit groupToolsBtn" `
  let editEnd=`" >Edit</div>`
  let moveBtnBegin=`<div class="groupsMove groupToolsBtn" `
  let moveEnd=`" >Move</div>`
  let deleteBtnBegin=`<div class="groupsDelete groupToolsBtn" `
  let deleteEnd=`"  >Delete</div>`
   let gropNameTreeIndex=0
 for (let asd = 0; asd < elemidsArray.length; asd++) {
  gropNameTreeIndex=0
  for (let i = 0; i < elemidsArray[asd].length; i++) {
    let tagId=elemidsArray[asd][i]
    let querryIndex=tagId.slice(0, 4) // ha none lesz, akkor nem kell beépíteni, de a dataTarget tömbbe meg mindkettőnek be kell kerülnie :)
    
    if (querryIndex=='none') {
      if (dataTargetArray[asd]!=undefined) {
        let drTargetArrIndex=dataTargetArray[asd].length
        dataTargetArray[asd][drTargetArrIndex]=tagId
      }
      if (dataTargetArray[asd]==undefined) {
        dataTargetArray[asd]=[]
        dataTargetArray[asd][0]=tagId
      }
    }
    if (querryIndex!="none") {
      let elem=document.getElementById(tagId)
      let leftPanelTemplate=``
      leftPanelTemplate+=olBeginTag+tagEnd
      for (let y = 0; y < idsTree[asd].length; y++) {
        if (elemidsArray[asd][i]==idsTree[asd][y] && elemidsArray[asd][i]!=querryIndex) {
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
          leftPanelTemplate+=liBeginTag+liIds+tagEnd+divBegin+dataTarget+liIds+tagEnd+divBeginCent+tagEnd+imgBegin+imgSrc+imgCenter+tagEnd
          leftPanelTemplate+=spanBegin+groupsNameTree[asd][gropNameTreeIndex]+spanEnd+divEnd
          leftPanelTemplate+=divBeginEnd+tagEnd+imgConstruct+divEnd+divEnd
          leftPanelTemplate+=toolsContainerBegin
          leftPanelTemplate+=addBtnBegin+dataDR+liIds+addEnd //add Btn
          leftPanelTemplate+=editBtnBegin+dataDR+liIds+editEnd //edit btn
          leftPanelTemplate+=moveBtnBegin+dataDR+liIds+moveEnd // move btn
          leftPanelTemplate+=deleteBtnBegin+dataDR+liIds+deleteEnd //delete btn
          leftPanelTemplate+=divEnd
          gropNameTreeIndex++
        }

        if (dataTargetArray[asd]!=undefined && elemidsArray[asd][i]==idsTree[asd][y])  {
          let drTargetArrIndex=dataTargetArray[asd].length
          let drIds=`lev${asd}ind${y}`
          dataTargetArray[asd][drTargetArrIndex]=drIds
        }
        if (dataTargetArray[asd]==undefined && elemidsArray[asd][i]==idsTree[asd][y])  {
          dataTargetArray[asd]=[]
          let drIds=`lev${asd}ind${y}`
          dataTargetArray[asd][0]=drIds
        }
                
      }
      leftPanelTemplate+=liEndTag+olEndTag
      elem.innerHTML+=leftPanelTemplate
      }
    }
  } 
  return
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
  const groupsTools=document.querySelectorAll('.groupsTools')
  const dataTarget=document.querySelectorAll('[data-target]')
  const dataGroupIds=document.querySelectorAll('[data-groupIds]')
  const dataEntries=document.querySelectorAll('[data-entries]')
  const dataEntriesId=document.querySelectorAll('[data-entriesId]')
  const beginEnd=document.querySelectorAll('.beginEnd')
  for (let i = 0; i < dataTarget.length; i++) {
    dataTarget[i].addEventListener('click',()=>{
      inputSectionHide()
      for (let y = 0; y < dataTarget.length; y++) {
        // add clicked div active class, remove other div class
        if (i==y) {
          if (!dataTarget[y].classList.contains('active')) {
            dataTarget[y].classList.add('active')
            beginEnd[y].classList.add('active')              
          }
        }
        if (i!=y) {
          dataTarget[y].classList.remove('active')
          beginEnd[y].classList.remove('active')
          groupsTools[y].classList.remove('active')
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
  let trBegin=`<div class="rightPanelTr alItCent  row">`
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
        // times data
        // rightPanelTemplate+=trBegin
        // rightPanelTemplate+=tdBegin+"Creation: "+tdEnd
        // let timeData=entriesData.times.cretionTime
        // rightPanelTemplate+=tdBegin+dateConvertToReadableDate(timeData)+tdEnd
        // rightPanelTemplate+=trEnd
        // rightPanelTemplate+=trBegin
        // rightPanelTemplate+=tdBegin+"Expiry: "+tdEnd
        // timeData=entriesData.times.expiryTime
        // rightPanelTemplate+=tdBegin+dateConvertToReadableDate(timeData)+tdEnd
        // rightPanelTemplate+=trEnd
        // rightPanelTemplate+=trBegin
        // rightPanelTemplate+=tdBegin+"Last access: "+tdEnd
        // timeData=entriesData.times.lastAccessTime
        // rightPanelTemplate+=tdBegin+dateConvertToReadableDate(timeData)+tdEnd
        // rightPanelTemplate+=trEnd
        // rightPanelTemplate+=trBegin
        // rightPanelTemplate+=tdBegin+"Last modification: "+tdEnd
        // timeData=entriesData.times.lastModificationTime
        // rightPanelTemplate+=tdBegin+dateConvertToReadableDate(timeData)+tdEnd
        // rightPanelTemplate+=trEnd
        // rightPanelTemplate+=trBegin
        // rightPanelTemplate+=tdBegin+"Loaction changed: "+tdEnd
        // timeData=entriesData.times.locationChanged
        // rightPanelTemplate+=tdBegin+dateConvertToReadableDate(timeData)+tdEnd
        // rightPanelTemplate+=trEnd
        rightPanelTemplate+=tableEnd+divEndTag
        rightPanel.innerHTML+=rightPanelTemplate
      }
    }
  }
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

// date converts functions

function dateConvertToReadableDate(dateTime) {
  let msTime=dateTime
  let time= new Date().getTime(msTime)
  let date= new Date(time)
  return date.toString()
}
function dataTimeToMilisec(dataTimeInput) {
  let newDataTime=dataTimeInput.value
  let dataTimeMilisec= Date.parse(`${newDataTime}`)
  return dataTimeMilisec
}

// DR target tree create

function createDRTargetTree() {
  /*
  Mit is kell csinálni?
  -  első szűrés: none vagy nem none 
    - ha nem none == egy number az, akkor az ahhoz tartozó indexűek megkapják:-  vagy a +D (0. elem), vagy  a +R (már legalább 1 ilyen elem letárolásra került)
    - ha none== string akkor az azonos strig kerül letároásra. 
  */ 
  createElemIdsArray(dRtargetIndexTree,dRtargetTree)
  for (let i = 1; i < dRtargetTree.length; i++) {
    for (let y = 0; y < dRtargetTree[i].length; y++) {
      let searchIndex=dRtargetTree[i][y]
      let target=0
      if (typeof(searchIndex)=="number") {
        let drValue=dRarryaTree[i-1][searchIndex]
        // ide akkor jövök be, ha indexet kapok
        for (let b = 0; b < dRtargetIndexTree[i].length; b++) {
          let actualIndex=dRtargetIndexTree[i][b]
          if (searchIndex==actualIndex) {
            if (dRarryaTree[i]!=undefined) {
              let lenghtIndex=dRarryaTree[i].length
              if (target!=0) {
                drValue+="R" 
                dRarryaTree[i][lenghtIndex]=drValue
                target++
              }
              if (target==0) {
                drValue+="D" 
                dRarryaTree[i][lenghtIndex]=drValue
                target++
              }
            }
            if (dRarryaTree[i]==undefined) {
              dRarryaTree[i]=[] 
              drValue+="D"               
              dRarryaTree[i][0]=drValue
              target++
            }
          }
        }
      }
      if (typeof(searchIndex)=="string") {
      // Ide akkor jövök be, ha "none*" az érték.
        for (let c = 0; c < dRtargetIndexTree[i].length; c++) {
          let actualIndex=dRtargetIndexTree[i][c]

          if (searchIndex==actualIndex) {
            if (dRarryaTree[i]!=undefined) {
              let lenghtIndex=dRarryaTree[i].length
              dRarryaTree[i][lenghtIndex]=actualIndex
            }
            if (dRarryaTree[i]==undefined) {
              dRarryaTree[i]=[] 
              dRarryaTree[i][0]=actualIndex
            }
          }          
        }
      }
      /*
      TODO Az idsTree és a drArray 4. lev sorrendben nem egyezik meg Miért???? A többi rendben van Ok: a none nem egyedi, így ha a level
       sorban "foghíjasan szerepelnek az azonosítók, akkor fordul ez elő. Megoldás:  most már egyediek a none-k is. De ez lenne amegoldás??? :)
       Mit is kell csinálni?
      ha none-t talál, akkor aza dott indexbe írja be az adott értéket, ha nem none, akkor mehet ami volt is. 
      a dRtargetIndexTree tartalmazza a teljes sort. 
       */
         for (let b = 0; b < dRtargetIndexTree[i].length; b++) {
           let actualIndex=dRtargetIndexTree[i][b]
           let actualIndexNoneText=""
           if (actualIndex.length>3) {
             actualIndexNoneText=actualIndexNoneText.slice(0,3)
           }
         }                    
    }      
  }
  return
}

// create enum data-target:dRArray

function createDataTargerDataDrKeysPairs() {
  // dataTargetArray dRarryaTree targetDRKeys
  for (let i = 0; i < dataTargetArray.length; i++) {
    for (let y = 0; y < dataTargetArray[i].length; y++) {
      let levInd=dataTargetArray[i][y].toString() 
      let value=dRarryaTree[i][y].toString() 
      targetDRKeys[levInd]=value      
    }    
  }
  return
}

// create enum data-target:group name

function createDatatargetGroupNameKeypairs() {
  // a két tömb mátrix indexei nem megegyezőek, ezért másképp kell párosítani.
  for (let i = 0; i < dataTargetArray.length; i++) {
    let nameIndex=0
    for (let y = 0; y < dataTargetArray[i].length; y++) {
      let dataTargetName=dataTargetArray[i][y]
      let textNone=dataTargetName.slice(0,4)
      if (textNone!="none") {
        targetNameKeys[dataTargetName]=groupsNameTree[i][nameIndex]
        nameIndex++
      }      
    }    
  }
  return
}
// menu tools

function groupMenuToolsOpenClose() {
  const beginEnd=document.querySelectorAll('.beginEnd')
  const groupsTools=document.querySelectorAll('.groupsTools')
  for (let i = 0; i < beginEnd.length; i++) {
    beginEnd[i].addEventListener("click",()=>{
      inputSectionHide()
      for (let y = 0; y < groupsTools.length; y++) {
        if (y==i) {
          groupsTools[y].classList.toggle('active')
        }
        if (y!=i) {
          groupsTools[y].classList.remove('active')
        }        
      }
    })    
  }
  return
}

// input section show, hide

function inputSectionShow() {
  const centerPanel=document.getElementById('centerPanel')
  const rightPanel=document.getElementById('rightPanel')
  const inputPanel=document.getElementById('inputPanel')
  const centerPanelDiv=document.querySelectorAll('.centerPanelDiv')
  centerPanel.classList.remove('active')
  rightPanel.classList.remove('active')
  inputPanel.classList.add('active')
  for (let y = 0; y < centerPanelDiv.length; y++) {
    centerPanelDiv[y].classList.remove('active')        
  }
  return
}

function inputSectionHide() {
  const centerPanel=document.getElementById('centerPanel')
  const rightPanel=document.getElementById('rightPanel')
  const inputPanel=document.getElementById('inputPanel')
  inputPanel.classList.remove('active')
  centerPanel.classList.add('active')
  rightPanel.classList.add('active')
  inputPanel.innerHTML="<h2>Input section</h2>"
  return
}

function inputSectionLoadTemplate(template) {
  const inputPanel=document.getElementById('inputPanel')
  inputPanel.innerHTML=template
  return
}

// wrong panel show, hide

function showWrongPanel(wrongTemplate) {
  const wrongPanel=document.getElementById('wrongPanel')
  wrongPanel.innerHTML=wrongTemplate
  wrongPanel.classList.add('active')
  
}

function hideWrongPanel() {
  const wrongPanel=document.getElementById('wrongPanel')
  wrongPanel.classList.remove('active')
  setTimeout(() => {
    wrongPanel.innerHTML=""
  }, 1500);

}




/*GROUP ACTIONS*/ 


function reloadNewKdbxData() {
  clearMainPanels()
  allParamDefault()
  startDisplay()
}

function groupActionBtnActivated() {
  addNewGroupBtnClick()
  editGroupBtnClick()
  groupDeleteBtnClick()
  moveGroupBtnClick()

  return
}

// checked functions

function checkList() {
  let checkStatus=true
  let statusNetwork=statusNetworkCheck()
  if (!statusNetwork) {
    let wrongTemplate=offlineTemplate()
    showWrongPanel(wrongTemplate)
    setTimeout(() => {
      hideWrongPanel()
    }, 2000);
    checkStatus=false
    return checkStatus
  }
  let userStatus=sessionStorageUserCheck()
  if (!userStatus) {
    let wrongTemplate=logoutStatusTemplate()
    showWrongPanel(wrongTemplate)
    setTimeout(() => {
      hideWrongPanel()
    }, 2000);
    checkStatus=false
    return checkStatus
  }
  return checkStatus
}

function statusNetworkCheck() {
  let statusNetwork=navigator.onLine ? "Online":"OFFline"
  return statusNetwork
}

function sessionStorageUserCheck() {
  let userLoginCheck=false
  if (sessionStorage.user) {
    userLoginCheck=true
  }
  return userLoginCheck
}

// wrong templates

function offlineTemplate() {
  let wrongTemplate=`<h2>Sorry!You are Offline!</h2>`
  return wrongTemplate
}

function logoutStatusTemplate() {
  let wrongTemplate=`<h2>Log in again!</h2>`
  return wrongTemplate
}

// jwtToken

function getJwtToken() {
  const userLoginDatas=JSON.parse(sessionStorage.user)
  const jwtToken=userLoginDatas.jwtToken
  return jwtToken
}

//Add new group

function addNewGroupBtnClick() {
  const groupsAddBtns=document.querySelectorAll('.groupsAdd')
  for (let i = 0; i < groupsAddBtns.length; i++) {
    groupsAddBtns[i].addEventListener('click',()=>{
      addNewGroup(groupsAddBtns[i])
    })    
  }
  return
}

function addNewGroup(btn) {
  /*
  Ezek  a paraméterek kellenek:
  "kdbxFileDto":
    {
        "kdbxFilePwDto": "1"
    },
    
    "groupDto":
    {
        "expiresDto": "",
        "groupExpiryTimeDto": "",
        
        "targetGroupDirectionDto": "DRRRR",
        "groupNameDto": "IT First"
    }
}

expiresDto: boolean érték
groupExpiryTimeDto: ms-ben
  */ 
/*
Mit is kell csinálni?
- azonosítani, h melyik grouphoz szeretnék hozzáadni => kész
- templatet létrehozni, majfd megjeleníteni az oinput sectionban => kész
  -template tartalma: expiresTime, name, add, cancel btn => kész
- aktiválni a btn-et => kész
  - ha cancel btn=> inputsectionhide => kész
  - ha add => ellenőrizni, h minden adat beírásra került-e
    - ha nem=>wrongtemplate+ wrongpanel activated
    - ha minden ok=> létrehozni afethez az url, options-t => groupActions(url,options).then(result=>resultFunctions(result))

*/  
let dataIds=getDataIds(btn)
let addGroupName=targetNameKeys[dataIds]
let addGroupTemplate=` <div id="addGroupDiv" class="column groupActions">
<h2 class="inputSectionH2">Add group</h2>
<h3 class="inputSectionH3">Group name: ${addGroupName} </h3>
<div class="addNameDiv row alItCent inputDiv">
  <label for="groupNames" class="inputLabels">Name of the new group:</label>
  <input type="text" name="groupNames" id="addGroupNameInput" placeholder="New group name..." autocomplete="off">
</div>
<div  class=" addExpChkbxDiv row alItCent inputDiv">
  <label for="groupExp" class="inputLabels">add an expiration date</label>
  <input type="checkbox" name="groupExp" id="addGroupExpChkbx">
</div>
<div id="addExpDiv" class=" row alItCent inputDiv">
  <label for="groupExp" class="inputLabels">expiration date of the new group:</label>
  <input type="datetime-local" name="groupExp" id="addGroupExpInput">
</div>
<div id="addBtnDiv" class="row inputDiv">
<button id="btnAddGroup" class="btnAll btnActions" >Add</button>
<button id="btnCancel" class="btnAll ">Cancel</button>
</div>
`
inputSectionLoadTemplate(addGroupTemplate)
inputSectionShow()
btnCancel()
// collecting data to be sent
const addGroupExpChkbx=document.getElementById('addGroupExpChkbx')
const addExpDiv=document.getElementById('addExpDiv')
const addGroupExpInput=document.getElementById('addGroupExpInput')
let groupExpiryTimeDto=""
let expiresDto=false
addGroupExpChkbx.addEventListener('click',()=>{
  expiresDto=expiresDtoChange(expiresDto,addExpDiv,addGroupExpInput)
})

addGroupExpInput.addEventListener('change',()=>{
 let d=dataTimeToMilisec(addGroupExpInput)
 groupExpiryTimeDto=d
})
let targetGroupDirectionDto=targetDRKeys[dataIds]
let groupNameDto=""
const addGroupNameInput=document.getElementById('addGroupNameInput')
addGroupNameInput.addEventListener("keyup",()=>{
  groupNameDto=addGroupNameInput.value
})
// add btn click
const btnAddGroup=document.getElementById('btnAddGroup')
btnAddGroup.addEventListener("click",()=>{
  let checkOk=checkList()
  checkOk=addNewGroupsCheck(expiresDto,groupExpiryTimeDto,groupNameDto)
  if (!checkOk) {
    return
  }
  if (checkOk) {
  const urlAdd="http://127.0.0.1:9933/api/kdbx/1/groups"
  const jwtToken=getJwtToken()
  let fetchbody={       
    "kdbxFileDto":
    {
        "kdbxFilePwDto": "1"
    },
    
    "groupDto":
    {
        "expiresDto": "",
        "groupExpiryTimeDto": "",
        
        "targetGroupDirectionDto": `${targetGroupDirectionDto}`,
        "groupNameDto": `${groupNameDto}`
    }
}
const options= {
  method:'POST',
   body:JSON.stringify(fetchbody),
  headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
}
groupActions(urlAdd,options)
.then(result=>{resultFunctions(result)})

  }
})

return
}

function addNewGroupsCheck(expiresDto,groupExpiryTimeDto,groupNameDto) {
  let checkStatus=true
  if (expiresDto) {
    if (groupExpiryTimeDto=="") {
      checkStatus=false
      let wrongTemplate=`<h2>Expiration date is missing!</h2>`
      showWrongPanel(wrongTemplate)
      setTimeout(() => {
        hideWrongPanel()
      }, 2000);
      return checkStatus
    }
  }
  if (groupNameDto=="") {
    checkStatus=false
    let wrongTemplate=`<h2>You didn't enter a name!</h2>`
    showWrongPanel(wrongTemplate)
    setTimeout(() => {
      hideWrongPanel()
    }, 2000);
    return checkStatus
  }
  return checkStatus
}

// Edit group

function editGroupBtnClick() {
 const groupsEditBtn=document.querySelectorAll('.groupsEdit')
 for (let i = 0; i < groupsEditBtn.length; i++) {
  groupsEditBtn[i].addEventListener('click',()=>{
    editGroup(groupsEditBtn[i])
  })  
 }
return
}

function editGroup(btn) {
  /*
  body:
  {       
    "kdbxFileDto":
    {
        "kdbxFileIdDto": "2",
        "kdbxFilePwDto": "1"
    },
    
    "groupDto":
    {
        "expiresDto": "false",
        "groupExpiryTimeDto": "3000000000000",
        "targetGroupDirectionDto": "D",
        "groupNameDto": "123"
    }
}


Mit is kell csinálni?
  - azonosítani, h melyik groupról van szó ==targetGroupDirectionDto => kész
  - input section templatet létrehozni: => kész
    - input-ok: => kész
      - expiresDto
      - groupExpiryTimeDto
      - groupNameDto
    - btn-ok: edit, cancel
  - template=innerHtml => kész
  - megjeleníteni az input sectiont => kész
  - elmenteni az inputok változtatásait => kész
  - btn-okhoz click funct=> 
    - cancel: hide input section & input section innerHtml="" => kész
    - edit btn: 
      - check: change?
                - false => wrongTemplate=> wrongsection
                - true => checkList():
                                  - false => return
                                  - true => url, getJwtToken(), options => getAction().then result=>resultFunctions 

  */ 
  let dataIds=getDataIds(btn)
  let groupName=targetNameKeys[dataIds]
  let editGroupTemplate=`<div id="addGroupDiv" class="column groupActions">
<h2 class="inputSectionH2">Edit group</h2>
<h3 class="inputSectionH3">Group name: ${groupName} </h3>
<div class="addNameDiv row alItCent inputDiv">
  <label for="groupNames" class="inputLabels">The new name of the group:</label>
  <input type="text" name="groupNames" id="editGroupNameInput" value="${groupName}" autocomplete="off">
</div>
<div  class=" addExpChkbxDiv row alItCent inputDiv">
  <label for="groupExp" class="inputLabels">change an expiration date</label>
  <input type="checkbox" name="groupExp" id="addGroupExpChkbx">
</div>
<div id="addExpDiv" class=" row alItCent inputDiv">
  <label for="groupExp" class="inputLabels">expiration date of the ${groupName}:</label>
  <input type="datetime-local" name="groupExp" id="addGroupExpInput">
</div>
<div id="addBtnDiv" class="row inputDiv">
<button id="btnEditGroup" class="btnAll btnActions" >Edit</button>
<button id="btnCancel" class="btnAll ">Cancel</button>
</div>
`
inputSectionLoadTemplate(editGroupTemplate)
inputSectionShow()
btnCancel()
const addGroupExpChkbx=document.getElementById('addGroupExpChkbx')
const addExpDiv=document.getElementById('addExpDiv')
const addGroupExpInput=document.getElementById('addGroupExpInput')
let groupExpiryTimeDto=""
let expiresDto=false
addGroupExpChkbx.addEventListener('click',()=>{
  expiresDto=expiresDtoChange(expiresDto,addExpDiv,addGroupExpInput)
})
addGroupExpInput.addEventListener('change',()=>{
  let d=dataTimeToMilisec(addGroupExpInput)
  groupExpiryTimeDto=d
 })
 let targetGroupDirectionDto=targetDRKeys[dataIds]
 let groupNameDto=groupName
const editGroupNameInput=document.getElementById('editGroupNameInput')
editGroupNameInput.addEventListener('keyup',()=>{
  groupNameDto=editGroupNameInput.value
})
const btnEditGroup=document.getElementById('btnEditGroup')
btnEditGroup.addEventListener("click",()=>{
// TODO innne folytasd!

})




return
}

// Move Group

// move btn click

function moveGroupBtnClick() {
  const groupsMove=document.querySelectorAll('.groupsMove')
  for (let i = 0; i < groupsMove.length; i++) {
    groupsMove[i].addEventListener("click",()=>{
      moveGroup(groupsMove[i])
    })    
  }
  return
}

function moveGroup(btn) {
  /*
  Mit is kell csinálni?
  - azonosítani kell, h melyik groupot szeretném mozgatni =ykész
  - ahová mozgatom, azt is azonosítnia kell:
    - input section-t létrehozni ezekkel a paraméterekkel: => kész
      - amit mozgatok => kész
      - ahová mozgatom => kész
      - btns: - move és cancel => kész 
        - ha cancel: input sectionhide => kész
        - ha move: 
          - url, options összeállítani, és mehet a fetch => kész
    hibák, melyeket szűrni kell:
      - van jwtToken? => kész
      - van net kapcsolat? => kész
      -   
  */ 
  let dataIds=getDataIds(btn)
  let moveGroupName=targetNameKeys[dataIds]
  let sourceGroupDirectionDto=targetDRKeys[dataIds]
  let moveTemplate=`
  <div id="moveGroupDiv" class="column groupActions">
    <h2 class="inputSectionH2">Move group</h2>
    <h3 class="inputSectionH3">Group name: ${moveGroupName} </h3>
    <div class="selectedMenu row">
      <label for="groupNames" class="inputLabels">Choose which group to move it to:</label>
      <select name="groupNames" id="moveGroupListName" class="selectGroupAction">
  `
 
  let optionsBegin=`<option value="`
  let optionsBeginClose=`">`
  let optionsCloseTag=`</option>`
  for (let i = 0; i < groupsNameTree.length; i++) {
      for (let y = 0; y < groupsNameTree[i].length; y++) {
        let kdbxObjName=groupsNameTree[i][y]
        if (kdbxObjName!=moveGroupName) {
          moveTemplate+=optionsBegin+kdbxObjName+optionsBeginClose+kdbxObjName+optionsCloseTag
        }
      }
    
  }
  moveTemplate+=`
    </select>
    </div>
  <div id="deleteBtnDiv" class="row">
    <button id="btnMoveGroup" class="btnAll btnActions" >Move</button>
    <button id="btnCancel" class="btnAll ">Cancel</button>
  </div>
</div>
`
  inputSectionLoadTemplate(moveTemplate)
  inputSectionShow()

const btnCancel=document.getElementById('btnCancel')  
btnCancel.addEventListener("click",inputSectionHide)
const btnMoveGroup=document.getElementById('btnMoveGroup')
btnMoveGroup.addEventListener("click",()=>{
  let checkedOk=checkList()
  if (!checkedOk) {
    inputSectionHide()
    return
  }
  if (checkedOk) {
    const moveGroupListName=document.getElementById('moveGroupListName')
    // select key in targetNameKeys Object
    let levindId
    for (let key in targetNameKeys) {
      if (targetNameKeys[key]==moveGroupListName.value) {
        levindId=key
      }
    }
    let targetGroupDirectionDto=targetDRKeys[levindId]
    const urlMove="http://127.0.0.1:9933/api/kdbx/1/groups/move-group"
    const jwtToken=getJwtToken()
    const fetchbody=
    {       
      "kdbxFileDto":
      {
          "kdbxFilePwDto": "1"
      },
      
      "groupDto":
      {
          "expiresDto": "",
          "groupExpiryTimeDto": "",
          "sourceGroupDirectionDto" : `${sourceGroupDirectionDto}`,
          "targetGroupDirectionDto": `${targetGroupDirectionDto}`,
          "groupNameDto": "Moved group"
      }
  }
    
    const options= {
      method:'PUT',
       body:JSON.stringify(fetchbody),
      headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
  }
  groupActions(urlMove,options)
  .then(result=>{resultFunctions(result)})
  }
})
  return
}

// Delete group

// delete btn click

function groupDeleteBtnClick() {
  const groupsDeleteBtns=document.querySelectorAll('.groupsDelete')
  for (let i = 0; i < groupsDeleteBtns.length; i++) {
    groupsDeleteBtns[i].addEventListener('click',()=>{
          groupDelete(groupsDeleteBtns[i])
    })
  }
return
}

function groupDelete(btn) {
        /* - Miket kell csinálni?
        - azonosítani kell a DR-t és a group name-t => kész
        - az input section-t fel kell tölteni a deletéhez szükséges adatokkal => kész
          - név => kész
          - btn: törlés, mégsem, majd megjeleníteni => kész
            -törlés esetén: újra betölteni a komplett alsó panelt
            - mégsem esetén: zár az input panel, megjelenik a center és a right, majd az input panel innerHTML="" =>kész
      */ 
            let dataIds=getDataIds(btn)
            let deleteGroupName=targetNameKeys[dataIds]
            let deleteDR=targetDRKeys[dataIds]
            let deleteTemplate=`
            <div id="deleteGroupDiv" class="column groupActions">
            <h2 class="inputSectionH2">Delete group</h2>
            <h3 class="inputSectionH3">Group name: ${deleteGroupName} </h3>
            <div id="deleteBtnDiv" class="row">
                <button id="btnDeleteGroup" class="btnAll btnActions" >Delete</button>
                <button id="btnCancel" class="btnAll ">Cancel</button>
            </div>
        </div>
            `
            inputSectionLoadTemplate(deleteTemplate)
            inputSectionShow()
            const btnCancel=document.getElementById('btnCancel')
            btnCancel.addEventListener("click", inputSectionHide) // cancel btn click
            const btnDeleteGroup=document.getElementById('btnDeleteGroup')
            btnDeleteGroup.addEventListener("click",()=>{
              let checkedOk=checkList()
              if (!checkedOk) {
                inputSectionHide()
                return
              }
              const urlDelete="http://127.0.0.1:9933/api/kdbx/1/groups"          
                const jwtToken=getJwtToken()
                const fetchbody={       
                  "kdbxFileDto":
                  {
                      "kdbxFileIdDto": "2",
                      "kdbxFilePwDto": "1"
                  },
                  
                  "groupDto":
                  {
                      "targetGroupDirectionDto": `${deleteDR}`
                  }
              }
              const options= {
                method:'DELETE',
                 body:JSON.stringify(fetchbody),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                  },
            }
           
                groupActions(urlDelete,options)
                .then(result=>{resultFunctions(result)})     
            })
}

async function groupActions(url,options) {
  // debugger
  try {
    const response= await fetch(url,options)
    return response.json()
  } catch (error) {
    return error
  }
}

function resultFunctions(result) {
              // Errors
            //  debugger
            if (result.status) {
              let wrongTemplate=`<h2>Sorry! An error occured! </h2>
                                  <h3>Error code: ${result.status}</h3>`
              showWrongPanel(wrongTemplate)
              setTimeout(() => {
                hideWrongPanel()
              }, 2000);
              inputSectionHide()
              return
            }

            // if result==kdbxObj
            if (result.name) {
              // kdbx object clear
              sessionStorage.kdbx=""
              sessionStorage.kdbx=JSON.stringify(result)
              reloadNewKdbxData()
            }
}

function getDataIds(btn) {
  return btn.attributes[1].value
}

function btnCancel() {
  const btnCancel=document.getElementById('btnCancel')  
btnCancel.addEventListener("click",inputSectionHide)
}

function expiresDtoChange(expiresDto,addExpDiv,addGroupExpInput) {
  if (!addGroupExpChkbx.checked) {
    addExpDiv.classList.remove('active')
    expiresDto=false
    addGroupExpInput.value=""
    groupExpiryTimeDto=""
  }
  if (addGroupExpChkbx.checked) {
    addExpDiv.classList.add('active')
    expiresDto=true
  }
  return expiresDto
}