import { Box, CircularProgress, circularProgressClasses, type CircularProgressProps } from "@mui/material"

interface Props{
    size: number
}

const CircularLoading = (props: CircularProgressProps) => {
    return (
        

            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: "#06612E",
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={props.size}
                    thickness={4}
                    {...props}
                />
            </Box>
        
    )
}

export default CircularLoading