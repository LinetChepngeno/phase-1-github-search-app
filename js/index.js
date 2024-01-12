document.addEventListener('DOMContentLoaded', function () {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    githubForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== '') {
            searchGitHub(searchTerm);
        }
    });

    function searchGitHub(query) {
        const userEndpoint = `https://api.github.com/search/users?q=${query}`;
        const repoEndpoint = `https://api.github.com/search/repositories?q=${query}`;

        fetch(userEndpoint, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => displayUsers(data.items))
        .catch(error => console.error('Error fetching users:', error));

        fetch(repoEndpoint, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => displayRepos(data.items))
        .catch(error => console.error('Error fetching repositories:', error));
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        reposList.innerHTML = '';

        users.forEach(user => {
            const userItem = createUserItem(user.login, user.avatar_url, user.html_url);
            userList.appendChild(userItem);
        });
    }

    function displayRepos(repos) {
        reposList.innerHTML = '';

        repos.forEach(repo => {
            const repoItem = createRepoItem(repo.full_name, repo.html_url);
            reposList.appendChild(repoItem);
        });
    }

    function createUserItem(username, avatarUrl, profileUrl) {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
            <img src="${avatarUrl}" alt="${username}'s avatar">
            <h3>${username}</h3>
            <a href="${profileUrl}" target="_blank">View Profile</a>
        `;
        return userItem;
    }

    function createRepoItem(repoName, repoUrl) {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
            <h3>${repoName}</h3>
            <a href="${repoUrl}" target="_blank">View Repository</a>
        `;
        return repoItem;
    }
});
