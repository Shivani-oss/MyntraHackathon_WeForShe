import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function ShippingScreen() {

    const [userLat, setUserLat] = useState('')
    const [userLong, setUserLang] = useState('')

    useEffect(() => {
        const location = window.navigator && window.navigator.geolocation;
  
        if (location) {
          location.getCurrentPosition(
            (position) => {
                setUserLat(position.coords.latitude)
                setUserLang(position.coords.longitude)
            },
          )
        }
        console.log("userLat", userLat)
        console.log("userLong", userLong)
    }, [userLat, userLong]);

    return (
    <div className="shipping">
      <h1>Continue with your Shipping.....</h1>
      <h2>Thank you for Online Purhcase</h2>
      <div className="back-to-home">
            <Link to="/"><ul>Back to Home</ul></Link>
       </div>
    </div>
  )
}

export default ShippingScreen
