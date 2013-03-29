/**
 * HashPass namespace.
 */
if ("undefined" == typeof(HashPass)) {
  var HashPass = {
    init : function()
    {
      // start menu item as hidden
      document.getElementById("hashpass_insert").hidden = true;
    },

    show_menu_option : function(node)
    {
      // check if we right-clicked on a input field of type password
      if(node)
        if(node.type)
          if(node.type == "password")
            document.getElementById("hashpass_insert").hidden = false;
          else
            document.getElementById("hashpass_insert").hidden = true;
        else
          document.getElementById("hashpass_insert").hidden = true;
      else
        document.getElementById("hashpass_insert").hidden = true;
      // show hashpass option if it's a password field, hide if not
    },
    
    pass : function(node) {
      // try to get the page's hostname
      try {
	var params = { inn:{domain:window.content.document.location.hostname}, out:null};
      } catch (ex) {
        // Fails on at least 'about:config' on FX 1.5 to 3.x.
	var params = { inn:{domain:"Error!"}, out:null};
      }

      // open password hashing interface
      window.openDialog("chrome://hashpass/content/hash_dialog.xul", "", 
        "chrome, dialog, modal, resizable=yes", params).focus(); 

      if(params.out)
      {
        // User clicked ok. Put the hashed password into the password field
        node.value = params.out.hash;
      }
      else
      {
        // User clicked cancel
      }
    }
  };

  // run init function when a window loads
  // https://developer.mozilla.org/en-US/docs/XUL/School_tutorial/Adding_Events_and_Commands
  window.addEventListener("load", function() { HashPass.init(); }, false);
  
};
