import {renderComments} from './render.js'
import {fetchAndRenderComments} from "./api.js"

export let comments = [];
export function replaceComments(data){
  comments = data.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date().toLocaleString(),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
          };
  })}

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
.catch((error) => {
  console.error(error)
  throw new Error ('Кажется, у вас сломался интернет, попробуйте позже')
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

