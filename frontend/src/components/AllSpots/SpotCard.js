import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import DeleteModal from '../ReviewModals/DeleteModal';
import OpenModalButton from '../OpenModalButton';
import './SpotCard.css'

function SpotCard({spot, reviewContext}) {

  return (
    <div>
    <Link to={`/spots/${spot.id}`}>
        <img
        data-tooltip-id="tooltip"
        data-tooltip-content={spot.name}
        height='250'
        width='300'
        src={spot.previewImage || 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'}/>
        <div
        className='cityRatingContainer'
        >
          <span>{spot.city}, {spot.state}</span>
          <span>&#9733;{spot.avgRating && Number(spot.avgRating).toFixed(1) || 'New'}</span>
        </div>
        <div>${spot.price}/night</div>
    </Link>
      {
        reviewContext == 'user' &&
        <Link to={`./${spot.id}/edit`}>
          <button>Update</button>
        </Link>
      }
      {
        reviewContext == 'user' &&
        <OpenModalButton
          buttonText='Delete'
          modalComponent={
          <DeleteModal
          spot={spot}
          reviewId={null}
          deleteContext='spot' />}
        />
      }
      <Tooltip id="tooltip" />
    </div>
  )
}

export default SpotCard;
