import { Remove, Add } from "@mui/icons-material";
import { Collapse, Divider, List, ListItemButton, ListItemText, ListSubheader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useContentList from "../hooks/useContentList";

const OlatcgContentList = ({
    title,
    items,
    paddingLeftItem
}) => {
    const [selectItem, reestartContentList] = useContentList();
    const [open, setOpen] = useState(false);

    useEffect(() => reestartContentList, []);

    const handleClick = (hasSubItem, itemIndex) => {
        if(hasSubItem){
            setOpen(!open);
        }

        selectItem(itemIndex);
    };

    return <>
        <List
            sx={{ width: '100%', bgcolor: 'secondary.light'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={title &&
                <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ backgroundColor: 'secondary.light', pt: 3, pb: 2 }}
                >
                    <Typography variant="h4">
                        {title}
                    </Typography>
                    <Divider sx={{pt: 2}}></Divider>
                </ListSubheader>
            }
        >
            {
                items.map((item, index) => {
                        if (!item.subItems || item.subItems.length === 0) {
                            return <ListItemButton key={index} sx={!title ? { pl: paddingLeftItem } : null} onClick={() => handleClick(false, index)}>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        }
                        return <div key={index}>
                            <ListItemButton onClick={() => handleClick(true, index)} sx={!title ? { pl: paddingLeftItem } : null}>
                                <ListItemText primary={item.label} />
                                {open ? <Remove /> : <Add />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <OlatcgContentList items={item.subItems} paddingLeftItem={!paddingLeftItem ? 4 : paddingLeftItem + 4} />
                            </Collapse>
                        </div>
                    }
                )
            }
        </List>
    </>
}

export default OlatcgContentList;