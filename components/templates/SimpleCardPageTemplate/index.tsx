import { Button, Typography } from "@material-ui/core";
import { Card, CardActions, CardContent } from "../../atoms/Card";
import { Container } from "../../layout/Container";

interface SimpleCardPageTemplateProps {
  title: string;
  subTitle: string;
  buttonText: string;
  onClick: () => void;
}

export const SimpleCardPageTemplate: React.FC<SimpleCardPageTemplateProps> = ({
  title,
  subTitle,
  buttonText,
  onClick
}) => (
  <Container
    align="center"
  >
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="body2">
          {subTitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  </Container>
)