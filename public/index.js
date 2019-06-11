document.getElementById('btnlogin').addEventListener('click',function(){
	document.getElementById('navlogin').click();
});

document.getElementById('navlogin').addEventListener('click',function(event){
	event.preventDefault();
	document.getElementById('auth').style.display='block';
	document.getElementById('login').style.display='none';
	document.getElementById('signup').style.display='block';
	var temp=document.querySelectorAll("body > div:not(#auth)");
	for(let i=0;i<temp.length;i++)
		temp[i].classList.add('blur');
});

document.getElementById('showreg').addEventListener('click',function(event){
	event.preventDefault();
	document.getElementById('login').style.display='none';
	document.getElementById('signup').style.display='block';
});

document.getElementById('showlogin').addEventListener('click',function(event){
	event.preventDefault();
	document.getElementById('signup').style.display='none';
	document.getElementById('login').style.display='block';
});
