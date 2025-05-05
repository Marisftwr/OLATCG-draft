import { Alert, Snackbar } from "@mui/material"

export default function OlatcgSnackbar({
    isOpened,
    onClose,
    status,
    msg
}){
    status = !status ? 'error' : status;
    return (
        <>
            <Snackbar open={isOpened} autoHideDuration={4000} onClose={() => onClose?.()}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity={status} onClose={() => onClose()} 
                    sx={{ backgroundColor: status + '.main', color: 'white', mt: 5.5 }}>
                        {msg}
                </Alert>
            </Snackbar>
        </>
    )
}