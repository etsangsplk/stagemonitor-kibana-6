

export default function (server) {

  server.route([{
    path: '/api/stagemonitor-kibana-6/search/es/{esIndex}',
    method: 'POST',
    handler(request, reply) {
      console.log(request.payload);
      const dataCluster = server.plugins.elasticsearch.getCluster('data');
      dataCluster.callWithRequest(request, 'search', {
        index: request.params.esIndex,
        body: request.payload
      }).then(function (response) {
        console.log(response);
        reply(response);
      });
    }
  },
  {
    path: '/api/stagemonitor-kibana-6/update/es/{hitId}',
    method: 'POST',
    handler(request, reply) {
      const dataCluster = server.plugins.elasticsearch.getCluster('data');
      dataCluster.callWithRequest(request, 'update', {
        index: '.kibana',
        type: '*',
        id: request.params.hitId,
        body: request.payload
      }).then(function (response) {
        console.log(response);
        reply(response);
      });
    }
  }]);

}