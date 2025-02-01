import { loginUser, registerUser } from "../modules/api-login.js";

export let isLoginMode = true;
export function renderLoginComponent ({appEl, setToken, fetchAndRenderComments}) {

  const renderForm = () => {
    const appHtml = 
    `   
    <div class="container">   
      <div class="login-form">
          <div class="input-text">
              ${isLoginMode ? "" : `<input type="text" class="name-input" placeholder='Имя'/>`}
              <input type="text" class="login-input" placeholder='Логин'/>
              <input type="password" class="password-input" placeholder='Пароль'>
          </div>
          <div class="add-form-row">
            <button class="login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
          </div>
          <div class="register">
            <a class="toggle-button" href="#">${isLoginMode ? "Зарегистрироваться" : "Перейти к авторизации"}</a>
          </div>
      </div>`

    appEl.innerHTML = appHtml;

    document.querySelector('.login-button').addEventListener("click", () => {

      if(isLoginMode) {
        const login = document.querySelector('.login-input').value
        const password = document.querySelector('.password-input').value

        loginUser({
            login: login,
            password: password,
        })
        .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            return fetchAndRenderComments()
        }).catch((error) => {
          console.error(error); 
      });
      } else {
        const login = document.querySelector('.login-input').value
        const password = document.querySelector('.password-input').value
        const name = document.querySelector('.name-input').value;
        
        registerUser({
          login: login,
          password: password,
          name: name
      })
      .then((user) => {
          setToken(`Bearer ${user.user.token}`);
          return fetchAndRenderComments()
      }).catch((error) => {
        console.error(error); 
    });
      }
      })
    

  document.querySelector('.toggle-button').addEventListener("click", () =>{
    isLoginMode = !isLoginMode;
    renderForm();
  })
  }
renderForm()
}