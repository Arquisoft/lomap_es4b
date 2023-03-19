
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

  // render() {
  //   this.renderPoints(this.props.session, this.props.webId);
  //   return (
    
  //     <div>
  //       {
  //         this.points.map((item) => (
  //           <MarkerComponent key={item.id} name={item.name} description={item.comment} />
  //         ))
        
        
  //       // .then((points) => 
  //       // {
  //       //     points.map((item) => (
  //       //         <MarkerComponent key={item.id} name={item.name} description={item.comment} />
  //       //       ))
  //       // })

  //       }
  //     </div>
  //   );
  // }
}
