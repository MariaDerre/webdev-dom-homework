import { answerComment, comments, initLikeButton, replaceComments } from "./main.js";
import {token, postApi, fetchAndRenderComments} from "./api.js"
import { renderLoginComponent } from "../components/login-components.js";

const renderComments = () => {
  const appEl = document.querySelector('.app')
  if (!token) {
    renderLoginComponent({
    appEl, 
    setToken: (newToken) => {
    token = newToken;
  }})

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
  <div class="add-form">
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

  appEl.innerHTML = appHtml;
  
    //добавление комментария
    const addButton = document.querySelector('.add-form-button');
    
    addButton.addEventListener('click', () => {
    addButton.disabled = true;
    addButton.textContent = 'Комментарий добавляется';
    
      postApi().then(() => {
        return fetchAndRenderComments().then((responseData) => {
          replaceComments(responseData); // Передаём responseData в replaceComments
      
          renderComments(comments);
          })  
          .catch((error) => {
            console.error(error)
            throw new Error ('Кажется, у вас сломался интернет, попробуйте позже')
          })
        })
        renderComments();
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