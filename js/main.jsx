var React = require('react');
var ReactDOM = require('react-dom');
//todo fix reference it should be require('react-addons-transition-group')
//but that doesn't work so....
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var StaticContent = require('./StaticContent');

	var HelloWorld = React.createClass({
	  render: function() {
		return (
			<p className = "inner">
				Hello, <input type="text" placeholder="Your name here" />!
				It is {this.props.date.toTimeString()}
			</p>
		);
	  }
	});

	//React class to simplify building a navbar
	var NavBar = React.createClass({
		render: function()
		{
			var internalLinks = this.props.internalLinks;
			var externalLinks = this.props.externalLinks;
			var activeIndex = this.props.ActiveIndex;
			return (
				<div className="NavBar">
					{this.props.logoImg}
					<ul className="internalLinks">
						{internalLinks.map(function(item, index){
						return <li key={index}>
								<a href={item.link} className={activeIndex == index ? "active" : null}>{item.text}</a>
							   </li>;
						})}
					</ul>
					<ul className="externalLinks">
						{externalLinks.map(function(item, index){
							return <li key={index}><a href={item.link}>{item.text}</a></li>;
						})}
					</ul>
				</div>
			);
		}
	});
	
	var NextPrevEl = React.createClass({
			render: function()
			{
				return (
					<div className= "nextPrev">
						<div id={this.props.prevId} onClick={this.props.prevClick}>&lt;</div>
						<div id={this.props.nextId} onClick={this.props.nextClick}>&gt;</div>
					</div>
				);
			}
			
		});
	
	var SectionSlideshow = React.createClass({
		getInitialState: function(){
			return {activeIndex: 0};
		},
		statics: {
			calculateActiveIndex: function(currentActiveIndex, sectionsLength, offset){
				var newActiveIndex = (currentActiveIndex + offset) % sectionsLength;
				if(newActiveIndex < 0)
					newActiveIndex = sectionsLength + newActiveIndex;
				return newActiveIndex;
				}
		},
		handleNextClick: function(){
			var newIndex = SectionSlideshow.calculateActiveIndex(this.state.activeIndex, this.props.sections.length, 1);
			this.setState({activeIndex: newIndex, dir: "next" });
		},
		handlePrevClick: function(){
			var newIndex = SectionSlideshow.calculateActiveIndex(this.state.activeIndex, this.props.sections.length, -1);
			this.setState({activeIndex: newIndex, dir: "prev" });
		},
		render: function()
		{
			var sections = this.props.sections;
			var mountedSectionIndex = this.state.activeIndex;
			var mountedSection = sections[mountedSectionIndex];
			var className = this.state.dir !== null ? "current " + this.state.dir : "current"; 
			
			return (
			<div>
				<ReactCSSTransitionGroup 
					transitionName="SectionSlideshow" 
					transitionEnterTimeout={300} 
					transitionLeave={false}
					//todo replace with own component 
					component="span"
					className="sectionWrapper"
					
					>
						<div className={className} key={mountedSectionIndex}>
							<h3>{mountedSection.heading}</h3>
							<p>{mountedSection.content}</p>
						</div>
				</ReactCSSTransitionGroup>
				<NextPrevEl nextId="sldNext" prevId="sldPrev" prevClick ={this.handlePrevClick} nextClick ={this.handleNextClick}/>
			</div>
			);
		}
	});

document.addEventListener("DOMContentLoaded", function (event) {
	var activeNode = 0;
	
	var internalLinks = [
			{link: "./resume", text: "Resume" },
			{link: "./blog", text: "Blog"},
			{link: "./playground", text: "Playground"}];
	var externalLinks = [{link: "https://github.com/buetowm/buetowm.github.io", text: "Code"}];
	var logoImg = <img src="./images/mb-icon.png" height="30px" width="30px"/>
	ReactDOM.render(
		<NavBar 
			internalLinks ={internalLinks}	externalLinks ={externalLinks} logoImg = {logoImg}/>
		,document.getElementById('navMain')
	  );
	
	ReactDOM.render(
		  <SectionSlideshow sections= {StaticContent.sections} activeIndex={activeNode} />,
		  document.getElementById('containerMain')
	)
	  
	  
	// ReactDOM.render(
	// 	<HelloWorld date={new Date()} />
	// 	,document.getElementById('containerMain')
	//   );
	//   
	// setInterval(function() {
	//   ReactDOM.render(
	// 	<HelloWorld date={new Date()} />
	// 	,document.getElementById('containerMain')
	//   );
	// }, 500)
});
