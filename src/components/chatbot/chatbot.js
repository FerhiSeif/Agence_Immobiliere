import ChatBot from "react-simple-chatbot";
import styled from "styled-components";
// import ReactDOM from "react-dom";
import { ThemeProvider } from 'styled-components';
import React, { Component } from "react";
import Pusher from 'pusher-js';
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#1f3e7f',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#1f3e7f',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
  marginRight: "40px",

};
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
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );
    return (
      <div className="Chat">
      <ThemeProvider theme={theme}>
        <ChatBot 
         floating="false"
         headerTitle= "chat"
         headerTitle="Speech Synthesis"
          speechSynthesis={{ enable: true, lang: "en" }}
          
          steps={[
            {
              id: "1",
              message: "What is your name?",
              trigger: "2"
            },
            {
              id: "2",
              user: true,
              trigger: "3"
            },
            {
              id: "3",
              message: "Hi {previousValue}, nice to meet you!",
              trigger: "4"
            },

            {
              id: "4",
              message: "Can I help you?",
              trigger: "5"
            },
            {
              id: "5",
              user: true,
              trigger: "6"
            },
            {
              id: "6",
              message: "bye",
              end: true
            }
          ]}
        />
       
        </ThemeProvider>
      </div>
    );
  }
}

export default Chat;
