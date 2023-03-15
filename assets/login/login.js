const inputs=document.querySelectorAll('.inputs')
const inputLabels=document.querySelectorAll('.inputLabels')
inputs.forEach((val,ind) =>{
    inputs[ind].addEventListener('focus',()=>{
        inputs[ind].placeholder=""
        inputLabels[ind].classList.toggle('active')
    })
    inputs[ind].addEventListener("blur",()=>{
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
    })
})