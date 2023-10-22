import React ,{useState}from 'react'
import "./index.css"

export default function EmailItem(props) {
    const [desp,setDesp] = useState('')
    const {eachItem,itemTouched,val,toggleIsFavorite,clicked}=props
    const {id,fromName,fromEmail,date,subject,shortDescription,firstLetter,isFavourite}=eachItem
    const dateObj = new Date(date);
   
    const clickItem=async()=>{
        const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`)
      const statusCode = await response.statusCode
     
      const data = await response.json()
      console.log("Databody",data)
      setDesp(data.body)
      itemTouched(true,id)
      
    }

    const favouriteClicked=()=>{
        console.log("hitttt")
        toggleIsFavorite(id)
    }

// Now, you can format the date as needed (e.g., MM/DD/YYYY HH:MM:SS)
   const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
  return (
    <div className='display right'>
   
    <li  className={` ${val ? 'card-expanded' : 'container'}`}onClick={clickItem}>
      <div className='letter-div'>
        <h1 className='letter-style'>{firstLetter}</h1>
      </div>
      <div>
        <p className='element-margin'>From: {fromName}&lt;{fromEmail}&gt;</p>
        <p className='element-margin'>Subject:{subject}</p>
        <p className='element-margin'>{shortDescription}</p>
        <div className='display'>
        <p>{formattedDate}</p>
        {
            isFavourite&&<p className='favourite'>Favourite</p>
        }
        </div>
      </div>
    </li>
    
    {
        clicked&& 
        <div className='para'>
         <div className='bottom'>
            <div className="expanded-div">
             <div className='letter-div'>
        <h1 className='letter-style'>{firstLetter}</h1>
      </div>
      <div className='main-card'>
      <p className='element-margin'>Subject:{subject}</p>
      <p>{formattedDate}</p>
        </div> 
        <button className='fav-btn' onClick={favouriteClicked}>Mark as favourite</button> 
        </div>
      
        </div>
        <p>{desp}</p>
        </div>
    }
    </div>
  )
}
