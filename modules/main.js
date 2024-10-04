"use strict";
import {fetchAndRenderComments, postApi} from "./api.js"
import {renderComments} from './render.js'

const userName = document.querySelector('.add-form-name');
const userComment = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');

  export let comments = [];

  export const initLikeButton = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (let likeButtonElement of likeButtonElements) {
      likeButtonElement.addEventListener('click', (event) => {
        const index = likeButtonElement.dataset.index;
        comments[index].isLiked = !comments[index].isLiked;
        if (comments[index].isLiked) {
          comments[index].likes++
        } else {
          comments[index].likes--
        }
        event.stopPropagation();
        renderComments();
      })
    }
  }
  
  //ответ на комментарий
  export const answerComment = () => {
  const boxOfComment = document.querySelectorAll('.comment');
  for (const commentEl of boxOfComment) {
    commentEl.addEventListener('click', () => {
      const index = commentEl .dataset.index;
      const textComment = document.querySelector('.add-form-text');
      textComment.value = `>>${comments[index].text}\n ${comments[index].name}, `;

      renderComments();
    })
  }
  }

  fetchAndRenderComments();
  renderComments()

  //добавление комментария
  addButton.addEventListener('click', () => {
    addButton.disabled = true;
    addButton.textContent = 'Комментарий добавляется';
    const newComment = document.querySelector('.comment');
    postApi();
    
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

    //дата
    const currentDate = new Date();
    const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit'};
    const formattedDate = currentDate.toLocaleDateString('ru-RU', optionsDate) + ' ' + currentDate.toLocaleTimeString('ru-RU', optionsTime);

    //лоудер
    window.addEventListener('load', function () {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    });