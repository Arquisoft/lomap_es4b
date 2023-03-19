
import {MarkerComponent} from './MarkerComponent';
import {getAllPoints} from '../../helper/PodHelper';
import { render } from '@testing-library/react';
import { Component } from 'react';

export default class MarkersList extends Component{

  constructor(props){
    super(props);
  }

  // renderPoints = async (session, webId) => {
  //   const points = await getAllPoints(session, webId);
  
  //   // this will re render the view with new data
  //   this.setState({
  //     Points: points
  //   });
  // };

  // // componentDidMount(){
  // //   this.renderPoints(this.props.session, this.props.webId);
  // // }

    const {session,webId} = props;


    const items = [
    ];
/* 
    getAllPoints(session,webId)
        .then((points) => 
        {
            puntos = points;
        }) */

    return (
      <div>
        {

        items.map((item) => (
            <MarkerComponent key={item.id} name={item.name} description={item.description} />
        ))
        
       /*  getAllPoints(session,webId)
        .then((points) => 
        {
            points.map((item) => (
                <MarkerComponent key={item.id} name={item.name} description={item.comment} />
              ))
        }) */

  //       }
  //     </div>
  //   );
  // }
}
