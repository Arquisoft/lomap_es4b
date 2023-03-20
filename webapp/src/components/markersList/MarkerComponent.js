

export function MarkerComponent(props) {
    return (
      <div>
        <h2>{props.name}</h2>
        <p>{props.key}</p>
        <p>{props.description}</p>
      </div>
    );
  }

export default MarkerComponent;