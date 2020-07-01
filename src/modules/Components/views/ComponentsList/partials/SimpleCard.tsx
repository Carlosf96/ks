import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: 20,
    padding: 22,
    boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 10px 50px -12.125px rgba(0,0,0,0.3)',
    },
  },
});

const SimpleCard: React.FC = props => {
  const classes = useStyles();
  return <Card className={classes.card}>{props.children}</Card>;
};

export default SimpleCard;
