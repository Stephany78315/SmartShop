//Estilos globales
  
export const borderRadius = {
    L: 8,
}

export const dropShadowS = {
    shadowColor: 'black',
    shadowOpacity: 0.25, // Transparencia del 25%
    shadowOffset: { width: 0.2, height: 1.5 },
    shadowRadius: 3,  
}

export const colors = {
    platine100: '#C0BEBC',
    platine400:'#7D766F',
    platine050: '#EBE9E8',

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
    }
}
