/**
 * Create by Hansel on 2015-7-15
 * @api wrap response
 */

var defaultSettings = {
  variable: [],
  plain: ''
};


module.exports = function(req, res, next) {

  res.js = function(options) {

    var settings = extend(defaultSettings, options)
    var jsFragment = jsPlain() + jsVariable()

    this.set("Content-Type", "application/javascript")
    this.end(jsFragment)

  }


  function jsVariable() {
    var fragment = ''

    var _len = settings.variable.length
    if (_len) {

      for (var i=0;i<_len;i++) {

        map(settings.variable[i], function(val, key){

          fragment += 'var ' + key + '='
          if (typeof val != 'object') {
            fragment += '"' + val + '"'
          } else {
            fragment += JSON.stringify(val)
          }
          fragment += ';'

        })

      }

    }

    return fragment + ';'
  }

  function jsPlain() {
    var result = ''

    result += settngs.plain

    return result + ';'
  }

  next()

}



/**
 * Extend multi objects.
 * @returns {object}
 */
function extend() {
  var result = {};
  var objs = Array.prototype.slice.call(arguments,0);
  objs.forEach(function(props, index){
    for(var prop in props) {
      if(props.hasOwnProperty(prop)) {
        result[prop] = props[prop]
      }
    }
  });
  return result;
}

/**
 * map
 * @param obj
 * @param callback
 * @returns {{}}
 */
function map(obj, callback) {
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof callback === 'function') {
        result[key] = callback.call(obj, obj[key], key, obj);
      }
    }
  }
  return result;
}