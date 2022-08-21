import React, { useState, useEffect } from 'react';
import Nav from '../../common-components/Nav';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { getAllSessionsForPatient } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';

// const user = JSON.parse(localStorage.getItem('user'));

function HistoryOverview() {
  // const [isSearching, setIsSearching] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');

  const user = useCurrentUser();

  const [historyList, setHistoryList] = useState([]);
  let { patientId } = useParams();

  const getPatientsHistory = async () => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllSessionsForPatient(patientId);
      const history = data.rows;
      console.log(data);
      if (data) {
        setHistoryList(history);
        console.log(historyList);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPatientsHistory();
  }, []);
  return (
    <div>
      <Nav />
      <div className="p-8">
        <h1>Patients History</h1>
        <Paper>
          <List>
            {historyList.map((history) => {
              const { createdAt, id } = history;
              const sessionId = id;
              const month = new Date(createdAt).toLocaleString('default', { month: 'long' });
              const monthShortened = new Date(createdAt).toLocaleString('default', {
                month: 'short'
              });
              const date = new Date(createdAt).toDateString();
              return (
                <>
                  <ListItem component={Link} to={`/history/${sessionId}`}>
                    <ListItemAvatar>
                      <Avatar className="bg-orange-500">{monthShortened}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={month} secondary={date} />
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
