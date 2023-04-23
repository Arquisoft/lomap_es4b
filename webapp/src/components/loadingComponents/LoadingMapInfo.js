import {ThreeDots} from "react-loader-spinner";
import './LoadingComponents.css';

export const LoadingMapInfo = () => {
    return (
        <div className="threeDotsLoadingItem">
            <ThreeDots
                height="20"
                width="20"
                radius="3"
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}