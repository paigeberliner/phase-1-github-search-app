let submit = document.querySelector('#github-form');

submit.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/users?=${event.target.children[0].value}`,{
        method: 'GET',
        headers: { 
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
    },
    })

    .then(res => res.json())
    .then (data => data.forEach(user => {
        let userList = document.querySelector('#user-list')
        let userCard = document.createElement("div")
        let userName = document.createElement("h4")

        userName.textContent = user.login

        userList.append(userCard)
        userCard.append(userName)

        userName.addEventListener('click',
         (event) => { 
            fetch(`https://api.github.com/users/${user.login}/repos`,{
                method: 'GET',
                headers: { 
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json"
                },
            })

            .then(res => res.json())
            .then (data => 
                data.forEach(repo => 
                {
                console.log(repo)
                let repoURL = document.createElement("p")
                repoURL.textContent = repo.name
                userCard.append(repoURL)
            }
            )
            )
        }
        )
})
    )
    })

