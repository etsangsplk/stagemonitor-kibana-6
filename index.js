import elasticsearchRoute from './server/routes/elasticsearch';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'stagemonitor-kibana-6',
    uiExports: {
      app: {
        title: 'stagemonitor',
        order: -1000,
        description: 'Visualize traces from stagemonitor',
        icon: 'plugins/stagemonitor-kibana-6/icon.svg',
        main: 'plugins/stagemonitor-kibana-6/app',
        styleSheetPath: require('path').resolve(__dirname, 'public/app.scss'),
      },
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      elasticsearchRoute(server);
    }
  });
}
