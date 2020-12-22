const loginForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
});