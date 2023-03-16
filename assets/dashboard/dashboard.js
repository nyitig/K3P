const usersData=document.getElementById('usersData')
let usersDataObj=JSON.parse(sessionStorage.user)
let template=`
user first name: ${usersDataObj.firstName},
<br>
user last name: ${usersDataObj.lastName},
<br>
email: ${usersDataObj.email},
<br>
jwtToken: ${usersDataObj.jwtToken}
<br>
`
usersData.innerHTML=template