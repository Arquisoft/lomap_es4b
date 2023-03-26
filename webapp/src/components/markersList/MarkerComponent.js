import imagen from '../../images/default-icon.png';

export function MarkerComponent(props) {
    return (
      <div className="markerComponent">
        {/* <div className="componentInfo"> */}
        <header className='pointHeader'>
          <p className='name'>{props.name} </p>
          <p className='category'>({props.category})</p>
        </header>
          <div className="descriptionAndImage">
            <img src={imagen} alt="Imagen del punto"/>
            <p>{props.description}</p>
          </div>
          <div className="coordinates">
            <p>{props.lat}, {props.lon}</p>
          </div>
        {/* </div> */}
      </div>
    );
  }

export default MarkerComponent;