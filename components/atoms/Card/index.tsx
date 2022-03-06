import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
} from "@material-ui/core";

interface CardProps {
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export const Card: React.FC<CardProps> = ({
  children
}) => <MuiCard>{children}</MuiCard>

interface CardContentProps {
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export const CardContent: React.FC<CardContentProps> = ({
  children
}) => <MuiCardContent>{children}</MuiCardContent>

interface CardActionsProps {
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export const CardActions: React.FC<CardActionsProps> = ({
  children
}) => <MuiCardActions>{children}</MuiCardActions>
