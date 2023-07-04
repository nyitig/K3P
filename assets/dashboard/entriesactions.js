checkKdbxObjectGroupName()

function checkKdbxObjectGroupName() {
  let kdbxObjName=JSON.parse(sessionStorage.kdbx)
if (kdbxObjName.name!=undefined) {
  groupActionBtnActivated()
  groupAddContextMenu()
  entriesActionBtnActivated()
  return
}
}

function entriesActionBtnActivated() {
  addNewEntriesBtnClick()
  moveEntriesBtnClick()
  deleteEntriesBtnClick()
  return
}

/* ENTRIES ACTIONS*/ 


// add new entries

function addNewEntriesBtnClick() {
  const addEntriesBtns=document.querySelectorAll('.addEntriesBtn')
  for (let i = 0; i < addEntriesBtns.length; i++) {
    addEntriesBtns[i].addEventListener('click',()=>{
      let btn=addEntriesBtns[i]
      let dataIds=btn.getAttribute('data-groupEntId')
      addNewEntries(dataIds)
    } 
    )
  }
  return
}

function addNewEntries(dataIds) {
  /*
  body:
  {
    "kdbxFileDto":
    {
        "kdbxFileIdDto": "2",
        "kdbxFilePwDto": "1"
    }
,
    "entryDto":
    {
        "entryUuidDto": "",
        "entryTitleDto": "postman created entry",
        "entryUsernameDto": "pm username",
        "entryPasswordDto": "master pw",
        "entryTagsDto": "ultimate tag 123, super tag 2",
        "entryNotesDto": "very beautiful note",
        "entryUrlDto": "planet.captaion.foundation",
        "expiresDto": "true",
        "entryExpiryTimeDto" : "2000000000000",
        "targetGroupDirectionDto": ""
    }
}
Mit kell csinálni?
  Szinte megegyezik az add Grouppal, csak entrie-ben kell végig menni
    - kell még hozzá: title

  */ 
console.log(dataIds)

let addGroupName=targetNameKeys[dataIds]
let addGroupTemplate=` <div id="addEntriesDiv" class="column groupActions">
<h2 class="inputSectionH2">Add entries</h2>
<h3 class="inputSectionH3">Group name: ${addGroupName} </h3>
<div class="addTitleDiv row alItCent inputDiv">
  <label for="entriesTitleNames" class="inputLabels">Title of the new entries:</label>
  <input type="text" name="entriesTitleNames" id="entriesTitleNamesInput" placeholder="New entries title..." autocomplete="off">
</div>
<div class="addUserNameDiv row alItCent inputDiv">
  <label for="entriesUserNames" class="inputLabels">Username of the new entries:</label>
  <input type="text" name="entriesUserNames" id="addEntriesUserNameInput" placeholder="New entries user name..." autocomplete="off">
</div>
<div class="addUserPasswDiv row alItCent inputDiv">
  <label for="entriesUserPassw" class="inputLabels">Password of the new entries:</label>
  <input type="password" name="entriesUserPassw" id="addEntriesUserPasswInput" placeholder="New entries user password..." autocomplete="off">
  <img id="eyeIconPassword" src="/assets/pic/eye-outline.svg" alt="show password" width="30" height="30" class="eyeIcons svgImgBrown cursorPoint">
</div>
<div class="addTagsDiv row alItCent inputDiv">
  <label for="entriesTags" class="inputLabels">Tags of the new entries:</label>
  <input type="text" name="entriesTags" id="addEntriesTagsInput" placeholder="New entries tags..." autocomplete="off">
</div>
<div class="addUrlDiv row alItCent inputDiv">
  <label for="entriesUrl" class="inputLabels">URL of the new entries:</label>
  <input type="text" name="entriesUrl" id="addEntriesUrlInput" placeholder="New entries url..." autocomplete="off">
</div>
<div class="addNotesDiv row alItCent inputDiv">
  <label for="entriesNotes" class="inputLabels">Notes of the new entries:</label>
  <textarea name="entriesNotes" id="addEntriesNotesInput" class="textarea" cols="30" rows="5" placeholder="New entries notes..." ></textarea>
</div>
<div  class=" addExpChkbxDiv row alItCent inputDiv">
  <label for="entriesExp" class="inputLabels">add an expiration date</label>
  <input type="checkbox" name="entriesExp" id="addGroupExpChkbx">
</div>
<div id="addExpDiv" class=" row alItCent inputDiv">
  <label for="entriesExp" class="inputLabels">expiration date of the new entries:</label>
  <input type="datetime-local" name="entriesExp" id="addGroupExpInput">
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
const entriesTitleNamesInput=document.getElementById('entriesTitleNamesInput')
const addEntriesUserNameInput=document.getElementById('addEntriesUserNameInput')
const addEntriesUserPasswInput=document.getElementById('addEntriesUserPasswInput')
const addEntriesTagsInput=document.getElementById('addEntriesTagsInput')
const addEntriesUrlInput=document.getElementById('addEntriesUrlInput')
const addEntriesNotesInput=document.getElementById('addEntriesNotesInput')
const eyeIconPassword=document.getElementById('eyeIconPassword')
let entryTitleDto=""
let entryUsernameDto=""
let entryPasswordDto=""
let entryTagsDto=""
let entryNotesDto=""
let entryUrlDto=""
let expiresDto=false
let entryExpiryTimeDto=""
let targetGroupDirectionDto=targetDRKeys[dataIds]

// DATA REQUEST

addGroupExpChkbx.addEventListener('click',()=>{
  expiresDto=expiresDtoChange(expiresDto,addExpDiv,addGroupExpInput)
})

addGroupExpInput.addEventListener('change',()=>{
 let d=dataTimeToMilisec(addGroupExpInput)
 entryExpiryTimeDto=d
})

// titles name

entriesTitleNamesInput.addEventListener("keyup",()=>{
  entryTitleDto=entriesTitleNamesInput.value
})

// user names

addEntriesUserNameInput.addEventListener("keyup",()=>{
  entryUsernameDto=addEntriesUserNameInput.value
})

// password
addEntriesUserPasswInput.addEventListener("keyup",()=>{
  entryPasswordDto=addEntriesUserPasswInput.value
})

// entries tag

addEntriesTagsInput.addEventListener("keyup",()=>{
  entryTagsDto=addEntriesTagsInput.value
})

// URL

addEntriesUrlInput.addEventListener("keyup",()=>{
  entryUrlDto=addEntriesUrlInput.value
})

// notes

addEntriesNotesInput.addEventListener("keyup",()=>{
  entryNotesDto=addEntriesNotesInput.value
})

// show hide passw input

eyeIconPassword.addEventListener("click",()=>{
  const imgTag=document.getElementById('eyeIconPassword')
  const passwInpTag=document.getElementById('addEntriesUserPasswInput')
  let switchKey=passwInpTag.attributes[0].value
  switch (switchKey) {
    case "password":
      imgTag.src="/assets/pic/eye-off-outline.svg"
      passwInpTag.attributes[0].value="text"
      break;
    case "text":
      imgTag.src="/assets/pic/eye-outline.svg"
      passwInpTag.attributes[0].value="password"
      break;
  
    default:
      break;
  }
})

// Add btn click

const btnAddGroup=document.getElementById('btnAddGroup')
btnAddGroup.addEventListener("click",()=>{
  // CHECKIND OF REQUIRED DATAS
  let checkOk=checkList()
  if (!checkOk) {
    return
  }
  if (entryTitleDto=="") {
    checkOk=false
    entriesTitleNamesInput.value="REQUIRED!"
    entriesTitleNamesInput.style.color="red"
    setTimeout(() => {
      entriesTitleNamesInput.value=""
      entriesTitleNamesInput.removeAttribute('style')

    }, 2000);
  }
  if (checkOk) {
    const urlAdd=urlBegin+"/api/kdbx/1/entries"
    const jwtToken=getJwtToken()
    let fetchbody=  {
      "kdbxFileDto":
      {
          "kdbxFileIdDto": "2",
          "kdbxFilePwDto": "1"
      }
  ,
      "entryDto":
      {
          "entryUuidDto": "",
          "entryTitleDto": `${entryTitleDto}`,
          "entryUsernameDto": `${entryUsernameDto}`,
          "entryPasswordDto": `${entryPasswordDto}`,
          "entryTagsDto": `${entryTagsDto}`,
          "entryNotesDto": `${entryNotesDto}`,
          "entryUrlDto": `${entryUrlDto}`,
          "expiresDto": `${expiresDto}`,
          "entryExpiryTimeDto" : `${entryExpiryTimeDto}`,
          "targetGroupDirectionDto": `${targetGroupDirectionDto}`
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
    /*
TODO innen folytasd!

*/ 
console.log("bejöttünk a fetch ágba")
  }
})


// let groupNameDto=""
// const addGroupNameInput=document.getElementById('addGroupNameInput')
// addGroupNameInput.addEventListener("keyup",()=>{
//   groupNameDto=addGroupNameInput.value
// })
// // add btn click
// const btnAddGroup=document.getElementById('btnAddGroup')
// btnAddGroup.addEventListener("click",()=>{
//   let checkOk=checkList()
//   if (!checkOk) {
//     return
//   }
//   checkOk=addNewGroupsCheck(expiresDto,groupExpiryTimeDto,groupNameDto)
//   if (!checkOk) {
//     return
//   }
// })
return
}

// move entries

function moveEntriesBtnClick() {
  const entriesMoveBtns=document.querySelectorAll('.entriesMove')
  for (let i = 0; i < entriesMoveBtns.length; i++) {
    entriesMoveBtns[i].addEventListener('click',()=>{
      let btn=entriesMoveBtns[i]
      let dataIds=btn.getAttribute('data-entriesdr')
      moveEntries(dataIds)
    })    
  }
  return
}

function moveEntries(dataIds) {
  // TODO itt csak a targetGroupDirectionDto-t kellene megadni?? Ez így hiányos
  console.log(dataIds)
  return
}

// delete entries

function deleteEntriesBtnClick() {
  const entriesDeleteBtns=document.querySelectorAll('.entiesDelete')
  for (let i = 0; i < entriesDeleteBtns.length; i++) {
    entriesDeleteBtns[i].addEventListener('click',()=>{
      let btn=entriesDeleteBtns[i]
      let dataIds=btn.getAttribute('data-entriesdr')
      deleteEntries(dataIds)
    })    
  }
  return
}

function deleteEntries(dataIds) {
/*
body:
{
    "kdbxFileDto":
    {
        "kdbxFileIdDto": "2",
        "kdbxFilePwDto": "1"
    }
,
    "entryDto":
    {
        "entryUuidDto": "",
        "entryTitleDto": "postman created entry",
        "entryUsernameDto": "pm username",
        "entryPasswordDto": "master pw",
        "entryTagsDto": "ultimate tag 123, super tag 2",
        "entryNotesDto": "very beautiful note",
        "entryUrlDto": "planet.captaion.foundation",
        "expiresDto": "true",
        "entryExpiryTimeDto" : "2000000000000",
        "targetGroupDirectionDto": "D"
    }
}

  3 dolog kell: 
        "entryTitleDto": "postman created entry",
        "entryUsernameDto": "pm username",
        "targetGroupDirectionDto": "D"

        Ezek üresek lehetnek:
        "entryUuidDto": "",
        "entryPasswordDto": "master pw",
        "entryTagsDto": "ultimate tag 123, super tag 2",
        "entryNotesDto": "very beautiful note",
        "entryUrlDto": "planet.captaion.foundation",
        "expiresDto": "true",
        "entryExpiryTimeDto" : "2000000000000",

        TODO: Innen folytasd!

*/ 
  let groupD=targetDRKeys[dataIds]
  console.log("delete: "+dataIds)
  console.log("groupTargetD: "+groupD)
}