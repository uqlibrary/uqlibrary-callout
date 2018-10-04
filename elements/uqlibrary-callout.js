(function () {
  Polymer({
    is: 'uqlibrary-callout',
    properties: {
      /**
       * Holds menu item objects for the call out
       */
      menuItems: {
        type: Array,
        value: []
      },
      /**
       * Holds the summary for this call out
       */
      summary: {
        type: Object
      },
      /**
       * Width of the main container
       */
      containerWidth: {
        type: Number,
        value: 280
      },
      /**
       * JSON Menu object
       */
      menu: {
        type: Object,
        observer: '_menuChanged'
      },
      /**
       * A relative link to the JSON file containing menu items
       */
      jsonFile: {
        type: String
      },
      /**
       * Whether to display an arrow
       */
      arrow: {
        type: Boolean,
        value: true,
        observer: "_generateArrowClass"
      },
      /**
       * Where the arrow should sit on the horizontal axis. "left", "center", "right"
       */
      arrowHorizontalAlign: {
        type: String,
        value: "center",
        observer: "_generateArrowClass"
      },
      /**
       * Whether the chat is online
       */
      _chatOnline: {
        type: Boolean,
        value: false,
        observer: '_checkDisabledStatus'
      },

      /**
       * Internal property that holds the class for the arrow
       */
      _arrowClass: {
        type: String,
        value: ""
      }
    },
    ready: function () {
      var self = this;
      this.$.chatStatusApi.addEventListener('uqlibrary-api-chat-status-loaded', function(e) {
        if(e.detail && e.detail.hasOwnProperty('online')) {
          self._chatOnline = e.detail.online;
        }
      });

      this.$.chatStatusApi.get();

      if (this.jsonFile) {
        this._fromJSONFile(this.jsonFile);
      }

      this._generateArrowClass();
    },
    /**
     * Generates the arrow class
     * @private
     */
    _generateArrowClass: function () {
      if (this.arrow) {
        this._arrowClass = " arrow " + this.arrowHorizontalAlign;
      } else {
        this._arrowClass = "";
      }
    },
    /**
     * Called when the menu object changes
     * @private
     */
    _menuChanged: function () {
      if (this.menu) {
        this._parseJSON(this.menu);
      }
    },
    /**
     * Reads a JSON file and populates the files
     * @param jsonFile
     * @private
     */
    _fromJSONFile: function (jsonFile) {
      var self = this;

      var xobj = new XMLHttpRequest();
      var fileName = this.resolveUrl(jsonFile);
      xobj.open('GET', fileName, true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          self.menu = JSON.parse(xobj.responseText);
        }
      };
      xobj.send(null);
    },
    /**
     * Parses a menu JSON object and sets the menu items
     * @param json
     * @private
     */
    _parseJSON: function (json) {
      this.menuItems = json.items;
      this.summary = json.summary;

      this._checkDisabledStatus();
      this.fire("uqlibrary-callout-loaded");
    },
    /**
     * Returns the relevant link for this item
     * @param item
     * @returns {*}
     * @private
     */
    _link: function (item) {
      if (item.linkMobile && this._isMobile()) {
        return item.linkMobile;
      } else {
        return item.link;
      }
    },
    /**
     * Called when any item is clicked. Fires an event and redirects the user to the given link
     * @param e
     * @private
     */
    _itemClicked: function (e) {
      this.fire("uqlibrary-callout-link-clicked", this._link(e.model.item));

      // Check if this item has a custom "target" attribute
      if (e.model.item.target) {
        if (this._isMobile()) {
          // On mobile we ignore the targetOptions
          window.open(this._link(e.model.item), e.model.item.target);
        } else {
          window.open(this._link(e.model.item), e.model.item.target, e.model.item.targetOptions || "");
        }
      } else {
        window.location = this._link(e.model.item);
      }
    },
    /**
     * Called when the summary is clicked
     * @param e
     * @private
     */
    _summaryClicked: function (e) {
      if (this.summary.link) {
        this.fire("uqlibrary-callout-summary-clicked", this.summary.link);
        window.location = this.summary.link;
      }
    },
    /**
     * Returns whether the user is on a mobile device
     * @returns {boolean}
     * @private
     */
    _isMobile: function () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Called when the chat status has changed. Updates all items' disabled status
     * @private
     */
    _checkDisabledStatus: function () {
      for (var i = 0; i < this.menuItems.length; i++) {
        var item = this.menuItems[i];

        if (item.isDisabled != (item.disabled === 'chat-offline' && !this._chatOnline)) {
          item.isDisabled = (item.disabled === 'chat-offline' && !this._chatOnline);
          //notify that object's property in array has changed
          this.notifyPath('menuItems.' + i + '.isDisabled', item.isDisabled);
        }
      }
    }
  });
})();