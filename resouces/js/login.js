let rName="duc"
let rPass="123"
$('.formLogin').on('submit',grantPermissionsLogin)
function grantPermissionsLogin()
{
    const name=document.getElementById("name").value
    const pass=document.getElementById("pass").value
    console.log(name+pass)
    const notiWrongLogin=document.getElementById("notiWrongLogin")
if(rName==name&& rPass==pass)
{
    notiWrongLogin.style.display="none"
    window.location.href="addStory.html"

}else{
    notiWrongLogin.style.display="block"

}


}
$(".coverLoader").hide()

document.querySelector(".formLogin").addEventListener("submit",(event)=>{
    event.preventDefault()
})