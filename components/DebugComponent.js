import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button} from 'react-native';

export default class DebugComponent extends Component {

	constructor() {
		super();
		this.state = {

		}
	}

	static defaultProps = {
	}

	render() {
		const {navigate} = this.props.navigation;

		return (
			<View>
				<Button
					title="Generate Letters"
					onPress={() => navigate('Generate')}
				>
				</Button>

				<Button
					title="Timer"
					onPress={() => navigate('Timer')}
				>
				</Button>

				<Button
					title="Scores"
					onPress={() => navigate('Scores')}
				>
				</Button>

			</View>
		)

	}
}