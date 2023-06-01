/*GROUP ACTIONS*/ 


function reloadNewKdbxData() {
  clearMainPanels()
  allParamDefault()
  startDisplay()
  checkKdbxObjectGroupName()
return
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


//Add new group

function addNewGroupBtnClick() {
  const groupsAddBtns=document.querySelectorAll('.groupsAdd')
  for (let i = 0; i < groupsAddBtns.length; i++) {
    groupsAddBtns[i].addEventListener('click',()=>{
      let dataIds=getDataIds(groupsAddBtns[i])
      addNewGroup(dataIds)
    })    
  }
  return
}

function addNewGroup(dataIds) {
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
  if (!checkOk) {
    return
  }
  checkOk=addNewGroupsCheck(expiresDto,groupExpiryTimeDto,groupNameDto)
  if (!checkOk) {
    return
  }
  if (checkOk) {
  const urlAdd=urlBegin+"/api/kdbx/1/groups"
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
return
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
    let dataIds=getDataIds(groupsEditBtn[i])
    editGroup(dataIds)
  })  
 }
return
}

function editGroup(dataIds) {
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
    let checkOk=checkList()
    if (!checkOk) {
     return
    }
    checkOk=editGroupCheck(groupName,groupNameDto,expiresDto,groupExpiryTimeDto,)
    if (!checkOk) {
      return
    }
  if (checkOk) {
    const urlAdd=urlBegin+"/api/kdbx/1/groups/"
    const jwtToken=getJwtToken()
    let fetchbody={       
      "kdbxFileDto":
      {
          "kdbxFileIdDto": "2",
          "kdbxFilePwDto": "1"
      },
      
      "groupDto":
      {
          "expiresDto": "false",
          "groupExpiryTimeDto": "3000000000000",
          "targetGroupDirectionDto": `${targetGroupDirectionDto}`,
          "groupNameDto": `${groupNameDto}`
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
  groupActions(urlAdd,options)
  .then(result=>{resultFunctions(result)})
  }

  })

  return
  }

function editGroupCheck(groupName,groupNameDto,expiresDto,groupExpiryTimeDto,) {
  let checkStatus=true
  if (groupNameDto==groupName) {
    checkStatus=false
    let wrongTemplate=`<h2>You have not changed the group name!</h2>`
    showWrongPanel(wrongTemplate)
    setTimeout(() => {
      hideWrongPanel()
    }, 2000);
    return checkStatus
  }
  if (expiresDto) {
    if (groupExpiryTimeDto=="") {
      checkStatus=false
      let wrongTemplate=`<h2>You didn't specify an expiration date!</h2>`
      showWrongPanel(wrongTemplate)
      setTimeout(() => {
        hideWrongPanel()
      }, 2000);
      return checkStatus
    }
  }
  
  return checkStatus
}

// Move Group

// move btn click

function moveGroupBtnClick() {
  const groupsMove=document.querySelectorAll('.groupsMove')
  for (let i = 0; i < groupsMove.length; i++) {
    groupsMove[i].addEventListener("click",()=>{
      let dataIds=getDataIds(groupsMove[i])
      moveGroup(dataIds)
    })    
  }
  return
}

function moveGroup(dataIds) {
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
    const urlMove=urlBegin+"/api/kdbx/1/groups/move-group"
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
      let dataIds=getDataIds(groupsDeleteBtns[i])
          groupDelete(dataIds)
    })
  }
return
}

function groupDelete(dataIds) {
        /* - Miket kell csinálni?
        - azonosítani kell a DR-t és a group name-t => kész
        - az input section-t fel kell tölteni a deletéhez szükséges adatokkal => kész
          - név => kész
          - btn: törlés, mégsem, majd megjeleníteni => kész
            -törlés esetén: újra betölteni a komplett alsó panelt
            - mégsem esetén: zár az input panel, megjelenik a center és a right, majd az input panel innerHTML="" =>kész
      */ 
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
              const urlDelete=urlBegin+"/api/kdbx/1/groups"          
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

// contextmenu left mouse click
// group contextmenu functions
function groupAddContextMenu() {
  const dataTarget=document.querySelectorAll('[data-target]')
for (let i = 0; i < dataTarget.length; i++) {
  dataTarget[i].addEventListener("contextmenu",(e)=>{
    e.preventDefault()
    inputSectionHide()
    groupNameActivated(i)
    let xCoord=e.pageX
    let yCoord=e.pageY
    let dataIds=dataTarget[i].attributes[1].value
    const contextMenu=document.getElementById('contextMenu')
    contextMenu.innerHTML=groupContextMenuTemplate()
    contextMenu.style.top=yCoord+"px"
    contextMenu.style.height="10rem"
    contextMenu.style.left=xCoord+"px"
    setTimeout(() => {
      contextMenu.classList.add('active')
    }, 180);
    
    groupContextMenuActionsBtnAcitvated(dataIds)
  })
}
}

function groupNameActivated(index) {
  const dataTarget=document.querySelectorAll('[data-target]')
  groupToolsMenuhide()
  for (let i = 0; i < dataTarget.length; i++) {
    if (i==index) {
      dataTarget[i].classList.add('active')
    }
    if (i!=index) {
      dataTarget[i].classList.remove('active')
    }    
  }
  return
}

function groupToolsMenuhide() {
  const beginEnd=document.querySelectorAll('.beginEnd')
  for (let i = 0; i < beginEnd.length; i++) {
    beginEnd[i].classList.remove('active')
    
  }
}

function groupContextMenuTemplate() {
  let addBtnBegin=`<div class="groupsAdd groupToolsBtn contextmenuBtn" `
  let addEnd=`" >Add</div>`
  let editBtnBegin=` <div class="groupsEdit groupToolsBtn contextmenuBtn" `
  let editEnd=`" >Edit</div>`
  let moveBtnBegin=`<div class="groupsMove groupToolsBtn contextmenuBtn" `
  let moveEnd=`" >Move</div>`
  let deleteBtnBegin=`<div class="groupsDelete groupToolsBtn contextmenuBtn" `
  let deleteEnd=`"  >Delete</div>`
  let contextMenuTemplate=addBtnBegin+addEnd+editBtnBegin+editEnd+moveBtnBegin+moveEnd+deleteBtnBegin+deleteEnd
  return contextMenuTemplate
}

function groupContextMenuActionsBtnAcitvated(dataIds) {
  addNewGroupBtnClickContMen(dataIds)
  editGroupBtnClickContMen(dataIds)
  groupDeleteBtnClickContMen(dataIds)
  moveGroupBtnClickContMen(dataIds)
  return
}

function contextMenuHide() {
  const contextMenu=document.getElementById('contextMenu')
  contextMenu.classList.remove('active')
  setTimeout(() => {
    contextMenu.removeAttribute('style')
  }, 500);
  return
}

function addNewGroupBtnClickContMen(dataIds) {
  const groupsAddBtns=document.querySelectorAll('.groupsAdd')
  for (let i = 0; i < groupsAddBtns.length; i++) {
    groupsAddBtns[i].addEventListener('click',()=>{
      contextMenuHide()
      addNewGroup(dataIds)
    })    
  }
  return
}

function editGroupBtnClickContMen(dataIds) {
  const groupsEditBtn=document.querySelectorAll('.groupsEdit')
  for (let i = 0; i < groupsEditBtn.length; i++) {
   groupsEditBtn[i].addEventListener('click',()=>{
    contextMenuHide()
    editGroup(dataIds)
   })  
  }
  return
}

function groupDeleteBtnClickContMen(dataIds) {
  const groupsDeleteBtns=document.querySelectorAll('.groupsDelete')
  for (let i = 0; i < groupsDeleteBtns.length; i++) {
    groupsDeleteBtns[i].addEventListener('click',()=>{
      contextMenuHide()
      groupDelete(dataIds)
    })
  }
  return
}

function moveGroupBtnClickContMen(dataIds) {
  const groupsMove=document.querySelectorAll('.groupsMove')
  for (let i = 0; i < groupsMove.length; i++) {
    groupsMove[i].addEventListener("click",()=>{
      contextMenuHide()
      moveGroup(dataIds)
    })    
  }
  return
}