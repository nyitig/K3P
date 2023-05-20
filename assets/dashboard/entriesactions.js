checkKdbxObjectGroupName()

function checkKdbxObjectGroupName() {
  let kdbxObjName=JSON.parse(sessionStorage.kdbx)
if (kdbxObjName.name!=undefined) {
  entriesActionBtnActivated()
  // entriesAddContextMenu()
  return
}
}

function entriesActionBtnActivated() {
  addNewEntries()

  return
}

/* ENTRIES ACTIONS*/ 

// add new entries

function addNewEntries() {
  
}