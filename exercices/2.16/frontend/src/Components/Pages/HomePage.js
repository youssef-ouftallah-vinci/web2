const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '<form> </form>';

  fetch('http://localhost:3000/questions')
    .then((response) => {
      if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      return response.json();
    })
    .then((questions) => {
      renderQuestion(questions);
    })
};


function renderQuestion(questions){
  const form = document.querySelector('form');
  // eslint-disable-next-line no-plusplus
  for(let i = 0; i < 3; i++){
    const index = randomInt(questions.length);
    form.innerHTML += `
    <h2> ${questions[index].question} </h2>
    `
    questions[index].answers.forEach(answer => {
      form.innerHTML+= `
      <div> 
        <label>${answer.text}</label>
        <input type="radio" id="answer1" name="answer"/>
      </div>`
    });
  }

  form.innerHTML+=`
   <button> Calculate my score </button>
  `
}

function randomInt(max){
  return Math.floor(Math.random()*max);
}

export default HomePage;
