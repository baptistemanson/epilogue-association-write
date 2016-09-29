import _ from 'lodash'
import _debug from 'debug'

var debug = _debug('write-association')

// given a string corresponding to the name of an attribute and a model, return true if this field is an association
function isAssociation (model, attribute) {
  for (var associationName in model.associations) {
    if (model.associations.hasOwnProperty(associationName)) {
      if (model.associations[associationName].as === attribute) return true
    }
  }
  return false
}

// groups -> setGroups
function getSetterFunctionName (attribute) {
  return 'set' + attribute.charAt(0).toUpperCase() + attribute.substr(1)
}

export default function (resource) {
  return (req, res, context) => {
    var promiseArray = []
    _.keys(context.attributes).map(attribute => {
      if (isAssociation(resource.model, attribute)) {
        debug(attribute + ' is an association and is embedded in the query, will propagate the update')
        let associationsId = context.attributes[attribute].map(g => g.id)
        debug('found this list of ids', associationsId, ' for ', attribute)
        promiseArray.push(
          context.instance[getSetterFunctionName(attribute)](associationsId).then(() => debug('embbeded ' + attribute + ' updated'))
        )
      }
    })
    return Promise.all(promiseArray).then(
      () => {
        debug('all association updated')
        context.continue
      }, debug)
  }
}

