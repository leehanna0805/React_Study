import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
//자식 컴포넌트
function Home() {
  return (

    <div>
      <h2>Home</h2>
      Home...
    </div>
  ); 
}
var contents = [
  { id:1, title:'HTML', description:'HTML is ...'},
  { id:2, title:'JavaScript', description:'JavaScript is ...'},
  { id:3, title:'React', description:'React is ...'},
]


function Topic(){
  //useParams() 사용
  var params = useParams(); 
  console.log('params',params);
  var topic_id = params.topic_id;
  var selected_topic = {
    title:'Sorry',
    description: 'Not Found'
  }

  for(var i=0; i<contents.length; i++){
    //Number(topic_id): topic_id를 정수로 변환
    if(contents[i].id === Number(topic_id)){
      selected_topic = contents[i];
      break;
    }
  }

  return (
    <div>
        <h2>{selected_topic.title}</h2>
          {selected_topic.description}
    </div>
  );
}



function Topics() {
  var list = [];
  for(var i=0;i<contents.length;i++){
    list.push(<li key={contents[i].id}><NavLink to={'/topics/'+contents[i].id}>{contents[i].title}</NavLink></li>);
  }
  return(
    <div>
      <h2>Topics</h2>
      <ul>
        {list}
      </ul>
      <Routes>
        <Route exact path="/topics/:topic_id" element={<Topic/>}></Route>
      </Routes>
    </div>
  );
}

function Contact() {
  return (
    <div>
        <h2>Contact</h2>
        Contact...
    </div>
  );
}

//부모 컴포넌트
function App() {
  const activeStyle = {
    color: 'tomato',
    text_decoration : 'none'
  };

  return (  
      <div>
        <h1>React Router DOM 예제</h1>
        <ul>
        <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
        <li><NavLink to="/topics" activeStyle={activeStyle}>Topics</NavLink></li>
        <li><NavLink to="/contact" activeStyle={activeStyle}>Contact</NavLink></li>
      </ul>

        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/topics" element={<Topics/>}></Route>
          <Route exact path="/contact" element={<Contact/>}></Route>
        </Routes>
      </div>
  );
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));