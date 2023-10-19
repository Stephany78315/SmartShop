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
}

export const fonts = {
    button: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
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
