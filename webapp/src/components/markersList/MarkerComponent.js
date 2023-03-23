

export function MarkerComponent(props) {
    return (
      <div className="sideComponent">
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <p>{props.lat}</p>
        <p>{props.lon}</p>
      </div>
    );
  }

export default MarkerComponent;