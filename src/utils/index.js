export const filterData = (query, patientsList) => {
  if (!query) {
    return patientsList;
  } else {
    return patientsList.filter((patient) => patient.name.toLowerCase().includes(query));
  }
};
