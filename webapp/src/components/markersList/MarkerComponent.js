import imagen from '../../images/default-icon.png';

export function MarkerComponent(props) {

    // Llama a la funcion centerMapOnPoint de MapView
    const handleClick = () => {
        let latLng = [props.lat, props.lon];
        props.centerMap(latLng, props.pointId);
    };

    return (
      <div className="sideComponentLocation">
        {/* <div className="componentInfo"> */}
        <header className='pointHeaderLocation'>
          <p className='nameLocation'>{props.name} </p>
          <p className='categoryLocation'>({props.category})</p>
        </header>
          <div className="descriptionAndImageLocation">
            <img src={imagen} alt="Imagen de la ubicación" data-testid={"Imagen del Punto."}/>
            <p>{props.description}</p>
          </div>
          <div className="coordinates">
            <p>{props.lat}, {props.lon}</p>
          </div>
          <div className="centerMapButton">
            <button data-testid="buttonMarkerComponent"onClick={handleClick}>
                Ver Punto en el Mapa
            </button>
          </div>
          {/* </div> */}
      </div>
    );
  }

export default MarkerComponent;