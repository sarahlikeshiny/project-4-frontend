angular
  .module('auroraApp')
  .factory('DBLocation', DBLocation);

DBLocation.$inject = ['$resource', 'API_URL'];
function DBLocation($resource, API_URL) {
  return new $resource(`${API_URL}/locations/:id`, { id: '@id' }, {
    update: { method: 'GET' }
  });
}
