import { useEffect, useState } from "react";
import Image from "./assets/R.jpg";
import sendMessageIcon from'./assets/send-message.png';
import  socket  from "socket.io-client";
import './App.css';

const io = socket('http://localhost:4000');


function App() {
  const [name, setName] =useState('');
  const [email, setEmail] =useState('');
  const [fone, setFone] =useState('');
  const [joined, setJoined]=  useState(false);
  const [users, setUsers] = useState ([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  
useEffect(() =>{
    io.on("users", (users) => setUsers(users));
    io.on("message", (message) => setMessages((messages) => [...messages, message]));
    //io.on("connect", (socket) => console.log(socket.id));
  },[])

  const handleJoin = () => {  
    if (name){
      io.emit("join", name);
      setJoined(true) ;
    }
  }

  const handleMessage = () => {  
    if (message){
      io.emit("message",{message, name});
      setMessage("");
    }
  }

  if  (!joined){
    return(
      <div className='login-container'>
       <div className='bord-image'>
        <div className='login-content'>
          <h2 className="title-master">Comunicação Dev</h2>
          <div className='title-container'>
          <span className="title">Digite seu Nome</span>
          <input className="user-name-input" value={name} onChange={(e) => setName(e.target.value)}/>
          <span className="title">Digite seu Email</span>
          <input className="user-email-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <span className="title">Digite seu Telefone</span>
          <input className="user-fone-input" value={fone} onChange={(e) => setFone(e.target.value)}/>
          <button className=" join-button" onClick={() =>handleJoin()}>Entrar</button>
          </div>
          </div>
        </div>
      </div>
    )
  }

 return (
    <div className='container'>
       <div className='back-ground'></div>
       <div className='chat-container'>
      
        <div className='chat-contatcts'>
           <div className='chat-options'></div>
           <div className='chat-item'>
             <img src={Image} className = 'image-profile' alt=""/>
             
             <div className='title-chat-container'>
             <span className='title-message'>NetWorking Desenvolvedor Web</span>
             <span className='list-message'>Bom dia!</span>
          </div>
         </div>
        </div>

        <div className='chat-messages'>
          <div className='chat-options'>
            <div className='chat-item'>
                <img src={Image} className = 'image-profile' alt=""/>
                <div className='title-chat-container'>
                <span className='title-message'>NetWorking Desenvolvedor Web</span>
                <span className='list-message'>
                  {users.map((user, index) =>(
                    <span>{user.name}{index + 1 < users.length? ', ' : ''}</span>
                  ))}
                </span>
              </div>
            </div>
          </div>
          
          <div className='chat-messages-area'>
            {messages.map((message, index) => (
              <div className = {message.name === name? 'user-container-message right' : 'user-container-message left'}>
              <span 
                key={index}
                className={message.name === name? 'user-my-message': 'user-other-message'}
                
              >
              {message.name? `${message.name}: ` : ''}{message.message}
              </span> 
            </div>
            ))}
           
           </div>
 
           <div className='chat-input-area'> 
           <input 
            className='chat-input'
            placeholder='Mensagem'
            value={message}
            onChange={(e) =>setMessage(e.target.value)}
            />
           <img src={sendMessageIcon} alt="" className = 'send-message-icon' onClick={() => handleMessage()} />
           </div>
 
       </div>
     </div>
   </div>
   )
 }
     
   export default App;
                 
 
         
                
      
   
   
    
        
 


      

     
      
               
        





        

     

        
