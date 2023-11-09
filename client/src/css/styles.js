//Estilos globales
  
export const borderRadius = {
    L: 8,
}

export const dropShadowS = {
    ...Platform.select({  
    ios: {
        shadowColor: 'black',
        shadowOffset: { width: 7, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
    }, 
})
}

export const colors = {
    platine100: '#C0BEBC',
    platine400:'#7D766F',
    platine050: '#EBE9E8',
    platine025: '#FDFDFD',

    ruby200: '#FC4845',
}

export const fonts = {
    button: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    textButtonRegular: {
        fontWeight: 'regular',
        fontSize: 16,
    },
    textRegular: {
        fontWeight: 'regular',
        fontSize: 12,
    },
    doubleHeaderRegular: {
        fontWeight: 'regular',
        fontSize: 24,
    },
    doubleHeadline: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    titleRegular: {
        fontWeight: 'regular',
        fontSize: 18,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18,
    },
    subHeaderRegular: {
        fontWeight: 'regular',
        fontSize: 16,
    }
}
 export const inputs = {
    largeTextSpace: {
        height: 32,
        width: '94%',
        backgroundColor: 'white',
        marginLeft: '3%',
        borderRadius: borderRadius.L,
    }
 }

export const buttons = {
    thick: {
        height: 40,
        width: 160,
        backgroundColor: colors.platine100,
        justifyContent: 'center',
        borderRadius: borderRadius.L,
        alignItems: 'center',
        textAlign: 'center',
    },
    thick050: {
        height: 40,
        width: 160,
        backgroundColor: colors.platine050,
        justifyContent: 'center',
        borderRadius: borderRadius.L,
        alignItems: 'center',
        textAlign: 'center',
    }
}
