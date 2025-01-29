export const host = 'https://wedev-api.sky.pro/api/v2/maria-derre/comments'
export let token = "Bearer asb4c4boc86gasb4c4bokc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4"
token = null;

export const setToken = (newToken) => {
  token = newToken
};

//запрос для получения комментариев
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
      } else if (response.status === 401) {
        throw new Error ('Нет авторизации')
      }
    }).catch((error) => {
      if (error instanceof TypeError || error.name === "NetworkError") {
          console.error('Кажется, у вас сломался интернет, попробуйте позже');
      } else {
          console.error(error.message);
      }
  });
  }

//запрос на сервер для добавления нового комментария
const postApi = () => {
  
const userName = document.querySelector('.add-form-name');
const userComment = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');
const newComment = document.querySelector('.comment');

    return fetch(host,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
      newComment.style.display = 'block';
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    }  else if (response.status === 500) {
      newComment.style.display = 'block';
      throw new Error ("Сервер сломался, попробуй позже");
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
    if (error instanceof TypeError || error.name === "NetworkError") {
      throw new Error ('Кажется, у вас сломался интернет, попробуйте позже')
    }
  })
}

export {fetchAndRenderComments, postApi}
    