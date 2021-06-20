let mic = document.getElementById("mic");
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
var count=0;
var data={
    "contact_type":"virtual_agent", 
}
//here comes snow 
function createIncident(){
	 var url=window.location.href;
    var requestBody = "{\"u_caller_id\":\"6a826bf03710200044e0bfc8bcbe5de3\",\"u_short_description\":\"hello\",\"u_description\":\"big hello\",\"u_contact_type\":\"virtual_agent\"}"; 

var client=new XMLHttpRequest();
client.open("post","https://dev97439.service-now.com/api/now/import/u_create_incident_using_chatbot");
client.setRequestHeader('Access-Control-Allow-Origin',url);


client.setRequestHeader('Accept','application/json');
client.setRequestHeader('Content-Type','application/json');


client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'admin'));

client.onreadystatechange = function() { 
	if(this.readyState == this.DONE) {
		console.log("sss "+this.status + this.response); 
	}
}; 
client.send(requestBody);
}
function textenter(){
   
    var man_input=document.getElementById("myText").value;
    showusermsg(man_input)
    chatbotvoice(man_input);
    document.getElementById('myText').value = '';
}
function showusermsg(usermsg){
    let output = '';
    output += `<div class="chatarea-inner user">${usermsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

function showchatbotmsg(chatbotmsg){
    let output = '';
    output += `<div class="chatarea-inner chatbot">${chatbotmsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

function chatbotvoice(message){
    const speech = new SpeechSynthesisUtterance();
    if(count==0){
        data.s_d=message;
        count=1;
        speech.text="Can you please elabrate your issue";
    }
    else if(count==1){
        data.description=message;
        count=2;
        speech.text="for Whom you are requesting the Incident.(ie.Caller)";
    }
    else if(count==2){
        data.caller=message;
        count=3;
        speech.text="Please wait......";
        createIncident();

    }
    window.speechSynthesis.speak(speech);
    chatareamain.appendChild(showchatbotmsg(speech.text));
}

recognition.onresult=function(e){
    let resultIndex = e.resultIndex;
    let transcript = e.results[resultIndex][0].transcript;
    chatareamain.appendChild(showusermsg(transcript));
    chatbotvoice(transcript);
}
recognition.onend=function(){
    mic.style.background="#ff3b3b";
}
mic.addEventListener("click", function(){
    mic.style.background='#39c81f';
    recognition.start();
})
