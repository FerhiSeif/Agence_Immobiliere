
import React, { Component } from "react";
import Pusher from 'pusher-js';
import "./chatbot.css"



const style ={
 
    backgroundColor: "#d6ad08"
}

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
       userMessage: '',
      conversation: [],
    };
  }
  componentDidMount() {
    const pusher = new Pusher('b09a0d95586f166ca27c', {
      cluster: 'eu',
      encrypted: true
      
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      const msg = {
        text: data.message,
        user: 'ai',
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    });
  }

  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: 'human',
    };

    this.setState({
      conversation: [...this.state.conversation, msg],
    });
    

    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.userMessage,
      }),
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
    this.setState({ userMessage: '' });
    console.log("chatbot")
  };

  render() {
     const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content" style={{borderRadius: "18px 18px 18px 0",
            animation: "Lmuha 0.3s ease forwards",
            webkitAnimation:" Lmuha 0.3s ease forwards"}}>{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );
    return (
      <div>
      <div className="page_content wrapper" />
        {/* Chat Button  */}
        <div className="chat_button" style={{marginBottom:"-79px"}}>
          <i className="fa fa-comment-alt" />
          <i className="fa fa-times" />
        </div>
        {/* Chat Form   */}
        <div className="chat_container" style={{marginBottom:"-101px"}}>
          <div className="chat_header">
            <div className="part-1">
              <i className="fa fa-angle-up" />
              <i className="fa fa-angle-down" />
            </div>
            <div className="part-2"> 
              <p className="header_info">Trouvez votre réponse rapidement</p>
            </div>
          </div>
          <div className="chat_content" id="chat_c">
            
            <div className="clearfix" />
            <div className="agent_chat chat_box">
              <p>Nous sommes heureux de vous aider, quel est votre problème?</p>
            </div>
            <div className="clearfix" />{chat}
           
          </div>
          <div className="chat_footer">
            <div className="composer">
            <form onSubmit={this.handleSubmit} style={{marginTop: "9px"}}>
              <input
                value={this.state.userMessage}
                onInput={this.handleChange}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your message and hit Enter to send"
              />
               <div className="chat_buttons">
              <i className="fas fa-caret-right" onSubmit={this.handleSubmit}/>
            </div>
            </form>
            </div>
          </div>
        </div>
    </div>

	



    );
  }
}

export default Chat;
