import React from 'react';
import { Text, View, Modal } from 'react-native';
import {Button, Card, CardItem} from 'native-base';

const Confirm = ({ children, visible, onAccept, onDecline, onAcceptText }) => {
  const { containerStyle, cardSectionStyle, cardButtonSectionStyle, button } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <Card>
          <CardItem style={cardSectionStyle}>
              {children}
          </CardItem>
          <CardItem style={cardButtonSectionStyle}>
            <Button light block onPress={onAccept} style={button}>
              <Text>{onAcceptText}</Text>
            </Button>
            <Button light block onPress={onDecline} style={button}>
              <Text>CANCEL</Text>
            </Button>
          </CardItem>
        </Card>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  button: {
    padding: 10
  },
  cardButtonSectionStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    padding: 15,
    flex:1,
    justifyContent: 'center'
  }
};

export { Confirm };
