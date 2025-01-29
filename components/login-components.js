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
    }).then((user) => {
        console.log(user)
        setToken(`Bearer ${user.user.token}`);
        fetchAndRenderComments()
    })
  })
}