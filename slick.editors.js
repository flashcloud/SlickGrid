/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Editors": {
        "Text": TextEditor,
        "Integer": IntegerEditor,
        "Date": DateEditor,
        "YesNoSelect": YesNoSelectEditor,
        "Checkbox": CheckboxEditor,
        "PercentComplete": PercentCompleteEditor,
        "LongText": LongTextEditor,
        "Number": NumberEditor,
        "YesNoCheckBox": YesNoCheckboxEditor,
        "Start": StarEditor,
        "DoubleSelect": DoubleSelectEditor,
        "AutoComplete": AutoCompleteEditor,
        "DiffentOptionsSelect": DiffentOptionsSelectEditor
      }
    }
  });

  function TextEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />")
          .appendTo(args.container)
          .bind("keydown.nav", function (e) {
            if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
              e.stopImmediatePropagation();
            }
          })
          .focus()
          .select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.getValue = function () {
      return $input.val();
    };

    this.setValue = function (val) {
      $input.val(val);
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val());
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  function IntegerEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");

      $input.bind("keydown.nav", function (e) {
        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

      $input.appendTo(args.container);
      $input.focus().select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (isNaN($input.val())) {
        return {
          valid: false,
          msg: "Please enter a valid integer"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  function DateEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    var calendarOpen = false;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");
      $input.appendTo(args.container);
      $input.focus().select();
      $input.datepicker({
        showOn: "button",
        buttonImageOnly: true,
        buttonImage: "../images/calendar.gif",
        beforeShow: function () {
          calendarOpen = true
        },
        onClose: function () {
          calendarOpen = false
        }
      });
      $input.width($input.width() - 18);
    };

    this.destroy = function () {
      $.datepicker.dpDiv.stop(true, true);
      $input.datepicker("hide");
      $input.datepicker("destroy");
      $input.remove();
    };

    this.show = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).show();
      }
    };

    this.hide = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).hide();
      }
    };

    this.position = function (position) {
      if (!calendarOpen) {
        return;
      }
      $.datepicker.dpDiv
          .css("top", position.top + 30)
          .css("left", position.left);
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  function YesNoSelectEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
      $select.appendTo(args.container);
      $select.focus();
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
      $select.select();
    };

    this.serializeValue = function () {
      return ($select.val() == "yes");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return ($select.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  function CheckboxEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
      $select.appendTo(args.container);
      $select.focus();
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      defaultValue = !!item[args.column.field];
      if (defaultValue) {
        $select.attr("checked", "checked");
      } else {
        $select.removeAttr("checked");
      }
    };

    this.serializeValue = function () {
      return !!$select.attr("checked");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (this.serializeValue() !== defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  function PercentCompleteEditor(args) {
    var $input, $picker;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-percentcomplete' />");
      $input.width($(args.container).innerWidth() - 25);
      $input.appendTo(args.container);

      $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
      $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

      $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

      $input.focus().select();

      $picker.find(".editor-percentcomplete-slider").slider({
        orientation: "vertical",
        range: "min",
        value: defaultValue,
        slide: function (event, ui) {
          $input.val(ui.value)
        }
      });

      $picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
        $input.val($(this).attr("val"));
        $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
      })
    };

    this.destroy = function () {
      $input.remove();
      $picker.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
    };

    this.validate = function () {
      if (isNaN(parseInt($input.val(), 10))) {
        return {
          valid: false,
          msg: "Please enter a valid positive number"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  /*
   * An example of a "detached" editor.
   * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
   * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
   */
  function LongTextEditor(args) {
    var $input, $wrapper;
    var defaultValue;
    var scope = this;

    this.init = function () {
      var $container = $("body");

      $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
          .appendTo($container);

      $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
          .appendTo($wrapper);

      $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
          .appendTo($wrapper);

      $wrapper.find("button:first").bind("click", this.save);
      $wrapper.find("button:last").bind("click", this.cancel);
      $input.bind("keydown", this.handleKeyDown);

      scope.position(args.position);
      $input.focus().select();
    };

    this.handleKeyDown = function (e) {
      if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
        scope.save();
      } else if (e.which == $.ui.keyCode.ESCAPE) {
        e.preventDefault();
        scope.cancel();
      } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
        e.preventDefault();
        args.grid.navigatePrev();
      } else if (e.which == $.ui.keyCode.TAB) {
        e.preventDefault();
        args.grid.navigateNext();
      }
    };

    this.save = function () {
      args.commitChanges();
    };

    this.cancel = function () {
      $input.val(defaultValue);
      args.cancelChanges();
    };

    this.hide = function () {
      $wrapper.hide();
    };

    this.show = function () {
      $wrapper.show();
    };

    this.position = function (position) {
      $wrapper
          .css("top", position.top - 5)
          .css("left", position.left - 5)
    };

    this.destroy = function () {
      $wrapper.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  function NumberEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");

      $input.bind("keydown.nav", function (e) {
        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

      $input.appendTo(args.container);
      $input.focus().select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return parseFloat($input.val()) || 0.00;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (isNaN($input.val()))
        return {
          valid: false,
          msg: "Please enter a valid integer"
        };

      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  function YesNoCheckboxEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<INPUT type=checkbox class='editor-checkbox' hideFocus>");
      $select.appendTo(args.container);
      $select.focus();
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      if (defaultValue) {
        $select.attr("checked", "checked");
      } else {
        $select.removeAttr("checked");
      }
    };

    this.serializeValue = function () {
      return $select[0].checked;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      var currentValue = $select[0].checked;
      return (currentValue != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $select.parent();
    };

    this.init();
  }

  //for jQuery Start Plugin
  function StarEditor(agrs) {
    var $input;
    var defaultValue;
    var scope = this;

    function toggle(e) {
      if (e.type == "keydown" && e.which != 32) return;

      if ($input.css("opacity") == "1")
        $input.css("opacity", 0.5);
      else
        $input.css("opacity", 1);

      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    this.init = function () {
      $input = $("<IMG src='../images/bullet_star.png' align=absmiddle tabIndex=0 title='Click or press Space to toggle' />")
        .bind("click keydown", toggle)
        .appendTo(args.container)
        .focus();
    };

    this.destroy = function () {
      $input.unbind("click keydown", toggle);
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.css("opacity", defaultValue ? 1 : 0.2);
    };

    this.serializeValue = function () {
      return ($input.css("opacity") == "1");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return defaultValue != ($input.css("opacity") == "1");
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  function DoubleSelectEditor(args) {
    var $from, $to;
    var scope = this;
    var originValue = args.item[args.column.field].split('-');
    var staticValue = originValue[2] + '-' + originValue[3]
    var from_choices = args.column.from_choices;
    var to_choices = args.column.to_choices;
    var from_field = args.column.from_field;
    var to_field = args.column.to_field;
    var defaultValue;
    var boxWidth = 200;
    var offsetWith = boxWidth * 2 + 70;
    this.init = function () {

      $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:3px;margin:-3px 0 0 -7px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
        .appendTo(args.container);

      $from = $("<select class='chzn-select' style='width: " + boxWidth + "px;'></select>")
        .appendTo($wrapper);

      $wrapper.append("&nbsp; <span>-</span> &nbsp;");

      $to = $("<select class='chzn-select' style='width: " + boxWidth + "px;'></select>")
        .appendTo($wrapper);
      $wrapper.append(' <span>-' + staticValue + '</span>');
      var from_options = "", to_options = '';
      $.each(from_choices, function () {
        from_options += "<option value='" + this.id + "' code='" + this.code + "'>" + this.name + "</option>";
      });
      $.each(to_choices, function () {
        to_options += "<option value='" + this.id + "' code='" + this.code + "'>" + this.name + "</option>";
      });
      $from.html(from_options);
      $to.html(to_options);
      scope.focus();
      var winWith = $(window).width(),
        offsetLeft = $wrapper.offset().left;
      if (winWith - offsetLeft < offsetWith)
        $wrapper.offset({left: winWith - offsetWith})
    };

    this.destroy = function () {
      $(args.container).empty();
    };

    this.focus = function () {
      $from.focus();
    };

    this.serializeValue = function () {
      var stateH = {};
      stateH[from_field + '_value'] = $from.val();
      stateH[to_field + '_value'] = $to.val();
      stateH[from_field + '_code'] = $('option:selected', $from).attr('code');
      stateH[to_field + '_code'] = $('option:selected', $to).attr('code');
      stateH[from_field + '_text'] = $('option:selected', $from).text();
      stateH[to_field + '_text'] = $('option:selected', $to).text();
      return stateH;
    };

    this.applyValue = function (item, state) {
      item[from_field] = state[from_field + '_value'];
      item[to_field] = state[to_field + '_value'];
      item[args.column.field] = state[from_field + '_code'] + '-' + state[to_field + '_code'] + '-' + staticValue;
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field].split('-');
      $('option[code="' + defaultValue[0] + '"]', $from).attr("selected", "selected");
      $('option[code="' + defaultValue[1] + '"]', $to).attr("selected", "selected");
      $to.chosen();
      $from.chosen();
    };

    this.isValueChanged = function () {
      return args.item.from != $from.val() || args.item.to != $to.val();
    };

    this.validate = function () {
      return {valid: true, msg: null};
    };

    this.getCell = function () {
      return $from.parent();
    };

    this.init();
  }

  /**
   *
   * @param args.column.editorOptions:
   *      source: autocomplete's source opotion
   *      type: 'ajax' or 'array'
   *      postData:{termField}
   *      selectedIdField:   selected value will be store grid column field name (grid data item object property name)
   */
  function AutoCompleteEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    var autocompleteActive = false;
    var selDropdownItem;
    var gridItem = args.item;


    if (!args.column.editorOptions)
      throw  'must define editorOptions property in column config';
    var editorOptions = args.column.editorOptions;

    var $container = $(args.container);

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");

      $input.bind("keydown.nav", function (e) {
        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT || (isListOpen && (e.keyCode === $.ui.keyCode.UP || e.keyCode === $.ui.keyCode.DOWN))) {
          e.stopPropagation();
        }
      });

      var autoSource;
      if (editorOptions.type == 'ajax') {
        autoSource = function (request, response) {
          $.ajax({
            type: 'POST',
            url: editorOptions.source,
            data: {
              termField: editorOptions.postData ? editorOptions.postData.termField : '',
              term: request.term
            },
            success: function (data) {
              response($.map(data, function (item) {
                return {
                  id: item.id,
                  label: item.label,
                  value: item.value,
                  fullData: item.fullData
                }
              }));
            }
          });
        };
      } else
        autoSource = editorOptions.source;

      var isListOpen = false;
      $input.autocomplete({
        source: autoSource,
        minLength: 1,
        select: function (event, ui) {
          $input.val(ui.item.value);
          selDropdownItem = ui.item;
        },
        open: function (event, ui) {
          isListOpen = true;

          // Fine-tune the style drop-down list
          var $list = $('.ui-autocomplete');
          var border = 0;
          if ($.browser.mozilla)
            border = 1;
          $list.css({
            'width': ( args.column.editorOptions.width ? args.column.editorOptions.width : parseInt($input.css('width')) + parseInt($container.css('padding-right')) - border) + 'px',
            'left': args.position.left + 1 + 'px',
            'top': args.position.bottom + 'px'
          })
            .removeClass('ui-corner-all').addClass('ui-corner-bottom');
        },
        close: function (event, ui) {
          isListOpen = false
        }
      });
      $input.appendTo(args.container);
      $input.focus().select();
    };
    this.destroy = function () {
      $input.remove();
    };
    this.focus = function () {
      $input.focus();
    };
    this.setValue = function (value) {
      $input.val(value);
      defaultValue = value;
    };
    this.getValue = function () {
      return $input.val();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      if (selDropdownItem) {
        item[args.column.field] = state;

        if (editorOptions.selectedIdField && item[editorOptions.selectedIdField] !== undefined)
          item[editorOptions.selectedIdField] = selDropdownItem.id;

        $.isFunction(args.column.editorOptions.onSelectItem) && args.column.editorOptions.onSelectItem(item, selDropdownItem.fullData);
      }
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };
    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator(scope.getValue());
        if (!validationResults.valid) return validationResults;
      }

      if (editorOptions.selectedIdField && gridItem[editorOptions.selectedIdField] == undefined && (selDropdownItem == null || selDropdownItem === undefined)) {
        return {
          valid: false,
          msg: 'please select one!'
        };
      }
      return {
        valid: true,
        msg: null
      };
    };

    this.handleKeyDown = function (e) {
      switch (e.which) {
        case 9:
        // tab
        case 13:
        // enter
        case 27:
          /* esc */
          autocompleteActive = false;
          $input.setOptions({
            ignoreKeydownEvents: true
          });
          $input.blur();
          return false;
        case 37:
        // left
        case 39:
        // right
        case 38:
        // up
        case 40:
          // down
          return autocompleteActive;
        case 113:
          // F2
          autocompleteActive = true;
          $input.setOptions({
            ignoreKeydownEvents: false
          });
          $input.caret(9999, 9999);
          return true;
        default:
          autocompleteActive = true;
          $input.setOptions({
            ignoreKeydownEvents: false
          });
          return true;
      }
    };

    this.getCell = function () {
      return $input.parent();
    };

    this.init();
  }

  /**
   *  Normal Select Cell Editor, and each row has diffrent select options
   *  diffent options defined in data[i].selectOptions[fieldName][j].label  and  data[i].selectOptions[fieldName][j].value
   *  the selected option value store to data[i].[fieldName+'id'] if this [fieldName+'id'] item is exists.
   * @param args
   */
  function DiffentOptionsSelectEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;
    var gridItem = args.item;

    var selectValueProp = null;

    this.init = function () {

      if (!gridItem.selectOptions || gridItem.selectOptions[args.column.field] === undefined) {
        //'must define Select options property in data[i].selectOptions[fieldName].label  and  data[i].selectOptions[fieldName].value';
        return;
      }

      var option_str = '';
      selectValueProp = gridItem[args.column.field + 'Id'] !== undefined && (args.column.field + 'Id') ||
        gridItem[args.column.field + 'iD'] !== undefined && (args.column.field + 'iD') ||
        gridItem[args.column.field + 'ID'] !== undefined && (args.column.field + 'ID') ||
        gridItem[args.column.field + 'id'] !== undefined && (args.column.field + 'id') || null;

      var selectOptions = gridItem.selectOptions[args.column.field];
      for (var i = 0; i < selectOptions.length; i++) {
        var selItem = selectOptions[i];
        var opt_label = selItem.label;
        var opt_value = selItem.value;
        option_str += "<OPTION value='" + opt_value + "'>" + opt_label + "</OPTION>";
      }
      $select = $("<SELECT tabIndex='0' class='editor-select'>" + option_str + "</SELECT>");
      $select.appendTo(args.container);

      if (args.column.editorOptions !== undefined && $.isFunction(args.column.editorOptions.onSelectItem)) {
        $select.change(function () {
          var selIndex = $select.get(0).selectedIndex;
          args.column.editorOptions.onSelectItem(gridItem, selIndex);
        });
      }

      $select.focus();
    };

    this.destroy = function () {
      $select && $select.remove();
    };

    this.focus = function () {
      $select && $select.focus();
    };

    this.loadValue = function (item) {
      if (selectValueProp)
        defaultValue = gridItem[selectValueProp];
      else
        defaultValue = item[args.column.field];
      $select && $select.val(defaultValue);
    };

    this.serializeValue = function () {
      if (!$select)  return;

      if (selectValueProp)
        gridItem[selectValueProp] = $select.val();
      return $('option:selected', $select).text();
    };

    this.applyValue = function (item, state) {
      $select && (item[args.column.field] = state);
    };

    this.isValueChanged = function () {
      return $select && ($select.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.getCell = function () {
      return $select.parent();
    };

    this.init();
  }

})(jQuery);
