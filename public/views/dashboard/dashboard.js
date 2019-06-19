window.onload=function(){

	const params = new Map(document.location.search.slice(1).split('&').map(kv => kv.split('=')));
	const email=params.get('email');

function update(){
var linote=document.getElementsByClassName('note');
for(let j=0;j<linote.length;j++)
	linote[j].addEventListener('click',function(){
		console.log(j);
		linote[j].contentEditable='true';
		linote[j].setAttribute('name',linote[j].textContent);
	});
}
update();

	var delbtns=document.getElementsByClassName('deletenote');
	for(let j=0;j<delbtns.length;j++)
		delbtns[j].addEventListener('click',function(){

			var deldata=this.parentNode.querySelector('.note').textContent;

			var xhr = new XMLHttpRequest();
			xhr.open("POST", '/users/delete', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify({
					email:email,
			    deldata:deldata
			}));

			document.getElementById('notesarea').removeChild(this.parentElement);
			update();

		});

		var savebtns=document.getElementsByClassName('savenote');
		for(let j=0;j<savebtns.length;j++)
		{
			savebtns[j].addEventListener('click',function(){
				var xhr = new XMLHttpRequest();
				xhr.open("POST", '/users/update', true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify({
						email:email,
				    find:savebtns[j].parentElement.querySelector('.note').getAttribute('name'),
						data:savebtns[j].parentElement.querySelector('.note').textContent
				}));
				savebtns[j].parentElement.querySelector('.note').setAttribute('name',savebtns[j].parentElement.querySelector('.note').textContent);
			});
		}



	document.getElementById('addnote').addEventListener('click',function(){
		var div=document.createElement('div');
		var li=document.createElement('li');
		li.classList.add('note');
		var del=document.createElement('button');
		del.textContent='delete';
		del.classList.add('deletenote');
		var save=document.createElement('button');
		save.classList.add('savenote');
		save.textContent='save';
		div.appendChild(li);
		div.appendChild(del);
		div.appendChild(save);
		li.addEventListener('click',function(){
			li.contentEditable='true';
			li.setAttribute('name',li.textContent);
		});
		save.addEventListener('click',function(){
				var xhr = new XMLHttpRequest();
				xhr.open("POST", '/users/update', true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify({
						email:email,
				    find:save.parentElement.querySelector('.note').getAttribute('name'),
						data:save.parentElement.querySelector('.note').textContent
				}));
				save.parentElement.querySelector('.note').setAttribute('name',savebtns.parentElement.querySelector('.note').textContent);
		});


		del.addEventListener('click',function(){
			var deldata=this.parentElement.textContent;
			var xhr = new XMLHttpRequest();
			xhr.open("POST", '/users/delete', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify({
					email:email,
			    deldata:deldata
			}));

			document.getElementById('notesarea').removeChild(this.parentElement);
			update();

		});

		document.getElementById('notesarea').prepend(div);
});

};
