let emptyElement = document.querySelector('.about .empty'); 
let titleElement = document.querySelector('.about .title'); 

let figureElements = document.querySelectorAll('.service figure');

window.addEventListener('mousemove', handleMouseMove); 

function handleMouseMove( event ) {
  emptyElement.style.flexBasis = event.clientX + 'px';
  titleElement.style.flexBasis = event.clientY / 2 + 'px';

  figureElements.forEach(function(element) {
      element.style.flexBasis = window.innerWidth - event.clientX + 'px';
  })
  
}


function makeSpans (selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    let text = element.innerText.split('');
    let spans = text.map(letter => {
      return `<span class="random-letter">${letter}</span>`;
    }).join('');
    element.innerHTML = spans;
  });
  const colors = ['var(--othergreen)', 'var(--othergrey)', 'var(--darkblue)', 'var(--lightblue)', 'var(--darkgreen)', 'var(--yellow)'];

  const letters = document.querySelectorAll('.random-letter');
  letters.forEach(letter => {
    letter.addEventListener('mouseover', () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      letter.style.color = randomColor;
    });

    letter.addEventListener('mouseout', () => {
      letter.style.color = '';
    });
  });
}
makeSpans('h1, h3');

const colors = ['var(--darkblue)', 'var(--lightblue)', 'var(--darkgreen)', 'var(--yellow)'];

document.querySelectorAll('a.color').forEach(link => {
  link.addEventListener('mouseover', () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    link.style.color = randomColor;
  });
  link.addEventListener('mouseout', () => {
    link.style.color = ''; // reset
  });
});
