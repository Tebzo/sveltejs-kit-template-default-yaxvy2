const fetchGPSData = async () => {
  const response = await fetch('https://vda-lab.github.io/assets/vast2021_gps_coordinates.json');
  const data = await response.json();
  // Process data if necessary
  return data;
}

const fetchPOIData = async () => {
  const response = await fetch('https://vda-lab.github.io/assets/vast2021_businesses.json');
  const data = await response.json();
  // Process data if necessary
  return data;
}

const fetchStopsData = async () => {
  const response = await fetch('https://vda-lab.github.io/assets/vast2021_carstops.json');
  const data = await response.json();
  // Process data if necessary
  return data;
}

export { fetchGPSData, fetchPOIData, fetchStopsData };
