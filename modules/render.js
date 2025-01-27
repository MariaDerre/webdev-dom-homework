import { comments, initLikeButton, answerComment } from "./main.js";
import {token, postApi} from "./api.js"

const commentElement = document.querySelector('.comments');

const userName = document.querySelector('.add-form-name');
const userComment = document.querySelector('.add-form-text');

const renderComments = () => {
  const appEl = document.querySelector('.app')
  if (!token) {
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
  }

  let commentsHtml = comments.map((comment, index) => {
    return `<li class="comment" data-index="${index}">
    <div class="comment-header">
      <div class="comment-name">${comment.name}</div>
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
  `
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
          comments = responseData.comments.map(comment => {
            return {
              name: comment.author.name,
              date: new Date().toLocaleString(),
              text: comment.text,
              likes: comment.likes,
              isLiked: false,
            };
          })
            renderComments(comments);
          })  
          .catch((error) => {
            console.error(error)
            throw new Error ('Кажется, у вас сломался интернет, попробуйте позже')
          })
        })
        renderComments();
      });
 

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

    initLikeButton();
    answerComment();
  }

  export {renderComments, userComment, userName}

  