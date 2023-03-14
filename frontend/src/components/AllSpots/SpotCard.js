import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SpotCard({spot}) {
  return (
    <div>
    <Link to={`/spots/${spot.id}`}>
      <img src='https://catalog.obitel-minsk.com/blog/wp-content/uploads/2020/09/2XAsc9_5af0044faad471_82363956-tmb-720x411xfill.jpg'/>
      <p>{spot.name}</p>
    </Link>
    </div>
  )
}

export default SpotCard;
