import { Box, Button, Chip, Grid, Typography } from "@material-ui/core"
import { Card, CardActions, CardContent } from "../../atoms/Card"
import { LetterBox } from "../../atoms/LetterBox"
import { Container } from "../../layout/Container"
import QRCode from 'qrcode.react';

interface GameViewPageTemplateProps {
  qrCodeUrl: string;
  players: Array<string>;
}

const words = ['world', 'adieu']

export const GameViewPageTemplate: React.FC<GameViewPageTemplateProps> = ({
  qrCodeUrl,
  players,
}) => (
  <Container align="center">
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Game
            </Typography>
            <Typography gutterBottom variant="h3">
              <Grid container spacing={1}>
                {words.map((word, _word) => 
                  <Grid item container spacing={1} key={_word}>
                    {word.split('').map((letter, _letter) => (
                      <Grid
                        key={`${_word}-${_letter}`}
                        item
                      >
                        <LetterBox>{letter}</LetterBox>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Typography>
          </CardContent>
          <CardActions>
            <Button>reset</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Players
                </Typography>
                {players.map((player) => <Chip label={player} />)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Join
                </Typography>
                <Typography variant="body2">
                  Scan the code to join
                </Typography>
                <QRCode value={qrCodeUrl} />
              </CardContent>
              <CardActions>
                <Button>Hide</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>
)