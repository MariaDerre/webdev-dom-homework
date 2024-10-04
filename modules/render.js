import { comments } from "./main.js";
import { initLikeButton } from "./main.js";
import { answerComment } from "./main.js"; 

const commentElement = document.querySelector('.comments');

const renderComments =  () => {
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
    
    commentElement.innerHTML = commentsHtml;
    initLikeButton();
    answerComment();
  }

  export {renderComments}