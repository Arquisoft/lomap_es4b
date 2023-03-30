import imagen from '../../images/default-icon.png';

export function MarkerComponent(props) {

    // Llama a la funcion centerMapOnPoint de MapView
    const handleClick = () => {
        let latLng = [props.lat, props.lon];
        props.centerMap(latLng);
    };

    return (
      <div className="sideComponent">
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
          <div className="centerMapButton">
            <button onClick={handleClick}>Ver Punto en el Mapa</button>
          </div>
          {/* </div> */}
      </div>
    );
  }

export default MarkerComponent;