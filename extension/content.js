var URIs = [
                "https://aclu.org/donate"
                , "https://www.plannedparenthood.org/donate"
                , "http://www.adl.org/donate"
                , "http://www.borderangels.org/our-causes/"
                , "http://staywoke.org"
                , "https://donate.bgca.org/site/Donation2?7942.donation=form1&df_id=7942&_ga=1.66097390.119300056.1478845330"
                , "https://secure3.convio.net/cfrr/site/Donation2;jsessionid=97A4C7A9488B5DDF3450546DE1123DB2.app347a?1380.donation=form1&df_id=1380&web&_ga=1.145398384.513337705.1476995534"
                , "https://www.splcenter.org/donate"
            ]

//var searchString = /(trump)/gi;
var searchString = /(trump)/gi;

var replaceTextInNode = function(parentNode){
    for(var i = parentNode.childNodes.length-1; i >= 0; i--){
        var node = parentNode.childNodes[i];

        //  Make sure this is a text node
        if(node.nodeType == Element.TEXT_NODE){
            var needsReplacement = (node.data.search(searchString) >= 0);
            //needsReplacement = true;
            if(needsReplacement)
            {
                var newNode = document.createElement("fake");
                var URI = URIs[Math.floor(Math.random()*URIs.length)];


                newNode.innerHTML = node.data.replace(searchString, "<a style='text-decoration:inherit;font:inherit;' href='" +  URI + "'>$1</a>");

                parentNode.replaceChild(newNode, node);
            }

        } else if(node.nodeType == Element.ELEMENT_NODE){
            //  Check this node's child nodes for text nodes to act on

            node = replaceTextInNode(node);
            parentNode.childNodes[i] = node;
        }
    }
    return parentNode;
};

replaceTextInNode(document.body);