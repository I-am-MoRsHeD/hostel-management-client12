import { useLocation } from "react-router-dom";


const Scroll = () => {
    const {pathname} = useLocation();

    return (
        <div>
            {window.scroll(0, 0)}
        </div>
    );
};

export default Scroll;