window.onload = function(){
  let active = 0;

  document.getElementById("active_student").addEventListener("click", active_student, False);
  document.getElementById("active_restaurant").addEventListener("click", active_restaurant, False);
  document.getElementById("Login_button").addEventListener("click", login, False);

  const active_student = function(){
    console.log("active_student")
    active = 1;
  }
  const active_restaurant = function(){
    console.log("restaurant_student")
    active = 2;
  }

  const login = async () => {
    console.log("Call login");
    const id = document.getElementById("id_input").value;
    const pwd = document.getElementById("pwd_input").value;

    let side = ""
    if(active == 0){
      console.log("didn't select the side");
    }else if(active == 1){
      side = "student"
    }else if(active == 2){
      side = "restaurant"
    }

    const response = await fetch('/' + side + '_login?id=' + id + "&password=" + pwd);
    const myjson = await response.json();
    console.log(myjson);
    console.log(myjson["Success"]);
  }
}
