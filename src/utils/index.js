// for use in serach boxes
export const filterData = (query, patientsList) => {
  if (!query) {
    return patientsList;
  } else {
    return patientsList.filter((patient) => patient.name.toLowerCase().includes(query));
  }
};

// function to handle checkbox change in dropdown button component to get and store value in api or localStorage
export const handleCheckboxChange = (event, setChoice, choice) => {
  if (event.target.checked && !choice.length) {
    setChoice([event.target.value]);
  } else if (event.target.checked && choice.length > 0) {
    setChoice([...choice, event.target.value]);
  }
  if (!event.target.checked) {
    const filterdArr = choice.filter((c) => c !== event.target.value);
    setChoice([...filterdArr]);
  }
  console.log(choice);
  // localStorage.setItem(`selected${chosen}`, JSON.stringify(choice));
};
