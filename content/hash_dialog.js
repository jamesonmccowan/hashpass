// converts the hex hash string into printable characters
// (no whitespace, no unicode, no command characters)
var hex_to_printable = function(hex)
{
  var printable = "";
  for(var i=0;i<hex.length;i+=2)
    printable += String.fromCharCode( parseInt(hex.substr(i,2), 16) % 94 + 33 );

  return printable;
}


var salt = "pepper";
var domains = ["default", "www.youtube.com"];
var hashpass = [
  // default function
  function(password, domain)
  {
    return hex_to_printable(SHA512(
      salt.slice(0,Math.floor(salt.length/2)) + 
      SHA512(
        password.slice(0,Math.floor(password.length/2)) + 
        domain + 
        password.slice(Math.floor(password.length/2))) +
      salt.slice(Math.floor(salt.length/2))
    ));
  }
];


// demonstration of alternative function for www.youtube.com
if(domains.indexOf("www.youtube.com") != -1)
{
  hashpass[domains.indexOf("www.youtube.com")] = function(password, domain)
  {
    return "A" + hex_to_printable(SHA512(
      salt.slice(0,Math.floor(salt.length/2)) + 
      SHA512(
        password.slice(0,Math.floor(password.length/2)) + 
        domain + 
        password.slice(Math.floor(password.length/2))) +
      salt.slice(Math.floor(salt.length/2))
    ));
  }
}


function run_hash()
{
  // get domain and password
  var _d = document.getElementById("domain").value;
  var _p = document.getElementById("pw").value;

  // get hash function specific to domain
  var _h = hashpass[0];
  if(domains.indexOf(_d) != -1)
    _h = hashpass[domains.indexOf(_d)];

  // generate hash
  var output = _h(_p, _d);
  //window.arguments[0].out = {hash:output};
  document.getElementById("output").value = output;
}


// form return function
function onOK()
{
  // all methods have failed to get this to work
  window.arguments[0].out = {hash:document.getElementById("output").value};
}


// initialize form
function onLoad()
{
  // get hostname and place it in domain textbox
  if(window.arguments[0].inn.domain.length > 0)
    document.getElementById("domain").value = window.arguments[0].inn.domain;
  else
    document.getElementById("domain").value = "Local File"

  // focus on password field
  document.getElementById("pw").focus();
}

