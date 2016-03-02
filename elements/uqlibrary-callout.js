(function () {
  Polymer({
    is: 'uqlibrary-callout',
    properties: {
      /**
       * Holds menu item objects for the call out
       */
      menuItems: {
        type: Array,
        value: [],
        observer: '_checkDisabledStatus'
      },
      /**
       * Holds the summary for this call out
       */
      summary: {
        type: Object
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
       * Whether the chat is online
       */
      _chatOnline: {
        type: Boolean,
        value: false,
        observer: '_checkDisabledStatus'
      },
      /**
       * Url to check the status of the chat
       */
      _chatStatusUrl: {
        type: String,
        value: "https://api2.libanswers.com/1.0/chat/widgets/status/1871"
      }
    },
    ready: function () {
      this._checkChatStatus();

      if (this.jsonFile) {
        this._fromJSONFile(this.jsonFile);
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
      this.fire("uqlibrary-callout-link-clicked", e.model.item);

      window.location = this._link(e.model.item);
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
     * Checks the chat status. CORS issues force a mock "true" if the mock cookie is set
     * @private
     */
    _checkChatStatus: function () {
      var self = this;

      // Mock
      if (document.cookie.indexOf("UQLMockData") >= 0) {
        self._chatOnline = true;
      }

      var xobj = new XMLHttpRequest();
      xobj.open('GET', this._chatStatusUrl, true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          var json = JSON.parse(xobj.responseText);
          self._chatOnline = json.online;
        }
      };
      xobj.send(null);
    },
    /**
     * Called when the chat status has changed. Updates all items' disabled status
     * @private
     */
    _checkDisabledStatus: function () {
      for (var i = 0; i < this.menuItems.length; i++) {
        var item = this.menuItems[i];
        if (item.disabled == "chat-offline" && !this._chatOnline) {
          item.isDisabled = true;
        } else {
          item.isDisabled = false;
        }
      }
    }
  });
})();