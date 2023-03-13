//charge le fichier XML se trouvant à l'URL relative donné dans le paramètreet le retourne
function chargerHttpXML(xmlDocumentUrl) {

  var httpAjax;

  httpAjax = window.XMLHttpRequest ?
      new XMLHttpRequest() :
      new ActiveXObject('Microsoft.XMLHTTP');

  if (httpAjax.overrideMimeType) {
      httpAjax.overrideMimeType('text/xml');
  }

  //chargement du fichier XML à l'aide de XMLHttpRequest synchrone (le 3° paramètre est défini à false)
  httpAjax.open('GET', xmlDocumentUrl, false);
  httpAjax.send();

  return httpAjax.responseXML;
}

function chargerHttpJSON(jsonDocumentUrl) {

  var httpAjax;

  httpAjax = window.XMLHttpRequest ?
      new XMLHttpRequest() :
      new ActiveXObject('Microsoft.XMLHTTP');

  if (httpAjax.overrideMimeType) {
      httpAjax.overrideMimeType('text/xml');
  }

  // chargement du fichier JSON à l'aide de XMLHttpRequest synchrone (le 3° paramètre est défini à false)
  httpAjax.open('GET', jsonDocumentUrl, false);
  httpAjax.send();

  var responseData = eval("(" + httpAjax.responseText + ")");

  return responseData;
}

function button1(){
  let b1 = document.getElementById("bouton1");
  document.body.style.backgroundColor = "blue";
  b1.style.color = "white";
}

function button2(){
  document.body.style.backgroundColor = "white";
}

function button3(xmlDocumentUrl, xslDocumentUrl) {

  // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
  var xslDocument = chargerHttpXML(xslDocumentUrl);

  //création d'un processuer XSL
  var xsltProcessor = new XSLTProcessor();

  // Importation du .xsl
  xsltProcessor.importStylesheet(xslDocument);

  let code = document.getElementById("countryCode").value;
  //passage du paramètre à la feuille de style
  xsltProcessor.setParameter("", "country_code", code);

  // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
  var xmlDocument = chargerHttpXML(xmlDocumentUrl);

  // Création du document XML transformé par le XSL
  var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

  // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
  var elementHtmlParent = window.document.getElementById("countryInfo");
  
  // insérer l'élement transformé dans la page html
  elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName("element_a_recuperer")[0].innerHTML;
}

function button4(xmlDocumentUrl){
  var xmlDocument = chargerHttpXML(xmlDocumentUrl);
  var xmlSerializer = new XMLSerializer();
  var string = xmlSerializer.serializeToString(xmlDocument);

  var imageElement = document.getElementById("image");
  imageElement.innerHTML = string;
}

function setTitle(text){
  var titleElement = document.getElementById("title");
  titleElement.textContent = text;
}

function button5(){
  var path = document.getElementsByTagName("path")[0];
  path.addEventListener("click", () => setTitle(path.getAttribute("title")));
  var circle = document.getElementsByTagName("circle")[0];
  circle.addEventListener("click", () => setTitle(circle.getAttribute("title")));
  var rectangle = document.getElementsByTagName("rect")[0];
  rectangle.addEventListener("click", () => setTitle(rectangle.getAttribute("title")));
}

function button6(xmlDocumentUrl){
  var xmlDocument = chargerHttpXML(xmlDocumentUrl);
  var xmlSerializer = new XMLSerializer();
  var string = xmlSerializer.serializeToString(xmlDocument);

  var imageElement = document.getElementById("map");
  imageElement.innerHTML = string;
}

function setCountryName(text){
  var titleElement = document.getElementById("countryName");
  titleElement.textContent = text;
}

function button7(){
  var map = document.getElementById("map");
  var countries = map.getElementsByTagName("path");
  for(let country of countries){
    country.addEventListener("click", () => setCountryName(country.getAttribute("countryname")));
  }
}

function getCountryInfo(xmlDocumentUrl, xslDocumentUrl, code){
  // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
  var xslDocument = chargerHttpXML(xslDocumentUrl);

  //création d'un processuer XSL
  var xsltProcessor = new XSLTProcessor();

  // Importation du .xsl
  xsltProcessor.importStylesheet(xslDocument);

  //passage du paramètre à la feuille de style
  xsltProcessor.setParameter("", "country_code", code);

  // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
  var xmlDocument = chargerHttpXML(xmlDocumentUrl);

  // Création du document XML transformé par le XSL
  var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

  // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
  var elementHtmlParent = window.document.getElementById("table");
  
  // insérer l'élement transformé dans la page html
  elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName("element_a_recuperer")[0].innerHTML;
}

function button8(xmlDocumentUrl, xslDocumentUrl){
  var map = document.getElementById("map");
  var countries = map.getElementsByTagName("path");
  for(let country of countries){
    country.addEventListener("mouseover", () => {
      country.style = "fill:rgb(255,0,0)";
      getCountryInfo(xmlDocumentUrl, xslDocumentUrl, country.getAttribute("id"));
    });
    country.addEventListener("mouseleave", () => country.style = "");
  }
}

function button9(xmlDocumentUrl){
  var xmlDocument = chargerHttpXML(xmlDocumentUrl);

  var codes = xmlDocument.getElementsByTagName("cca2");
  countryList = document.getElementById("countryList");
  countryList.innerHTML = "";

  for(let code of codes){
    let option = document.createElement("option");
    option.setAttribute("value", code.innerHTML);
    countryList.appendChild(option);
  }
}

function button10(){
  var map = document.getElementById("map");
  var countries = map.getElementsByTagName("path");
  for(let country of countries){
    country.addEventListener("mouseover", () => {
      var title = document.getElementsByTagName("tr")[0];
      var titleElement = document.createElement("th");
      titleElement.innerHTML = "Monnaie";
      title.appendChild(titleElement);

      var code = country.getAttribute("id");
      var baseURL = "https://restcountries.com/v2/alpha/";
      var data = chargerHttpJSON(baseURL + code);
      var currency = data.currencies[0].name;

      var line = document.getElementsByTagName("tr")[1];
      var currencyElement = document.createElement("td");
      currencyElement.innerHTML = currency;
      line.appendChild(currencyElement);
    });
    country.addEventListener("mouseleave", () => country.style = "");
  }
}

function button11(xmlDocumentUrl, xslDocumentUrl){
  var map = document.getElementById("map");
  var countries = map.getElementsByTagName("path");

  // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
  var xslDocument = chargerHttpXML(xslDocumentUrl);

  //création d'un processuer XSL
  var xsltProcessor = new XSLTProcessor();
  // Importation du .xsl
  xsltProcessor.importStylesheet(xslDocument);

  //passage du paramètre à la feuille de style
  let code = document.getElementById("countryCode").value;
  xsltProcessor.setParameter("", "country_code", code);

  // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
  var xmlDocument = chargerHttpXML(xmlDocumentUrl);

  // Création du document XML transformé par le XSL
  var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

  var elements = newXmlDocument.body.getElementsByTagName("li");
  var codes = [];
  for(let e of elements){
    codes.push(e.innerHTML);
  }
  
  for(let country of countries){
    for(let c of codes)
      if(country.getAttribute("id") == c)
        country.style = "fill: rgb(0,255,0)";
  }

}

var countryName = "";

function checkAnswer(name){
  if(name == countryName)
    alert("Bonne réponse!");
  else
    alert("Réponse fausse");
  return name == countryName;
}

function button12(){
  var map = document.getElementById("map");
  var countries = map.getElementsByTagName("path");
  var countryNames = [];
  for(let country of countries){
    countryNames.push(country.getAttribute("countryname"));
  }

  if(countryName == ""){
    for(let country of countries){
      country.addEventListener("click", ()=>{
        checkAnswer(country.getAttribute("countryname"));
      })
    }
  }

  var sz = countryNames.length;
  countryName = countryNames[Math.floor(Math.random()*sz)];

  var trivia = document.getElementById("trivia");
  trivia.innerHTML = countryName;
}