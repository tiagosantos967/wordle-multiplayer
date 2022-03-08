import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: '1',
    lineHeight: '1em',
    border: '0.14em solid #4C4347',
    fontSize: '1em',
    fontWeight: 600,
    borderRadius: '4px',
    width: '1.3em',
    height: '1.3em',
    textTransform: 'uppercase'
  },
})

interface LetterBoxProps {
  children?: string;
}

export const LetterBox: React.FC<LetterBoxProps> = ({
  children
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}