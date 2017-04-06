function DOMViewer(depth, nodes) {
		for(var i =0 ; i <nodes.length  ; i ++) {
			if(nodes[i].nodeType <= 3) {
				var str = "";
				for(var j = 0; j<depth *4 ; j++) {
					str += "-";
				}

				if(nodes[i].nodeType == 1){
					str += "[Element] - " + nodes[i].nodeName;
				}
				else if(nodes[i].nodeType ==2 ){
					str += "[Attribute] - " + nodes[i].nodeName;
					str += " = \"" + nodes[i].nodeValue + "\"";
				}
				else if(nodes[i].nodeType == 3) {
					if(nodes[i].nodeValue != "\\")
					str+= "[Text] - " + nodes[i].nodeValue;
				}

				console.log(str);
				if(nodes[i].attributes !== undefined && nodes[i].attributes.length > 0) {
					DOMViewer(depth +1, nodes[i].attributes);
				}
				DOMViewer(depth + 1, nodes[i].childNodes);
		}
}
}


var doc = document;
DOMViewer(0, doc.childNodes);
