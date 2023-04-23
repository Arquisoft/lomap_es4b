import {RotatingSquare} from "react-loader-spinner";

export const SidebarLoadingItem = () => {
    return (
        <RotatingSquare
            className="sidebarLoadingItem"
            height="30"
            width="30"
            color="white"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
    />);
}