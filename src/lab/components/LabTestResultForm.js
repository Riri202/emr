/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Grow, Chip, CircularProgress, Box, TextField } from '@mui/material';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DropdownButton from '../../common-components/DropdownButton';

function LabTestResultForm({ showForm }) {
  // state for changing button color when payment is approved
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState(
    JSON.parse(localStorage.getItem('testResults')) ?? []
  );

  const [formValues, setFormValues] = useState([
    {
      id: '',
      testName: '',
      testResult: ''
    }
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        id: '',
        testName: '',
        testResult: ''
      }
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = () => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      if (!testResults.length) {
        setTestResults([formValues]);
      }
      if (testResults.length) {
        setTestResults([...testResults, formValues]);
      }
    }, 6000);
  };

  // persist data in local storage
  useEffect(() => {
    localStorage.removeItem('testResults', JSON.stringify(testResults));
    console.log(testResults);
  }, [testResults]);
  return (
    <>
      {showForm && (
        <>
          <Paper className="flex flex-col items-center flex-1 mt-5">
            <h3>Test Results</h3>
            <form onSubmit={handleSubmit} className="p-3">
              {formValues.map((element, index) => (
                <div className="flex flex-row space-x-4 mt-2 mb-2" key={index}>
                  <TextField
                    onChange={(e) => handleChange(index, e)}
                    name="testName"
                    size="small"
                    label="test name"
                    variant="outlined"
                  />
                  <TextField
                    onChange={(e) => handleChange(index, e)}
                    name="testResult"
                    size="small"
                    label="test result"
                    variant="outlined"
                  />
                  {index && !isSubmitted ? (
                    <Button
                      type="button"
                      disabled={isLoading}
                      className="p-2 mt-1 bg-red-500 text-[#000] ml-3"
                      onClick={() => removeFormFields(index)}>
                      Remove
                    </Button>
                  ) : null}
                </div>
              ))}
              <div>
                {!isSubmitted ? (
                  <Box sx={{ position: 'relative' }}>
                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={() => addFormFields()}
                      className="p-2 mt-1 bg-green-500 text-[#000] ml-3">
                      Add
                    </Button>
                    <Button
                      type="sumbit"
                      disabled={isLoading}
                      onClick={handleSubmit}
                      className="p-2 mt-1 bg-green-500 text-[#000] ml-3">
                      submit
                    </Button>
                    {isLoading && (
                      <CircularProgress
                        color="success"
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          zIndex: 1,
                          marginTop: '-12px',
                          marginLeft: '-12px'
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  <>
                    <Grow in={isSubmitted}>
                      <div className="flex flex-col">
                        <Chip
                          label="you have submitted lab test results"
                          icon={<CheckCircleIcon />}
                          color="success"
                        />
                        <Box className="flex justify-end mt-3 bg-[#f6f7fa] p-1">
                          <DropdownButton
                            btnText="send to"
                            menuItems={['dr. Stark', 'Dr Drake Remurray']}
                          />
                        </Box>
                      </div>
                    </Grow>
                  </>
                )}
              </div>
            </form>
          </Paper>
        </>
      )}
    </>
  );
}

export default LabTestResultForm;
