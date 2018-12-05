const Colors = {
    grey: '#636e72',
    lightGrey: '#757575',
    lightLightGrey: '#b2bec3',
    almostWhite: '#CFD8DC',
    lightGreen: '#00b894',
    bordo: '#770513',
    white: 'white'
};

const Common = {
    button: {
        backgroundColor: Colors.almostWhite,
        justifyContent: 'center'
    },
    standardImage: {
        height: 160,
        width: 80
    },
    roundImage: {
        width: 50,
        height: 50,
        margin: 15,
        borderRadius: 25
    },
    squareImage1x: {
        width: 100,
        height: 100
    },
    squareImage2x: {
        width: 200,
        height: 200
    },
    greyIcon: {
        color: Colors.grey,
        fontSize: 20
    },
    lightGreyIcon: {
        fontSize: 20,
        paddingRight: 5,
        color: Colors.lightGrey
    },
    defaultColorIcon: {
        fontSize: 20,
        paddingRight: 10
    },
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red'
    },
    successText: {
        fontSize: 16,
        alignSelf: 'center',
        color: Colors.lightGreen
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    note: {
        marginBottom: 10,
        fontSize: 16
    },
    priceSection: {
        flexDirection: 'row'
    },
    boldLabel: {
        fontWeight: '600',
        fontSize: 12
    },
    header: {
        backgroundColor: Colors.bordo,
        height: 60
    },
    headerTextStyle: {
        fontSize: 20,
        color: Colors.white,
        paddingLeft: 5,
        fontWeight: 'bold'
    }
};

const Screens = {
    Account: {
        content: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        image: {
            alignSelf: 'center',
            paddingHorizontal: 5,
            backgroundColor: Colors.grey,
            borderRadius: 30,
            borderWidth: 2,
            height: 60,
            width: 60,
            borderColor: Colors.white,
            alignItems: 'center'
        },
        text: {
            paddingTop: 15,
            color: Colors.white,
            fontSize: 18,
            fontWeight: 'bold'
        }
    },

    Cart: {
        text: {
            color: 'black'
        },
        content: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        button: {
            ...Common.button,
            width: 150,
            height: 40,
            padding: 10,
            marginTop: 10,
            alignItems: 'center'
        },
        orderButton: {
            ...Common.button,
            width: 100
        },
        totalPriceSection: {
            width: '100%',
            bottom: 0,
            borderTopWidth: 0.5,
            borderTopColor: Colors.lightLightGrey
        }
    },

    Catalogue: {
        indicatorPage: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
        },
        switchIcon: {
            marginLeft: 15
        },
        switchSection: {
            flexDirection: 'row',
            position: 'absolute',
            right: 10
        }
    },

    Confirmation: {
        text: {
            fontSize: 16,
            marginBottom: 15,
            fontWeight: '600'
        },
        content: {
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        button: {
            fontSize: 16,
            fontWeight: '600'
        }
    },

    DeliveryConfirmation: {
        button: {
            ...Common.button,
            width: '100%'
        },
        card: {
            ...Common.card,
            width: '100%'
        },
        deliveryCard: {
            flexDirection: 'column',
            width: '100%'
        },
        header: {
            fontWeight: '600'
        },
        total: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
        }
    },

    Home: {
        indicatorPage: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
        },
        reloadButton: {
            width: 100,
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center'
        },
        button: {
            ...Common.button,
            paddingTop: 10
        }
    },

    Login: {
        input: {
            width: '100%'
        },
        button: {
            ...Common.button,
            marginTop: 10,
            marginBottom: 10
        },
        textDivider: {
            alignSelf: 'center',
            paddingHorizontal: 5,
            backgroundColor: Colors.white
        },
        modalText: {
            marginBottom: 10,
            marginTop: 10,
            fontWeight: '600',
            fontSize: 16
        }
    },

    MyDetails: {
        radioSection: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 15
        },
        divider: {
            borderLeftColor: 'black',
            borderLeftWidth: .5,
            marginLeft: 20,
            marginRight: 20
        },
        dobView: {
            ...Common.inputView,
            marginBottom: 0
        }
    },

    Orders: {
        button: {
            ...Common.button,
            width: 100
        },
        text: {
            marginBottom: 15,
            fontWeight: '600'
        },
        content: {
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        header: {
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Colors.almostWhite
        },
        headerText: {
            fontWeight: '600'
        }
    }
}

const Pages = {

    ChangePwd: {
        input: {
            width: '100%',
            borderBottomWidth: .5,
            borderBottomColor: Colors.lightLightGrey,
            marginLeft: 5
        },
        inputView: {
            flexDirection: 'row',
            marginLeft: 10
        },
        toggle: {
            marginTop: 15,
            borderBottomWidth: .5,
            borderBottomColor: Colors.lightLightGrey,
            height: 35
        },
        button: {...Common.button,
            marginTop: 10,
            marginBottom: 10
        },
        textDivider: {
            alignSelf: 'center',
            paddingHorizontal: 5,
            backgroundColor: Colors.white
        }
    },

    EditableItem: {
        typeView: {
            flexDirection: 'row'
        },
        typeLabel: {
            flex: 1,
            marginTop: 15,
            fontSize: 16
        },
        typePicker: {
            flex: 2
        }
    },

    Item: {
        button: { ...Common.button,
            width: 100,
            marginLeft: 15
        },
        title: { ...Common.title,
            marginBottom: 0
        }
    }
};

const Items = {
    Cart: {
        picker: {
            width:150
        },
        cardItem: {
            flex: 2
        },
        priceQuantity: {
            fontSize: 16,
            marginTop: 15
        }
    },

    CartList: {
        content: {
            height: 60
        },
        button: { ...Common.button,
            width: 100,
            marginLeft: 10
        }
    },

    Grid: {
        priceSection: { ...Common.priceSection,
            marginTop: 140,
            position:'absolute'
        },
        button: { ...Common.button,
            width: 100
        },
        cardHeight: {
            height: 190
        }
    },

    List: {
        button: { ...Common.button,
            width: 100,
            marginLeft: 10
        }
    },

    PageCustomHeader: {
        iconStyle: {
            paddingRight: 5,
            paddingLeft: 10,
            color: Colors.white
        },
        cartIcon: {
            paddingRight: 5,
            paddingLeft: 10,
            color: Colors.white,
            position: 'absolute'
        },
        button: {
            width: 50
        },
        badge: {
            backgroundColor: Colors.white,
            opacity: 0.8,
            height: 20,
            flex: -1,
            position: 'absolute'
        },
        logo: {
            paddingLeft: 10,
            width: 60,
            height: 20
        }
    }
};

export { Common, Screens, Pages, Items, Colors };


