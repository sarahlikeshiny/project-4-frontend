angular
  .module('auroraApp')
  .factory('Probability', Probability);

Probability.$inject = ['$resource', 'API_URL'];
function Probability($resource, API_URL) {
  return new $resource(`${API_URL}/probabilities/:id`, { id: '@id' }, {
    update: { method: 'GET' }
  });
}
