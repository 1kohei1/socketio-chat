const api = {};

api.createUser = () => {
    return fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(response => {
        const randomUser = response.results[0];
        const user = {
            name: `${_.capitalize(randomUser.name.first)} ${_.capitalize(randomUser.name.last)}`,
            username: randomUser.login.username,
            thumbnail_url: randomUser.picture.thumbnail,
            logoff_at: null,
            created_at: new Date()
        };
        return fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: headers()
        });
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            return Promise.resolve(response.user);
        } else {
            return Promise.reject(response.message);
        }
    })
};

api.logonUser = (user) => {
    console.log('logonUser');
}

const headers = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
}