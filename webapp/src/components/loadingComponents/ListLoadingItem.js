import {ThreeDots} from "react-loader-spinner";
import './LoadingComponents.css';

export const ListLoadingItem = () => {
    return (
        <div data-testid="listLoadingItem" className="threeDotsLoadingItem">
            <ThreeDots
            height="20"
            width="20"
            radius="3"
            color="white"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
        </div>

    )
}