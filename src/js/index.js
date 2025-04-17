// part to control the mouse movement attached to the different sections

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

// part that handle the color change of the letters in the h1 and h3 elements

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

// part that handle the color change of the letters on the nav links

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

// part contact button to ease the chevron animation

const button = document.querySelector('.chevron-button');
const track = document.querySelector('.chevron-track');
const svg = document.querySelector('.chevron-svg');
console.log('track:', track);
console.log('svg:', svg);
button.addEventListener('mouseenter', () => {
    track.classList.add('active');
  });

button.addEventListener('mouseleave', () => {
  const handleTransitionEnd = (e) => {
  if (e.propertyName === 'opacity') {
    track.classList.remove('active');
    svg.removeEventListener('transitionend', handleTransitionEnd);
  }
};
svg.addEventListener('transitionend', handleTransitionEnd);
});

//part animation of the of the text button 

const buttonText = document.querySelector('.button-text');
const text = buttonText.textContent;
buttonText.innerHTML = ''; // empty the content of the button text

text.split('').forEach((char, i) => {
const span = document.createElement('span');
span.classList.add('char');
span.textContent = char;
buttonText.appendChild(span);
});

