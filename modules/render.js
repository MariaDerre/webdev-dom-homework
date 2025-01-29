import { answerComment, comments, initLikeButton, replaceComments } from "./main.js";
import {token, postApi, fetchAndRenderComments, setToken} from "./api.js"
import { renderLoginComponent } from "../components/login-components.js";

const renderComments = () => {
  const appEl = document.querySelector('.app')
  if (!token) {
    renderLoginComponent({
    appEl, 
    setToken,
    fetchAndRenderComments,
  })

  return;
}

  let commentsHtml = comments.map((comment, index) => {
    return `<li class="comment" data-index="${index}">
    <div class="comment-header">
      <div class="comment-name">${comment.user?.name ?? "Неизвестно"}</div>
      <div>${comment.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">${comment.text}</div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likes}</span>
        <button data-index='${index}' class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
      </div>
    </div>
  </li>`
  }).join('');
  

  const appHtml = 
  `<div class="container">
    ${commentsHtml}
  ${token ?
    `<div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>
    </div>`
    :
    `<div class = "form-loading" style="margin-top: 20px">
    Что бы добавить комментарий, <a href='#' id="go-to-login" href='#'>авторизуйтесь</a>
      </div> `
  }
  </div>`
  appEl.innerHTML = appHtml;
  
    //добавление комментария
    const addButton = document.querySelector('.add-form-button');
    
    addButton.addEventListener('click', () => {
    addButton.disabled = true;
    addButton.textContent = 'Комментарий добавляется';
    
      postApi().then(() => {
        return fetchAndRenderComments().then((responseData) => { //получаем обновленные комментарии
          replaceComments(responseData); // обновляем комментарии
          renderComments(responseData); // отображаем комментарии
          })  
          .catch((error) => {
            console.error(error)
            throw new Error ('Кажется, у вас сломался интернет, попробуйте позже')
          })
        })
      });
      
  const userName = document.querySelector('.add-form-name');
  const userComment = document.querySelector('.add-form-text');
  //валидация полей имя и комментарий
  function prov() {
    if (userName.value === '' && userComment.value === '') {
    addButton.disabled = true;
  }}
  prov();

  userComment.addEventListener('input', function () {
    if (userName.value === '' || userComment.value === '') {
      addButton.disabled = true;
    } else {
        addButton.disabled = false;
      }
  })
  userName.addEventListener('input', function () {
    if (userName.value === '' || userComment.value === '') {
      addButton.disabled = true;
    } else {
      addButton.disabled = false;
    };
  });

initLikeButton;
answerComment;

fetchAndRenderComments();
document.addEventListener('DOMContentLoaded', () => {
  renderComments();
});


    initLikeButton();
    answerComment();
  }

  export {renderComments}