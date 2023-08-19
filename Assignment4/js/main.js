//Get All HTML Elements
var signUpName = document.getElementById('name')
var signUpEmail = document.getElementById('signup-email')
var signUpPass = document.getElementById('signup-pass')
var signInEmail = document.getElementById('email')
var signInpass = document.getElementById('password')
var Alert = document.getElementById('alert')
var signedUsers = [] 

//local storage 
if(localStorage.getItem("userr") != null){
    signedUsers = JSON.parse(localStorage.getItem("userr"))
}

if (localStorage.getItem('loginUser') != null) {
    document.getElementById('username').innerHTML =  localStorage.getItem('loginUser')
}

//Sign up page
function signUp() {
    var user = {
            name: signUpName.value,
            email: signUpEmail.value,
            pass: signUpPass.value,
        }

    if(isEmpty(user)) {
        Alert.innerHTML= "All inputs is required"
        Alert.style.cssText = "display:block; color:red"
    }else if(signedUsers.length == 0){
        emailValidation(user, user.email)
    }else if(isFounded()){  
        Alert.innerHTML= "email already exists"
        Alert.style.cssText = "display:block; color:red"
    }else {
        emailValidation(user, user.email)
    }
}

//check if the inputs are empty
function isEmpty(user){
    if(user.name == "" || user.email == "" || user.pass == ""){
        return true
    }
}

//check if the email is exist
function isFounded(){
    for(var i = 0; i < signedUsers.length; i++){
        if(signedUsers[i].email.toLowerCase().includes(signUpEmail.value.toLowerCase())){
            return true
        }
    }
}

//check if the email is valid
function emailValidation(user , email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(email)){
        signedUsers.push(user)
        localStorage.setItem('userr', JSON.stringify(signedUsers))
        Alert.innerHTML= "Succes"
        Alert.style.cssText = "display:block; color:green"
        window.location.replace("signin.html")
    }else{
        Alert.innerHTML= "Not Valid Email"
        Alert.style.cssText = "display:block; color:red"
    }
    
}


// Login page 
function login(){
    if(isLoginEmpty()) {
        Alert.innerHTML= "All inputs is required"
        Alert.style.cssText = "display:block; color:red"
    }else if (check()){
        window.location.replace("welcome.html")
    }else {
        Alert.innerHTML= "incorrect password or email"
        Alert.style.cssText = "display:block; color:red"
    }

}

//check if the inputs are empty
function isLoginEmpty() {
    if (signInEmail.value == "" || signInpass.value == "") {
        return true
    }
}

function check(){
    var mail = signInEmail.value
    var password = signInpass.value
    for(var i = 0; i < signedUsers.length; i++){
        if(signedUsers[i].email.toLowerCase() == mail.toLowerCase()
        && signedUsers[i].pass.toLowerCase() == password.toLowerCase()){
            localStorage.setItem('loginUser', signedUsers[i].name)
            return true
        }
    }
}


// welocme page 
function logout(){
    localStorage.removeItem("loginUser")
    window.location.replace('signin.html')
}


