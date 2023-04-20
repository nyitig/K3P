const inputs=document.querySelectorAll('.inputs')
const inputLabels=document.querySelectorAll('.inputLabels')
inputs.forEach((val,ind) =>{
    inputs[ind].addEventListener('focus',()=>{
        inputs[ind].placeholder=""
        inputLabels[ind].classList.toggle('active')
    })
    inputs[ind].addEventListener("blur",()=>{
        switch (ind) {
            case 0:
                inputLabels[ind].classList.toggle('active')
                setTimeout(() => {
                    inputs[ind].placeholder="First name"
                }, 300);
                break;
            case 1:
                inputLabels[ind].classList.toggle('active')
                setTimeout(() => {
                    inputs[ind].placeholder="Last name"
                }, 300);
            break;    
            case 2:
                inputLabels[ind].classList.toggle('active')
                setTimeout(() => {
                    inputs[ind].placeholder="Email address"
                }, 300);
                
                break;
            case 3:
            case 4:
                inputLabels[ind].classList.toggle('active')
                setTimeout(() => {
                    inputs[ind].placeholder="Password"
                }, 300);
            break;    
                
            default:
                break;
        }

    })
})

// register btn click
let dataArr=["","","","",""]
let textOk=true

function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     let pass=res.test(String(email).toLowerCase());
     if (!pass) {
        textOk=false
     }
  }

function wrongEmail() {
    inputs[2].classList.add('redColor')
    inputs[2].value="Wrond E-mail address!"
    setTimeout(() => {
        inputs[2].classList.remove('redColor')
        inputs[2].value=""
    }, 2000);
    return
}
function differentPasswords() {
    textOk=false
    inputs[3].classList.add('redColor')
    inputs[4].classList.add('redColor')
    inputs[3].type="text"
    inputs[4].type="text"
    inputs[3].value="The password does not match!"
    inputs[4].value="The password does not match!"
    setTimeout(() => {
        inputs[3].classList.remove('redColor')
        inputs[4].classList.remove('redColor')
        inputs[3].value=""
        inputs[4].value=""
        inputs[3].type="password"
        inputs[4].type="password"
    }, 2000);
    return
}

async function registerSendData() {
    console.log("async registerSendData fut")
     const url='http://127.0.0.1:9933/api/account'
     let userData={
     "firstNameDto": `${dataArr[0]}`,
     "lastNameDto": `${dataArr[1]}`,
     "emailDto": `${dataArr[2]}`,
     "passwordDto": `${dataArr[3]}`
  }

    const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch(url,options);
    return response.json()
}

function inputValueCheck () {
    const lPmessage=document.getElementById('lPmessage')
    if (lPmessage.classList.contains('active')) {
        lPmessage.classList.remove('active')
    }
    textOk=true
    inputs.forEach((val,ind)=> {
            dataArr[ind]=inputs[ind].value 
        })
    // checking...
    // Are the fields empty?
    dataArr.forEach((val,ind) => {
        if (dataArr[ind]=="") {
            textOk=false
            if (ind==3 || ind==4) {
                inputs[ind].type="text"
            }
            inputs[ind].classList.add('redColor')
            inputs[ind].value="The field cannot be empty!"
            setTimeout(() => {
                if (ind==3 || ind==4) {
                    inputs[ind].type="password"
                }
                inputs[ind].classList.remove('redColor')
                inputs[ind].value=""
            }, 2000);
        }
    })
    if (!textOk) {
        return
    }
    // Is the e-mail valid?
    const emailvalue=dataArr[2]
    validateEmail(emailvalue)
    if (!textOk) {
        wrongEmail()
        return
    }
    // Do the passwords match?
     if (dataArr[3]!=dataArr[4]) {
         differentPasswords()
         return
     }
    registerSendData()
    .then(res => {
        if (res==true) {
            registOk()
        }
        if (res!=true) {
            if (res.status==500) {
                wrongEmail()
            }
        }
    }
    )
}

function registOk() {
    const lPmessage=document.getElementById('lPmessage')
    lPmessage.classList.add('active')
    setTimeout(() => {
        window.location.assign("../login/login.html")
    }, 5000);
    
}

const registerBtn=document.getElementById('registerBtn')
registerBtn.addEventListener('click',inputValueCheck)
// ha hibára fut, akkor is továbblép!