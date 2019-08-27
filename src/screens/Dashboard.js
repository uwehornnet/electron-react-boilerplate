import React from 'react';
import {connect} from 'react-redux';
import NavigationSidebar from "../components/NavigationSidebar";
import {withRouter} from "react-router-dom";
import TaskList from "../components/TaskList";
import Details from "../components/Details";

class Dashboard extends React.Component {
	
	state = {
		currentTaskId: null,
		showDetails: false
	};
	
	handleTaskClick = (currentTaskId) => {
		this.setState({
			currentTaskId,
			showDetails: true
		})
	};
	
	handleTaskDelete = (id) => {
		this.setState({
			showDetails: false,
			currentTaskId: null
		})
		
		this.props.deleteTask(id)
	};
	
	render() {
		
		let render = null;
		
		if (this.state.showDetails) {
			render = (<Details type="task" id={this.state.currentTaskId}/>);
		}
		
		return (
			<div className="dashboard">
				<NavigationSidebar/>
				<div className="dashboard__columns">
					<div className="dashboard__column">
						<div className="dashboard__column--header">
							<h2>Inbox</h2>
						</div>
						
						<TaskList handleTaskClick={this.handleTaskClick} handleTaskDeleting={this.handleTaskDelete}/>
					</div>
					<div className="dashboard__column">
						{render}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.ProjectReducer,
		tasks: state.TaskReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteTask: (id) => dispatch({
			type: 'DELETE_TASK',
			payload: id
		})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));