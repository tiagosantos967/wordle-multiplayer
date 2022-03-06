import { 
  Box,
  Container as MuiContainer
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
    {align == 'default' ? (
      children
    ) : (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {children}
      </Box>
    )}
  </MuiContainer>
)
