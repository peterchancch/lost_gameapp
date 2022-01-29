import { SportsEsports } from "@mui/icons-material";
import { Box, Button, Grid, SxProps, Typography } from "@mui/material";
import TitleImg from "./assets/pixel_title.png";

const bgSX: SxProps = {
    backgroundImage: `url('${TitleImg}')`,
    width: "100vw",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(20px) invert(100%)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.8
}

const titleSX: SxProps = {
    boxShadow: 5,
    backgroundImage: `url('${TitleImg}')`,
    backgroundSize: "cover"
}

const TitleScreen = (props: {onClickGameStart: ()=>void}) => {

    return <>
    <Box sx={bgSX}></Box>
    <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Grid item >
            <Box sx={titleSX} width={'40vh'} height={'40vh'}>
            </Box>
        </Grid>
        <Grid item sx={{marginTop: "10vh"}}>
            <Button onClick={()=>{props.onClickGameStart()}} color="success" variant="contained" size="large" endIcon={<SportsEsports fontSize={"large"}/>}>
                <Typography variant="h6">Game Start</Typography>
            </Button>
        </Grid>
    </Grid>
    </>
}

export default TitleScreen