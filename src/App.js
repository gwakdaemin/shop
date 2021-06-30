import { Navbar, Container, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';
import {Link, Route, Switch} from 'react-router-dom';

export let stockcontext = React.createContext();

function App() {

  let [shoes, shoeschange] = useState(Data);
  let [stock, stockchange] = useState([10,11,12]);




  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Damon-ShoesShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/Detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    <Switch>

      <Route exact path="/">
        <Jumbotron className="background">
          <h1>70% Season Off</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>

        <div className="container">

          <stockcontext.Provider value={stock}>

            <div className="row">
              {
                shoes.map( (a,i)=>{
                  return( <Card shoes={ shoes[i] } i={i} key={i} />
                    )
                })
              }
            </div>

          </stockcontext.Provider>

          <button className="btn btn-danger" onClick={()=>{

            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              console.log(result.data);
              shoeschange([...shoes, ...result.data]);
            })
            .catch( ()=>{
              console.log('실패')
            })

          }}>더보기</button>
        </div>

      </Route>

      <Route exact path="/detail/">

      <stockcontext.Provider value={stock}>
        <Detail shoes={shoes} />
      </stockcontext.Provider>
      
      </Route>
    
    </Switch>

    </div>
  );
}


function Card(props) {

  let stock = useContext(stockcontext);


  return(
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + ( props.i + 1 ) + '.jpg' } width="100%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
      <Text></Text>
      <p>재고 : {stock[props.i]}</p>
    </div>
  )
}

function Text(){
  let stock = useContext(stockcontext);
  return <p>재고 : {stock[0]}</p>
}



export default App;
