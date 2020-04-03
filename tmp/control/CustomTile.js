"use strict";

sap.ui.define(["sap/ui/core/Control", "./CustomTileRenderer", "sap/m/library", "sap/m/Text", "sap/ui/thirdparty/jquery"], function (Control, CustomTileRenderer, library, Text, jQuery) {
  var FrameType = library.FrameType,
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

  var CustomTile = Control.extend("com.hcl.customtile.control.CustomTile", {
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
        header: {
          type: "string",
          group: "Appearance",
          defaultValue: null
        },

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
        band: {
          type: "string",
          group: "Appearance",
          defaultValue: null
        },

        /**
         * The joined of the tile.
         */
        joined: {
          type: "string",
          group: "Appearance",
          defaultValue: null
        },

        /**
         * The TEX label of the tile.
         */
        texLabel: {
          type: "string",
          group: "Appearance",
          defaultValue: null
        },

        /**
         * The TEX value of the tile.
         */
        texVal: {
          type: "string",
          group: "Appearance",
          defaultValue: null
        },

        /**
         * The REX label of the tile.
         */
        rexLabel: {
          type: "string",
          group: "Appearance",
          defaultValue: null
        },

        /**
         * The TEX label of the tile.
         */
        rexVal: {
          type: "string",
          group: "Appearance",
          defaultValue: null
        },

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
        url: {
          type: "sap.ui.core.URI",
          group: "Misc",
          defaultValue: null
        },

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
        width: {
          type: "sap.ui.core.CSSSize",
          group: "Appearance"
        }
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
            scope: {
              type: "sap.m.GenericTileScope"
            },

            /**
             * The action that was pressed on the tile. In the Actions scope, the available actions are Press and Remove.
             * In Display scope, the parameter value is only Press.
             * @since 1.46.0
             */
            action: {
              type: "string"
            },

            /**
             * The pressed DOM Element pointing to the GenericTile's DOM Element in Display scope.
             * In Actions scope it points to the more icon, when the tile is pressed, or to the DOM Element of the remove button, when the remove button is pressed.
             * @since 1.46.0
             */
            domRef: {
              type: "any"
            }
          }
        }
      }
    }
  });

  CustomTile.prototype.init = function () {
    this._oTitle = new Text(this.getId() + "-title");

    this._oTitle.addStyleClass("customTileHeader");

    this._oTitle.cacheLineHeight = false;
    this.setAggregation("_titleText", this._oTitle, true);

    this._oTitle.setProperty("maxLines", 1, true);
  };

  CustomTile.prototype.exit = function () {};

  CustomTile.prototype.renderer = function (oRm, oControl) {
    CustomTileRenderer.render(oRm, oControl);
  };

  CustomTile.prototype.onAfterRendering = function () {
    // if I need to do any post render actions, it will happen here
    if (sap.ui.core.Control.prototype.onAfterRendering) {
      sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); // run the super class's method first
    }
  };

  CustomTile.prototype.setWrappingType = function (sWrappingType) {
    this.setProperty("wrappingType", sWrappingType, true);

    this._oTitle.setWrappingType(sWrappingType); // this._oFailedText.setWrappingType(sWrappingType);
    // this._oSubTitle.setWrappingType(sWrappingType);


    return this;
  }; // CustomTile.prototype.setSubheader = function(sSubheader) {
  //   this.setProperty("subheader", sSubheader);
  //   this._oSubTitle.setText(sSubheader);
  //   return this;
  // };


  CustomTile.prototype.getHeader = function () {
    return this._oTitle.getText();
  };

  CustomTile.prototype.setHeader = function (title) {
    this.setProperty("header", title);

    this._oTitle.setText(title);

    return this;
  };

  CustomTile.prototype._setTooltipFromControl = function () {
    var sTooltip = "";
    var bIsFirst = true;

    if (this._oTitle.getText()) {
      sTooltip = this._oTitle.getText();
      bIsFirst = false;
    }

    if (this.getSubheader()) {
      sTooltip += (bIsFirst ? "" : "\n") + this.getSubheader();
      bIsFirst = false;
    } // when user does not set tooltip, apply the tooltip below


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

  return CustomTile;
});