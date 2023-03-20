import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import * as spotActions from '../../store/spots';
import { reconstructFieldPath } from 'express-validator/src/select-fields';
import './index.css';

function SpotForm({context, spot}) {
  const dispatch = useDispatch();
  const [country, setCountry] = useState(context == 'update' ? spot.country : '');
  const [address, setAddress] = useState(context == 'update' ? spot.address : '');
  const [city, setCity] = useState(context == 'update' ? spot.city : '');
  const [state, setState] = useState(context == 'update' ? spot.state : '');
  const [description, setDescription] = useState(context == 'update' ? spot.description : '');
  const [name, setName] = useState(context == 'update' ? spot.name : '');
  const [price, setPrice] = useState(context == 'update' ? spot.price : 0);
  const [preview, setPreview] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleCreation = async (e) => {
    e.preventDefault();
    const images = [preview, image1, image2, image3, image4]
    for (let i = 0; i < images.length; i++) {
      if (!!images[i]) {
        let splitImg = images[i].split('.');
        if (!['png',  'jpg', 'jpeg'].includes(splitImg[splitImg.length - 1])) {
          return setErrors(['Image must end in .png, .jpg, or .jpeg']);
        }
      }
    }
      const newSpot = await dispatch(spotActions.createSpot({address, country, city, state, name, price, description}))
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
        })
        if (newSpot) {
        for (let i = 0; i < images.length ; i++) {
          if (images[i] != '') {
            await dispatch(spotActions.addSpotImage(newSpot.id, {
              url: images[i],
              preview: i == 0 ? 'true' : false
            }))
          }
        }
          history.push(`/spots/${newSpot.id}`)
        }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const updatedSpot = await dispatch(spotActions.updateSpot(spot.id, {address, country, city, state, name, price, description}))
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      })
      if (updatedSpot) history.push(`/spots/${spot.id}`)
  }

  return (
    <div>
      <form onSubmit={context === 'create' ? handleCreation : handleUpdate}>
      <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <h2
      className='firsth2'>
        Where's your place located?
      </h2>
      <p>Guests will only get your exact address once they booked a reservation.</p>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <label>
          Street Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
      <h2>Describe your place to guests</h2>
      <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea
          placeholder='Please Write at least 30 characters'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      <h2>Create a title for your spot</h2>
      <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <input
          placeholder='Name of your spot'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      <h2>Set a base price for your spot</h2>
      <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
        <label>
          $
          <input
          className='priceInput'
            placeholder='Price per night USD'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      { context === 'create' &&
      <>
      <h2>Liven up your spot with photos</h2>
      <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          className='imageInput'
          placeholder="Preview Image URL"
          type="text"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          required
        />
        <input
          className='imageInput'
          placeholder="Image URL"
          type="text"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
        />
        <input
          className='imageInput'
          placeholder="Image URL"
          type="text"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
        />
        <input
          className='imageInput'
          placeholder="Image URL"
          type="text"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
        />
        <input
          className='imageInput'
          placeholder="Image URL"
          type="text"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
        />
      </>
      }
      <div className='buttonDiv'>
        <button
        className='pinkButton'
        type='submit'>
        {context == 'update' ? 'Update ' : 'Create '}
          Spot
        </button>
      </div>
      </form>
    </div>
  )
}

export default SpotForm;
