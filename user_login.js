const login1 = document.querySelector("#login");
const logout1 = document.querySelector("#logout");
const enroll1 = document.querySelector("#enroll");

const s_id = "id";
const s_password = "password";
const s_name = "name";
const app_script_url = 'https://script.google.com/macros/s/AKfycbwQAu4RueUzz4L03Tfdk2iTurHEEFaSc_5bnn9Zb-4d6M3i0G_-JwroSdbFGGnVKoGbJA/exec'

login1.addEventListener("submit", login_event);
login1.querySelector("#enroll0").addEventListener("click", enroll_form_event);
logout1.addEventListener("button", logout_event);
enroll1.addEventListener("submit", enroll_event);

function login_event(event)
{
  event.preventDefault();
  const get_mode = event.submitter.id;

  if(get_mode === "submit0"){  

    const s_id0 = s_id + "0";
    const s_password0 = s_password + "0";
    const login_id = login1.querySelector("#" + s_id0);
    const login_password = login1.querySelector("#" + s_password0);
    const logout_content = logout1.querySelector("#content");

    console.dir(logout_content);

    localStorage.setItem(s_id0, login_id.value);
    localStorage.setItem(s_password0, login_password.value);
   
    fetch(app_script_url)
  .then(res => res.json())
  .then(res => {
    
    for (step = 0; step < res.items.length; step++){

      if(res.items[step].ID == login_id.value)
      {
        if(res.items[step].PASSWORD == login_password.value)
        {
          console.log(res.items[step].PASSWORD);
          console.log(res.items[step].NAME);
          logout_content.innerText = `안녕하세요 ${res.items[step].NAME}님`;
          login1.classList.add("hidden");
          logout1.classList.remove("hidden");
          logout1.classList.add("show");
          return; 
        }

        else
        {
          alert("id는 일치하나 패스워드가 다릅니다");
          console.dir(res.items[step].PASSWORD);
          console.dir(login_password.value);
          return;
        }
      }
    }

    alert("ID가 존재하지 않습니다");
  });
    //console.dir(res);
  }//submit0
}


function enroll_form_event(event)
{
  login1.classList.add("hidden");
  enroll1.classList.remove("hidden"); 
  enroll1.classList.add("login_normal"); 

  console.dir(logout1);
}

function enroll_event(event)
{
  
  event.preventDefault();
  const s_id1 = s_id + "1";
  const s_password1 = s_password + "1";
  const s_name1 = s_name + "1";
  
  const enroll_id = enroll1.querySelector("#" + s_id1);
  const enroll_password = enroll1.querySelector("#" + s_password1);
  const enroll_name = enroll1.querySelector("#" + s_name1);
  const enroll_content = logout1.querySelector("#content");


  postData(app_script_url, {"id": enroll_id.value, 'password': enroll_password.value, 'name': enroll_name.value}); 
  
  enroll1.classList.add("hidden");
  logout1.classList.remove("hidden");
  enroll_content.innerText = "회원가입 완료";
  logout1.classList.add("show");
  console.dir(enroll_content); 
}//submit0



function logout_event(event)
{
  event.preventDefault();
  localStorage.removeItem(s_id);
  localStorage.removeItem(s_password);
  logout1.classList.add("hidden");
  login1.classList.remove("hidden");
}



function postData(url = '', data = {}) {

  var options = {
    'method' : 'POST',
    'mode' : 'no-cors',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'body' : JSON.stringify(data)
  };

  return fetch(url, options);
}

