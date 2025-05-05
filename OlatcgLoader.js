import { Backdrop } from "@mui/material";
import OlatcgDnaLoaderAnimatedImage from "./OlatcgDnaLoaderAnimatedImage";

const OlatcgLoader = ({show}) => (<>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}
    >
        <OlatcgDnaLoaderAnimatedImage />
    </Backdrop>
</>)

export default OlatcgLoader;