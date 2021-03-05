const users = [
  { name: "supercode", secret: "no_one_will_know" },
  { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
  { name: "admin", secret: "1234" },
];

const hero = document.querySelector(".hero");
const modal = document.querySelector(".modal");
let user = document.querySelector("#user");
let password = document.querySelector("#password");
let subBtn = document.querySelector("#subm-btn");
let logOut = document.querySelector("#logout");
let note = document.querySelector("#note");
let welcome = document.querySelector("#welcome-name");
let passwordCounter = 0;





// ========= Cookie Abfrage ===========

let cpassword = getCookie("password");
let cUser = getCookie("username");


if (cpassword == "wrong"){
  modal.querySelector("h1").innerText = "Login zur Zeit nicht möglich";
  user.classList.add("notVisible");
  password.classList.add("notVisible");
  subBtn.classList.add("notVisible");
  hero.classList.add("filterOn");
}

if (cUser != ""){
  modal.classList.add("notVisible");
  welcome.innerHTML = `Welcome , ${cUser}`;
  hero.classList.remove("filterOn");
}
else{
  hero.classList.add("filterOn");
}



// ============== LogIN ===================

subBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  let userVal = user.value.toLowerCase();
   
  const userDates = users.find(item => item.name === userVal);
  
  
  if (userDates){
    const userName = userDates.name;
    const userPassword = Object.values(userDates).includes(password.value);
    passwordCounter++;

    if (userPassword){
    setCookie("username", userName, 365);
    welcome.innerHTML = `Welcome , ${userName}`;
    modal.style.visibility = "hidden";
    hero.style.filter = "none";

    } else{
      if(passwordCounter < 3){
      password.style.color = "red";
      password.value = "falsches Passwort";
      
    } else{
      user.disabled = true;
      password.disabled = true;
      subBtn.disabled = true;
      note.innerText = "3 mal falsches Passwort eingegeben";
      setCookie("password", "wrong", 0.000116);
    }
    }

  } else{
    user.style.color = "red";
    user.value = "BN nicht vergeben";
    password.value = "";
  }

});


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(name){
  document.cookie = name + "=0; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
}

// ========== LogOut ===================

logOut.addEventListener("click",() => {
  deleteCookie("username");
  location.reload();
})