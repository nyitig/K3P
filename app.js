const fullPageSect=document.getElementById('fullPageSect')
const main=document.getElementById('main')
const logInBtn=document.getElementById('logInBtn')
function shadowAddHeader() {
    console.log("bejön ide?")

    const rect= main.getBoundingClientRect()
    // for (const key in rect) {
    //     if (typeof rect[key] !== 'function') {
    //         console.log(key+" : "+rect[key])
            
    //     }
    // }
    console.log(rect.y)
    // if (rect.y<77.39) {
    //     header.classList.add('active')
    // }
    // if (rect.y>77.39) {
    //     header.classList.remove('active')

    // }

}
