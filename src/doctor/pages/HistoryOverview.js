import React from 'react';
import Nav from '../../common-components/Nav';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

function HistoryOverview() {
  const patientHistory = [
    {
      title: 'malaria',
      date: 'Jan 9, 2014'
    },
    {
      title: 'Presbyopia and something else',
      date: 'Jan 5, 2016'
    },
    {
      title: 'Shingles',
      date: 'Mar 3, 2020'
    },
    {
      title: 'HPV',
      date: 'Jul 8, 2021'
    },
    {
      title: 'malaria',
      date: 'Jan 9, 2022'
    },
    {
      title: 'Stress',
      date: 'Mar 9, 2022'
    },
    {
      title: 'malaria',
      date: 'May 13, 2022'
    }
  ];

  return (
    <div>
      <Nav />
      <div className="p-8">
        <h1>Patients History</h1>
        <Paper>
          <List>
            {patientHistory.map((history) => {
              return (
                <>
                  <ListItem component={Link} to={'/history'}>
                    <ListItemAvatar>
                      <Avatar className="bg-orange-500">{history.title.substring(0, 2)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={history.title} secondary={history.date} />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Paper>
      </div>
    </div>
  );
}

export default HistoryOverview;
