var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject() {
    var xmlHttp;
    
    if (window.ActiveXObject) {
        //for all those people using Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            xmlHttp = false;
        }
    } else {
        //for the non Internet Explorer users
        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            xmlHttp = false; 
        }
    }
    if (!xmlHttp)
        alert("Could not create the xml object.");
    else
        return xmlHttp;
}