import { userComment, userName } from "./main.js";

const newComment = document.querySelector('.comment');
const host = 'https://wedev-api.sky.pro/api/v2/maria-derre/comments'
export let token = "Bearer asb4c4boc86gasb4c4bokc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4"

const fetchAndRenderComments = () => {
    return fetch(host, 
    {
      method: 'GET',
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 500){
        throw new Error ("Сервер сломался, попробуй позже");
      } else if(error instanceof TypeError || error.name === "NetworkError") {
        throw new Error ('Кажется, у вас сломался интернет, попробуйте позже')
      } else if (response.status === 401) {
        throw new Error ('Нет авторизации')
      }
    })
  }

    const postApi = () => {
        return fetch(host,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
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
    