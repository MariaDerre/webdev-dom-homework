import { renderComments } from "./render.js";
import { comments } from "./main.js";

const userName = document.querySelector('.add-form-name');
const userComment = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');

const fetchAndRenderComments = () => {
    fetch('https://wedev-api.sky.pro/api/v1/maria-derre/comments', 
    {
      method: 'GET'
    }).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 500){
        throw new Error ("Сервер сломался, попробуй позже");
      } else if(error instanceof TypeError || error.name === "NetworkError") {
        throw new Error ('Кажется, у вас сломался интернет, попробуйте позже')
      }
    })
    .then((responseData) =>{
          comments = responseData.comments.map((comment) => {
            return {
              name: comment.author.name,
              date: new Date().toLocaleString(), 
              text: comment.text,
              likes: comment.likes,
              isLiked: false,
            };
          })
          renderComments();
        })
    .catch((error) => {
      alert (error.message)
    })
    }

    const postApi = () => {
        fetch("https://wedev-api.sky.pro/api/v1/maria-derre/comments",
        {
          method: "POST",
          body: JSON.stringify({
              name: userName.value
                .replaceAll("<", '&lt')
                .replaceAll(">", '&gt'),
              text: userComment.value
                .replaceAll("<", '&lt')
                .replaceAll(">", '&gt'),
          })  
      })
      .then((response) => {
        return response;
      })
      .then((response) => { //хранится информация об ответе пост запроса
        if (response.status === 201) {
          return response.json()
        } else if (response.status === 400) {
          throw new Error("Имя и комментарий должны быть не короче 3 символов");
          newComment.style.display = 'block';
        }  else if (response.status === 500) {
          throw new Error ("Сервер сломался, попробуй позже");
          newComment.style.display = 'block';
        } else if (error instanceof TypeError || error.name === "NetworkError") {
          throw new Error ('Кажется, у вас сломался интернет, попробуйте позже')
        }
      }).then(() => {
          return fetchAndRenderComments();
      })
      .then(() => {
        addButton.disabled = false;
        addButton.textContent = 'Написать'
        userComment.value = '';
        userName.value = '';
      })
      .catch((error) => {
        addButton.disabled = false;
        addButton.textContent = 'Написать'
        alert (error.message)
        newComment.style.display = 'block';
      })
    }

    export {fetchAndRenderComments, postApi}
    