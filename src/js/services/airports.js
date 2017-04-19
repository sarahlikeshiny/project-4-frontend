
angular
  .module('auroraApp')
  .service('airports', Airports);

Airports.$inject = ['$http', 'API_URL'];
function Airports($http, API_URL) {
  const vm = this;
  function getAirports() {

    return $http
    .get(`${API_URL}/airports`)
    .then((response) => {
      response.data.Quotes.forEach((quote) => {
        const destination = response.data.Places.find((place) => {
          return place.PlaceId === quote.OutboundLeg.DestinationId;
        });

        quote.DestinationCity = destination.CityName;
        quote.DestinationCountry = destination.CountryName;

        const carrier = response.data.Carriers.find((carrier) => {
          return carrier.CarrierId === quote.OutboundLeg.CarrierIds[0];
        });

        if(carrier) quote.CarrierName = carrier.Name;
      });
      return response.data.Quotes;
    });
  }


  vm.getAirports = getAirports;
}
