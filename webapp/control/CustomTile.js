sap.ui.define(
  [
    "sap/ui/core/Control",
    "./CustomTileRenderer",
    "sap/m/library",
    "sap/m/Text",
    "sap/ui/thirdparty/jquery",
    "sap/ui/core/HTML",
    "sap/ui/events/PseudoEvents",
    "sap/ui/core/Icon",
  ],
  function (
    Control,
    CustomTileRenderer,
    library,
    Text,
    jQuery,
    HTML,
    PseudoEvents,
    Icon
  ) {
    const LoadState = library.LoadState,
      WrappingType = library.WrappingType;

    /**
     * Constructor for a new sap.m.CustomTile control.
     *
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class Displays header, two subheaders, total experience, relevant experience, current project and assignation
     * Inspired from sap.m.CustomTile
     *
     * @extends sap.ui.core.Control
     *
     * @author Arindam Seth
     * @version 0.0.1
     *
     * @public
     * @alias com.hcl.customtile.control.CustomTile
     */

    const CustomTile = Control.extend("com.hcl.customtile.control.CustomTile", {
      metadata: {
        properties: {
          /**
           * The header of the tile.
           */
          header: { type: "string", group: "Appearance", defaultValue: null },
          /**
           * The subheader of the tile.
           */
          subheader: {
            type: "string",
            group: "Appearance",
            defaultValue: null,
          },
          /**
           * The band of the tile.
           */
          band: { type: "string", group: "Appearance", defaultValue: null },
          /**
           * The joined of the tile.
           */
          joined: { type: "string", group: "Appearance", defaultValue: null },
          /**
           * The TEX label of the tile.
           */
          texLabel: {
            type: "string",
            group: "Appearance",
            defaultValue: "TEX",
          },

          /**
           * The TEX value of the tile.
           */
          texValue: { type: "string", group: "Appearance", defaultValue: null },

          /**
           * The YRS label of the tile.
           */
          yearsLabel: {
            type: "string",
            group: "Appearance",
            defaultValue: "YRS",
          },

          /**
           * The REX label of the tile.
           */
          rexLabel: {
            type: "string",
            group: "Appearance",
            defaultValue: "REX",
          },

          /**
           * The REX value of the tile.
           */
          rexValue: { type: "string", group: "Appearance", defaultValue: null },

          /**
           * The assignation value of the tile.
           */
          assignation: {
            type: "string",
            group: "Appearance",
            defaultValue: null,
          },

          /**
           * The assignation date of the tile.
           */
          assignationDate: {
            type: "string",
            group: "Appearance",
            defaultValue: null,
          },
          /**
           * The message that appears when the control is in the Failed state.
           */
          failedText: {
            type: "string",
            group: "Appearance",
            defaultValue: null,
          },
          /**
           * The load status.
           */
          state: {
            type: "sap.m.LoadState",
            group: "Misc",
            defaultValue: LoadState.Loaded,
          },
          /**
           * Defines the type of text wrapping to be used (hyphenated or normal).
           * @since 1.60
           */
          wrappingType: {
            type: "sap.m.WrappingType",
            group: "Appearance",
            defaultValue: WrappingType.Normal,
          },
          /**
           * Width of the control.
           * @since 1.72
           */
          width: { type: "sap.ui.core.CSSSize", group: "Appearance" },

          url: { type: "string", group: "Appearance", defaultValue: null },
        },
        aggregations: {
          /**
           * The hidden aggregation for the title.
           */
          _titleText: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the sub title.
           */
          _subHeader: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the band.
           */
          _band: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the joined text.
           */
          _joined: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the TEX label.
           */
          _texLabel: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the TEX value.
           */
          _texValue: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the years label.
           */
          _yearsLabel: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },

          /**
           * The hidden aggregation for the REX label.
           */
          _rexLabel: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the REX value.
           */
          _rexValue: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the assignation value.
           */
          _assignation: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the assignation date.
           */
          _assignationDate: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
          /**
           * The hidden aggregation for the message in the failed state.
           */
          _failedMessageText: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden",
          },
        },
        events: {
          /**
           * The event is triggered when the user presses the tile.
           */
          press: {
            parameters: {
              /**
               * The action that was pressed on the tile. In the Actions scope, the available actions are Press and Remove.
               * In Display scope, the parameter value is only Press.
               * @since 1.46.0
               */
              action: { type: "string" },

              /**
               * The pressed DOM Element pointing to the CustomTile's DOM Element in Display scope.
               * In Actions scope it points to the more icon, when the tile is pressed, or to the DOM Element of the remove button, when the remove button is pressed.
               * @since 1.46.0
               */
              domRef: { type: "any" },
            },
          },
        },
      },
    });

    /* --- Event Handling --- */
    CustomTile.prototype.ontouchstart = function () {
      this.addStyleClass("sapMGTPressActive");
      if (this.$("hover-overlay").length > 0) {
        this.$("hover-overlay").addClass("sapMGTPressActive");
      }
    };

    CustomTile.prototype.ontouchcancel = function () {
      this.removeStyleClass("sapMGTPressActive");
      if (this.$("hover-overlay").length > 0) {
        this.$("hover-overlay").removeClass("sapMGTPressActive");
      }
    };

    CustomTile.prototype.ontouchend = function () {
      this.removeStyleClass("sapMGTPressActive");
      if (this.$("hover-overlay").length > 0) {
        this.$("hover-overlay").removeClass("sapMGTPressActive");
      }
    };

    CustomTile.prototype.ontap = function (event) {
      var oParams;
      if (this._bTilePress && this.getState() !== library.LoadState.Disabled) {
        this.$().focus();
        oParams = this._getEventParams(event);
        this.firePress(oParams);
        event.preventDefault();
      }
    };

    CustomTile.prototype.onkeydown = function (event) {
      if (
        PseudoEvents.events.sapselect.fnCheck(event) &&
        this.getState() !== library.LoadState.Disabled
      ) {
        this.addStyleClass("sapMGTPressActive");
        if (this.$("hover-overlay").length > 0) {
          this.$("hover-overlay").addClass("sapMGTPressActive");
        }
        event.preventDefault();
      }
    };

    CustomTile.prototype.init = function () {
      this._oRb = sap.ui.getCore().getLibraryResourceBundle("sap.m");

      this._sFailedToLoad = this._oRb.getText("INFOTILE_CANNOT_LOAD_TILE");
      this._sLoading = this._oRb.getText("INFOTILE_LOADING");

      this._oFailedText = new Text(this.getId() + "-failed-txt", {
        maxLines: 2,
      });

      this._oFailedText.cacheLineHeight = false;
      this._oFailedText.addStyleClass("sapMGTFailed");
      this.setAggregation("_failedMessageText", this._oFailedText, true);

      // Title
      this._oTitle = new Text(this.getId() + "-title");
      this._oTitle.addStyleClass("customTileHeader");
      this._oTitle.cacheLineHeight = false;
      this.setAggregation("_titleText", this._oTitle, true);
      this._oTitle.setProperty("maxLines", 1, true);

      // Subtitle
      this._oSubHeader = new Text(this.getId() + "-subTitle");
      this._oSubHeader.addStyleClass("customTileSubHeader");
      this._oSubHeader.cacheLineHeight = false;
      this.setAggregation("_subHeader", this._oSubHeader, true);
      this._oSubHeader.setProperty("maxLines", 1, true);

      // Band
      this._oBand = new Text(this.getId() + "-band");
      this._oBand.addStyleClass("customTileSubSubHeader");
      this._oBand.addStyleClass("sapUiTinyMarginTop");
      this._oBand.cacheLineHeight = false;
      this.setAggregation("_band", this._oBand, true);
      this._oBand.setProperty("maxLines", 1, true);

      // Joined
      this._oJoined = new Text(this.getId() + "-joined");
      this._oJoined.addStyleClass("customTileSubSubHeader");
      this._oJoined.addStyleClass("sapUiTinyMarginTop");
      this._oJoined.cacheLineHeight = false;
      this.setAggregation("_joined", this._oJoined, true);
      this._oJoined.setProperty("maxLines", 1, true);

      // TEX
      this._oTexLabel = new Text(this.getId() + "-tex-label");
      this._oTexLabel.addStyleClass("customTileTexRexHeader");
      this._oTexLabel.addStyleClass("sapUiTinyMarginTop");
      this._oTexLabel.cacheLineHeight = false;
      this.setAggregation("_texLabel", this._oTexLabel, true);
      this._oTexLabel.setProperty("maxLines", 1, true);

      this._oTexVal = new Text(this.getId() + "-tex-val");
      this._oTexVal.addStyleClass("customTileTexRexContent");
      this._oTexVal.addStyleClass("sapUiTinyMarginTop");
      this._oTexVal.cacheLineHeight = false;
      this.setAggregation("_texValue", this._oTexVal, true);
      this._oTexVal.setProperty("maxLines", 1, true);

      // Years
      this._oYrsLabel = new Text(this.getId() + "-years-label");
      this._oYrsLabel.addStyleClass("customTileTexRexHeader");
      this._oYrsLabel.addStyleClass("sapUiMediumMarginTop");
      this._oYrsLabel.addStyleClass("sapUiTinyMarginBottom");
      this._oYrsLabel.cacheLineHeight = false;
      this.setAggregation("_yearsLabel", this._oYrsLabel, true);
      this._oYrsLabel.setProperty("maxLines", 1, true);

      // REX
      this._oRexLabel = new Text(this.getId() + "-rex-label");
      this._oRexLabel.addStyleClass("customTileTexRexHeader");
      this._oRexLabel.addStyleClass("sapUiTinyMarginTop");
      this._oRexLabel.cacheLineHeight = false;
      this.setAggregation("_rexLabel", this._oRexLabel, true);
      this._oRexLabel.setProperty("maxLines", 1, true);

      this._oRexVal = new Text(this.getId() + "-rex-val");
      this._oRexVal.addStyleClass("customTileTexRexContent");
      this._oRexVal.addStyleClass("sapUiTinyMarginTop");
      this._oRexVal.cacheLineHeight = false;
      this.setAggregation("_rexValue", this._oRexVal, true);
      this._oRexVal.setProperty("maxLines", 1, true);

      this._oAssignation = new Text(this.getId() + "-assignation-value");
      this._oAssignation.addStyleClass("customTileAssignationContentHeader");
      this._oAssignation.addStyleClass("sapUiTinyMarginTop");
      this._oAssignation.cacheLineHeight = false;
      this.setAggregation("_assignation", this._oAssignation, true);
      this._oAssignation.setProperty("maxLines", 1);

      this._oAssignationDate = new Text(this.getId() + "-assignation-date");
      this._oAssignationDate.addStyleClass("customTileAssignationTill");
      this._oAssignationDate.addStyleClass("sapUiTinyMarginTop");
      this._oAssignationDate.cacheLineHeight = false;
      this.setAggregation("_assignationDate", this._oAssignationDate, true);
      this._oAssignationDate.setProperty("maxLines", 1);

      this._oWarningIcon = new Icon(this.getId() + "-warn-icon", {
        src: "sap-icon://notification",
        size: "1.375rem",
      });

      this._oWarningIcon.addStyleClass("sapMGTFtrFldIcnMrk");

      this._oBusy = new HTML(this.getId() + "-overlay");
      this._oBusy.setBusyIndicatorDelay(0);

      this._bTilePress = true;

      this._bThemeApplied = true;
      if (!sap.ui.getCore().isInitialized()) {
        this._bThemeApplied = false;
        sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));
      } else {
        this._handleCoreInitialized();
      }
    };

    CustomTile.prototype.exit = function () {
      this._oWarningIcon.destroy();
      this._oBusy.destroy();
    };

    CustomTile.prototype.renderer = function (oRm, oControl) {
      CustomTileRenderer.render(oRm, oControl);
    };

    CustomTile._Action = {
      Press: "Press",
    };

    CustomTile.prototype.onAfterRendering = function () {
      if (sap.ui.core.Control.prototype.onAfterRendering) {
        sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); // run the super class's method first
      }

      // attaches handler this._updateAriaAndTitle to the event mouseenter and removes attributes ARIA-label and title of all content elements
      this.$().bind("mouseenter", this._updateAriaAndTitle.bind(this));

      // attaches handler this._removeTooltipFromControl to the event mouseleave and removes control's own tooltips (Truncated header text and MicroChart tooltip).
      this.$().bind("mouseleave", this._removeTooltipFromControl.bind(this));
    };

    CustomTile.prototype.onBeforeRendering = function () {
      this.$().unbind("mouseenter");
      this.$().unbind("mouseleave");
    };

    CustomTile.prototype.setWrappingType = function (sWrappingType) {
      this.setProperty("wrappingType", sWrappingType, true);
      this._oTitle.setWrappingType(sWrappingType);
      this._oFailedText.setWrappingType(sWrappingType);
      this._oSubHeader.setWrappingType(sWrappingType);
      this._oBand.setWrappingType(sWrappingType);
      this._oJoined.setWrappingType(sWrappingType);
      this._oTexLabel.setWrappingType(sWrappingType);
      this._oTexVal.setWrappingType(sWrappingType);
      this._oYrsLabel.setWrappingType(sWrappingType);
      this._oRexLabel.setWrappingType(sWrappingType);
      this._oRexVal.setWrappingType(sWrappingType);
      this._oAssignation.setWrappingType(sWrappingType);
      this._oAssignationDate.setWrappingType(sWrappingType);
      return this;
    };

    /**
     * Handler for the core's init event. In order for the tile to adjust its rendering to the current theme,
     * we attach a theme check in here when everything is properly initialized and loaded.
     *
     * @private
     */
    CustomTile.prototype._handleCoreInitialized = function () {
      this._bThemeApplied = sap.ui.getCore().isThemeApplied();
      if (!this._bThemeApplied) {
        sap.ui.getCore().attachThemeChanged(this._handleThemeApplied, this);
      }
    };

    /**
     * The tile recalculates its title's max-height when line-height could be loaded from CSS.
     *
     * @private
     */
    CustomTile.prototype._handleThemeApplied = function () {
      this._bThemeApplied = true;
      this._oTitle.clampHeight();
      this._oSubHeader.clampHeight();
      this._oBand.clampHeight();
      this._oJoined.clampHeight();
      this._oTexLabel.clampHeight();
      this._oTexVal.clampHeight();
      this._oYrsLabel.clampHeight();
      this._oRexLabel.clampHeight();
      this._oRexVal.clampHeight();
      this._oAssignation.clampHeight();
      this._oAssignationDate.clampHeight();
      sap.ui.getCore().detachThemeChanged(this._handleThemeApplied, this);
    };

    CustomTile.prototype.getHeader = function () {
      return this._oTitle.getText();
    };

    CustomTile.prototype.setHeader = function (title) {
      this.setProperty("header", title);
      this._oTitle.setText(title);
      return this;
    };

    CustomTile.prototype.getSubheader = function () {
      return this._oSubHeader.getText();
    };

    CustomTile.prototype.setSubheader = function (sSubHeader) {
      this.setProperty("subheader", sSubHeader);
      this._oSubHeader.setText(sSubHeader);
      return this;
    };

    CustomTile.prototype.getBand = function () {
      return this._oBand.getText();
    };

    CustomTile.prototype.setBand = function (sText) {
      this.setProperty("band", sText);
      this._oBand.setText(sText);
      return this;
    };

    CustomTile.prototype.getJoined = function () {
      return this._oJoined.getText();
    };

    CustomTile.prototype.setJoined = function (sText) {
      this.setProperty("joined", sText);
      this._oJoined.setText(sText);
      return this;
    };

    CustomTile.prototype.getTexLabel = function () {
      return this._oTexLabel.getText();
    };

    CustomTile.prototype.setTexLabel = function (sText) {
      this.setProperty("texLabel", sText);
      this._oTexLabel.setText(sText);
      return this;
    };

    CustomTile.prototype.getTexValue = function () {
      return this._oTexVal.getText();
    };

    CustomTile.prototype.setTexValue = function (sText) {
      this.setProperty("texValue", sText);
      this._oTexVal.setText(sText);
      return this;
    };

    CustomTile.prototype.getYearsLabel = function () {
      return this._oYrsLabel.getText();
    };

    CustomTile.prototype.setYearsLabel = function (sText) {
      this.setProperty("yearsLabel", sText);
      this._oYrsLabel.setText(sText);
      return this;
    };

    CustomTile.prototype.getRexLabel = function () {
      return this._oRexLabel.getText();
    };

    CustomTile.prototype.setRexLabel = function (sText) {
      this.setProperty("rexLabel", sText);
      this._oRexLabel.setText(sText);
      return this;
    };

    CustomTile.prototype.getRexValue = function () {
      return this._oRexVal.getText();
    };

    CustomTile.prototype.setRexValue = function (sText) {
      this.setProperty("rexValue", sText);
      this._oRexVal.setText(sText);
      return this;
    };

    CustomTile.prototype.getAssignation = function () {
      return this._oAssignation.getText();
    };

    CustomTile.prototype.setAssignation = function (sText) {
      this.setProperty("assignation", sText);
      this._oAssignation.setText(sText);
      return this;
    };

    CustomTile.prototype.getAssignationDate = function () {
      return this._oAssignationDate.getText();
    };

    CustomTile.prototype.setAssignationDate = function (sText) {
      this.setProperty("assignationDate", sText);
      this._oAssignationDate.setText(sText);
      return this;
    };

    CustomTile.prototype._updateAriaAndTitle = function () {
      var sAriaAndTitleText = this._getAriaAndTooltipText();
      var $Tile = this.$();

      $Tile.attr("aria-label", sAriaAndTitleText);

      this._setTooltipFromControl();
    };

    /**
     * Returns a text for the ARIA label as combination of header and content texts
     * when the tooltip is empty
     * @private
     * @returns {String} The ARIA label text
     */
    CustomTile.prototype._getAriaAndTooltipText = function () {
      var sAriaText =
        this.getTooltip_AsString() && !this._isTooltipSuppressed()
          ? this.getTooltip_AsString()
          : this._getHeaderAriaAndTooltipText();
      switch (this.getState()) {
        case library.LoadState.Disabled:
          return "";
        case library.LoadState.Loading:
          return sAriaText + "\n" + this._sLoading;
        case library.LoadState.Failed:
          return sAriaText + "\n" + this._oFailedText.getText();
        default:
          if (sAriaText.trim().length === 0) {
            // If the string is empty or just whitespace, IE renders an empty tooltip (e.g. "" + "\n" + "")
            return "";
          } else {
            return sAriaText;
          }
      }
    };

    /**
     * Gets the header, subheader and image description text of CustomTile
     *
     * @private
     * @returns {String} The text
     */
    CustomTile.prototype._getHeaderAriaAndTooltipText = function () {
      var sText = "";
      var bIsFirst = true;
      if (this.getHeader()) {
        sText += this.getHeader();
        bIsFirst = false;
      }

      if (this.getSubheader()) {
        sText += (bIsFirst ? "" : "\n") + this.getSubheader();
        bIsFirst = false;
      }

      return sText;
    };

    /**
     * Generates text for failed state.
     * To avoid multiple calls e.g. in every _getAriaAndTooltipText call, this is done in onBeforeRendering.
     *
     * @private
     */
    CustomTile.prototype._generateFailedText = function () {
      var sCustomFailedMsg = this.getFailedText();
      var sFailedMsg = sCustomFailedMsg
        ? sCustomFailedMsg
        : this._sFailedToLoad;
      this._oFailedText.setProperty("text", sFailedMsg, true);
      this._oFailedText.setAggregation("tooltip", sFailedMsg, true);
    };

    CustomTile.prototype._setTooltipFromControl = function () {
      let sTooltip = "";
      let bIsFirst = true,
        bTexLabel = false,
        bTexValue = false,
        bRexLabel = false,
        bRexValue = false;

      if (this._oTitle.getText()) {
        sTooltip = this._oTitle.getText();
        bIsFirst = false;
      }

      if (this.getSubheader()) {
        sTooltip += (bIsFirst ? "" : "\n") + this.getSubheader();
        bIsFirst = false;
      }

      if (this.getBand()) {
        sTooltip += (bIsFirst ? "" : "\n") + this.getBand();
        bIsFirst = false;
      }

      if (this.getJoined()) {
        sTooltip += (bIsFirst ? "" : "\n") + this.getJoined();
        bIsFirst = false;
      }

      if (this.getTexLabel()) {
        sTooltip += (bIsFirst ? "" : "\n") + this.getTexLabel();
        bIsFirst = false;
        bTexLabel = true;
      }

      if (this.getTexValue()) {
        sTooltip += (bTexLabel ? ":" : "\n") + this.getTexValue();
        bIsFirst = false;
        bTexValue = true;
      }

      if (this.getYearsLabel() && bTexValue) {
        sTooltip += " " + this.getYearsLabel();
        bIsFirst = false;
      }

      if (this.getRexLabel()) {
        sTooltip += (bIsFirst ? "" : "\n") + this.getRexLabel();
        bIsFirst = false;
        bRexLabel = true;
      }

      if (this.getRexValue()) {
        sTooltip += (bRexLabel ? ":" : "\n") + this.getRexValue();
        bIsFirst = false;
        bRexValue = true;
      }

      if (this.getYearsLabel() && bRexValue) {
        sTooltip += " " + this.getYearsLabel();
        bIsFirst = false;
      }

      if (this.getAssignation()) {
        sTooltip += (bIsFirst ? "" : "\n") + this.getAssignation();
        bIsFirst = false;
      }

      if (this.getAssignationDate()) {
        sTooltip += (bIsFirst ? "" : "\n") + this.getAssignationDate();
        bIsFirst = false;
      }

      // when user does not set tooltip, apply the tooltip below
      if (sTooltip && !this._getTooltipText() && !this._isTooltipSuppressed()) {
        this.$().attr("title", sTooltip.trim());
        this._bTooltipFromControl = true;
      }
    };

    /**
     * Returns true if the application suppressed the tooltip rendering, otherwise false.
     *
     * @private
     * @returns {boolean} true if the application suppressed the tooltip rendering, otherwise false.
     */
    CustomTile.prototype._isTooltipSuppressed = function () {
      var sTooltip = this.getTooltip_Text();
      if (sTooltip && sTooltip.length > 0 && sTooltip.trim().length === 0) {
        return true;
      } else {
        return false;
      }
    };

    /**
     * Returns text for tooltip or null.
     * If the application provides a specific tooltip, the returned string is equal to the tooltip text.
     * If the tooltip provided by the application is a string of only white spaces, the function returns null.
     *
     * @returns {String} Text for tooltip or null.
     * @private
     */
    CustomTile.prototype._getTooltipText = function () {
      let sTooltip = this.getTooltip_Text(); // checks (typeof sTooltip === "string" || sTooltip instanceof String || sTooltip instanceof sap.ui.core.TooltipBase), returns text, null or undefined
      if (this._isTooltipSuppressed() === true) {
        sTooltip = null; // tooltip suppressed by the app
      }
      return sTooltip; // tooltip set by the app
    };

    /**
     * When mouse leaves CustomTile, removes the CustomTile's own tooltip (truncated header text or MicroChart tooltip), do not remove the tooltip set by user.
     * The reason is tooltip from control should not be displayed any more when the header text becomes short or MicroChart is not in CustomTile.
     *
     * @private
     */
    CustomTile.prototype._removeTooltipFromControl = function () {
      if (this._bTooltipFromControl) {
        this.$().removeAttr("title");
        this._bTooltipFromControl = false;
      }
    };

    /**
     * Looks for the class '.sapUiSizeCompact' on the control and its parents to determine whether to render cozy or compact density mode.
     *
     * @returns {boolean} True if class 'sapUiSizeCompact' was found, otherwise false.
     * @private
     */
    CustomTile.prototype._isCompact = function () {
      return (
        jQuery("body").hasClass("sapUiSizeCompact") ||
        this.$().is(".sapUiSizeCompact") ||
        this.$().closest(".sapUiSizeCompact").length > 0
      );
    };

    /**
     * Determines the current action depending on the tile's scope.
     * @param {sap.ui.base.Event} oEvent which was fired
     * @returns {object} An object containing the tile's scope and the action which triggered the event
     * @private
     */
    CustomTile.prototype._getEventParams = function (oEvent) {
      var oParams,
        sAction = CustomTile._Action.Press,
        oDomRef = this.getDomRef();

      oParams = {
        action: sAction,
        domRef: oDomRef,
      };
      return oParams;
    };

    return CustomTile;
  }
);
