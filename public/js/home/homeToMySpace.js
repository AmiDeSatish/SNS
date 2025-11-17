let IsConnected = false
const logoAccount = document.getElementById("js-profil-logo")

if(!IsConnected){
  logoAccount.addEventListener("click", () => {
    window.location.href = "html/login.html"
  })
}