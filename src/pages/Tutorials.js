import { Grid, Typography } from "@mui/material";
import OlatcgContentList from "../components/OlatcgContentList";
import { getMessage } from "../services/MessageService";
import { useSelector } from "react-redux";

const Tutorials = () => {
    const selectedItem = useSelector(state => state.selectedItemInContentList);

    const contentListItems = [
        { label: getMessage('tutorials.contentList.listItem.label.tutorials')}
    ]

    return <>
        <Grid sx={{height: '85vh'}} container spacing={0}>
            <Grid item xs={3} sx={{backgroundColor: 'orange', pb: 4}}>
                <OlatcgContentList 
                    title={getMessage('tutorials.contentList.label.title')} 
                    items={contentListItems}
                />
            </Grid>
            <Grid item xs={9} sx={{pl: 4, pt: 4}}>
                {
                    contentListItems.map((item, index) => {
                        if(selectedItem === index){
                            return <Typography variant="h3" key={index}>{item.label}</Typography>
                        }
                        return null;
                    })
                }
            </Grid>
        </Grid>
    </>
}

export default Tutorials;
