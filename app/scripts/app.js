/** @jsx React.DOM */
var React = window.React = require('react');
var Growl = require('./Growl/growl.react');

var DemoApp = React.createClass({

	growler: null,
	wrapper: null,

	componentWillMount: function() {
		/**
		* Example usage.
		*
		* If you do not have CSS transitions setup on each growl, you will need to call Growl.noAnimations()
		* otherwise the growls will not be removed after the delay.
		*
		* When setting the delay(ms), include any time you have for the animation you use to show the growl. (2s animation + 6s visible = 8s)
		*
		*/
		//Growl.noAnimations();
		Growl.setDelay(5000);
	},

	componentDidMount: function() {
		if(this.wrapper === null) {
			this.wrapper = this.getDOMNode();
		}

		this.growler = this.refs.growler;

		var self = this;

	},

	/*
	 * Somewhere in your app, you need a function that gets called and can reference the DemoApp.growler variable
	 * and call addNotification. Feel free to put in actions or in a App Model change observer, or leave in your root
	 * controller component.
	 *
	 */
	notify: function(level, msg) {
		this.growler.addNotification({ level: level, msg: msg });
	},

	/*
	 * This just for demo.
	 */
	handleNotificationTrigger: function(e) {
		e.preventDefault();
		var form = e.target;
		var lvl = document.getElementById('growlLevel').value;
		var msg = document.getElementById('growlMsg').value;

		this.notify(lvl, msg);
	},


	/*
	 * Recommend creating the Growl component at the top-most level of you app that you can
	 * in order to make layout and redraws work optimally.
	 *
	 */
	render: function() {
		return (React.createElement("div", {className: "component-demo-app"},
      React.createElement(Growl, {ref: "growler"}),
      React.createElement("form", {onSubmit: this.handleNotificationTrigger},
        React.createElement("h3", null, "Trigger a growl notification."),
        React.createElement("select", {name: "level", id: "growlLevel"},
          React.createElement("option", {value: "info"}, "Info"),
          React.createElement("option", {value: "warn"}, "Warn"),
          React.createElement("option", {value: "error"}, "Error"),
          React.createElement("option", {value: "success"}, "Success")
        ),
        React.createElement("input", {type: "text", name: "msg", id: "growlMsg"}),
        React.createElement("input", {type: "submit", value: "Growl!"})
      )
    )
		);
	}

});

React.render(
  React.createElement(DemoApp, null),
  document.getElementById('appStage')
);
