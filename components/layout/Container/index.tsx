import { 
  Box,
  Container as MuiContainer,
  Grid
} from "@material-ui/core"

interface ContainerProps {
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
  align?: 'center' | 'default'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  align = 'default',
}) => (
  <MuiContainer>
    <Box
      {
        ...(align === "center" 
          ? {
            display: 'flex',
            height: '100vh',
            alignItems: 'center'
          } 
          : {})
      }
    >
      <Grid container>
        {align === 'center' && <Grid item xs={1} sm={2} md={3}></Grid>}
        <Grid
          item
          xs={align === 'center' ? 10 : 12}
          sm={align === 'center' ? 8 : 12}
          md={align === 'center' ? 6 : 12}
        >
          {children}
        </Grid>
        {align === 'center' && <Grid item xs={1} sm={2} md={3}></Grid>}
      </Grid>
    </Box>
  </MuiContainer>
)
