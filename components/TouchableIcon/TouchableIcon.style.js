import styled from 'styled-components';

export const TouchableIconView = styled.View`
    overflow: hidden;
    border-radius: ${props => `${props.size / 2}px`};
    margin-left: -5px;
    margin-right: -4px;
`;

export const TouchableIconInnerView = styled.View`
    align-items: center;
    justify-content: center;
    height: ${props => `${props.size}px`};
    width: ${props => `${props.size}px`};
`;