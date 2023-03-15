import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip'

function SpotCard({spot, reviewContext}) {
  return (
    <div>
    <Link to={`/spots/${spot.id}`}>
        <img
        data-tooltip-id="my-tooltip"
        data-tooltip-content={spot.name}
        height='250'
        width='400'
        src={spot.previewImage || 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'}/>
        <div>
          <span>{spot.city}, {spot.state}</span>
          <span>&#9733;{spot.avgRating || 'New'}</span>
        </div>
        <div>${spot.price}/night</div>
        {
           reviewContext == 'user' &&
          <button>Update</button>
        }
        {
          reviewContext == 'user' &&
         <button>Delete</button>
        }
      </Link>
      <Tooltip id="my-tooltip" />
    </div>
  )
}

export default SpotCard;
