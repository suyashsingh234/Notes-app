const signup=document.getElementById('signup');
const login=document.getElementById('login');

const signupForm=document.getElementById('signupForm');
const loginForm=document.getElementById('loginForm');

loginForm.style.display='none';

const hidecolor='#f2efed';
const showcolor='#ffffff';
signup.style.backgroundColor=showcolor;
login.style.backgroundColor=hidecolor;


signup.addEventListener('click',()=>{
	signup.style.backgroundColor=showcolor;
	login.style.backgroundColor=hidecolor;

	loginForm.style.display='none';
	signupForm.style.display='block';

});

login.addEventListener('click',()=>{
	signup.style.backgroundColor=hidecolor;
	login.style.backgroundColor=showcolor;

	loginForm.style.display='block';
	signupForm.style.display='none';
});
