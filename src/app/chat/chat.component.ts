import { Component, OnInit } from '@angular/core';
import {ChatserviceService} from './chatservice.service';
var ws;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
getAllUsersforChat:any;
chatofUser:any;
getCurrent:any;
obj1;
in=0;
  constructor(private chatIns:ChatserviceService) { }

  ngOnInit() {
this.getusers();
console.log('usrna:',localStorage.getItem('username'));
  }
getusers()
{
  this.chatIns.getUserForChat().subscribe(chattU=>
    {
      this.getAllUsersforChat=chattU.detail;
      console.log('usersForChat:',this.getAllUsersforChat);
    });
}
getConnecttoSocket(id)
{
  console.log('socketId',id);
  ws=new WebSocket('wss://apis.dhaar.pk/chat/messages/'+id);
  ws.onopen=function(e)
      {
        console.log('readystate',ws.readyState);
        // console.log('Received Msg:',e.data);
      }
      ws.onclose=function(e)
      {
        console.log('WebSoket Closed due to Some Reason:',e);
      }
      ws.onmessage=function(e)
      {
        
          // console.log('message:',e);
          this.getCurrent=JSON.parse(e.data);
          console.log('message:',this.getCurrent);
          console.log('c1:',this.getCurrent.username);
          this.cusername=JSON.parse(localStorage.getItem('username'));
          console.log('c2:',this.cusername);
          if(this.getCurrent.username==this.cusername)
          {
            if(this.in==0){
              this.in=1
            }
            else
            {
              this.in=0;
            console.log('1')
            var ul = document.getElementById("msgUl");
            var li = document.createElement("li");
            // var children = ul.children.length + 1
            // li.setAttribute("id", "element"+children)
            // var style = document.createElement('style');
            // style.type = 'text/css';
            // document.getElementsByTagName('head')[0].appendChild(style);
            li.appendChild(document.createTextNode(this.getCurrent.message));
            ul.appendChild(li)
            // document.getElementById('li.setAttribute').innerText=this.getCurrent.message;
            }
          }
          else if(this.getCurrent.username!=this.cusername)
          {
            if(this.in==0){
              this.in=1
            }
            else
            {
              this.in=0;
            var ul = document.getElementById("msgUl");
            var li = document.createElement("li");
            // var children = ul.children.length + 1
            // li.setAttribute("id", "element"+children)
            li.appendChild(document.createTextNode(this.getCurrent.message));
            ul.appendChild(li)
            // document.getElementById().innerText=this.getCurrent.message;
            // document.getElementById('otherUserMsg').innerText=this.getCurrent.message;
            }
          }
          
        }


}
getChats(id)
{
  console.log('msgId',id);
  this.chatIns.getChatsofUsers(id).subscribe(chatO=>
    {
      this.chatofUser=chatO;
      console.log('messages:',this.chatofUser);
    });
}
sendMsg(msg)
  {
    this.obj1=
    {
      username:JSON.parse(localStorage.getItem('username')),
      message:msg
    };
    ws.send(JSON.stringify(this.obj1));
    // console.log(this.getCurrent);
    // this.getChats();
  }
}
