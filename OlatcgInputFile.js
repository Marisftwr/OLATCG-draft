import { FilePresent, Upload } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { getMessage } from "../services/MessageService";

const UploadFile = () => (<>
    <Upload sx={{fontSize: 80}}/>
    <Typography variant="h5">
        {getMessage('oltcgInputFile.label.upload')}
    </Typography>
</>);

const FileIconWithName = ({fileName}) => {
    return <>
        <FilePresent sx={{fontSize: 80}} />
        <Typography 
            variant="h6" 
            textAlign="center"
        >
            {fileName}
        </Typography>
    </>
}

const OlatcgInputFile = ({name, fileName, handleInputChange}) => {
    const [selectedFileName, selectFileName] = useState(fileName);

    const handleOlatcgInputFileChange = (event) => {
        selectFileName(event.target.files[0].name);
        handleInputChange?.(event);
    };

    return <Button
            variant="outlined"
            component="label"
            sx={{p: 2, border: '2px inset', borderColor: 'primary.light'}}
        >            
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                {!selectedFileName ? <UploadFile/> : <FileIconWithName fileName={selectedFileName} />}
            </Stack>
            <input
                name={name}
                onChange={handleOlatcgInputFileChange}
                type="file"
                hidden
            />
        </Button>
};

export { OlatcgInputFile };