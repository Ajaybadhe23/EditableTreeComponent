import React from 'react'
import { Link,useParams } from 'react-router-dom';

function Item() {
    const { id } = useParams()
  return (
    <div className="DeetailContainer">
      <Link to="/">GO Back</Link> <br /> <br />
      Item {id}
    </div>
  );
}

export default Item