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

    document.querySelectorAll('.login-button').addEventListener("click", () => {
    setToken("Bearer asb4c4boc86gasb4c4bokc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4")
    fetchAndRenderComments()
  })
}