/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Grow, Chip, CircularProgress, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DropdownButton from '../../common-components/DropdownButton';

function SubmitBtn({ event, testResults, setTestResults, formValues, addFormFields }) {
  // state for changing button color when payment is approved
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   const handleApprovePayment = () => {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsSubmitted(true);
  //       setIsLoading(false);
  //     }, 6000);
  //   };
  const handleSubmit = (event, testResults, setTestResults, formValues) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (!testResults.length) {
        setTestResults([formValues]);
      }
      if (testResults.length) {
        setTestResults([...testResults, formValues]);
      }
      setIsLoading(false);
      setIsSubmitted(true);
    }, 6000);
  };
  return (
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
              <Box className="flex justify-end mt-3 bg-white p-1">
                <DropdownButton btnText="send to" menuItems={['dr. Stark', 'Dr Drake Remurray']} />
              </Box>
            </div>
          </Grow>
        </>
      )}
    </div>
  );
}

export default SubmitBtn;
