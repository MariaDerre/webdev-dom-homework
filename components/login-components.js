import { login } from "../modules/api-login.js";


export function renderLoginComponent ({appEl, setToken, fetchAndRenderComments}) {
    const appHtml = 
    `   
    <div class="container">   
      <div class="login-form">
          <div class="input-text">
              <input type="text" class="login-input"/>
              <input type="password" class="password-input">
          </div>
          <div class="add-form-row">
            <button class="login-button">Войти</button>
          </div>
          <div class="register">
            <a class="link-login" href="#">Зарегистироваться</a>
          </div>
      </div>`

    appEl.innerHTML = appHtml;

    document.querySelector('.login-button').addEventListener("click", () => {

    login({
        login: 'admin',
        password: 'admin'
    }).then((response) => {
      if(response.status === 400){
        throw new Error("Такой логин и пароль  не существует")
      }
      if(response.status === 500){
        throw new Error("Сервер упал");
      }
      return response.json();
    }) 
    .then((user) => {
        setToken(user.user.token);
        console.log(user)
        fetchAndRenderComments()
    }).catch((error) => {
      console.error(error); 
  });
  })
}