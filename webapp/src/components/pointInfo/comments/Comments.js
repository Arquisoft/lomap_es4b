import React from "react";
import './Comments.css';
import {addComment} from "../../../helper/PodHelper";

const Comments = (params) => {
    let [comments, setComments] = React.useState(params.comments);
    const [comment, setComment] = React.useState('');

    const handleChange = (event)  => {
        setComment(event.target.value);
    }

    async function handleSubmit () {
        addComment(params.mapId, params.pointId,comment,params.session,params.webId).then((comment) => {
            if(comment == undefined){
                comment = {"author":"FAIL","comment":"FAIL","date":"FAIL"};
            }
            console.log(comment);
            const newList = comments.concat({author:comment.author, comment:comment.comment, date:comment.date});
            setComments(newList);
            params.updateComments(newList);
        }
    )
    }

    return (
        <>
            <div className='commentsList'>
                <ul className='comments'>
                    {comments.map(content => (
                        <li>{content.author} ({content.date}): {content.comment}</li>
                    ))}
                </ul>
                {comments.length == 0 &&
                    <p>Aún no hay comentarios en este punto.</p>
                }
            </div>
            <div className='submitCommentComponent'>
                <input type="text" className='submitComment' data-testid={"commentText"} placeholder="Introduce aqui tu comentario" value={comment} onChange={handleChange} required maxLength='100'/>
                <button className='button-17' onClick={handleSubmit} data-testid={"commentSubmit"} >Enviar comentario</button>
            </div>
        </>
    )
}

export default Comments;