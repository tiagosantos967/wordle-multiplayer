import { Button, Typography } from "@material-ui/core";
import { Card, CardActions, CardContent } from "../../atoms/Card";
import { Container } from "../../layout/Container";
import { Form } from "../../molecules/Form";

interface SimpleFormCardPageTemplateProps<T> {
  title: string;
  subTitle: string;
  buttonText: string;
  initialValues: T;
  onSubmit: (values: T) => void;
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export const SimpleFormCardPageTemplate = <T,>(
  props: SimpleFormCardPageTemplateProps<T>
) => (
  <Container
    align="center"
  >
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {props.title}
        </Typography>
        <Typography variant="body2">
          {props.subTitle}
        </Typography>
      </CardContent>
      <Form<T>
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
      >
        <CardContent>
            {props.children}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            type="submit"
          >
            {props.buttonText}
          </Button>
        </CardActions>
      </Form>
    </Card>
  </Container>
)