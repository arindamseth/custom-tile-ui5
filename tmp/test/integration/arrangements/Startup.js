"use strict";

sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
  "use strict";

  return Opa5.extend("com.hcl.customtile.test.integration.arrangements.Startup", {
    iStartMyApp: function iStartMyApp() {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "com.hcl.customtile",
          async: true,
          manifest: true
        }
      });
    }
  });
});