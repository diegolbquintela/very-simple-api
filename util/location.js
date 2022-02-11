// using a dummy function to translate the geolocation instead of Google's geocoding API

//will always return Madrid
function getCoordsForAddress(address) {
  return { lat: 40.4168, lng: 3.7038 };
}

module.exports = getCoordsForAddress;
