"use strict";

sap.ui.define(["sap/m/library", "sap/base/security/encodeCSS"], function (library, encodeCSS) {
  "use strict";

  var LoadState = library.LoadState;
  var GenericTileMode = library.GenericTileMode;
  var CTRenderer = {};
  /**
   * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the Render-Output-Buffer
   * @param {com.hcl.customtile.control.CustomTile} oControl the control to be rendered
   */

  CTRenderer.render = function (oRm, oControl) {
    var sTooltipText = "Test Tooltip";
    oRm.write("<div");
    oRm.writeControlData(oControl);
    oRm.writeAttribute("role", "button");

    if (sTooltipText) {
      oRm.writeAttributeEscaped("title", sTooltipText);
    }

    oRm.addClass(encodeCSS("sapMGT"));
    oRm.addClass(encodeCSS("tileLayout"));
    oRm.addClass(encodeCSS("customOneByOne"));
    oRm.addClass(encodeCSS("sapMPointer")); // Need to add a disabled state

    oRm.addClass(encodeCSS("sapUiTinyMarginBegin"));
    oRm.addClass(encodeCSS("sapUiTinyMarginTop"));
    oRm.writeClasses();

    if (oControl.getWidth()) {
      oRm.write(" style='width: " + oControl.getWidth() + ";");
    }

    oRm.write(">");
    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileContent"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-content");
    oRm.write(">");

    this._renderHeader(oRm, oControl); // Sub header


    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileSubHeader"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("SAP Enterprise Portal");
    oRm.write("</p>"); // Sub sub header start

    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileSubSubHeaderContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-sub-sub-header-content");
    oRm.write(">"); // Sub sub header left text

    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileSubSubHeader"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("Band: E1.1");
    oRm.write("</p>"); // Sub sub header right text

    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileSubSubHeader"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("Joined on: 01-JAN-2017");
    oRm.write("</p>");
    oRm.write("</div>"); // Sub sub header div end
    // Experience block start

    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileExperienceContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-experience-content");
    oRm.write(">"); // TEX start

    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileTexRexContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-experience-tex-content");
    oRm.write(">"); // TEX left header

    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileTexRexHeader"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("TEX");
    oRm.write("</p>"); // Tex left Value

    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileTexRexContent"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("05");
    oRm.write("</p>");
    oRm.write("</div>"); // TEX div end
    // Years start

    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileTexRexYearsContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-experience-years-content");
    oRm.write(">"); // Years center header

    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileTexRexHeader"));
    oRm.addClass(encodeCSS("customTileTexRexYearsHeader"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("YRS");
    oRm.write("</p>");
    oRm.write("</div>"); // Years div end
    // REX start

    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileTexRexContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-experience-rex-content");
    oRm.write(">"); // REX right header

    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileTexRexHeader"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("REX");
    oRm.write("</p>"); // REX right Value

    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileTexRexContent"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("03");
    oRm.write("</p>");
    oRm.write("</div>"); // REX div end

    oRm.write("</div>"); // Experience block div end
    // Assignation block start

    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileAssignationContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-assignation-content");
    oRm.write(">");
    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileAssignationContentHeader"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("Transports for London");
    oRm.write("</p>");
    oRm.write("<p");
    oRm.addClass(encodeCSS("customTileAssignationTill"));
    oRm.writeClasses();
    oRm.write(">");
    oRm.writeEscaped("Assigned Till: 31-DEC-2019");
    oRm.write("</p>");
    oRm.write("</div>"); // Assignation div end

    oRm.write("</div>"); // Content div end

    oRm.write("</div>"); // Tile div end
  };
  /**
   * Renders the HTML for the header of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */


  CTRenderer._renderHeader = function (oRm, oControl) {
    // Header
    oRm.write("<div"); // oRm.addClass(encodeCSS("customTileHeader"));
    // oRm.writeClasses();

    oRm.writeAttribute("id", oControl.getId() + "-hdr-text");
    oRm.write(">");
    oRm.renderControl(oControl._oTitle);
    oRm.write("</div>");
  };

  return CTRenderer;
});