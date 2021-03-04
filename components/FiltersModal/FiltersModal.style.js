import styled from 'styled-components';
import Modal from 'react-native-modal';

export const FiltersModalContainer = styled(Modal)`
    margin: 0;
    align-items: flex-end;
`;

export const FiltersModalView = styled.View`
    flex: 1;
    width: 280px;
    background-color: ${props => props.theme.colors.white};
`;

export const FiltersModalInnerView = styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    position: relative;
`;