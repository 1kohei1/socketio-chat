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
            is_online: true,
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
            return Promise.resolve(response.data.user);
        } else {
            return Promise.reject(response.data.message);
        }
    })
};

api.onLogin = (user_id) => {
    return fetch(`/api/users/${user_id}/on_login`, {
        method: 'POST',
        headers: headers()
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            return Promise.resolve(response.data.user);
        } else {
            return Promise.reject(response.data.message);
        }
    })
}

api.getMessages = () => {
    return fetch('/api/messages')
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            return Promise.resolve(response.data.messages);
        } else {
            return Promise.reject(response.data.message);
        }
    })
}

api.newMessage = (user_id, val) => {
    const message = {
        sender: user_id,
        message: val,
        sent_at: new Date(),
        created_at: new Date()
    };

    return fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: headers()
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            return Promise.resolve();
        } else {
            return Promise.reject(response.data.message);
        }
    })
}

const headers = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
}
