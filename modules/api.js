import { renderComments } from "./render.js";
import { userComment, userName, addButton } from "./main.js";

const newComment = document.querySelector('.comment');

const fetchAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/maria-derre/comments', 
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
  }

    const postApi = () => {
        return fetch("https://wedev-api.sky.pro/api/v1/maria-derre/comments",
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
    