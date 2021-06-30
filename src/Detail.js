import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';
import {stockcontext} from './App.js';

function Detail(props) {

    let [alert, alertchange] = useState(true);
    let [Inputdate, Inputdatechange] = useState('');
    let stock = useContext(stockcontext);

    useEffect( ()=>{

        let time = setTimeout( ()=>{ alertchange(false) }, 5000);
        return ()=>{ clearTimeout(time) }
    },[]);


    let { id } = useParams();
    let histroy = useHistory();
    let Finditem = props.shoes.find( (itmenumber)=>{
        return itmenumber.id == id
    });


    return(
        <div className="container">
            {Inputdate}
            <input onChange={ (e)=>{ Inputdatechange(e.target.value) }}/>


            {
                alert === true
                ? ( <div className="my-alert">
                        <p>재고가 얼마 남지 않았습니다.</p>
                    </div>)
                : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src='https://codingapple1.github.io/shop/shoes1.jpg' width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{Finditem.title}</h4>
                    <p>{ Finditem.content }</p>
                    <p>{ Finditem.price }원</p>
                    <button className="btn btn-danger">주문하기</button>
                    <button className="btn btn-danger" onClick={ ()=>{
                        histroy.push("/");
                    }} >뒤로가기</button>
                </div>
            </div>
        </div> 
    )
  }


  export default Detail;