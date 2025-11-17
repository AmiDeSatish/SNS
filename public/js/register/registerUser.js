const btnRegister = document.querySelector(".js-btn-register")
const InputName = document.querySelector(".js-input-name")
const InputLastName = document.querySelector(".js-input-last-name")
const InputEmail = document.querySelector(".js-input-email")
const InputPassword = document.querySelector(".js-input-password")

function VerifData(){
  if(InputEmail.value.length < 6 || InputLastName.value.length < 6 || InputName.value.length < 6 || InputPassword.value.length < 6){return false}
  else if(InputEmail.value.includes("@") != true){return false}
  else{return true}
}

btnRegister.addEventListener("click", async() => {
  if(VerifData()){
    try{
      const response = await fetch("/api/auth/register", {
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({
          bName : InputName.value,
          bLastName : InputLastName.value,
          bEmail : InputEmail.value,
          bPassword : InputPassword.value
        }),
        credentials : "include" 
      })

      const data = await response.json()
      if(data.success){
        window.location.href = "/html/userSpace.html"
      }
      else(console.log("Success is not ok."))
    }
    catch(err){
      console.log("Error : Cant send user data to the server")
      console.error(err)
    }
  }else{console.log("Les données passées sont invalides")}
})