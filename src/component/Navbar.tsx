import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
      <>
        <Box sx={{ position: "fixed", top: 0, left: 0, width: 1, zIndex: 10 }}>
          <Box position="static" sx={{ bgcolor: "#263238", display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4, py: 1 }}>
            <Typography variant="h6" color="white" sx={{fontWeight: '900'}}>
              ZXC
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 4}}>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    <Typography sx={{fontWeight: '700'}} color="white">Home</Typography>
                </NavLink>
                <NavLink to="/view" style={{ textDecoration: "none" }}>
                    <Typography sx={{fontWeight: '700'}} color="white">View</Typography>
                </NavLink>
            </Box>
          </Box>
        </Box>
      </>
    );
}

export default Navbar;