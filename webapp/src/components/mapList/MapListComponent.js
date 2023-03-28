import imagen from '../../images/default-icon.png';

export function MapListComponent(props) {
    return (
      <div className="sideComponent">
        {/* <div className="componentInfo"> */}
        <header className='pointHeader'>
          <p className='name'>{props.name} </p>
        </header>
        <div className="descriptionAndImage">
            <img src={imagen} alt="Imagen del mapa"/>
            <p>{props.description}</p>
          </div>
        {/* </div> */}
      </div>
    );
  }

export default MapListComponent;