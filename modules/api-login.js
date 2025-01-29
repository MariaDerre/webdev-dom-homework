export function login({login, password}) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        })
    })
}