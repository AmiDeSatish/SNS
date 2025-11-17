const btnLogin = document.querySelector(".js-btn-login")
const InputEmail = document.querySelector(".js-input-email")
const InputPassword = document.querySelector(".js-input-password")

function VerifData(){
  if(InputEmail.value.length < 6 || InputPassword.value.length < 6){return false}
  else if(InputEmail.value.includes("@") != true){return false}
  else{return true}
}

btnLogin.addEventListener("click", async() => {
  if(VerifData()){
    try{
      const response = await fetch("/api/auth/login", {
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({
          bEmail : InputEmail.value,
          bPassword : InputPassword.value
        }), 
        credentials :"include"
      })

      const data = await response.json()

      if(data.success){
        window.location.href ="/api/userSpace"
      }
      else{console.log("Success is not ok")}
      
    }
    catch(err){
      console.log("Error : cant send login data")
    }
  }
})