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
  <input type="text" name="entriesTitleNames" id="addEntriesNameInput" placeholder="New entries title..." autocomplete="off">
</div>
<div class="addUserNameDiv row alItCent inputDiv">
  <label for="entriesUserNames" class="inputLabels">Username of the new entries:</label>
  <input type="text" name="entriesUserNames" id="addEntriesUserNameInput" placeholder="New entries user name..." autocomplete="off">
</div>
<div class="addUserPasswDiv row alItCent inputDiv">
  <label for="entriesUserPassw" class="inputLabels">Password of the new entries:</label>
  <input type="password" name="entriesUserPassw" id="addEntriesUserPasswInput" placeholder="New entries user password..." autocomplete="off">
</div>
<div class="addTagsDiv row alItCent inputDiv">
  <label for="entriesTags" class="inputLabels">Tags of the new entries:</label>
  <input type="text" name="entriesTags" id="addEntriesTagsInput" placeholder="New entries tags..." autocomplete="off">
</div>
<div class="addUrlDiv row alItCent inputDiv">
  <label for="entriesUrl" class="inputLabels">URL of the new entries:</label>
  <input type="text" name="entriesTags" id="addEntriesTagsInput" placeholder="New entries tags..." autocomplete="off">
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
let entryTitleDto=""
let entryUsernameDto=""
let entryPasswordDto=""
let entryTagsDto=""
let entryNotesDto=""
let entryUrlDto=""
let expiresDto=false
let groupExpiryTimeDto=""
let targetGroupDirectionDto=targetDRKeys[dataIds]
addGroupExpChkbx.addEventListener('click',()=>{
  expiresDto=expiresDtoChange(expiresDto,addExpDiv,addGroupExpInput)
})

addGroupExpInput.addEventListener('change',()=>{
 let d=dataTimeToMilisec(addGroupExpInput)
 groupExpiryTimeDto=d
})

/*
TODO innen folytasd!

*/ 
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