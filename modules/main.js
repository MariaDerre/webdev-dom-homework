import {renderComments} from './render.js'
import {fetchAndRenderComments} from "./api.js"
import { format } from "date-fns";

export let comments = [];
export function replaceComments(data){
  comments = data.comments.map((comment) => {
    const createDate = format(
      new Date(comment.date),
      "yyyy-MM-dd hh.mm.ss",)
          return {
            name: comment.author.name,
            date: createDate,
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
          };
  })}

//получение и отображение комментариев с апи
fetchAndRenderComments().then((responseData) => {
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
document.addEventListener('DOMContentLoaded', () => {
  renderComments();
});

//лоудер
window.addEventListener('load', function () {
let preloader = document.getElementById('preloader');
preloader.style.display = 'none';
});

