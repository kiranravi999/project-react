
import React, { Component } from 'react'
import EmailItem from './components/emailitems';

export default class App extends Component {
 
  state={
    emails:[],
    isExpanded:false,
    id:null
  }
  componentDidMount(){
    this.getEmails()
  }

  toggleIsFavorite = id => {
    const {emails}=this.state
    const changedEmails=emails.map((item)=>{
      if (id === item.id) {
       
        return {...item, isFavourite: !item.isFavourite}
      }
      return item
    })
    this.setState({ emails:changedEmails})
  }
  
  itemTouched=(value,id)=>{
    this.setState({ isExpanded:value,id:id})

  }
    getEmails = async () => {
      const response = await fetch('https://flipkart-email-mock.now.sh/')
      const statusCode = await response.statusCode
      console.log(statusCode)
      const data = await response.json()
      console.log("Data",data)
      const formattedData = data.list.map(eachItem => ({
        id: eachItem.id,
        fromName: eachItem.from.name,
        fromEmail:eachItem.from.email,
        date:eachItem.date,
        subject:eachItem.subject,
        shortDescription: eachItem.short_description,
        firstLetter: eachItem.from.name[0],
        isFavourite:false,
      
      }))
      this.setState({ emails: formattedData })
    }
  

  render() {
    const {emails,isExpanded,id}=this.state
    return (
     
      <div className="list-container">
      <h1 className="title">Users List</h1>
      <ul>
        {
          emails.map((eachItem=><EmailItem val={isExpanded} clicked={id==eachItem.id}toggleIsFavorite={this.toggleIsFavorite} itemTouched={this.itemTouched} eachItem={eachItem} key={eachItem.id}/>))
        }
      </ul>
       
    </div>

    )
  }
}

