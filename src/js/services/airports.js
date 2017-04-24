
angular
  .module('auroraApp')
  .service('airports', Airports);

Airports.$inject = ['$http', 'API_URL'];
function Airports($http, API_URL) {
  const vm = this;
  function getAirports(origin_lat, origin_lng, lat, lng) {
  

    return $http
    .get(`${API_URL}/airports`, { params: { origin_lat, origin_lng, lat, lng} })
    .then((response) => {
      // console.log('flights',response);
      response.data.Quotes.forEach((quote) => {
        const destination = response.data.Places.find((place) => {
          return place.PlaceId === quote.OutboundLeg.DestinationId;
        });

        quote.DestinationCity = destination.CityName;
        quote.DestinationCountry = destination.CountryName;
        quote.DestinationAirport = destination.Name;

        const origin = response.data.Places.find((place) => {
          return place.PlaceId === quote.OutboundLeg.OriginId;
        });

        quote.OriginCity = origin.CityName;
        quote.OriginAirport = origin.Name;

        const carrier = response.data.Carriers.find((carrier) => {
          return carrier.CarrierId === quote.OutboundLeg.CarrierIds[0];
        });

        if(carrier) quote.CarrierName = carrier.Name;
      });
      // console.log(response.data.Quotes);
      return response.data.Quotes;
    });
  }


  vm.getAirports = getAirports;
}
