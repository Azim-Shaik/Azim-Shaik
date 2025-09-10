import React, { useEffect, useState } from 'react';
import './Restaurent.css'
const CardComponent = (props) => {
    const [count, setCount] = useState(0);
    const [addCart , setAddCart] = useState(false);

        const handleAddToCart = () =>{
            console.log()
                setAddCart(true);
                const newCountVal = count+1
                setCount(newCountVal);
                props.updateCounter(1);
                props.onHandleAddToCart({name:props.name,price:props.price,id:props.id},1);
        }
        const Increment = ()=> {
            const newCount=count+1;
             setCount(newCount);
             props.updateCounter(1); 
             props.onHandleAddToCart({name:props.name,price:props.price,id:props.id},1);
        }
        const decrement = () =>{
            if (count != 0) {
                const newCount=count-1;
                 setCount(newCount);
                  props.updateCounter(-1)
                  props.onHandleAddToCart({name:props.name,price:props.price,id:props.id},-1);
            }

        }

        useEffect(() => {
            if (props.id === props.removeItemId) {
                setCount(0)
            }
        }, [props.removeItemId])
    
    return (
        <div className='card'>
            <img src={props.img} />
            {
                <div>
                    { addCart && count>0 ?
                    <div className="Quantbtn" style={{ backgroundColor: "hsl(14,86%,42%)", color: "white" }}>
                    
                        <div onClick={decrement}>  <button style={{backgroundColor: "hsl(14,86%,42%)" ,borderRadius:'11px',border:"1px solid white",cursor:'pointer',width:'22px',height:'21px',display:'flex',alignItems:'center'}}><svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z" /></svg></button> </div>
                    
                    {count}
                        <div onClick={Increment}> <button style={{backgroundColor: "hsl(14,86%,42%)" ,borderRadius:'11px',border:"1px solid white",cursor:'pointer',width:'22px',height:'21px',display:'flex',alignItems:'center'}}><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" /></svg></button> </div>
                    </div>
                    :
                    <div className="btn" style={{ backgroundColor: "white", color: "black",border:"1px solid black"}}>
                    {
                        <div onClick={handleAddToCart} style={{display:'flex',justifyContent:'space-around'}}><span style={{marginRight:'10px'}}> Add to Cart</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg> </div>
                    }
                    </div>
                
                }

</div>

            }

            <p style={{ color: "grey", fontSize: "11px" }}>{props.category}</p>
            <p >{props.name}</p>
            <p style={{ color: "#FFA500" }}>${props.price}</p>
        </div>
        
    )
}
export default CardComponent;