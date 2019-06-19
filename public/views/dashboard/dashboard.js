window.onload=function(){

	const params = new Map(document.location.search.slice(1).split('&').map(kv => kv.split('=')));
	const email=params.get('email');
	var prev=new Array(10000).fill('');

var linote=document.getElementsByClassName('note');
var i=0;
for(;i<linote.length;i++)
	linote[i].addEventListener('click',function(){
		linote[i].contentEditable='true';
		prev[i]=linote[i].textContent;
		linote[i].setAttribute('name',i);
	});

	var delbtns=document.getElementsByClassName('deletenote');
	for(let i=0;i<delbtns.length;i++)
		delbtns[i].addEventListener('click',function(){
			var deldata=this.parentElement.note.textContent;

			var xhr = new XMLHttpRequest();
			xhr.open("POST", '/users/delete', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify({
					email:email,
			    deldata:deldata
			}));

		});

		var savebtns=document.getElementsByClassName('savenote');
		for(let i=0;i<savebtns.length;i++)
		{
			savebtns[i].addEventListener('click',function(){
				var xhr = new XMLHttpRequest();
				xhr.open("POST", '/users/update', true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify({
						email:email,
				    find:prev[i],
						data:savebtns[i].parentNode.querySelector('.note').textContent
				}));
				prev='';
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
			prev[i]=li.textContent;
			li.setAttribute('name',i);
			i++;
		});
		save.addEventListener('click',function(){
				var xhr = new XMLHttpRequest();
				xhr.open("POST", '/users/update', true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify({
						email:email,
				    find:prev[parseInt(save.parentNode.querySelector('.note').getAttribute('name'))],
						data:save.parentNode.querySelector('.note').textContent
				}));
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
		});

		document.getElementById('notesarea').prepend(div);
});

};
