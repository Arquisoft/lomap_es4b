import React from "react";
import Rating from '@mui/material/Rating';
import './Reviews.css';
import {Box} from "@mui/material";
import {labels} from './Labels';
import StarIcon from '@mui/icons-material/Star';
import {addScore} from "../../helper/PodHelper";
import {Button} from "@material-ui/core";

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const Reviews = (params) =>{
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    let average = 0;

    let [reviews, setReviews] = React.useState(params.reviews);
    for (let i = 0; i < params.reviews.length; i++) {
        average= +average + +params.reviews[i].score;
    }
    average = average / params.reviews.length;

    const handleSubmit= () => {
        addScore(1, params.pointId, value, params.session, params.webId).then((r) => {
            const newList = reviews.concat({author: r.author, score: r.score, date: r.date})
            setReviews(newList);
            console.log(newList);
            console.log(r);
            params.updateReviews(newList);
            }
        );
    }

    return (
        <>
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name="text-feedback"
                    value={average}
                    precision={0.5}
                    size="large" readOnly />
                <Box sx={{ ml: 2 }}>{labels[average]}</Box>
            </Box>
            <div className='reviewsList'>
                <ul className='reviews'>
                    {reviews.map(content => (
                        <li>{content.author}: <Rating
                            name="text-feedback"
                            value={content.score}
                            precision={0.5}
                            size="small" readOnly />  ({content.date})</li>
                    ))}
                </ul>
            </div>
            {reviews.length == 0 &&
                <p>Aún no hay reseñas de este punto.</p>
            }
            <div className='createReview'>
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
                <button className='button-17' onClick={handleSubmit}>Enviar reseña</button>
            </div>
        </>
    )
}

export default Reviews;