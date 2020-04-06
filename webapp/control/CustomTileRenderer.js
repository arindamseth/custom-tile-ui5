sap.ui.define(["sap/m/library", "sap/base/security/encodeCSS"], function(
  library,
  encodeCSS
) {
  "use strict";
  const LoadState = library.LoadState;

  const CTRenderer = {};

  /**
   * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the Render-Output-Buffer
   * @param {com.hcl.customtile.control.CustomTile} oControl the control to be rendered
   */

  CTRenderer.render = function(oRm, oControl) {
    const sTooltipText = oControl._getTooltipText();
    const bHasPress = oControl.hasListeners("press");
    const sState = oControl.getState();
    oRm.write("<div");
    oRm.writeControlData(oControl);

    if (bHasPress) {
      oRm.writeAttribute("role", "button");
    } else {
      oRm.writeAttribute("role", "presentation");
    }

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

    // Tile content
    this._renderTileContent(oRm, oControl);

    if (sState !== LoadState.Loaded) {
      this._renderStateOverlay(oRm, oControl, sTooltipText);
    }

    if (sState !== LoadState.Disabled) {
      this._renderHoverOverlay(oRm, oControl);
      this._renderFocusDiv(oRm, oControl);
    }

    oRm.write("</div>"); // Tile div end
  };

  /**
   * Renders the HTML for the header of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderHeader = function(oRm, oControl) {
    // Header
    oRm.write("<div");
    oRm.writeAttribute("id", oControl.getId() + "-hdr-text");
    oRm.write(">");
    oRm.renderControl(oControl._oTitle);
    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the sub-header of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderSubHeader = function(oRm, oControl) {
    // Header
    oRm.write("<div");
    oRm.writeAttribute("id", oControl.getId() + "-subhdr-text");
    oRm.write(">");
    oRm.renderControl(oControl._oSubHeader);
    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the band of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderBand = function(oRm, oControl) {
    // Header
    oRm.write("<div");
    oRm.writeAttribute("id", oControl.getId() + "-band");
    oRm.write(">");
    oRm.renderControl(oControl._oBand);
    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the joined text of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderJoined = function(oRm, oControl) {
    // Header
    oRm.write("<div");
    oRm.writeAttribute("id", oControl.getId() + "-joined");
    oRm.write(">");
    oRm.renderControl(oControl._oJoined);
    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the TEX of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderTEX = function(oRm, oControl) {
    // Header
    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileTexRexContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-experience-tex-content");
    oRm.write(">");
    oRm.renderControl(oControl._oTexLabel);
    oRm.renderControl(oControl._oTexVal);
    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the years label of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderYears = function(oRm, oControl) {
    // Header
    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileTexRexYearsContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-experience-years-label");
    oRm.write(">");
    oRm.renderControl(oControl._oYrsLabel);
    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the REX of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderREX = function(oRm, oControl) {
    // Header
    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileTexRexContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-experience-rex-content");
    oRm.write(">");
    oRm.renderControl(oControl._oRexLabel);
    oRm.renderControl(oControl._oRexVal);
    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the REX of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderAssignation = function(oRm, oControl) {
    // Header
    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileAssignationContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-assignation-content");
    oRm.write(">");
    oRm.renderControl(oControl._oAssignation);
    oRm.renderControl(oControl._oAssignationDate);
    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the tile content of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderTileContent = function(oRm, oControl) {
    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileContent"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-ct-content");
    oRm.write(">");

    // Header
    this._renderHeader(oRm, oControl);

    // Sub header
    this._renderSubHeader(oRm, oControl);

    // Sub sub header
    this._renderSubSubHeader(oRm, oControl);

    // Experience
    this._renderExperience(oRm, oControl);

    // Assignation
    this._renderAssignation(oRm, oControl);

    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the tile sub sub header of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderSubSubHeader = function(oRm, oControl) {
    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileSubSubHeaderContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-sub-sub-header-content");
    oRm.write(">");

    // Band
    this._renderBand(oRm, oControl);

    // Joined
    this._renderJoined(oRm, oControl);

    oRm.write("</div>");
  };

  /**
   * Renders the HTML for the experience of the given control, using the provided {@link sap.ui.core.RenderManager}.
   *
   * @private
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control whose title should be rendered
   */
  CTRenderer._renderExperience = function(oRm, oControl) {
    oRm.write("<div");
    oRm.addClass(encodeCSS("customTileExperienceContainer"));
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-experience-content");
    oRm.write(">");

    // TEX
    this._renderTEX(oRm, oControl);

    // Years start
    this._renderYears(oRm, oControl);

    // REX start
    this._renderREX(oRm, oControl);

    oRm.write("</div>");
  };

  CTRenderer._renderHoverOverlay = function(oRm, oControl) {
    oRm.write("<div");
    oRm.writeAttribute("id", oControl.getId() + "-hover-overlay");
    oRm.addClass("sapMGTWithoutImageHoverOverlay");
    oRm.writeClasses();
    oRm.write(">");
    oRm.write("</div>");
  };

  CTRenderer._renderFocusDiv = function(oRm, oControl) {
    oRm.write("<div");
    oRm.addClass("sapMGTFocusDiv");
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-focus");
    oRm.write(">");
    oRm.write("</div>");
  };

  CTRenderer._renderStateOverlay = function(oRm, oControl, sTooltipText) {
    var sState = oControl.getState();
    oRm.write("<div");
    oRm.addClass("sapMGTOverlay");
    oRm.writeClasses();
    oRm.writeAttribute("id", oControl.getId() + "-overlay");
    if (sTooltipText) {
      oRm.writeAttributeEscaped("title", sTooltipText);
    }
    oRm.write(">");
    switch (sState) {
      case LoadState.Loading:
        oControl._oBusy.setBusy(sState === LoadState.Loading);
        oRm.renderControl(oControl._oBusy);
        break;
      case LoadState.Failed:
        oRm.write("<div");
        oRm.writeAttribute("id", oControl.getId() + "-failed-ftr");
        oRm.addClass("sapMGenericTileFtrFld");
        oRm.writeClasses();
        oRm.write(">");
        oRm.write("<div");
        oRm.writeAttribute("id", oControl.getId() + "-failed-icon");
        oRm.addClass("sapMGenericTileFtrFldIcn");
        oRm.writeClasses();
        oRm.write(">");
        oRm.renderControl(oControl._oWarningIcon);
        oRm.write("</div>");

        oRm.write("</div>");
        break;
      default:
    }
    oRm.write("</div>");
  };

  return CTRenderer;
});
