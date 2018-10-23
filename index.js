import elasticsearchRoute from './server/routes/elasticsearch';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'stagemonitor_kibana_6',
    uiExports: {
      app: {
        title: 'stagemonitor',
        order: -1000,
        description: 'Visualize traces from stagemonitor',
        main: 'plugins/stagemonitor_kibana_6/app',
        icon: 'plugins/stagemonitor-kibana_6/icon.svg',
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
