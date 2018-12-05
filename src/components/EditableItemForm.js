import React, { Component } from 'react';
import {
    Text,
    View,
    Keyboard,
    Picker,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import {CardItem, Card, Thumbnail} from 'native-base';

import { validate } from '../helpers/Validator';
import { FloatingLabelInput } from './common';
import { modelUpdate } from '../actions';
import { Common, Pages } from '../styles/Styles';

const { EditableItem } = Pages;

class EditableItemForm extends Component {

    render() {

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Card>
                    <CardItem style={Common.card}>
                        <FloatingLabelInput
                            value={this.props.model.name}
                            onChangeText={value => this.props.modelUpdate({prop: 'name', value})}
                            text='NAME*'
                            onBlur={() => this.props.onError({prop: 'nameError', error: validate('name', this.props.model.name)})}
                            error={this.props.errors.nameError}
                        />
                        <FloatingLabelInput
                            value={this.props.model.country}
                            onChangeText={value => this.props.modelUpdate({prop: 'country', value})}
                            text='COUNTRY*'
                            onBlur={() => this.props.onError({prop: 'countryError', error: validate('country', this.props.model.country) })}
                            error={this.props.errors.countryError}
                        />
                        <FloatingLabelInput
                            value={this.props.model.year}
                            onChangeText={value => this.props.modelUpdate({prop: 'year', value})}
                            text='YEAR*'
                            onBlur={() => { console.log(typeof this.props.model.year); this.props.onError({prop: 'yearError', error: validate('year', this.props.model.year) })}}
                            error={this.props.errors.yearError}
                        />
                        <View style={EditableItem.typeView}>
                            <Text style={EditableItem.typeLabel}>TYPE</Text>
                            <Picker
                                style={EditableItem.typePicker}
                                selectedValue={this.props.model.type}
                                onValueChange={value => this.props.modelUpdate({prop: 'type', value})}
                            >
                                <Picker.Item label="Red dry" value="red dry"/>
                                <Picker.Item label="Red semi-sweet" value="red semi-sweet"/>
                                <Picker.Item label="Red semi-dry" value="red semi-sweet"/>
                                <Picker.Item label="White dry" value="white dry"/>
                                <Picker.Item label="White semi-sweet" value="white semi-sweet"/>
                                <Picker.Item label="White semi-dry" value="white semi-dry"/>
                                <Picker.Item label="Rose" value="rose"/>
                                <Picker.Item label="Riesling" value="riesling"/>
                            </Picker>
                        </View>
                        <FloatingLabelInput
                            value={this.props.model.desc}
                            onChangeText={value => this.props.modelUpdate({prop: 'desc', value})}
                            text='DESCRIPTION*'
                            onBlur={() => this.props.onError({prop: 'descError', error: validate('desc', this.props.model.desc) })}
                            error={this.props.errors.descError}
                        />
                        <FloatingLabelInput
                            value={this.props.model.price}
                            onChangeText={value => this.props.modelUpdate({prop: 'price', value})}
                            text='PRICE*'
                            onBlur={() => this.props.onError({prop: 'priceError', error: validate('price', this.props.model.price) })}
                            error={this.props.errors.priceError}
                        />
                        <FloatingLabelInput
                            value={this.props.model.available}
                            onChangeText={value => this.props.modelUpdate({prop: 'available', value})}
                            text='AVAILABLE*'
                            onBlur={() => this.props.onError({prop: 'availableError', error:validate('available', this.props.model.available) })}
                            error={this.props.errors.availableError}
                        />
                        <FloatingLabelInput
                            value={this.props.model.image}
                            onChangeText={value => this.props.modelUpdate({prop: 'image', value})}
                            text='IMAGE (URL)*'
                            onBlur={() => this.props.onError({prop: 'imageError', error:validate('image', this.props.model.image) })}
                            error={this.props.errors.imageError}
                        />
                        <Thumbnail source={{uri: this.props.model.image}}/>
                        <FloatingLabelInput
                            value={this.props.model.thumbnail}
                            onChangeText={value => this.props.modelUpdate({prop: 'thumbnail', value})}
                            text='THUMBNAIL (URL)*'
                            onBlur={() => this.props.onError({prop: 'thumbnailError', error:validate('thumbnail', this.props.model.thumbnail) })}
                            error={this.props.errors.thumbnailError}
                        />
                        <Thumbnail source={{uri: this.props.model.thumbnail}}/>
                    </CardItem>
                </Card>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    container: Common.container
};
const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, { modelUpdate })(EditableItemForm);