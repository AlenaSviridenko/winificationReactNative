import React, { Component } from 'react';
import {
    Text,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import {Button, Container} from 'native-base';

import { validate } from '../helpers/Validator';
import EditableItemForm from './EditableItemForm';
import { modelSave } from '../actions';
import { Common } from '../styles/Styles';

class AddItemScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameError: '',
            countryError: '',
            descError: '',
            priceError: '',
            availableError: '',
            yearError: '',
            imageError: '',
            thumbnailError: ''
        }
    }

    onSavePress() {
        const nameError = validate('name', this.props.model.name);
        const countryError = validate('country', this.props.model.country);
        const descError = validate('desc', this.props.model.desc);
        const priceError = validate('price', this.props.model.price);
        const availableError = validate('available', this.props.model.available);
        const yearError = validate('year', this.props.model.year);
        const imageError = validate('image', this.props.model.image);
        const thumbnailError = validate('thumbnail', this.props.model.thumbnail);

        this.setState({
            nameError,
            countryError,
            descError,
            priceError,
            availableError,
            yearError,
            imageError,
            thumbnailError
        });

        if (nameError || countryError || descError || priceError || availableError || yearError || imageError || thumbnailError) {
            return;
        }

        this.props.modelSave(this.props.model);
    }

    renderButton() {
        const buttonContent = this.props.loading ? <ActivityIndicator size='large'/> : <Text>SAVE</Text>;

        return (
            <Button block light style={Common.button} onPress={this.onSavePress.bind(this)}>
                {buttonContent}
            </Button>
        )
    }

    render() {

        return (
            <Container>
                <ScrollView>
                    <EditableItemForm
                        model={this.props.model}
                        errors={this.state}
                        onError={({prop, error}) => {
                            this.setState({[prop]: error});
                        }}
                    />
                    <Text style={Common.errorText}>
                        {this.props.error}
                    </Text>
                    <Text style={Common.successText}>
                        {this.props.message}
                    </Text>
                    {this.renderButton()}
                </ScrollView>
            </Container>
        );
    }
}

const styles = {
    container: Common.container
};

const mapStateToProps = (state) => {
    const { model } = state;
    const { loading, error } = state.model;
    return { model, loading, error };
};

export default connect(mapStateToProps, {
    modelSave
})(AddItemScreen);