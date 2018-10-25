import callTree from './callTree.html';
import '../../lib/jquery-treetable';

export default () => {
  return {
    template: callTree,
    scope: {
      'source': '='
    }
  };
};
