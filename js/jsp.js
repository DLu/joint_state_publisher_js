// See https://developer.mozilla.org/docs/XPathResult#Constants
var XPATH_FIRST_ORDERED_NODE_TYPE = 9;

function updateInput(amount, id)
{
    document.getElementById(id).value = amount;
    publish();
}

function publish()
{
  var names = [];
  var values = [];
  for(index = 0; index < sliders.length; index++) {
    slider = sliders[index];
    names[ names.length ] = slider.name;
    values[ values.length ] = parseFloat(slider.value);
  }

  var js = new ROSLIB.Message({
    name: names, position: values
  });
  topic.publish(js);
}

var sliders = [];

function load_model(param){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(param, 'text/xml');
    var robotXml = xmlDoc.evaluate('//robot', xmlDoc, null, XPATH_FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var c = 0;
    var container = document.getElementById('sliders');
    for (var nodes = robotXml.childNodes, i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if(node.tagName=='joint'){
            if(node.getAttribute('type')!='fixed'){
  
                var minval, maxval;
                if(node.getAttribute('type')=='continuous'){
                    minval = -3.1415;
                    maxval = 3.1415;
                    val = 0;
                }else{
                    limit = node.getElementsByTagName('limit')[0];
                    minval = parseFloat(limit.getAttribute('lower'));
                    maxval = parseFloat(limit.getAttribute('upper'));
                    if(minval <= 0 && maxval >= 0){
                        val = 0;
                    }else{
                        val = (maxval + minval) / 2;
                    } 
                   
                }           
            
                var name = node.getAttribute('name');
                var x = document.createTextNode( name );
                container.appendChild(x);
                x = document.createElement('input');
                x.setAttribute('name', name + '_text');
                x.setAttribute('id', name + '_text');
                x.setAttribute('style', 'float: right');
                x.setAttribute('value', val);
                x.setAttribute('onblur', "updateInput(this.value, '" + name + "_slider');");
                container.appendChild(x);
                container.appendChild( document.createElement('br') );
                
                x = document.createElement('input');
                x.setAttribute('name', name);
                x.setAttribute('id', name + '_slider');
                x.setAttribute('type', 'range');
                x.setAttribute('min', minval);
                x.setAttribute('max', maxval);
                x.setAttribute('value', val);
                x.setAttribute('step', (maxval-minval)/100);
                x.setAttribute('style', 'width: 100%');
                x.setAttribute('onchange', "updateInput(this.value, '" + name + "_text');");
                container.appendChild(x);
                container.appendChild( document.createElement('br') );
                sliders[ sliders.length ] = x;
            }
        }
    }
}
