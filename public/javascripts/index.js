window.addEventListener("DOMContentLoaded", (event)=>{
    const searchBar = document.querySelector('#search-bar');

    searchBar.addEventListener('submit', async(event) => {
        event.preventDefault();
        const term = document.querySelector('.search-input').value;
        const body = { term };
        try {
            const res = await fetch('/api/search', { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(body)
            });
            const foundQuestions = await res.json();

            let { questions } = foundQuestions;
            
            if (questions.length === 0) {
                main.innerHtml = `<p> No results found! </p>`
            } else {
                let questionsHTML = "ul";
                for (let question of questions) {
                    questionsHTML += `<a href="/questions/${question.id}/">
                        <div class="questionBox"> 
                            <li class="questionBox__content"> ${question.value} </li>
                        </div>
                    </a>`;
                }
            questionsHTML += `</ul>`;
            main.innerHTML = questionsHTML;
            }

            // foundQuestions.forEach((question) => {

            // });

        } catch(err) {
            console.error(err);
        }
    })
})