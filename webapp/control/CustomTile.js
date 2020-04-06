sap.ui.define(
  [
    "sap/ui/core/Control",
    "./CustomTileRenderer",
    "sap/m/library",
    "sap/m/Text",
    "sap/ui/thirdparty/jquery"
  ],
  function(Control, CustomTileRenderer, library, Text, jQuery) {
    const FrameType = library.FrameType,
      LoadState = library.LoadState,
      TileSizeBehavior = library.TileSizeBehavior,
      WrappingType = library.WrappingType;

    /**
     * Constructor for a new sap.m.GenericTile control.
     *
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class Displays header, two subheaders, total experience, relevant experience, current project and assignation
     * Inspired from sap.m.GenericTile
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
           * The frame type: OneByOne or TwoByOne. Set to OneByOne as default if no property is defined or set to Auto by the app.
           */
          frameType: {
            type: "sap.m.FrameType",
            group: "Misc",
            defaultValue: FrameType.TwoByOne
          },
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
            defaultValue: null
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
            defaultValue: "TEX"
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
            defaultValue: "YRS"
          },

          /**
           * The REX label of the tile.
           */
          rexLabel: {
            type: "string",
            group: "Appearance",
            defaultValue: "REX"
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
            defaultValue: null
          },

          /**
           * The assignation date of the tile.
           */
          assignationDate: {
            type: "string",
            group: "Appearance",
            defaultValue: null
          },
          /**
           * The message that appears when the control is in the Failed state.
           */
          failedText: {
            type: "string",
            group: "Appearance",
            defaultValue: null
          },
          /**
           * The load status.
           */
          state: {
            type: "sap.m.LoadState",
            group: "Misc",
            defaultValue: LoadState.Loaded
          },
          /**
           *  If set to <code>TileSizeBehavior.Small</code>, the tile size is the same as it would be on a small-screened phone (374px wide and lower),
           *  regardless of the screen size of the actual device being used.
           *  If set to <code>TileSizeBehavior.Responsive</code>, the tile size adapts to the size of the screen.
           */
          sizeBehavior: {
            type: "sap.m.TileSizeBehavior",
            defaultValue: TileSizeBehavior.Responsive
          },
          /**
           * Renders the given link as root element and therefore enables the open in new tab / window functionality
           * @since 1.76
           */
          url: { type: "sap.ui.core.URI", group: "Misc", defaultValue: null },
          /**
           * Defines the type of text wrapping to be used (hyphenated or normal).
           * @since 1.60
           */
          wrappingType: {
            type: "sap.m.WrappingType",
            group: "Appearance",
            defaultValue: WrappingType.Normal
          },
          /**
           * Width of the control.
           * @since 1.72
           */
          width: { type: "sap.ui.core.CSSSize", group: "Appearance" }
        },
        aggregations: {
          /**
           * The hidden aggregation for the title.
           */
          _titleText: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the sub title.
           */
          _subHeader: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the band.
           */
          _band: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the joined text.
           */
          _joined: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the TEX label.
           */
          _texLabel: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the TEX value.
           */
          _texValue: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the years label.
           */
          _yearsLabel: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },

          /**
           * The hidden aggregation for the REX label.
           */
          _rexLabel: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the REX value.
           */
          _rexValue: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the assignation value.
           */
          _assignation: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the assignation date.
           */
          _assignationDate: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          },
          /**
           * The hidden aggregation for the message in the failed state.
           */
          _failedMessageText: {
            type: "sap.m.Text",
            multiple: false,
            visibility: "hidden"
          }
        },
        events: {
          /**
           * The event is triggered when the user presses the tile.
           */
          press: {
            parameters: {
              /**
               * The current scope the GenericTile was in when the event occurred.
               * @since 1.46.0
               */
              scope: { type: "sap.m.GenericTileScope" },

              /**
               * The action that was pressed on the tile. In the Actions scope, the available actions are Press and Remove.
               * In Display scope, the parameter value is only Press.
               * @since 1.46.0
               */
              action: { type: "string" },

              /**
               * The pressed DOM Element pointing to the GenericTile's DOM Element in Display scope.
               * In Actions scope it points to the more icon, when the tile is pressed, or to the DOM Element of the remove button, when the remove button is pressed.
               * @since 1.46.0
               */
              domRef: { type: "any" }
            }
          }
        }
      }
    });

    CustomTile.prototype.init = function() {
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
    };

    CustomTile.prototype.exit = function() {};

    CustomTile.prototype.renderer = function(oRm, oControl) {
      CustomTileRenderer.render(oRm, oControl);
    };
    CustomTile.prototype.onAfterRendering = function() {
      // if I need to do any post render actions, it will happen here
      if (sap.ui.core.Control.prototype.onAfterRendering) {
        sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); // run the super class's method first
      }
    };

    CustomTile.prototype.setWrappingType = function(sWrappingType) {
      this.setProperty("wrappingType", sWrappingType, true);
      this._oTitle.setWrappingType(sWrappingType);
      // this._oFailedText.setWrappingType(sWrappingType);
      this._oSubHeader.setWrappingType(sWrappingType);
      this._oBand.setWrappingType(sWrappingType);
      this._oJoined.setWrappingType(sWrappingType);
      this._oTexLabel.setWrappingType(sWrappingType);
      this._oTexVal.setWrappingType(sWrappingType);
      this._oYrsLabel.setWrappingType(sWrappingType);
      this._oRexLabel.setWrappingType(sWrappingType);
      this._oRexVal.setWrappingType(sWrappingType);
      this._oAssignation.setWrappingType(sWrappingType);
      return this;
    };

    CustomTile.prototype.getHeader = function() {
      return this._oTitle.getText();
    };

    CustomTile.prototype.setHeader = function(title) {
      this.setProperty("header", title);
      this._oTitle.setText(title);
      return this;
    };

    CustomTile.prototype.getSubheader = function() {
      return this._oSubHeader.getText();
    };

    CustomTile.prototype.setSubheader = function(sSubHeader) {
      this.setProperty("subheader", sSubHeader);
      this._oSubHeader.setText(sSubHeader);
      return this;
    };

    CustomTile.prototype.getBand = function() {
      return this._oBand.getText();
    };

    CustomTile.prototype.setBand = function(sText) {
      this.setProperty("band", sText);
      this._oBand.setText(sText);
      return this;
    };

    CustomTile.prototype.getJoined = function() {
      return this._oJoined.getText();
    };

    CustomTile.prototype.setJoined = function(sText) {
      this.setProperty("joined", sText);
      this._oJoined.setText(sText);
      return this;
    };

    CustomTile.prototype.getTexLabel = function() {
      return this._oTexLabel.getText();
    };
    CustomTile.prototype.setTexLabel = function(sText) {
      this.setProperty("texLabel", sText);
      this._oTexLabel.setText(sText);
      return this;
    };

    CustomTile.prototype.getTexValue = function() {
      return this._oTexVal.getText();
    };
    CustomTile.prototype.setTexValue = function(sText) {
      this.setProperty("texValue", sText);
      this._oTexVal.setText(sText);
      return this;
    };

    CustomTile.prototype.getYearsLabel = function() {
      return this._oYrsLabel.getText();
    };
    CustomTile.prototype.setYearsLabel = function(sText) {
      this.setProperty("yearsLabel", sText);
      this._oYrsLabel.setText(sText);
      return this;
    };

    CustomTile.prototype.getRexLabel = function() {
      return this._oRexLabel.getText();
    };
    CustomTile.prototype.setRexLabel = function(sText) {
      this.setProperty("rexLabel", sText);
      this._oRexLabel.setText(sText);
      return this;
    };

    CustomTile.prototype.getRexValue = function() {
      return this._oRexVal.getText();
    };
    CustomTile.prototype.setRexValue = function(sText) {
      this.setProperty("rexValue", sText);
      this._oRexVal.setText(sText);
      return this;
    };

    CustomTile.prototype.getAssignation = function() {
      return this._oAssignation.getText();
    };
    CustomTile.prototype.setAssignation = function(sText) {
      this.setProperty("assignation", sText);
      this._oAssignation.setText(sText);
      return this;
    };

    CustomTile.prototype.getAssignationDate = function() {
      return this._oAssignationDate.getText();
    };
    CustomTile.prototype.setAssignationDate = function(sText) {
      this.setProperty("assignationDate", sText);
      this._oAssignationDate.setText(sText);
      return this;
    };

    CustomTile.prototype._setTooltipFromControl = function() {
      let sTooltip = "";
      let bIsFirst = true;

      if (this._oTitle.getText()) {
        sTooltip = this._oTitle.getText();
        bIsFirst = false;
      }

      if (this.getSubheader()) {
        sTooltip += (bIsFirst ? "" : "\n") + this.getSubheader();
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
    CustomTile.prototype._isTooltipSuppressed = function() {
      var sTooltip = this.getTooltip_Text();
      if (sTooltip && sTooltip.length > 0 && sTooltip.trim().length === 0) {
        return true;
      } else {
        return false;
      }
    };

    return CustomTile;
  }
);
