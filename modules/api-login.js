export let yourName = 'Аноним'

export function loginUser({login, password}) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        })
    }).then((response) => {
        if (response.status === 400) {
            throw new Error ("Неверный логин или пароль")
        }
        return response.json();
    }).then((responseData) => {
        yourName = responseData.user.name;
        console.log(yourName);
        return responseData;
    })
}

export function registerUser({login, password, name}) {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name
        })
    }).then((response) => {
        if (response.status === 400) {
            throw new Error ("Пользователь уже существует")
        }
        return response.json();
    })
}