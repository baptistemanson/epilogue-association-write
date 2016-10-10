'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (resource) {
  return function (req, res, context) {
    var promiseArray = [];
    _lodash2.default.keys(context.attributes).map(function (attribute) {
      if (isAssociation(resource.model, attribute)) {
        debug(attribute + ' is an association and is embedded in the query, will propagate the update');
        var associationsId = context.attributes[attribute].map(function (g) {
          return g.id;
        });
        debug('found this list of ids', associationsId, ' for ', attribute);
        promiseArray.push(context.instance[getSetterFunctionName(attribute)](associationsId).then(function () {
          return debug('embbeded ' + attribute + ' updated');
        }));
      }
    });
    return Promise.all(promiseArray).then(function () {
      debug('all association updated');
      context.continue;
    }, debug);
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('write-association');

// given a string corresponding to the name of an attribute and a model, return true if this field is an association
function isAssociation(model, attribute) {
  for (var associationName in model.associations) {
    if (model.associations.hasOwnProperty(associationName)) {
      if (model.associations[associationName].as === attribute) return true;
    }
  }
  return false;
}

// groups -> setGroups
function getSetterFunctionName(attribute) {
  return 'set' + attribute.charAt(0).toUpperCase() + attribute.substr(1);
}