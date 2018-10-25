import traceGraphTemplate from './traceGraph.html';

export default () => {
  return {
    template: traceGraphTemplate,
    restriction: 'E',
    scope: {
      trace: '='
    }
  };
};