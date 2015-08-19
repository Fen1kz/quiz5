export default ['$templateCache', '$compile', 'quizService', directive]

import _ from 'lodash';

function directive($templateCache, $compile, quizService) {
	return {
		restrict: 'E'
		//, replace: true
		, scope: {
			index: '='
			, type: '@'
			, result: '='
		}
		, compile: (element, attrs) =>
			(scope, element, attrs) => {
				let template = $templateCache.get(`app/quiz/qz-questions/question.${attrs.type}.tpl.html`);
				element.html(template);
				$compile(element.contents())(scope);
			}
		, bindToController: true
		, controller: controllerFactory()
		, controllerAs: 'questionCtrl'
	};
}

function controllerFactory() {
	return ['$scope', 'quizService', function ($scope, quizService) {
		let ctrl = this;
		ctrl.question = quizService.quiz().questions[ctrl.index];
		$scope.$watchCollection('questionCtrl.answer', () => {
			quizService.answer(ctrl.question, ctrl.answer);
		});
		$scope.$on('QUIZ.ENDED', (e) => {
		});
		ctrl.events = {
			link: {
				start: linkStart.bind(this)
			}
		};

		ctrl.util = {
			multi: {
				toggle: (index) => {
					ctrl.answer[index] = !ctrl.answer[index];
				}
				, checked: (index) => {
					return ctrl.answer[index];
				}
			}
		}

		if (ctrl.events[ctrl.type] && ctrl.events[ctrl.type].start) {
			ctrl.events[ctrl.type].start();
		}
	}]
}

function linkStart() {
	let ctrl = this;
	ctrl.cols = _.zip(ctrl.question.col1, ctrl.question.col2);
	console.log('start!');

	ctrl.model = { "class": "go.GraphLinksModel",
		"linkLabelKeysProperty": "labelKeys",
		"nodeDataArray": [
			{"key":"Alpha", "color":"orange", "loc":"27 14"},
			{"key":"Beta", "color":"lightgreen", "loc":"128 14"},
			{"key":"Gamma", "color":"yellow", "loc":"29 86"},
			{"key":"Delta", "color":"lightblue", "loc":"129 84"},
			{"key":"A-B", "category":"LinkLabel" },
			{"key":"G-D", "category":"LinkLabel" },
			{"key":"A-G", "category":"LinkLabel" },
			{"key":"A-G-D", "category":"LinkLabel" },
			{"key":"A-B-G-D", "category":"LinkLabel" }
		],
		"linkDataArray": [
			{"from":"Alpha", "to":"Beta", "labelKeys":[ "A-B" ]},
			{"from":"Gamma", "to":"Delta", "labelKeys":[ "G-D" ]},
			{"from":"Alpha", "to":"Gamma", "labelKeys":[ "A-G" ]},
			{"from":"Alpha", "to":"G-D", "labelKeys":[ "A-G-D" ], "category":"linkToLink"},
			{"from":"A-B", "to":"G-D", "labelKeys":[ "A-B-G-D" ], "category":"linkToLink"}
		]};

	setTimeout(() => {
		init();
	}, 1000);
	let myDiagram;

	function init() {
		let $ = go.GraphObject.make;
		myDiagram = $(go.Diagram, `qz-question-${ctrl.index}`, {
			initialContentAlignment: go.Spot.Center,
			"LinkDrawn": maybeChangeLinkCategory,     // these two DiagramEvents call a
			"LinkRelinked": maybeChangeLinkCategory,  // function that is defined below
			"undoManager.isEnabled": true
		});

		// the regular node template, which supports user-drawn links from the main Shape
		myDiagram.nodeTemplate = $("Node", "Auto", {
				locationSpot: go.Spot.Center,
				layerName: "Background"
			},  // always have regular nodes behind Links
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			$("Shape", "Ellipse",
				{
					fill: "white",
					portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
				},
				new go.Binding("fill", "color")),
			$("TextBlock",
				{margin: 2},  // make some extra space for the shape around the text
				new go.Binding("text", "key"))  // the label shows the node data's key
		);

		// This is the template for a label node on a link: just an Ellipse.
		// This node supports user-drawn links to and from the label node.
		myDiagram.nodeTemplateMap.add("LinkLabel",
			$("Node",
				{
					selectable: false, avoidable: false,
					layerName: "Foreground"
				},  // always have link label nodes in front of Links
				$("Shape", "Ellipse",
					{
						width: 5, height: 5, stroke: null,
						portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
					})
			));

		// the regular link template, a straight blue arrow
		myDiagram.linkTemplate =
			$("Link",
				{relinkableFrom: true, relinkableTo: true, toShortLength: 2},
				$("Shape", {stroke: "blue", strokeWidth: 2}),
				$("Shape", {fill: "blue", stroke: null, toArrow: "Standard"})
			);

		// This template shows links connecting with label nodes as green and arrow-less.
		myDiagram.linkTemplateMap.add("linkToLink",
			$("Link",
				{relinkableFrom: true, relinkableTo: true},
				$("Shape", {stroke: "green", strokeWidth: 1.5})
			));


		// GraphLinksModel support for link label nodes requires specifying two properties.
		myDiagram.model =
			$(go.GraphLinksModel,
				{linkLabelKeysProperty: "labelKeys"});

		// Whenever a new Link is drawng by the LinkingTool, it also adds a node data object
		// that acts as the label node for the link, to allow links to be drawn to/from the link.
		myDiagram.toolManager.linkingTool.archetypeLabelNodeData =
		{category: "LinkLabel"};

		// this DiagramEvent handler is called during the linking or relinking transactions
		function maybeChangeLinkCategory(e) {
			var link = e.subject;
			var linktolink = (link.fromNode.isLinkLabel || link.toNode.isLinkLabel);
			e.diagram.model.setCategoryForLinkData(link.data, (linktolink ? "linkToLink" : ""));
		}

		load();
	}

// Show the diagram's model in JSON format
	function save() {
		document.getElementById("mySavedModel").value = myDiagram.model.toJson();
		myDiagram.isModified = false;
	}

	function load() {
		myDiagram.model = go.Model.fromJson(ctrl.model);
	}
};
