export const colors = {
    primary: '#4c6ef5',
    background: {
        start: '#11101C',
        end: '#24242F'
    },
    text: {
        primary: '#fff',
        secondary: '#ccc'
    },
    border: '#555'
};

export const gradients = {
    background: [colors.background.start, colors.background.end]
};

export const spacing = {
    small: 10,
    medium: 20,
    large: 30,
    xlarge: 40
};

export const typography = {
    title: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: colors.text.primary
    },
    description: {
        fontSize: 14,
        color: colors.text.secondary
    }
}; 