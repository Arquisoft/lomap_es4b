import React from "react";
import './Comments.css';
import {addComment} from "../../helper/PodHelper";

const Comments = (params) => {
    let [comments, setComments] = React.useState(params.comments);
    const [comment, setComment] = React.useState('');

    const handleChange = (event)  => {
        setComment(event.target.value);
    }

    const handleSubmit = () => {
        addComment(params.mapId, params.pointId,comment,params.session,params.webId).then((comment) => {
            console.log(comment);
            const newList = comments.concat({author:comment.author, comment:comment.comment, date:comment.date});
            setComments(newList);
            params.updateComments(newList);
        }
    )
    }

    return (
        <>
            <div className='reviewsList'>
                <ul className='reviews'>
                    {comments.map(content => (
                        <li>{content.author} ({content.date}): {content.comment}</li>
                    ))}
                </ul>
            </div>
            {comments.length == 0 &&
                <p>Aún no hay comentarios en este punto.</p>
            }
            <div className='submitComment'>
                <input type="text" className='submitComment' value={comment} onChange={handleChange} />
                <button className='button-17' onClick={handleSubmit} >Enviar comentario</button>
            </div>
        </>
    )
}

export default Comments;