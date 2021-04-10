import React, { Component } from 'react'
import styles from './storePage.module.css'
import shopsArray from "./shopsArray"
import MessageBox from '../components/MessageBox'



class storePage extends Component  
{

  constructor(props) 
  {
    super(props);
      this.state = 
      {
        userLat: null,
        userLong: null,
        values: [],
        directions: []
      };
  }

  
  componentDidMount(){
    this.getMyLocation();
    console.log("name",  this.props.location.state)
    
  }

  componentDidUpdate() {
    if(this.state.userLat && global.google && this.state.values.length === 0)
    {
      
      const shoppingStores = new global.google.maps.places.PlacesService(document.createElement('div')) 
      shoppingStores.nearbySearch
      (
        {
          location: new global.google.maps.LatLng(this.state.userLat, this.state.userLong),
          name: this.props.location.state,
          keyword: this.props.location.state,
          type: 'clothing_store',
          radius: 20000
          // openNow: true
        }, 
        (values) => {
          {this.setState({values})}
        }
      )
      shoppingStores.getDetails
      (
        {
          placeId : this.state.values.place_id
        },
        (directions) => {
          {this.setState({directions})}
        }
      )
    }
    // console.log("ffff", this.state.values.name);
    

  }
  




  getMyLocation() {
      const location = window.navigator && window.navigator.geolocation;
  
      if (location) {
        location.getCurrentPosition(
          (position) => {
            this.setState({
              userLat: position.coords.latitude,
              userLong: position.coords.longitude
            });
          },
        );
      }
    }

  
        
    render () 
    {

      // const { brand } = this.props.location.state;
      // console.log("brand name : ", brand);

      // console.log("Lat ", this.state.userLat);
      // console.log("Long ", this.state.userLong);
      console.log("values are= ", this.state.values);
      console.log("array issss: ", shopsArray);
      // console.log("latitude : ", this.state.directions);
      // console.log("branches : ", this.props.brandName);

      // const slotURL = null;

      function getDirections(addr) {
        window.open(`https://www.google.co.in/maps/search/`+ addr);
      }

      function stripAndClean(name) {
        let newName = name.toLowerCase();
        newName = newName.replace(/[&/,+()$~%.'":*?<>{} !]/g, '');
        return newName;
      }
        
     

      function getAirtable(name) 
      {
        name = stripAndClean(name);
        console.log("name: ", name);
        if(name === 'adidas') {
          window.open('https://airtable.com/embed/shrA8wWONCgok6Mie?','_blank');
        }

        else if(name === 'nike') {
          window.open('https://airtable.com/embed/shrgLpRouLnzrzHIQ?','_blank');
        }

        else if(name === 'veromoda') {
          window.open('https://airtable.com/embed/shrftv42WT8doeg6S?','_blank');
        }

        else if(name === 'marksspencer') {
          window.open('https://airtable.com/embed/shrbpUockrukgOB5W?','_blank');
        }

        else {
          const error = 'Error: 404 Not Found';
          <MessageBox>{error}</MessageBox>

        }
      }

      function getDirections(addr) {
        window.open(`https://www.google.co.in/maps/search/`+ addr);
      }

      // let filtertrial = [];

      // function filteringOut() {
      //   this.state.values.forEach(function (x) {
      //     if(x.vicinity == shopsArray.address)
      //     {
      //       filtertrial.push(x);
      //     }
      //   })
      // }



      function isShopInList(xyz) {
        let flag = false;
        shopsArray.forEach((shop) => {
          if(xyz.vicinity === shop.address){
            console.log("Address Matched");
            flag = true;
            
          }
        })
        return flag;
      }

      function isnameInList(abc) {
        let flag = false;
        shopsArray.forEach((shop) => {
          if(abc.name === shop.name){
            console.log("Name Matched");
            flag = true;
            
          }
        })
        return flag;
      }

      // let newList = this.state.values.filter(isShopInList);
      // console.log("NEWLIST", newList);


      let storesList = this.state.values && this.state.values && this.state.values
      .filter(isnameInList)
      .filter(isShopInList)
        .map(storeInfo=> {
          return (
            <div>
              <ul className={styles.storeDetailsCard}>
              <h2 className={styles.storeName}>{storeInfo.name}</h2>
              <br />
              <h3 className={styles.storeAddr}>{storeInfo.vicinity}</h3>
              <br />
              {/* <h3>{storeInfo.open_now}</h3> */}
              <div className={styles.buttonArea}>
              <button className={styles.slotButton} onClick={() => getAirtable(storeInfo.name)}>Book Slots</button>
              <button className={styles.directionButton} onClick={() => getDirections(storeInfo.vicinity)}>Get Directions</button>
              </div>
              </ul>
            </div>
          )
        })

    
      return (
        <div className={styles.storesDisplay}>
            <h1>Nearest stores listed according to your location: </h1>
            <br></br>
            <div className={styles.listDiv}>
              {storesList}
            </div>
        </div>
      )
    }
}

export default storePage;