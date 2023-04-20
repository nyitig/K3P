const inputs=document.querySelectorAll('.inputs')
const inputLabels=document.querySelectorAll('.inputLabels')
let loginDataArr=["",""]
let checkOk=true

function inputsFocus(ind) {
    inputs[ind].placeholder=""
    inputLabels[ind].classList.toggle('active')
    return
}

function inputsBlur(ind) {
    if (ind==0) {
        inputLabels[ind].classList.toggle('active')
        setTimeout(() => {
            inputs[ind].placeholder="Email address"
        }, 300);
    }
    if (ind==1) {
        inputLabels[ind].classList.toggle('active')
        setTimeout(() => {
            inputs[ind].placeholder="Password"
        }, 300);
    }
}

inputs.forEach((val,ind) =>{
    inputs[ind].addEventListener('focus',()=>{inputsFocus(ind)})
    inputs[ind].addEventListener("blur",()=>{ inputsBlur(ind)})
    inputs[ind].addEventListener('keyup' ,()=>{loginDataArr[ind]=inputs[ind].value} )
})

// login...

const loginBtn=document.getElementById('loginBtn')

function inputsCheck() {
    loginDataArr.forEach((val,ind) =>{
        if (loginDataArr[ind]=="") {
            checkOk=false
            if (ind==1) {
                inputs[ind].type="text"
            }
            inputs[ind].classList.add('redColor')
            inputs[ind].value="The field cannot be empty!"
            setTimeout(() => {
                inputs[ind].value=""
                inputs[ind].classList.remove('redColor')
                if (ind==1) {
                    inputs[ind].type="password"
                }
            }, 2000);

        }
    })
    if (checkOk) {
        createLoginData()
    }
    return
}

function createLoginData() {
     const url="http://127.0.0.1:9933/api/jwt-login"
    const user = {
        "emailDto" : `${loginDataArr[0]}`,
        "passwordDto": `${loginDataArr[1]}`
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let statusNetwork=navigator.onLine ? "Online":"OFFline"
    if (statusNetwork=="Online") {
        sendDatas(url, options)
        .then(results =>{
            if (checkOk) {
                let keyName="user"
                resultsCheck(results,keyName)
                .then(results=>{getKdbxJsonStart()})
            } 
            if (!checkOk) {
                const welcomme=document.getElementById('welcomme')
                welcomme.innerHTML=results
                welcomme.classList.add('active')
                setTimeout(() => {
                    welcomme.classList.remove('active')
                    welcomme.innerHTML=""
                }, 2000);
            }
            }
        )
    }

}
async function sendDatas(url, options) {
    try {
         const response= await fetch(url,options)
    return response.json()
    } catch (error) {
        let errorText="Error: "+error
        checkOk=false
        return errorText
    }
   
}
async function resultsCheck(results,keyName) {
    checkOk=false
    // innen folytasd!
    if (results.status==undefined) {
        // Innen folytasd!
        sessionStorage.setItem(keyName,JSON.stringify(results))
        checkOk=true
        return 
    }
    if (results.status!=undefined) {
        if (results.status==401) {
            wrongDatas()
            return 
        }
        if (results.status==404) {
            // ideiglenesen kiszedve, h ne kelljen állandóan bejelentkeznem
            // createkdbxObj()
            checkOk=true
            return  
        }
    }
}

function getKdbxJsonStart() {
     const url="http://127.0.0.1:9933/api/kdbx/1/groups/get-top-group"
    const userLoginDatas=JSON.parse(sessionStorage.user)
    const jwtToken=userLoginDatas.jwtToken
    // Ez vszínű nem kell majd az új verziónál
    const user={
        "kdbxFilePwDto": "1"
    }
    const options= {
        method:'POST',
         body:JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
          },
    }
    sendDatas(url,options)
    .then(results =>{
        let keyName="kdbx"
        resultsCheck(results,keyName)
    })
    .then(results=>{
        checkOk== true ? loadDashboard() : console.log("Nincs kdbx fájl")
    })
}

function loadDashboard() {
    let usersData=JSON.parse(sessionStorage.user)
    let welcommeTemplate=`
    Welcome  ${usersData.firstName} ${usersData.lastName}! <br>The dashboard will load shortly. Please be patient!
    `
    const welcomme=document.getElementById('welcomme')
    welcomme.innerHTML=welcommeTemplate
    welcomme.classList.add('active')
     setTimeout(() => {
         window.location.assign("../dashboard/dashboard.html")
     }, 2000);
 }

function wrongDatas() {
    inputs[0].classList.add('redColor')
    inputs[0].value="Wrong e-mail or password!"
    setTimeout(() => {
        inputs[0].value=""
        inputs[0].classList.remove('redColor')
    }, 2000);
    return
}

function createkdbxObj() {
    sessionStorage.setItem("kdbx",JSON.stringify("[]"))
}

loginBtn.addEventListener('click', inputsCheck)