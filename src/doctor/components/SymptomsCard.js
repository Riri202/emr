/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import DropdownSearch from '../../common-components/DropdownSearch';
import setAuthToken from '../../utils/setAuthToken';
import { addNewSymptom } from '../../utils/api';
import TransformButton from '../../common-components/TransformButton';

const user = JSON.parse(localStorage.getItem('user'));

// function SymptomsCard({ sessionId, patientId }) {
//   const drugs = JSON.parse(localStorage.getItem('drugsList'));
//   const [choice, setChoice] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccessful, setIsSuccessful] = useState(false);
//   const [inputData, setInputData] = useState({
//     title: '',
//     description: ''
//   });
//   const { title, description } = inputData;
//   const handleChange = (e) => {
//     setInputData((prevState) => ({
//       ...prevState,
//       description: e.target.value
//     }));
//   };

//   const handleSymptomChoice = (event) => {
//     if (event.target.checked && !choice.length) {
//       setIsNewChoice(false);
//       setChoice([event.target.value]);
//       setInputData((prevState) => ({
//         ...prevState,
//         title: event.target.value
//       }));
//     } else if (event.target.checked && choice.length > 0) {
//       setIsNewChoice(true);
//       setChoice([...choice, event.target.value]);
//       setInputData((prevState) => ({
//         ...prevState,
//         title: event.target.value
//       }));
//     }

//     // remove choice from list when you uncheck its checkbox
//     if (!event.target.checked) {
//       const filterdArr = choice.filter((c) => c !== event.target.value);
//       setChoice([...filterdArr]);
//     }
//   };
//   const onSubmitForm = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     if (user) {
//       setAuthToken(user.token);
//     }
//     try {
//       const requestBody = { description, sessionId, patientId, title };
//       await addNewSymptom(requestBody);
//       setIsLoading(false);
//       setIsSuccessful(true);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//       setIsSuccessful(false);
//     }
//   };
//   return (
//     <Paper sx={{ flexGrow: 1 }} className="p-3">
//       <div className="flex justify-between">
//         <h3 className="text-lg mb-3">Symptoms</h3>
//         <DropdownSearch
//           btnText="Add symptoms"
//           menuItems={drugs}
//           handleCheckboxChange={handleSymptomChoice}
//         />
//       </div>
//       {choice && choice.length ? (
//         <ol>
//           {choice &&
//             choice.map((c, index) => {
//               return (
//                 <div key={index}>
//                   <form onSubmit={onSubmitForm}>
//                     <li className="flex flex-row justify-evenly mt-2 mb-2">
//                       <input type="text" name="title" value={c} disabled={false} />
//                       <input
//                         type="text"
//                         disabled={isSuccessful}
//                         name="description"
//                         onChange={handleChange}
//                         placeholder="description"
//                       />
//                       <TransformButton
//                         // id={c}
//                         // name={c}
//                         btnText="Add symptoms"
//                         isSuccessful={isSuccessful}
//                         isLoading={isLoading}
//                       />
//                     </li>
//                     <Divider orientation="horizontal" variant="fullWidth" />
//                   </form>
//                 </div>
//               );
//             })}
//         </ol>
//       ) : (
// <p className="text-lg mb-3 text-red-500">Select from symptoms options above</p>
//       )}

//       <Button variant="text" endIcon={<Add />}>
//         Add Note
//       </Button>
//     </Paper>
//   );
// }

// export default SymptomsCard;

function SymptomsForm({ symptom, handleChange, inputData, sessionId, patientId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { title, description } = inputData;

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const requestBody = { description, sessionId, patientId, title };
      await addNewSymptom(requestBody);
      setIsLoading(false);
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsSuccessful(false);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <li className="flex flex-row justify-evenly mt-2 mb-2">
        <input type="text" name="title" readOnly value={symptom} disabled={false} />
        <input
          type="text"
          disabled={isSuccessful}
          name="description"
          onChange={handleChange}
          placeholder="description"
        />
        <TransformButton btnText="Add symptoms" isSuccessful={isSuccessful} isLoading={isLoading} />
      </li>
      <Divider orientation="horizontal" variant="fullWidth" />
    </form>
  );
}

export default function SymptomCard({ sessionId, patientId }) {
  const drugs = JSON.parse(localStorage.getItem('drugsList'));
  const [choice, setChoice] = useState([]);
  const [inputData, setInputData] = useState({
    title: '',
    description: ''
  });
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      description: e.target.value
    }));
  };

  const handleSymptomChoice = (event) => {
    if (event.target.checked) {
      choice.push(event.target.value);
      setChoice(choice);
      setInputData((prevState) => ({
        ...prevState,
        title: event.target.value
      }));
    }
    if (!event.target.checked) {
      const filterdArr = choice.filter((c) => c !== event.target.value);
      setChoice([...filterdArr]);
    }
  };

  return (
    <Paper sx={{ flexGrow: 1 }} className="p-3">
      <div className="flex justify-between">
        <h3 className="text-lg mb-3">Symptoms</h3>
        <DropdownSearch
          btnText="Add symptoms"
          menuItems={drugs}
          handleCheckboxChange={handleSymptomChoice}
        />
      </div>
      <div>
        {choice && choice.length ? (
          <div>
            {choice &&
              choice.map((c, key) => {
                return (
                  <SymptomsForm
                    key={key}
                    symptom={c}
                    handleChange={handleChange}
                    inputData={inputData}
                    sessionId={sessionId}
                    patientId={patientId}
                  />
                );
              })}
          </div>
        ) : (
          <p className="text-lg mb-3 text-red-500">Select from symptoms options above</p>
        )}
      </div>
    </Paper>
  );
}
